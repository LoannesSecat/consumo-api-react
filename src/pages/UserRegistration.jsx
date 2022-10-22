import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EyeSlash } from "~/assets/icons/eye-slash.svg";
import { ReactComponent as Eye } from "~/assets/icons/eye.svg";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import { SignInUser } from "~/redux/actions/UserActions";
import FormValidator from "~/utils/FormValidator";
import "~/utils/styles/UserRegistration.scss";

export default function UserRegistration() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const HandleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();

    let formValues = {
      email: e.target.email.value,
      password: e.target.pass.value,
      navigateTo: () => navigate("/"),
    };

    if (FormValidator(formValues)) {
      if (e.target.nickname.value) {
        formValues = { ...formValues, nickname: e.target.nickname.value };
      }

      SignInUser(formValues);
    }
  };

  return (
    <main className="user-registration">
      <div>
        <GoBackButton onClick={() => { navigate("/"); }} />
        <button className="go-to-log-in" onClick={() => navigate("/login")}>Iniciar sesión</button>
      </div>

      <form onSubmit={HandleOnSubmit} className="registration-form">
        <label htmlFor="nickname">
          <span>Nombre de usuario</span>
          <br />
          <input
            type="text"
            name="nickname"
            placeholder="Opcional"
          />
        </label>
        <br />

        <label htmlFor="email">
          <span>Correo</span>
          <br />
          <input
            type="email"
            name="email"
            placeholder="ejemplo@yahoo.com"
            autoComplete="true"
          />
        </label>
        <br />

        <label htmlFor="password">
          <span>Contraseña</span>
          <div>
            <input type={showPass ? "text" : "password"} name="pass" autoComplete="true" />
            <button onClick={(e) => HandleShowPass(e)}>{!showPass ? <Eye /> : <EyeSlash />}</button>
          </div>
        </label>

        <button type="submit" className="submit-registration-button">Registrarme</button>
      </form>
    </main>
  );
}
