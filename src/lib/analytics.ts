import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "./firebase";

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
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
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
    const docRef = doc(db, COLLECTION_NAME, docId);
    await updateDoc(docRef, {
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
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    
    // We get all events from the last 30 days
    const q = query(
      collection(db, COLLECTION_NAME),
      where("timestamp", ">=", thirtyDaysAgo),
      orderBy("timestamp", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const views: PageView[] = [];
    
    querySnapshot.forEach((doc) => {
      views.push({ id: doc.id, ...doc.data() } as PageView);
    });
    
    return views;
  } catch (error) {
    console.error("Erro ao buscar dados de analytics:", error);
    return [];
  }
}

// ─────────────────────────────────────────────────
// LEADS TRACKING
// ─────────────────────────────────────────────────

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

/**
 * Grava um lead (formulário ou WhatsApp) no Firebase Firestore.
 * Dispara de forma assíncrona para não travar a UI.
 */
export async function logLead(data: Omit<Lead, "id">): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, LEADS_COLLECTION), data);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao registrar lead:", error);
    return null;
  }
}

/**
 * Busca todos os leads dos últimos 30 dias para o admin dashboard.
 */
export async function getLeadsData(): Promise<Lead[]> {
  try {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    const q = query(
      collection(db, LEADS_COLLECTION),
      where("timestamp", ">=", thirtyDaysAgo),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
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

// ─────────────────────────────────────────────────
// GEOLOCALIZAÇÃO (cache compartilhado)
// ─────────────────────────────────────────────────

let cachedGeo: { city: string; region: string; country: string } | null = null;

/**
 * Retorna a geolocalização do usuário, usando cache em memória.
 * Primeiro tenta o endpoint Cloudflare /api/geo (sem rate limit).
 * Se falhar, retorna "Desconhecida".
 */
export async function getUserGeo(): Promise<{ city: string; region: string; country: string }> {
  if (cachedGeo) return cachedGeo;
  try {
    // Tenta a API gratuita geojs.io que não possui rate limits agressivos
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
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
  }
}

/**
 * Atualiza o cache de geolocalização (usado pelo AnalyticsTracker).
 */
export function setGeoCache(geo: { city: string; region: string; country: string }) {
  cachedGeo = geo;
}
