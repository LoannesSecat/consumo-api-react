import { createClient } from "@supabase/supabase-js";
import UserActions from "~/redux/actions/UserActions.json";
import MyDispatch from "~/redux/selectors/MyDispatch";
import MyStore from "~/redux/selectors/MyStore";
import supabase from "~/services/supabase";
import ErrorMessage from "~/services/supabase/ErrorMessage.json";
import MyToast from "~/utils/MyToast";
import Parameters from "~/utils/Parameters";

const USER_DATA = () => MyStore({ reducer: "user", value: "USER_DATA" });
const AVATAR_PATH = `${USER_DATA().id}/${USER_DATA().id}_avatar.png`;
const AVATAR_STORAGE_NAME = "avatars";
const { SUPABASE } = Parameters;

// Auxiliary functions section
export function UpdateAvatarStore(url) {
  MyDispatch({
    type: UserActions.READ_USER,
    payload: {
      ...USER_DATA(),
      avatar: url ?? "",
    },
  });
}

function UpdateFavoritesStore(array) {
  MyDispatch({
    type: UserActions.READ_FAVORITES,
    payload: array,
  });
}

export async function ReadFavorites({ table, userId } = {}) {
  const { data, error } = await supabase
    .from(table)
    .select("favorite")
    .match({ user_id: userId ?? USER_DATA().id });

  if (error) {
    MyToast.error({ message: error.message });
    return;
  }
  if (data) { UpdateFavoritesStore(data[0]?.favorite ?? data); }
}

// Primordial function section
export async function LogInUser({ email, password, navigate }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    MyToast.warning({
      message: ErrorMessage[error.message],
    });
  }

  if (data.user) {
    navigate("/");
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
    MyDispatch({ type: UserActions.DELETE_FAVORITES });
    MyDispatch({ type: UserActions.DELETE_USER });
    MyDispatch({ type: UserActions.DELETE_TOKEN });

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
  const { data: session, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    MyToast.warning({ message: sessionError.message });
    return;
  }

  if (session) {
    const {
      data: { user },
      error: errorGetUser,
    } = await supabase.auth.getUser(session?.access_token);

    const { access_token, refresh_token } = session;
    const { publicURL } = supabase.storage.from(AVATAR_STORAGE_NAME)
      .getPublicUrl(`${user.id}/${user.id}_avatar.png`);

    if (errorGetUser) {
      MyToast.warning({ message: "Error al cargar datos del usuario" });
      return;
    }
    await ReadFavorites({ table: "favorites", userId: user.id });
    MyDispatch({
      type: UserActions.READ_USER,
      payload: {
        email: user?.email,
        nickname: user?.user_metadata.nickname,
        id: user?.id,
        avatar: publicURL,
      },
    });

    MyDispatch({
      type: UserActions.READ_TOKEN,
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
  let UPDATE_DATA = {};

  if (password) UPDATE_DATA = { ...UPDATE_DATA, password };
  if (nickname) UPDATE_DATA = { ...UPDATE_DATA, data: { nickname } };
  if (email) UPDATE_DATA = { ...UPDATE_DATA, email };

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
  MyDispatch({ type: UserActions.UPDATE_SESSION, payload: value });
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

export async function ManipulateFavorites({ mediaData = {}, type = "" }) {
  const TABLE = "favorites";
  const FAVORITES = MyStore({ reducer: "user", value: "FAVORITES" });

  if (type === "create") {
    if (FAVORITES.length > 0) {
      const updateRes = await supabase
        .from(TABLE)
        .update({ favorite: [...FAVORITES, mediaData] })
        .eq("user_id", USER_DATA().id);

      if (updateRes.error) {
        MyToast.error({ message: updateRes.error.message });
        return;
      }

      if (updateRes.data) {
        UpdateFavoritesStore(updateRes.data[0].favorite);
        MyToast.info({ message: `<b>${mediaData.title}</b> ha sido agregado a favoritos` });
      }
    }

    if (FAVORITES.length === 0) {
      const insertRes = await supabase
        .from(TABLE)
        .insert({ favorite: [mediaData], user_id: USER_DATA().id });

      if (insertRes.error) {
        MyToast.error({ message: insertRes.error.message });
        return;
      }

      if (insertRes.data) {
        UpdateFavoritesStore(insertRes.data[0].favorite);
        MyToast.info({ message: `<b>${mediaData.title}</b> ha sido agregado a favoritos` });
      }
    }
  }

  if (type === "delete") {
    const filterData = FAVORITES?.filter((el) => el.id !== mediaData.id);

    const deleteRes = await supabase
      .from(TABLE)
      .update({ favorite: filterData })
      .eq("user_id", USER_DATA().id);

    if (deleteRes.error) {
      MyToast.error({ message: deleteRes.error.message });
      return;
    }

    if (deleteRes.data) {
      UpdateFavoritesStore(deleteRes.data[0].favorite);
      MyToast.info({ message: `Eliminaste <b>${mediaData.title}</b> de favoritos` });
    }
  }
}

export function DeleteAccountUser({ navigateTo }) {
  MyToast.question({
    timeout: false,
    close: true,
    overlay: true,
    displayMode: "once",
    id: "question",
    message: "¿Estás seguro que quieres eliminar tu cuenta?, esta acción no es irreversible",
    position: "center",
    closeOnEscape: true,
    overlayClose: true,
    buttons: [
      [
        "<button><b>Si</b></button>", async (instance, toast) => {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");

          const supa = createClient(
            import.meta.env.VITE_SUPABASE_URL,
            import.meta.env.VITE_SSR,
          );

          const { error } = await supa.auth.api.deleteUser(USER_DATA().id);

          if (error) {
            MyToast.warning({ message: error.message });
            return;
          }

          const deleteRes = await supabase.from("favorites").delete().eq("user_id", USER_DATA().id);

          if (deleteRes.error) {
            MyToast.warning({ message: error.message });
            return;
          }

          SignOutUser();
          navigateTo("/");
          MyToast.success({ message: "Cuenta eliminada exitosamente" });
        },
      ],
      ["<button><b>No</b></button>", (instance, toast) => {
        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
      }],
    ],
  });
}
