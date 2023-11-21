import iziToast from "izitoast";
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

export const $ = (nameElement) => {
  return document.querySelector(nameElement);
}

export const CapitalizeText = (text) => {
  return text[0].toUpperCase() + text.slice(1);
}

export const Languages = (lan) => {
  if (lan) {
    const word = new Intl.DisplayNames(["es"], { type: "language" }).of(lan);
    return CapitalizeText(word);
  }
};

export const Countries = (name) => {
  return new Intl.DisplayNames(["es"], { type: "region" }).of(name);
};

export const Currency = (value) => {
  return new Intl
    .NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
    .format(value);
}

export const MyDate = (value) => {
  if (value && value.length) {
    const aux = new Date(value);

    const altDate = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "full",
    }).format(aux);

    return CapitalizeText(altDate);
  }

  return "Sin fecha";
};

let timer = null;
export const customTimeOut = ({ fn = () => { }, miliseconds = 1000 }) => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    fn();
  }, miliseconds);
}

export const toastInicializer = () => {
  iziToast.settings({
    position: "bottomCenter",
    progressBar: false,
    messageSize: "16",
    timeout: 3000,
    pauseOnHover: false,
  });
}
