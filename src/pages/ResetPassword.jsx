import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Eye from "~/assets/icons/Eye";
import EyeSlash from "~/assets/icons/EyeSlash";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import { ResetPasswordUser } from "~/redux/actions/UserActions";
import "~/utils/styles/ResetPassword.scss";

export default function ResetPassword() {
  const [showPass, setShowPass] = useState(false);
  const USER_DATA = useSelector((e) => e.user.userData);
  const LOGGED_IN = Object.keys(USER_DATA).length;
  const navigate = useNavigate();

  const [values, setValues] = useState({ navigateTo: () => navigate("/") });

  const HandleOnSubmit = (e) => {
    e.preventDefault();

    if (LOGGED_IN) {
      ResetPasswordUser(values);
    }

    if (!LOGGED_IN) {
      ResetPasswordUser(values);
    }
  };

  return (
    <main className="reset-password">
      {!LOGGED_IN ? <GoBackButton /> : null}

      <form
        onSubmit={(e) => HandleOnSubmit(e)}
        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
        className={LOGGED_IN ? "form" : null}
      >
        { LOGGED_IN
          ? (
            <label htmlFor="password">
              <span>Nueva contraseña</span>
              <br />
              <div>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  autoComplete="true"
                />

                <button onClick={(e) => { e.preventDefault(); setShowPass(!showPass); }}>
                  {!showPass ? <Eye /> : <EyeSlash />}
                </button>
              </div>
            </label>
          )
          : (
            <label htmlFor="email">
              <span>Escribe el correo registrado</span>
              <br />
              <div>
                <input type="email" name="email" autoComplete="true" />
              </div>
            </label>
          )}

        <button type="submit">Cambiar contraseña</button>
      </form>
    </main>
  );
}
