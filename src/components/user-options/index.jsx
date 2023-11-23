import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ReactComponent as ChevronUp } from "~/assets/icons/chevron-up.svg";
import { ReactComponent as Cog8Tooth } from "~/assets/icons/cog-8-tooth.svg";
import userSVG from "~/assets/icons/user.svg";
import store from "~/store";
import styles from "./user-options.module.scss";

export default function UserOptions() {
  const { session, user, logOut } = store.user();
  const [location, navigate] = useLocation();
  const [classDropdown, setClassDropdown] = useState(styles.dropdown);
  const BUTTON_SVG = classDropdown === styles.dropdown ? <Cog8Tooth /> : <ChevronUp />;

  const ChangeClass = () => {
    setClassDropdown(classDropdown === styles.dropdown ? `${styles.dropdown} ${styles.active}` : styles.dropdown);
  };

  useEffect(() => {
    document.addEventListener("click", (evt) => {
      evt.stopPropagation();

      const dropdownClicked = evt.composedPath().some(
        (elm) => elm.className === styles.dropdown
          || elm.className === `${styles.dropdown} ${styles.active}`
          || elm.className === styles.dropdown_button,
      );

      if (!dropdownClicked) {
        setClassDropdown(styles.dropdown);
      }
    });
  }, []);

  return (
    <section className={styles.user_options}>
      {Object.keys(session).length
        ?
        (
          <>
            <article className={styles.user_info}>
              <img
                src={""}
                alt="Foto"
                onError={(evt) => {
                  const { target } = evt;
                  target.src = userSVG;
                }}
              />

              <span>{user?.nickname}</span>
            </article>

            <article className={styles.dropdown_options}>
              <button className={styles.dropdown_button} onClick={ChangeClass} type="button">{BUTTON_SVG}</button>

              <div className={classDropdown}>
                <a href="/" onClick={(e) => { e.preventDefault(); navigate("settings"); }}>Ajustes</a>

                {location.includes("favorites")
                  ? null
                  : <a href="/" onClick={(e) => { e.preventDefault(); navigate("favorites"); }}>Favoritos</a>}

                <a
                  href="/"
                  onClick={async (e) => {
                    e.preventDefault();
                    await logOut({ navigate: navigate("/") });
                  }}
                >
                  Cerrar sesión
                </a>
              </div>
            </article>
          </>
        )
        :
        (
          <>
            <button
              className={styles.log_in_button}
              onClick={() => { navigate("login"); }}
              type="button"
            >
              Iniciar sesión
            </button>

            <button
              className={styles.sign_up_button}
              onClick={() => { navigate("registration"); }}
              type="button"
            >
              Registrarme
            </button>
          </>
        )
      }
    </section>
  );
}
