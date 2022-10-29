import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as EyeSlash } from "~/assets/icons/eye-slash.svg";
import { ReactComponent as Eye } from "~/assets/icons/eye.svg";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import { LogInUser } from "~/services/UserServices";
import FormValidator from "~/utils/FormValidator";
import "~/utils/styles/UserLogIn.scss";

export default function UserLogIn() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const HandleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const HandleOnSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      email: e.target.email.value,
      password: e.target.pass.value,
      navigateTo: () => navigate("/"),
    };

    if (FormValidator(formValues)) {
      LogInUser(formValues);
    }
  };

  return (
    <main className="user-log-in">
      <div>
        <GoBackButton />
        <button className="go-to-registration" onClick={() => { navigate("registration"); }}>Registrarme</button>
      </div>

      <form onSubmit={(e) => HandleOnSubmit(e)} className="log-in-form">
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
            <button onClick={(e) => HandleShowPass(e)}>{!showPass ? <Eye /> : <EyeSlash />}</button>
          </div>
        </label>

        <button type="submit" className="submit-log-in-button">Iniciar sesión</button>
      </form>

      <Link to="reset-password">Reiniciar contraseña</Link>
    </main>
  );
}
