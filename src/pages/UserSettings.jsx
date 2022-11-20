import "cropperjs/dist/cropper.css";
import { useEffect, useState } from "react";
import Cropper from "react-cropper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userSVG from "~/assets/icons/user.svg";
import { ReactComponent as XMark } from "~/assets/icons/x-mark.svg";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import { DeleteAccountUser, DeleteAvatar, UpdateUser, UploadAvatar } from "~/services/UserServices";
import $ from "~/utils/QuerySelector";
import styles from "~/utils/styles/user-settings.module.scss";

const NEW_DATA_STATE = {
  avatar: {
    file: null,
    preview: null,
  },
  avatarInputDOM: null,
  popupDOM: null,
  mainDOM: null,
  nickname: null,
  email: null,
  password: null,
};

export default function UserSettings() {
  const { USER_DATA } = useSelector((e) => e.user);
  const [newData, setNewData] = useState(NEW_DATA_STATE);
  const [cropper, setCropper] = useState();
  const CLEAR_AVATAR = { ...newData, avatar: NEW_DATA_STATE.avatar };
  const CLEAR_NICK = { ...newData, nickname: NEW_DATA_STATE.nickname };
  const CLEAR_PASS = { ...newData, password: NEW_DATA_STATE.password };
  const CLEAR_EMAIL = { ...newData, email: NEW_DATA_STATE.email };
  const navigate = useNavigate();

  useEffect(() => {
    setNewData({
      ...newData,
      avatarInputDOM: $(`.${styles.avatar_file_input}`),
      popupDOM: $(`.${styles.preview_popup}`),
      mainDOM: $(`.${styles.user_settings}`),
    });
  }, []);

  const HandlePopUp = () => {
    newData.popupDOM.classList.toggle(styles.active);
    newData.mainDOM.classList.toggle(styles.popup_active);
  };

  const HandleAvatarFile = (evt) => {
    const reader = new FileReader();
    const INPUT_FILE = evt.target.files[0];

    reader.readAsDataURL(INPUT_FILE);
    if (INPUT_FILE) {
      reader.onload = () => {
        setNewData({
          ...newData,
          avatar: {
            ...newData.avatar,
            file: INPUT_FILE,
            preview: reader.result,
          },
        });
      };

      HandlePopUp();
    }
  };

  return (
    <>
      <main className={styles.user_settings}>
        <GoBackButton className={styles.go_back_button} />

        <section className={styles.form_options}>
          <article className={styles.avatar}>
            <small className={styles.subtitle}>Foto</small>

            <div className={styles.content}>
              <div className={styles.avatar_group}>
                <img
                  className={styles.avatar_image}
                  src={USER_DATA?.avatar}
                  alt="Foto de perfil"
                  onError={(evt) => {
                    const { target } = evt;
                    target.src = userSVG;
                  }}
                />

                {!USER_DATA?.srcSet
                  ? (
                    <button
                      className={styles.button_delete_avatar}
                      title="Eliminar foto"
                      onClick={() => DeleteAvatar({ deleteType: "alert" })}
                    >
                      <XMark />
                    </button>
                  )
                  : null}
              </div>

              <button
                onClick={() => {
                  newData.avatarInputDOM.click();
                }}
                className={styles.save_change_button}
              >
                Cambiar foto
              </button>
            </div>
          </article>

          <article className={styles.nickname}>
            <small className={styles.subtitle}>Nombre de usuario</small>

            <div className={styles.content}>
              <span>{USER_DATA.nickname}</span>
              <input
                type="text"
                onChange={(evt) => setNewData({ ...newData, nickname: evt.target.value.trim() })}
                value={newData.nickname ? newData.nickname : ""}
              />
            </div>
          </article>

          <article className={styles.email}>
            <small className={styles.subtitle}>Correo</small>

            <div className={styles.content}>
              <span>{USER_DATA.email}</span>
              <input
                type="email"
                onChange={(evt) => setNewData({ ...newData, email: evt.target.value.trim() })}
                value={newData.email ? newData.email : ""}
              />
            </div>
          </article>

          <article className={styles.password}>
            <small className={styles.subtitle}>Contraseña</small>

            <div className={styles.content}>
              <span>Nueva contraseña</span>
              <input
                type="text"
                onChange={(evt) => setNewData({ ...newData, password: evt.target.value.trim() })}
                value={newData.password ? newData.password : ""}
              />
            </div>
          </article>

          <button
            className={styles.delete_account_button}
            onClick={() => { DeleteAccountUser({ navigateTo: navigate }); }}
          >
            Eliminar cuenta
          </button>
        </section>

        {
          newData.nickname
            || newData.email
            || newData.password
            ? (
              <button
                onClick={async () => {
                  const res = await UpdateUser({
                    nickname: newData.nickname,
                    email: newData.email,
                    password: newData.password,
                  });

                  if (res) {
                    setNewData({ CLEAR_NICK, CLEAR_EMAIL, CLEAR_PASS });
                  }
                }}
                className={styles.save_changes_button}
              >
                Guardar cambios
              </button>
            )
            : null
        }
      </main>

      <input
        type="file"
        name="avatar"
        accept=".jpg, .jpeg, .png"
        className={styles.avatar_file_input}
        onChange={(evt) => {
          HandleAvatarFile(evt);
        }}
      />

      <article className={styles.preview_popup}>
        <div className={styles.preview_popup_container}>
          <div className={styles.preview_avatar_image}>
            <Cropper
              src={newData?.avatar?.preview}
              initialAspectRatio={1}
              guides={false}
              zoomTo={0.5}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              dragMode="move"
              responsive
              restore
              center
              minCropBoxWidth={150}
              minCropBoxHeight={150}
              minCanvasWidth={150}
              minCanvasHeight={150}
              cropBoxResizable={false}
            />
          </div>
          <small>Puedes acercar, alejar o mover la imagen</small>

          <div className={styles.preview_popup_buttons}>
            <button
              onClick={() => {
                setNewData({
                  ...newData,
                  avatar: {
                    ...newData.avatar,
                    preview: null,
                  },
                });

                HandlePopUp();
                setNewData(CLEAR_AVATAR);
              }}
              className={styles.preview_delete_button}
            >
              Volver
            </button>

            <button
              className={styles.preview_save_button}
              onClick={async () => {
                const IMG_DATA = cropper.getCroppedCanvas().toDataURL();
                const BASE64 = await fetch(IMG_DATA);
                const BLOB = await BASE64.blob();
                const FILE = new File([BLOB], newData.avatar.file.name, {
                  type: newData.avatar.file.type,
                });

                UploadAvatar({ file: FILE });
                HandlePopUp();
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
