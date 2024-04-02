import { requestResetPassword } from "~/services/user-services";
import { formValuesExtractor } from "~/utils/functions";
import styles from "./request-reset-password.module.scss";

export default function RequestResetPassword() {
  const HandleOnSubmit = (event) => {
    event.preventDefault();

    const { email } = formValuesExtractor({ event });
    requestResetPassword({ email });
  };

  return (
    <main className={styles.request_reset_password}>
      <button
        onClick={() => {
          history.back();
        }}
        className={styles.go_back_button}
      >
        Volver
      </button>

      <form
        onSubmit={HandleOnSubmit}
        className={styles.form}
      >
        <div className={styles.email_container}>
          <label htmlFor="email_input" className={styles.email_label}>Correo registrado</label>
          <input type="email" name="email" id="email_input" className={styles.email_input} />
        </div>

        <button type="submit">Solicitar cambio de contraseña</button>
      </form>
    </main>
  );
}
