import { useState } from "react";
import { Link, useLocation } from "wouter";
import GoBackButton from "~/components/go-back-button";
import EyeSlash from "~/icons/eye-slash.svg?react";
import Eye from "~/icons/eye.svg?react";
import store from "~/store";
import { formValidator } from "~/utils/functions.js";
import styles from "./user-login.module.scss";

export default function UserLogIn() {
  const [showPass, setShowPass] = useState(false);
  const [, navigate] = useLocation();
  const { logIn } = store.user();

  const HandleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const HandleOnSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      email: e.target.email.value,
      password: e.target.pass.value,
      navigate,
    };

    if (formValidator(formValues)) {
      logIn(formValues);
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
              <input type={showPass ? "text" : "password"} name="pass" autoComplete="true" />
              <button onClick={(e) => HandleShowPass(e)} type="button">{!showPass ? <Eye /> : <EyeSlash />}</button>
            </div>
          </label>
        </div>

        <button type="submit" className={styles.submit_log_in_button}>Iniciar sesión</button>
      </form>

      <Link href="request-reset-password">Cambiar contraseña</Link>
    </main>
  );
}
