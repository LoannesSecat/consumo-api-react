import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userSVG from "~/assets/icons/user.svg";
import { SignOut } from "~/redux/actions/UserActions";
import "~/utils/styles/UserOptions.scss";

export default function UserOpcions() {
  const USER_DATA = useSelector((e) => e.user.userData);
  const navigate = useNavigate();

  return (
    <div className="user-options">
      {Object.keys(USER_DATA)?.length
        ? (
          <>
            <div>
              <img src={USER_DATA.img ? USER_DATA.img : userSVG} alt="Img" />
              <span>{USER_DATA.nickname}</span>
            </div>

            <button onClick={() => SignOut()}>Salir</button>
          </>
        )
        : (
          <>
            <button onClick={() => { navigate("login"); }}>Iniciar sesión</button>
            <button onClick={() => { navigate("registration"); }}>Registrarme</button>
          </>
        )}
    </div>
  );
}
