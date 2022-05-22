const CapitalizeText = (text) => text[0].toUpperCase() + text.slice(1);

export const Languages = (lan) => {
  if (lan !== undefined) {
    let word = new Intl.DisplayNames(["es"], { type: "language" }).of(lan);
    return CapitalizeText(word);
  }
};

export const Countries = (name) =>
  new Intl.DisplayNames(["es"], { type: "region" }).of(name);

export const Currency = (value) => new Intl.NumberFormat().format(value);

export const MyDate = (value) => {
  if (value !== undefined) {
    const aux = new Date(value);

    const altDate = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "full",
    }).format(aux);

    return CapitalizeText(altDate);
  }
};
