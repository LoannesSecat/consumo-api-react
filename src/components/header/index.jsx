import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import ChevronUp from "~/icons/chevron-up.svg?react";
import Cog8Tooth from "~/icons/cog-8-tooth.svg?react";
import userSvg from "~/icons/user.svg";
import { isSessionActive, signOut } from "~/services/user-services";
import store from "~/store";
import { $ } from "~/utils/functions";
import styles from "./header.module.scss";

export default function Header({ children, className }) {
  const { user, session } = store.user();
  const [location, navigate] = useLocation();
  const [isUserLogged, setIsUserLogged] = useState(false);

  const newClassName = useMemo(() => {
    return [className, styles.header].join(" ")
  }, [className]);

  useEffect(() => {
    setIsUserLogged(isSessionActive());
  }, [session]);

  return (
    <header className={newClassName}>
      <div className={styles.container}>
        {children}

        {
          isUserLogged && (
            <section className={styles.logged_user_options}>
              <figure className={styles.user_info}>
                <img
                  src={user?.avatar ?? userSvg}
                  alt="Avatar del usuario"
                  onError={(event) => {
                    event.target.src = userSvg;
                  }}
                />

                <figcaption>{user?.user_metadata?.nickname}</figcaption>
              </figure>

              <article className={styles.settings_container}>
                <button
                  popovertarget="options"
                  popovertargetaction="toggle"
                  type="button"
                  className={styles.settings_switch_button}
                  onClick={() => {
                    // Solution for anchor positioning of popover ---
                    const popoverContainer = $(`.${styles.settings_container}`);

                    const params = popoverContainer.getBoundingClientRect();
                    const { x: xAxis, y: yAxis } = params;

                    popoverContainer.style.setProperty("--vertical-axis", `${Math.round(yAxis) + 50}px`);
                    popoverContainer.style.setProperty("--horizontal-axis", `${Math.round(xAxis) - 50}px`);
                    // End ---
                  }}
                >
                  <ChevronUp id={styles.chevron_up} />
                  <Cog8Tooth id={styles.nut} />
                </button>

                <nav className={styles.list_container} popover="" id="options">
                  <ul className={styles.list}>
                    {
                      !location.includes("settings") && (
                        <li>
                          <Link href="/settings">Ajustes</Link>
                        </li>
                      )
                    }

                    {
                      !location.includes("favorites") && (
                        <li>
                          <Link href="/favorites">Favoritos</Link>
                        </li>
                      )
                    }

                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          (async () => {
                            await signOut({ navigate: () => navigate("/") });
                          })();
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </nav>
              </article>
            </section>
          )
        }

        {
          !isUserLogged && (
            <section className={styles.not_logged_user_options}>
              <button
                className={styles.log_in_button}
                onClick={() => { navigate("login"); }}
                type="button"
              >
                Iniciar sesión
              </button>

              <button
                className={styles.sign_up_button}
                onClick={() => { navigate("/signup"); }}
                type="button"
              >
                Registrarme
              </button>
            </section>
          )
        }
      </div>
    </header>
  );
}
