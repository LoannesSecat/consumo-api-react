import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

const LOCAL_STORAGE_STATE = JSON.parse(localStorage.getItem("GLOBAL_STATE")) ?? {};
const STORE = configureStore({ reducer, preloadedState: LOCAL_STORAGE_STATE });

// Save the global state in localStorage for persist on reload
STORE.subscribe(() => {
  localStorage.removeItem("GLOBAL_STATE");
  const STATE = JSON.stringify(STORE.getState());
  localStorage.setItem("GLOBAL_STATE", STATE);
});

export default STORE;
