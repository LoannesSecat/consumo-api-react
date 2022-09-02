import store from "~/redux/store";

export default function useStore(par) {
  if (par) {
    const { reducer, value } = par

    if (reducer && value) {
      return store.getState()[reducer][value];
    }

    if (reducer) {
      return store.getState()[reducer]
    }
  }

  return store.getState()
};