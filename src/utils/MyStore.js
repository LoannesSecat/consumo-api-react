import store from "~/redux/store";

export default function MyStore(values) {
  if (!values) return store.getState();

  const { reducer, value } = values;

  if (reducer && value) return store.getState()[reducer][value];

  if (reducer) { return store.getState()[reducer]; }
}
