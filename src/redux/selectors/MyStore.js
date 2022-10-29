import store from "../store";

export default function MyStore({ reducer, value } = {}) {
  if (reducer && value) return store.getState()[reducer][value];
  if (reducer) return store.getState()[reducer];

  return store.getState();
}
