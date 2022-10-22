import userSVG from "~/assets/icons/user.svg";
import supabase from "~/services/supabase";
import ErrorMessage from "~/services/supabase/ErrorMessage.json";
import MyDispatch from "~/utils/MyDispatch";
import MyStore from "~/utils/MyStore";
import MyToast from "~/utils/MyToast";
import Parameters from "~/utils/Parameters";
import UserTypes from "../ActionsCreators/UserTypes";

const USER_DATA = () => MyStore({ reducer: "user", value: "userData" });
const AVATAR_PATH = `${USER_DATA().id}/${USER_DATA().id}_avatar.png`;
const AVATAR_STORAGE_NAME = "avatars";
const { SUPABASE } = Parameters;

export function UpdateAvatarStore(url) {
  MyDispatch({
    type: UserTypes.READ_USER,
    payload: {
      ...USER_DATA(),
      avatar: url || null,
    },
  });
}

export function UpdateSrcSetStore(path) {
  MyDispatch({
    type: UserTypes.READ_USER,
    payload: {
      ...USER_DATA(),
      srcSet: path || "",
    },
  });
}

export async function LogInUser({ email, password, navigateTo }) {
  const { data, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    MyToast.warning({
      message: ErrorMessage[error.message],
    });
  }

  if (data) {
    navigateTo();
  }
}

export async function SignInUser({
  email, password, nickname = "Anónimo", navigateTo,
}) {
  const { data, error } = await supabase.auth.signUp(
    {
      email,
      password,
    },
    {
      data: {
        nickname,
      },
    },
  );

  if (error) {
    MyToast.warning({
      message: ErrorMessage[error.message],
    });
  }

  if (data) {
    MyToast.success({
      message: "Te has registrado",
    });

    navigateTo();
  }
}

export async function SignOutUser() {
  const { error } = await supabase.auth.signOut();

  if (!error) {
    MyDispatch({ type: UserTypes.DELETE_USER });
    MyDispatch({ type: UserTypes.DELETE_TOKEN });

    MyToast.success({
      message: "Sesión cerrada",
      timeout: 1500,
    });
  }

  if (error) {
    MyToast.warning({
      message: ErrorMessage[error.message],
    });
  }
}

export async function GetUser() {
  const SESSION = supabase.auth.session();

  if (SESSION) {
    const GET_USER = await supabase.auth.api.getUser(SESSION?.access_token);
    const { email, user_metadata, id } = GET_USER.user;
    const { access_token, refresh_token } = SESSION;
    const GET_PUBLIC_URL = supabase.storage
      .from(AVATAR_STORAGE_NAME)
      .getPublicUrl(AVATAR_PATH);

    if (GET_USER.error) {
      MyToast.warning({
        message: "Error al cargar datos del usuario",
      });

      return;
    }

    MyDispatch({
      type: UserTypes.READ_USER,
      payload: {
        email,
        nickname: user_metadata.nickname,
        id,
        avatar: GET_PUBLIC_URL.publicURL,
        srcSet: null,
      },
    });

    MyDispatch({
      type: UserTypes.READ_TOKEN,
      payload: { access_token, refresh_token },
    });
  }
}

export async function UpdateUser({
  password,
  nickname,
  email,
  navigateTo,
}) {
  let UPDATE_DATA = {
    ...{ password } ?? {},
    ...{ email } ?? {},
  };

  if (nickname) {
    UPDATE_DATA = {
      ...UPDATE_DATA,
      data: {
        nickname,
      },
    };
  }

  const { data, error } = await supabase.auth.update(UPDATE_DATA);

  if (data) {
    GetUser();
    localStorage.removeItem("EVENT");
    if (navigateTo) { navigateTo(); }
    MyToast.success({ message: "Datos actualizados" });

    return true;
  }

  if (error) {
    MyToast.warning({ message: ErrorMessage[error.message] });

    return false;
  }
}

export async function PreResetPasswordUser({ email, navigateTo }) {
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(
    email,
    { redirectTo: `${location.origin}${location.pathname}` },
  );

  if (data) {
    MyToast.info({
      message: `Se ha enviado un mensaje de confirmación al correo <b>${email}</b>`,
    });
    navigateTo();
  }

  if (error) {
    MyToast.warning({
      message: ErrorMessage[error.message],
    });
  }
}

export function SessionUser(value) {
  MyDispatch({ type: UserTypes.UPDATE_SESSION, payload: value });
}

export async function DeleteAvatar({ deleteType }) {
  const { data, error } = await supabase.storage.from(AVATAR_STORAGE_NAME)
    .remove([AVATAR_PATH]);

  if (error) {
    if (deleteType === "no-alert") {
      console.log(error);
    } else {
      MyToast.error({ message: "Ocurrió un error al eliminar la foto" });
    }
    return;
  }

  if (data) {
    UpdateAvatarStore();
    UpdateSrcSetStore(userSVG);

    if (deleteType === "alert") {
      MyToast.success({ message: "Foto eliminada", timeout: 2000 });
    }
  }
}

export async function UploadAvatar({ file }) {
  await DeleteAvatar({ deleteType: "no-alert" });

  const { error, data } = await supabase.storage.from(AVATAR_STORAGE_NAME)
    .upload(AVATAR_PATH, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file?.type,
    });

  if (error) {
    UpdateAvatarStore();
    MyToast.error({ message: "Ocurrió un error al guardar la foto" });
    return;
  }

  if (data) {
    UpdateAvatarStore(`${SUPABASE.url_storage}${data.Key}`);
    MyToast.success({ message: "Foto guardada", timeout: 2000 });
  }
}
