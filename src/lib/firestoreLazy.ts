import type { Firestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

/**
 * Carregamento sob demanda do Firestore para as páginas PÚBLICAS.
 *
 * - Nada de Firebase entra no bundle inicial: `firebase/app` e `firebase/firestore`
 *   só são baixados na primeira chamada (analytics/leads), fora do caminho crítico.
 * - Usa o mesmo app padrão que `lib/firebase.ts` (painel admin) via getApps(),
 *   então nunca existem duas instâncias.
 * - Em caso de falha de rede/chunk, a promise é descartada e a próxima chamada tenta de novo.
 */
type FirestoreModule = typeof import("firebase/firestore");

export interface LoadedFirestore {
  db: Firestore;
  fs: FirestoreModule;
}

let loading: Promise<LoadedFirestore> | null = null;

export function loadFirestore(): Promise<LoadedFirestore> {
  if (!loading) {
    loading = (async () => {
      const [{ initializeApp, getApps, getApp }, fs] = await Promise.all([
        import("firebase/app"),
        import("firebase/firestore"),
      ]);
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      return { fs, db: fs.getFirestore(app) };
    })().catch((err) => {
      loading = null; // permite nova tentativa
      throw err;
    });
  }
  return loading;
}

/** Aquece o chunk + a conexão em tempo ocioso, para o submit de formulário ser instantâneo. */
export function preloadFirestore(): void {
  loadFirestore().catch(() => {});
}

/** Executa `fn` quando o navegador estiver ocioso (fallback: setTimeout). */
export function whenIdle(fn: () => void, timeout = 2500): void {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
  if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(fn, { timeout });
  else setTimeout(fn, Math.min(timeout, 1500));
}
