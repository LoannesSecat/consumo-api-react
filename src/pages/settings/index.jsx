import "cropperjs/dist/cropper.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Cropper } from "react-cropper";
import { useLocation } from "wouter";
import GoBackButton from "~/components/go-back-button";
import userSvg from "~/icons/user.svg";
import XMark from "~/icons/x-mark.svg?react";
import store from "~/store";
import { $ } from "~/utils/functions";
import styles from "./user-settings.module.scss";

export default function UserSettings() {
  const {
    deleteAvatar,
    deleteAccountUser,
    updateUserData,
    uploadAvatar,
    user,
    logOut
  } = store.user();
  const [state, setState] = useState({});
  const [avatarPopover, setAvatarPopover] = useState(null);
  const cropperRef = useRef(null);
  const formRef = useRef(null);
  const [, navigate] = useLocation();

  const handlerOnSubmit = (event) => {
    event.preventDefault();

    const { avatar, ...valueToChange } = state;

    (async () => {
      await updateUserData(valueToChange);

      formRef.current.reset();
    })();
  }

  const handlerOnhange = (event) => {
    const formData = new FormData(event.currentTarget);
    const { avatar, ...values } = Object.fromEntries(formData.entries());
    let newValues = {};

    // Parse state values ---
    for (const index in values) {
      const objValue = values[index].trim();

      if (objValue.length) {
        Object.assign(newValues, { [index]: objValue });
      }
    }
    // ---

    setState({ avatar, ...newValues });
  }

  const srcCropper = useMemo(() => {
    if (state?.avatar?.size) {
      return URL.createObjectURL(state.avatar);
    }
  }, [state.avatar]);

  useEffect(() => {
    setAvatarPopover($("#avatar-popover"));
  }, []);

  const areThereAnyChanges = useMemo(() => {
    const { avatar, ...rest } = state;

    return Boolean(Object.keys(rest).length);
  }, [state]);

  return (
    <main className={styles.user_settings}>
      <header className={styles.user_settings_header}>
        <GoBackButton className={styles.go_back_button} />
        <button
          onClick={() => {
            (async () => { logOut({ navigate: navigate("/") }); })();
          }}
        >
          Cerrar sesión
        </button>
      </header>

      <section className={styles.options_container}>
        <form
          onSubmit={(evt) => { handlerOnSubmit(evt); }}
          className={styles.form}
          onChange={(evt) => { handlerOnhange(evt); }}
          ref={formRef}
        >
          <div>
            <span>Foto</span>

            <picture>
              <img
                src={user.avatar ?? userSvg}
                alt="Foto de perfil"
                onError={(event) => {
                  event.target.src = userSvg;
                }}
                height="200"
                width="200"
              />

              {
                user?.avatar?.length && (
                  <button
                    className={styles.button_delete_avatar}
                    onClick={() => {
                      (async () => {
                        await deleteAvatar();
                      })();
                    }}
                    type="button"
                  >
                    <XMark />
                  </button>
                )
              }

            </picture>

            <label
              htmlFor="avatar-input"
            >
              {user.avatar?.length ? "Cambiar foto" : "Subir foto"}
            </label>

            <input
              type="file"
              name="avatar"
              accept="image/*"
              id="avatar-input"
              hidden
              onChange={(event) => {
                if (event.target.files.length) {
                  avatarPopover.showPopover();
                }
              }}
              onClick={(event) => {
                event.currentTarget.value = null; // Clean the inpt value to allow the "onChange" event works even when the same file is selected
              }}
            />

            <section id="avatar-popover" popover="manual" className={styles.avatar_popover}>
              <section>
                <div className={styles.cropper_container}>
                  <Cropper
                    src={srcCropper}
                    initialAspectRatio={1}
                    guides={false}
                    dragMode="move"
                    responsive
                    restore
                    center
                    minCropBoxWidth={100}
                    minCropBoxHeight={100}
                    minCanvasWidth={200}
                    minCanvasHeight={200}
                    cropBoxResizable={true}
                    className={styles.cropper}
                    ref={cropperRef}
                  />
                </div>

                <span>Puedes acercar, alejar o mover la imagen</span>
              </section>

              <footer>
                <button
                  onClick={() => {
                    avatarPopover.hidePopover();
                  }}
                  className={styles.delete_button}
                  type="button"
                >
                  Volver
                </button>

                <button
                  className={styles.save_button}
                  onClick={() => {
                    const cropperValue = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
                    const { name: nameFile, type: typeFile } = state.avatar;

                    (async () => {
                      const res = await fetch(cropperValue);
                      const blob = await res.blob();
                      const file = new File([blob], nameFile, { type: typeFile });

                      uploadAvatar({ file });
                      avatarPopover.hidePopover();
                    })();
                  }}
                  type="button"
                >
                  Guardar
                </button>
              </footer>
            </section>
          </div>

          <label>
            <span>Nombre de usuario</span>

            <div>
              <span>{user?.user_metadata.nickname}</span>
              <input type="text" name="nickname" autoComplete="given-name" />
            </div>
          </label>

          <label>
            <span>Correo</span>

            <div>
              <span>{user?.email}</span>
              <input type="email" name="email" autoComplete="email" />
            </div>
          </label>

          <label>
            <span>Contraseña</span>
            <input type="password" name="password" autoComplete="current-password" />
          </label>

          <button
            className={styles.delete_account_button}
            onClick={() => {
              deleteAccountUser({ navigate: () => navigate("/") });
            }}
            type="button"
          >
            Eliminar cuenta
          </button>

          {
            areThereAnyChanges && (
              <button
                className={styles.save_changes_button}
                type="submit"
              >
                Guardar cambios
              </button>
            )
          }
        </form>
      </section>
    </main>
  );
}
