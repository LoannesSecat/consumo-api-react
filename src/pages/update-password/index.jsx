import { useState } from "react";
import { useLocation } from "wouter";
import EyeSlashSVG from "~/icons/eye-slash.svg?react";
import EyeSVG from "~/icons/eye.svg?react";
import store from "~/store";
import { formValuesExtractor } from "~/utils/functions";
import styles from "./update-password.module.scss";

export default function UpdatePassword() {
  const [showPass, setShowPass] = useState(false);
  const [, navigate] = useLocation();
  const { updateUserData } = store.user();

  const handleUpdatePassword = (event) => {
    event.preventDefault();

    const { password } = formValuesExtractor({ event });
    updateUserData({ password, navigate: () => navigate("/") })
  }

  return (
    <main className={styles.update_password}>
      <form
        onSubmit={handleUpdatePassword}
        className={styles.form}
      >
        <div className={styles.password_container}>
          <label htmlFor="new_password_input" className={styles.password_label}>Nueva contraseña</label>

          <div className={styles.password_input_container}>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="new_password_input"
              className={styles.password_input}
              autoComplete="off"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPass(!showPass);
              }}
              type="button"
              className={styles.see_password_button}
            >
              {!showPass ? <EyeSVG /> : <EyeSlashSVG />}
            </button>
          </div>
        </div>

        <button type="submit">Cambiar contraseña</button>
      </form>
    </main>
  )
}