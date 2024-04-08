import { useState } from "react";
import { useLocation } from "wouter";
import GoBackButton from "~/components/go-back-button";
import EyeSlash from "~/icons/eye-slash.svg?react";
import Eye from "~/icons/eye.svg?react";
import { signUp } from "~/services/user-services";
import { formValidator, formValuesExtractor } from "~/utils/functions.js";
import styles from "./user-registration.module.scss";

export default function UserRegistration() {
  const [showPass, setShowPass] = useState(false);
  const [, navigate] = useLocation();

  const HandleOnSubmit = async (e) => {
    e.preventDefault();

    const values = { ...formValuesExtractor(e), navigate: () => navigate("/") };

    if (formValidator(values)) {
      signUp(values);
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
              <input type={showPass ? "text" : "password"} name="password" autoComplete="true" />
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setShowPass(!showPass);
                }}
              >
                {!showPass ? <Eye /> : <EyeSlash />}
              </button>
            </div>
          </label>
        </div>

        <button type="submit" className={styles.submit_registration_button}>Registrarme</button>
      </form>
    </main>
  );
}
