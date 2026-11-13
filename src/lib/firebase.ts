import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// ⚠️ Módulo de uso EXCLUSIVO do painel admin (Auth + Storage + Firestore completos).
// As páginas públicas NÃO devem importar este arquivo — usam `lib/firestoreLazy.ts`,
// que carrega o Firestore sob demanda. Ambos compartilham o mesmo app via getApps().
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
