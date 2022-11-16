import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

const LOCAL_STORAGE_STATE = JSON.parse(localStorage.getItem("MEDIA_PLATFORM_STORE")) ?? {};
const STORE = configureStore({ reducer, preloadedState: LOCAL_STORAGE_STATE });

// Save the global state in localStorage for persist on reload
STORE.subscribe(() => {
  const STATE = JSON.stringify(STORE.getState());
  localStorage.setItem("MEDIA_PLATFORM_STORE", STATE);
});

export default STORE;
