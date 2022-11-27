import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ReactComponent as EyeSlash } from "~/assets/icons/eye-slash.svg";
import { ReactComponent as Eye } from "~/assets/icons/eye.svg";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import UserC from "~/superstate/User";
import FormValidator from "~/utils/FormValidator";
import styles from "~/utils/styles/user-login.module.scss";

const { logInUser } = UserC;

export default function UserLogIn() {
  const [showPass, setShowPass] = useState(false);
  const [, navigate] = useLocation();

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

    if (FormValidator(formValues)) {
      logInUser(formValues);
    }
  };

  return (
    <main className={styles.user_log_in}>
      <div>
        <GoBackButton />
        <button className={styles.go_to_registration} onClick={() => { navigate("registration"); }} type="button">Registrarme</button>
      </div>

      <form onSubmit={(e) => HandleOnSubmit(e)} className={styles.log_in_form}>
        <label htmlFor="email">
          <span>Correo</span>
          <br />
          <input type="email" name="email" placeholder="ejemplo@gmail.com" autoComplete="true" />
        </label>
        <br />

        <label htmlFor="password">
          <span>Contraseña</span>
          <br />
          <div>
            <input type={showPass ? "text" : "password"} name="pass" autoComplete="true" />
            <button onClick={(e) => HandleShowPass(e)} type="button">{!showPass ? <Eye /> : <EyeSlash />}</button>
          </div>
        </label>

        <button type="submit" className={styles.submit_log_in_button}>Iniciar sesión</button>
      </form>

      <Link href="reset-password">Reiniciar contraseña</Link>
    </main>
  );
}
