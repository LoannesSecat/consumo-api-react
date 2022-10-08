import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChevronUp from "~/assets/icons/ChevronUp";
import Cog8Tooth from "~/assets/icons/Cog8Tooth";
import userSVG from "~/assets/icons/user.svg";
import { SignOutUser } from "~/redux/actions/UserActions";
import "~/utils/styles/UserOptions.scss";

export default function UserOpcions() {
  const USER_DATA = useSelector((e) => e.user.userData);
  const navigate = useNavigate();
  const [classDropdown, setClassDropdown] = useState("dropdown");
  const IS_LOGGED = useSelector((e) => e.user.session);

  const BUTTON_SVG = classDropdown === "dropdown" ? <Cog8Tooth /> : <ChevronUp />;

  const ChangeClass = () => {
    setClassDropdown(classDropdown === "dropdown" ? "dropdown active" : "dropdown");
  };

  useEffect(() => {
    document.addEventListener("click", (evt) => {
      evt.stopPropagation();

      const dropdownClicked = evt
        .composedPath()
        .some((elm) => elm.className === "dropdown"
      || elm.className === "dropdown active"
      || elm.className === "dropdown-button");

      if (!dropdownClicked) {
        setClassDropdown("dropdown");
      }
    });
  }, []);

  return (
    <section className="user-options">
      {IS_LOGGED
        ? (
          <>
            <article className="user-info">
              <img src={USER_DATA.img ? USER_DATA.img : userSVG} alt="Img" />
              <span>{USER_DATA.nickname}</span>
            </article>

            <article className="dropdown-options">
              <button className="dropdown-button" onClick={ChangeClass}>{BUTTON_SVG}</button>
              <div className={classDropdown}>
                <a href="/" onClick={(e) => { e.preventDefault(); }}>Ajustes</a>
                <a href="/" onClick={(e) => { e.preventDefault(); }}>Favoritos</a>
                <a href="/" onClick={(e) => { e.preventDefault(); SignOutUser(); }}>Cerrar sesión</a>
              </div>
            </article>
          </>
        )
        : (
          <>
            <button onClick={() => { navigate("login"); }}>Iniciar sesión</button>
            <button onClick={() => { navigate("registration"); }}>Registrarme</button>
          </>
        )}
    </section>
  );
}
