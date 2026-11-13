import { loadFirestore } from "./firestoreLazy";

export interface PageView {
  id?: string;
  path: string;
  city: string;
  region: string;
  timestamp: number;
  timeSpent: number; // in seconds
  device: "Mobile" | "Desktop";
}

const COLLECTION_NAME = "page_views";

/**
 * Logs a new page view to Firebase
 * Returns the document ID so we can update the timeSpent later
 */
export async function logPageView(data: Omit<PageView, "id" | "timeSpent">): Promise<string | null> {
  try {
    const { db, fs } = await loadFirestore();
    const docRef = await fs.addDoc(fs.collection(db, COLLECTION_NAME), {
      ...data,
      timeSpent: 0 // initial
    });
    return docRef.id;
  } catch (error) {
    console.error("Erro ao registrar analytics:", error);
    return null;
  }
}

/**
 * Updates the time spent on a specific page view document
 */
export async function updateTimeSpent(docId: string, timeSpentSeconds: number) {
  if (!docId) return;
  try {
    const { db, fs } = await loadFirestore();
    await fs.updateDoc(fs.doc(db, COLLECTION_NAME, docId), {
      timeSpent: timeSpentSeconds
    });
  } catch (error) {
    console.error("Erro ao atualizar tempo de analytics:", error);
  }
}

/**
 * Fetches the analytics data for the admin dashboard
 * By default, fetches the last 30 days.
 */
export async function getAnalyticsData(): Promise<PageView[]> {
  try {
    const { db, fs } = await loadFirestore();
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    // We get all events from the last 30 days
    const q = fs.query(
      fs.collection(db, COLLECTION_NAME),
      fs.where("timestamp", ">=", thirtyDaysAgo),
      fs.orderBy("timestamp", "desc")
    );

    const querySnapshot = await fs.getDocs(q);
    const views: PageView[] = [];

    querySnapshot.forEach((d) => {
      views.push({ id: d.id, ...d.data() } as PageView);
    });

    return views;
  } catch (error) {
    console.error("Erro ao buscar dados de analytics:", error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// LEADS TRACKING
// ─────────────────────────────────────────────────────────────

export interface Lead {
  id?: string;
  type: 'form' | 'whatsapp';
  name?: string;
  phone?: string;
  email?: string;
  source: string;
  city: string;
  region: string;
  country: string;
  device: 'Mobile' | 'Desktop';
  timestamp: number;
  utms?: { source?: string; campaign?: string; medium?: string } | null;
  whatsappOrigin?: string;
}

const LEADS_COLLECTION = "leads";

// ── Outbox de leads (à prova de falhas) ──────────────────────
// Como o Firestore agora carrega sob demanda, cada lead é salvo ANTES em localStorage
// e só removido depois que o Firestore confirma a gravação. Se a aba fechar, o usuário
// sofrer um redirect (window.location.href), o chunk falhar ou a rede cair, o lead é
// reenviado na próxima visita. O documento usa ID gerado no cliente (setDoc), então o
// reenvio é idempotente: nunca duplica o lead.
const OUTBOX_KEY = "sonus_pending_leads";
const OUTBOX_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const OUTBOX_MAX_ITEMS = 25;

interface OutboxItem { id: string; data: Omit<Lead, "id">; ts: number }
const inFlight = new Set<string>();

function readOutbox(): OutboxItem[] {
  try {
    const raw = localStorage.getItem(OUTBOX_KEY);
    const list = raw ? (JSON.parse(raw) as OutboxItem[]) : [];
    const now = Date.now();
    return list.filter((i) => i && i.id && i.data && now - i.ts < OUTBOX_MAX_AGE_MS);
  } catch {
    return [];
  }
}

function writeOutbox(list: OutboxItem[]): boolean {
  try {
    if (list.length) localStorage.setItem(OUTBOX_KEY, JSON.stringify(list.slice(-OUTBOX_MAX_ITEMS)));
    else localStorage.removeItem(OUTBOX_KEY);
    return true;
  } catch {
    /* storage cheio/bloqueado: segue sem outbox */
    return false;
  }
}

function outboxAdd(item: OutboxItem): boolean { return writeOutbox([...readOutbox().filter((i) => i.id !== item.id), item]); }
function outboxRemove(id: string) { writeOutbox(readOutbox().filter((i) => i.id !== id)); }

function newLeadId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch { /* noop */ }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

async function writeLead(id: string, data: Omit<Lead, "id">): Promise<void> {
  inFlight.add(id);
  try {
    let loaded;
    try {
      loaded = await loadFirestore();
    } catch {
      // 1 nova tentativa (rede instável / chunk atrasado)
      await new Promise((r) => setTimeout(r, 1200));
      loaded = await loadFirestore();
    }
    const { db, fs } = loaded;
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    );
    await fs.setDoc(fs.doc(db, LEADS_COLLECTION, id), cleanData);
    outboxRemove(id);
  } catch (error) {
    console.error("Erro ao gravar lead no Firestore:", error);
    throw error;
  } finally {
    inFlight.delete(id);
  }
}

/**
 * Grava um lead (formulário ou WhatsApp) no Firebase Firestore.
 * Salva antes no outbox (localStorage); se estiver offline ou o Firestore falhar,
 * mantém na fila para reenvio automático e loga o erro completo no console.
 */
export async function logLead(data: Omit<Lead, "id">): Promise<string | null> {
  const id = newLeadId();
  const queued = outboxAdd({ id, data, ts: Date.now() });

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return queued ? id : null;
  }

  try {
    await writeLead(id, data);
    return id;
  } catch (error) {
    console.error("Erro detalhado ao registrar lead no Firestore:", error);
    return queued ? id : null;
  }
}

let flushing = false;
/** Reenvia leads que não foram confirmados em visitas anteriores. Chamado em tempo ocioso. */
export async function flushPendingLeads(): Promise<void> {
  if (flushing) return;
  const pending = readOutbox().filter((i) => !inFlight.has(i.id));
  if (!pending.length) return;
  flushing = true;
  try {
    for (const item of pending) {
      try {
        await writeLead(item.id, item.data);
      } catch (e) {
        console.error("Erro ao reenviar lead pendente para o Firestore:", e);
        const code = (e as { code?: string })?.code;
        // Regras do Firestore negaram (ex.: doc já existe): não adianta insistir
        if (code === "permission-denied" || code === "already-exists") outboxRemove(item.id);
      }
    }
  } finally {
    flushing = false;
  }
}

/**
 * Busca todos os leads dos últimos 30 dias para o admin dashboard.
 */
export async function getLeadsData(): Promise<Lead[]> {
  try {
    const { db, fs } = await loadFirestore();
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    const q = fs.query(
      fs.collection(db, LEADS_COLLECTION),
      fs.where("timestamp", ">=", thirtyDaysAgo),
      fs.orderBy("timestamp", "desc")
    );

    const querySnapshot = await fs.getDocs(q);
    const leads: Lead[] = [];

    querySnapshot.forEach((d) => {
      leads.push({ id: d.id, ...d.data() } as Lead);
    });

    return leads;
  } catch (error) {
    console.error("Erro ao buscar dados de leads:", error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// GEOLOCALIZAÇÃO (cache compartilhado)
// ─────────────────────────────────────────────────────────────

let cachedGeo: { city: string; region: string; country: string } | null = null;

/**
 * Retorna a geolocalização do usuário, usando cache em memória.
 * Primeiro tenta o endpoint Cloudflare /api/geo (sem rate limit).
 * Se falhar, retorna "Desconhecida".
 */
export async function getUserGeo(): Promise<{ city: string; region: string; country: string }> {
  if (cachedGeo) return cachedGeo;
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return { city: "Desconhecida", region: "Desconhecida", country: "Desconhecido" };
  }
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), 1000) : null;
  try {
    // Tenta a API gratuita geojs.io que não possui rate limits agressivos
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json", {
      signal: controller?.signal,
    });
    const data = await response.json();
    cachedGeo = {
      city: data.city || "Desconhecida",
      region: data.region || "Desconhecida",
      country: data.country || "Desconhecido",
    };
    return cachedGeo;
  } catch (error) {
    console.warn("Geo: Falha ao obter localização", error);
    // IMPORTANTE: Cachear o erro para não fazer a requisição novamente nos próximos cliques
    cachedGeo = { city: "Desconhecida", region: "Desconhecida", country: "Desconhecido" };
    return cachedGeo;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    flushPendingLeads();
  });
}

/**
 * Atualiza o cache de geolocalização (usado pelo AnalyticsTracker).
 */
export function setGeoCache(geo: { city: string; region: string; country: string }) {
  cachedGeo = geo;
}
