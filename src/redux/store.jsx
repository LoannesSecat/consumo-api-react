import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

const local_storage_state = JSON.parse(localStorage.getItem("GLOBAL_STATE")) ?? {} // Check if there is a value "GLOBAL_STATE" in localStorage

const store = configureStore({ reducer, preloadedState: local_storage_state })

// Save the global state in localStorage for persist on reload
store.subscribe(() => {
  const state = JSON.stringify(store.getState())
  localStorage.setItem("GLOBAL_STATE", state)
})

export default store;
