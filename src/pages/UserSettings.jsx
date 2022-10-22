import "cropperjs/dist/cropper.css";
import { useEffect, useState } from "react";
import Cropper from "react-cropper";
import { useSelector } from "react-redux";
import userSVG from "~/assets/icons/user.svg";
import { ReactComponent as XMark } from "~/assets/icons/x-mark.svg";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import {
  DeleteAvatar, UpdateAvatarStore, UpdateSrcSetStore, UpdateUser, UploadAvatar,
} from "~/services/UserServices";
import $ from "~/utils/QuerySelector";
import "~/utils/styles/UserSettings.scss";

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

  const LoadAvatar = () => {
    const IMG = new Image();
    IMG.src = USER_DATA.avatar;

    IMG.onerror = () => {
      UpdateAvatarStore();
      UpdateSrcSetStore(userSVG);
    };
  };

  useEffect(() => {
    LoadAvatar();

    setNewData({
      ...newData,
      avatarInputDOM: $(".avatar-file-input"),
      popupDOM: $(".preview-popup"),
      mainDOM: $(".user-settings"),
    });
  }, []);

  const HandlePopUp = () => {
    newData.popupDOM.classList.toggle("active");
    newData.mainDOM.classList.toggle("popup-active");
  };

  const HandleAvatarFile = (evt) => {
    const reader = new FileReader();
    const INPUT_FILE = evt.target.files[0];

    reader.readAsDataURL(INPUT_FILE);
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
  };

  return (
    <>
      <main className="user-settings">
        <GoBackButton />

        <article className="avatar">
          <small className="subtitle">Foto</small>

          <div className="content">
            <div className="avatar-group">
              <img
                className="avatar-image"
                src={USER_DATA?.avatar}
                alt="Foto de perfil"
                srcSet={USER_DATA.srcSet}
              />

              {!USER_DATA?.srcSet
                ? (
                  <button
                    className="button-delete-avatar"
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
              className="save-change-button"
            >
              Cambiar foto
            </button>
          </div>
        </article>

        <article className="nickname">
          <small className="subtitle">Nombre de usuario</small>

          <div className="content">
            <span>{USER_DATA.nickname}</span>
            <input
              type="text"
              onChange={(evt) => setNewData({ ...newData, nickname: evt.target.value.trim() })}
              value={newData.nickname ? newData.nickname : ""}
            />
          </div>
        </article>

        <article className="email">
          <small className="subtitle">Correo</small>

          <div className="content">
            <span>{USER_DATA.email}</span>
            <input
              type="email"
              onChange={(evt) => setNewData({ ...newData, email: evt.target.value.trim() })}
              value={newData.email ? newData.email : ""}
            />
          </div>
        </article>

        <article className="password">
          <small className="subtitle">Contraseña</small>

          <div className="content">
            <span>Nueva contraseña</span>
            <input
              type="text"
              onChange={(evt) => setNewData({ ...newData, password: evt.target.value.trim() })}
              value={newData.password ? newData.password : ""}
            />
          </div>
        </article>

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
              className="save-changes-button"
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
        className="avatar-file-input"
        onChange={(evt) => {
          HandleAvatarFile(evt);
        }}
      />

      <article className="preview-popup">
        <div className="preview-popup-container">
          <div className="preview-avatar-image">
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

          <div className="preview-popup-buttons">
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
              className="preview-delete-button"
            >
              Volver
            </button>

            <button
              className="preview-save-button"
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
