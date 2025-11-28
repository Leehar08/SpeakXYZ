
import { HistoryItem } from '../types';

const DB_NAME = 'SpeakXYZ_DB';
const STORE_NAME = 'history';
const DB_VERSION = 1;

/**
 * Open or create the IndexedDB database
 */
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject("IndexedDB is not supported in this browser.");
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Database error:", (event.target as IDBOpenDBRequest).error);
      reject('Failed to open database');
    };
    
    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Create object store with 'id' as key
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

/**
 * Save a meeting analysis result to the database
 */
export const saveMeetingToDB = async (item: HistoryItem): Promise<void> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(item);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save meeting');
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Retrieve all saved meeting history
 */
export const getHistoryFromDB = async (): Promise<HistoryItem[]> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onsuccess = () => {
        const items = request.result as HistoryItem[];
        // Sort by timestamp descending (newest first)
        items.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        resolve(items);
      };
      
      request.onerror = () => reject('Failed to fetch history');
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Delete a specific meeting by ID
 */
export const deleteMeetingFromDB = async (id: string): Promise<void> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to delete meeting');
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Clear all history
 */
export const clearHistoryDB = async (): Promise<void> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.clear();
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to clear database');
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
