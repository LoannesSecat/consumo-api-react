import { useState } from "react";
import { useLocation } from "wouter";
import GoBackButton from "~/components/go-back-button";
import EyeSlash from "~/icons/eye-slash.svg?react";
import Eye from "~/icons/eye.svg?react";
import store from "~/store";
import { formValidator } from "~/utils/functions.js";
import styles from "./user-registration.module.scss";

export default function UserRegistration() {
  const { signInUser } = store.user();
  const [showPass, setShowPass] = useState(false);
  const [, navigate] = useLocation();

  const HandleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();

    let formValues = {
      email: e.target.email.value,
      password: e.target.pass.value,
      navigate: () => navigate("/"),
    };

    if (formValidator(formValues)) {
      if (e.target.nickname.value) {
        formValues = { ...formValues, nickname: e.target.nickname.value };
      }

      signInUser(formValues);
    }
  };

  return (
    <main className={styles.user_registration}>
      <header className={styles.top_buttons_container}>
        <GoBackButton />
        <button className={styles.go_to_log_in} onClick={() => navigate("login")} type="button">Iniciar sesión</button>
      </header>

      <form onSubmit={HandleOnSubmit} className={styles.registration_form}>
        <div className={styles.inputs_container}>
          <label className={styles.nickname_container}>
            <span>Nombre de usuario</span>

            <input
              type="text"
              name="nickname"
              placeholder="Opcional"
            />
          </label>

          <label className={styles.email_container}>
            <span>Correo</span>

            <input
              type="email"
              name="email"
              placeholder="ejemplo@yahoo.com"
              autoComplete="true"
            />
          </label>

          <label className={styles.password_container}>
            <span>Contraseña</span>

            <div>
              <input type={showPass ? "text" : "password"} name="pass" autoComplete="true" />
              <button onClick={(e) => HandleShowPass(e)}>{!showPass ? <Eye /> : <EyeSlash />}</button>
            </div>
          </label>
        </div>

        <button type="submit" className={styles.submit_registration_button}>Registrarme</button>
      </form>
    </main>
  );
}
