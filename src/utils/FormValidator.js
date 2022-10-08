import MyToast from "~/utils/MyToast";

export default function FormValidator({ email, password }) {
  const EMAIL_REG_EX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (email.trim() === "") {
    MyToast.warning({
      message: "Te falta el correo",
    });

    return false;
  }

  if (!EMAIL_REG_EX.test(email)) {
    MyToast.warning({
      message: "Escriba un correo con el formato correcto",
    });

    return false;
  }

  if (password === "") {
    MyToast.warning({
      message: "Te falta la contraseña",
    });

    return false;
  }

  if (password.length < 6) {
    MyToast.warning({
      message: "La contraseña debe tener más de 6 caracteres",
    });

    return false;
  }

  return true;
}
