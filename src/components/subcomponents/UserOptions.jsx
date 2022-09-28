import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChevronUp from "~/assets/icons/ChevronUp";
import Cog8Tooth from "~/assets/icons/Cog8Tooth";
import userSVG from "~/assets/icons/user.svg";
import { SignOut } from "~/redux/actions/UserActions";
import "~/utils/styles/UserOptions.scss";

export default function UserOpcions() {
  const USER_DATA = useSelector((e) => e.user.userData);
  const navigate = useNavigate();
  const [classDropdown, setClassDropdown] = useState("dropdown");
  const BUTTON_SVG = classDropdown === "dropdown" ? <Cog8Tooth /> : <ChevronUp />;

  const PreventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div className="user-options">
      {Object.keys(USER_DATA)?.length
        ? (
          <>
            <div className="user-info">
              <img src={USER_DATA.img ? USER_DATA.img : userSVG} alt="Img" />
              <span>{USER_DATA.nickname}</span>
            </div>

            <div className="options-dropdown">
              <button onClick={() => { setClassDropdown(classDropdown === "dropdown" ? "dropdown active" : "dropdown"); }}>{BUTTON_SVG}</button>
              <div className={classDropdown}>
                <a href="/" onClick={(e) => { PreventDefault(e); }}>Ajustes</a>
                <a href="/" onClick={(e) => { PreventDefault(e); }}>Favoritos</a>
                <a href="/" onClick={(e) => { PreventDefault(e); SignOut(); }}>Cerrar sesión</a>
              </div>
            </div>
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
