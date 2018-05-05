import * as localforage from "localforage";

let isInitialized = false;

// make sure this is called before you pass getHistory() into ConfigureStore in boot-server.tsx
async function initStorage() {
  if (!isInitialized) {
    isInitialized = true;
    await localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]);
  }
}

export async function getItem<T>(key: string): Promise<T> {
  await initStorage();

  return await localforage.getItem<T>(key);
}

export async function saveItem(key: string, value: any) {
  await initStorage();

  return await localforage.setItem(key, value);
}

export async function removeItem(key: string) {
  await initStorage();

  return await localforage.removeItem(key);
}
