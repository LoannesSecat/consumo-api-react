import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "~/assets/icons/Eye";
import EyeSlash from "~/assets/icons/EyeSlash";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import { LogIn } from "~/redux/actions/UserActions";
import FormValidator from "~/utils/FormValidator";
import "~/utils/styles/UserLogIn.scss";

export default function UserLogIn() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const HandleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();

    const formValues = {
      email: e.target.email.value,
      password: e.target.pass.value,
    };

    if (FormValidator(formValues)) {
      const allOk = await LogIn(formValues);

      if (allOk) {
        navigate(-1);
      }
    }
  };

  return (
    <div className="user-log-in">
      <GoBackButton />

      <form onSubmit={(e) => HandleOnSubmit(e)}>
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

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}
