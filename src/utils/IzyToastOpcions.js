import iziToast from "izitoast";

export default function IzyToastOpcions() {
  return iziToast.settings({
    position: "bottomCenter",
    progressBar: false,
    messageSize: "17",
    timeout: 3000,
  });
}
