import store from "~/redux/store";

export default function useStore(values) {
  if (values) {
    const { reducer, value } = values;

    if (reducer && value) {
      return store.getState()[reducer][value];
    }

    if (reducer) {
      return store.getState()[reducer];
    }
  }

  return store.getState();
}
