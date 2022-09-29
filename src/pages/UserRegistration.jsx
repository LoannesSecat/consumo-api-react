import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "~/assets/icons/Eye";
import EyeSlash from "~/assets/icons/EyeSlash";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import { SignIn } from "~/redux/actions/UserActions";
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
    };

    if (FormValidator(formValues)) {
      if (e.target.nickname.value) {
        formValues = { ...formValues, nickname: e.target.nickname.value };
      }

      const allOk = await SignIn(formValues);

      if (allOk) {
        navigate(-1);
      }
    }
  };

  return (
    <main className="user-registration">
      <GoBackButton />

      <form onSubmit={HandleOnSubmit}>
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

        <button type="submit">Registrarme</button>
      </form>
    </main>
  );
}
