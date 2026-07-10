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
