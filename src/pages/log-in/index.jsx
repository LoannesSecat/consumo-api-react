import { useState } from "react";
import { Link, useLocation } from "wouter";
import GoBackButton from "~/components/go-back-button";
import EyeSlash from "~/icons/eye-slash.svg?react";
import Eye from "~/icons/eye.svg?react";
import { signIn } from "~/services/user-services";
import { formValidator, formValuesExtractor } from "~/utils/functions.js";
import styles from "./user-login.module.scss";

export default function UserLogIn() {
  const [showPass, setShowPass] = useState(false);
  const [, navigate] = useLocation();

  const HandleOnSubmit = (e) => {
    e.preventDefault();

    const values = { ...formValuesExtractor(e), navigate: () => navigate("/") };

    if (formValidator(values)) {
      signIn(values);
    }
  };

  return (
    <main className={styles.user_log_in}>
      <div>
        <GoBackButton onClick={() => { navigate("/"); }} />
        <button className={styles.go_to_registration} onClick={() => { navigate("/signup"); }} type="button">Registrarme</button>
      </div>

      <form onSubmit={(e) => HandleOnSubmit(e)} className={styles.log_in_form}>
        <div className={styles.inputs_container}>
          <label>
            <span>Correo</span>
            <input type="email" name="email" placeholder="ejemplo@gmail.com" autoComplete="true" />
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
                type="button"
              >
                {!showPass ? <Eye /> : <EyeSlash />}
              </button>
            </div>
          </label>
        </div>

        <button type="submit" className={styles.submit_log_in_button}>Iniciar sesión</button>
      </form>

      <Link href="request-reset-password">Cambiar contraseña</Link>
    </main>
  );
}
