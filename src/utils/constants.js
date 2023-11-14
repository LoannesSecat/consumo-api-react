import store from "~/store";

export const getStore = (name = "") => {
  return store[name].getState();
}

export const useStore = (storeName = "") => {
  if (!storeName || !storeName.length) {
    return store.getState()
  }

  return store[storeName]
}