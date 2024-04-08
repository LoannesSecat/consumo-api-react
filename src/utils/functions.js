import iziToast from "izitoast";
import store from "~/store";

export const getStore = (storeName = "") => {
  if (storeName || storeName.length) {
    return store[storeName].getState();
  }

  return store;
};

export const $ = (nameElement) => document.querySelector(nameElement);

export const CapitalizeText = (text) => text[0].toUpperCase() + text.slice(1);

export const Languages = (lan) => {
  if (lan) {
    const word = new Intl.DisplayNames(["es"], { type: "language" }).of(lan);
    return CapitalizeText(word);
  }
};

export const Countries = (name) => new Intl.DisplayNames(["es"], { type: "region" }).of(name);

export const Currency = (value) => new Intl
  .NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })
  .format(value);

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
};

export const useToast = iziToast;

export const toastInicializer = () => {
  useToast.settings({
    position: "bottomCenter",
    progressBar: false,
    messageSize: "16",
    timeout: 3000,
    pauseOnHover: false,
  });
};

export const formValidator = ({ email, password }) => {
  const EMAIL_REG_EX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (email.trim() === "") {
    useToast.warning({
      message: "Te falta el correo",
    });

    return false;
  }

  if (!EMAIL_REG_EX.test(email)) {
    useToast.warning({
      message: "Escriba un correo con el formato correcto",
    });

    return false;
  }

  if (password === "") {
    useToast.warning({
      message: "Te falta la contraseña",
    });

    return false;
  }

  if (password.length < 6) {
    useToast.warning({
      message: "La contraseña debe tener más de 6 caracteres",
    });

    return false;
  }

  return true;
};

export const formValuesExtractor = (event = {}) => {
  const target = event.currentTarget;
  const formData = new FormData(target);
  const valuesObject = Object.fromEntries(formData.entries());

  for (const key in valuesObject) {
    const value = valuesObject[key];

    if (!value.length) {
      delete valuesObject[key];
    }
  }

  return valuesObject;
};
