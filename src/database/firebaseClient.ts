import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { ProjectData } from '@/types';
import { PROJECTS_DATA } from './data';

// ==========================================
// FIREBASE CONFIGURATION (PROSPECTION-A1082)
// ==========================================
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDmJJpauN5Ge7pVelSmyx3gmXNqFIbmrmc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "prospection-a1082.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "prospection-a1082",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "prospection-a1082.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "149664611365",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:149664611365:web:3cdedbdbcb1c8bd23b53cc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-545BS6RX4Y",
};

export const isFirebaseConfigured = (): boolean => {
  return (
    !!firebaseConfig.apiKey &&
    !!firebaseConfig.projectId &&
    firebaseConfig.projectId !== 'your-project-id'
  );
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);

    // Initialize Analytics if in browser and supported
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      }).catch((e) => console.debug('Firebase Analytics not supported in current environment:', e));
    }
  } catch (err) {
    console.warn('Firebase initialization skipped or failed:', err);
  }
}

export { app, db, analytics };

// ==========================================
// FIRESTORE CRUD SERVICES
// ==========================================
export const FirebaseService = {
  /**
   * Fetch all projects from Firestore (with fallback to data.ts)
   */
  async getProjects(): Promise<ProjectData[]> {
    if (!db || !isFirebaseConfigured()) {
      return PROJECTS_DATA;
    }

    try {
      const projectsCol = collection(db, 'projects');
      const q = query(projectsCol, orderBy('year', 'desc'));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return PROJECTS_DATA;
      }

      const list: ProjectData[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as ProjectData);
      });
      return list;
    } catch (err) {
      console.warn('Error fetching projects from Firebase, fallback to local:', err);
      return PROJECTS_DATA;
    }
  },

  /**
   * Save or update a project in Firestore
   */
  async saveProject(project: ProjectData): Promise<boolean> {
    if (!db || !isFirebaseConfigured()) {
      return false;
    }

    try {
      const projectRef = doc(db, 'projects', project.id);
      await setDoc(projectRef, {
        ...project,
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (err) {
      console.error('Failed to save project in Firebase:', err);
      return false;
    }
  },

  /**
   * Delete a project from Firestore
   */
  async deleteProject(projectId: string): Promise<boolean> {
    if (!db || !isFirebaseConfigured()) {
      return false;
    }

    try {
      const projectRef = doc(db, 'projects', projectId);
      await deleteDoc(projectRef);
      return true;
    } catch (err) {
      console.error('Failed to delete project in Firebase:', err);
      return false;
    }
  },

  /**
   * Real-time listener for projects changes
   */
  subscribeToProjects(onUpdate: (projects: ProjectData[]) => void): () => void {
    if (!db || !isFirebaseConfigured()) {
      return () => {};
    }

    try {
      const projectsCol = collection(db, 'projects');
      const q = query(projectsCol, orderBy('year', 'desc'));
      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: ProjectData[] = [];
            snapshot.forEach((docSnap) => {
              list.push(docSnap.data() as ProjectData);
            });
            onUpdate(list);
          }
        },
        (error) => {
          console.warn('Firestore subscription error:', error);
        }
      );
    } catch (err) {
      console.warn('Could not setup Firestore subscription:', err);
      return () => {};
    }
  },

  /**
   * Store contact messages in Firestore
   */
  async saveContactMessage(message: {
    name: string;
    email: string;
    message: string;
    subject?: string;
  }): Promise<boolean> {
    if (!db || !isFirebaseConfigured()) {
      return false;
    }

    try {
      const messagesCol = collection(db, 'contact_messages');
      await addDoc(messagesCol, {
        ...message,
        createdAt: serverTimestamp(),
        read: false,
      });
      return true;
    } catch (err) {
      console.error('Failed to save contact message to Firebase:', err);
      return false;
    }
  },

  /**
   * Seed / Initialise Firestore with default projects from data.ts
   */
  async seedDefaultProjects(): Promise<{ success: boolean; count: number }> {
    if (!db || !isFirebaseConfigured()) {
      return { success: false, count: 0 };
    }

    try {
      let count = 0;
      for (const proj of PROJECTS_DATA) {
        const projectRef = doc(db, 'projects', proj.id);
        await setDoc(projectRef, {
          ...proj,
          updatedAt: serverTimestamp(),
        });
        count++;
      }
      return { success: true, count };
    } catch (err) {
      console.error('Error seeding projects to Firebase:', err);
      return { success: false, count: 0 };
    }
  },
};
