import store from "~/store";
import { getStore, useToast } from "~/utils/functions";
import clients from "./clients";

const { supabase } = clients;
const { setState, getInitialState } = store.user;
let readFavoritesChannel = null;
const bucketName = "avatars";

// Auxiliary functions
const stopReadFavorites = async () => {
  supabase.removeChannel(readFavoritesChannel);
  readFavoritesChannel = null;
}

const retrievelAvatarUrl = ({ path }) => {
  const { user } = getStore("user");
  const { data } = clients.supabase
    .storage
    .from(bucketName)
    .getPublicUrl(path, {
      transform: {
        format: "webp",
        height: "100",
        width: "100"
      }
    })

  const parsedUrl = data.publicUrl.replace("/render/image", "/object"); // Fix to can see the avatar publicly

  setState((state) => { return { ...state, user: { ...user, avatar: parsedUrl } } });
}

// Services
export const isSessionActive = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    useToast.error({ message: "Ha ocurrido un problema al verificar la sesión" });
    return;
  }

  const { session } = data;
  return (session && Object.keys(session)?.length) ? true : false;
}

export const saveFavoriteMedia = async (mediaData = {}) => {
  useToast.info({ message: "<strong>Cargando...</strong>" });

  const { user } = getStore("user");
  const { name, title } = mediaData;
  const { data } = await supabase.from("favorites").select("favorites_array").eq("user_id", user.id);

  if (data.length) {
    const favorites = data.at(0).favorites_array;

    await supabase
      .from("favorites")
      .update({ favorites_array: favorites.concat(mediaData) })
      .eq("user_id", user.id);
  }

  if (!data.length) {
    await supabase
      .from("favorites")
      .insert({ favorites_array: [mediaData], user_id: user.id });
  }

  useToast.success({ message: `Se agregó <strong>"${title ?? name}"</strong> a favoritos` });
}

export const deleteFavoriteMedia = async (favorite = {}) => {
  useToast.info({ message: "<strong>Cargando...</strong>" });

  const { favoriteMedia, user } = getStore("user");
  const { title, name, id } = favorite;
  const filteredFavorites = favoriteMedia.filter((elm) => elm.id !== Number(id));

  const { error } = await supabase
    .from("favorites")
    .update({ favorites_array: filteredFavorites })
    .eq("user_id", user.id);

  if (error) {
    useToast.error({ message: "Ha ocurrido un error al eliminar de favoritos" });
    return;
  }

  useToast.success({ message: `Se eliminó <strong>${title ?? name}</strong> de favoritos` });
}

export const readFavorites = () => {
  readFavoritesChannel = supabase
    .channel("read_favorites")
    .on("postgres_changes", { event: "*", schema: "public", table: "favorites" }, (payload) => {
      const { new: { favorites_array } } = payload;

      if (!favorites_array) {
        setState((state) => ({ ...state, favoriteMedia: [] }));
        return;
      }

      setState((state) => ({ ...state, favoriteMedia: favorites_array }));
    })
    .subscribe();
}

export const authStateChange = () => {
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      readFavorites();
    }

    if (event === "SIGNED_OUT") {
      stopReadFavorites();
    }
  });
}

export const updateUserData = async (values = {
  password, nickname, email, navigate: () => { },
}) => {
  const toast = document.querySelector('.iziToast');
  useToast.info({ message: "<strong>Cargando...</strong>" }, toast);

  const { navigate, password, nickname, email } = values;
  const valuesToChange = {
    email,
    password,
    data: {
      nickname
    }
  }
  const resUpdateUser = await supabase.auth.updateUser(valuesToChange);

  if (resUpdateUser.error) {
    const { error } = resUpdateUser;
    useToast.warning({ message: errorMsg[error.message] });
    return;
  }

  const { user } = resUpdateUser.data;

  setState((state) => {
    return {
      ...state, user: { ...state.user, ...user }
    };
  });

  if (navigate) {
    navigate();
  }
  useToast.success({ message: "Dato(s) actualizado(s)", timeout: 2000 }, toast);
}

export const requestResetPassword = async ({ email }) => {
  const { error } = await supabase.auth.resetPasswordForEmail(
    email,
    { redirectTo: `${location.origin}/update-password` },
  );

  if (error) {
    useToast.warning({ message: errorMsg[error.message] });
    return;
  }

  useToast.info({
    message: `Se ha enviado un correo de confirmación a <strong>${email}</strong>`,
  });
}

export const signIn = async ({ email, password, navigate }) => {
  useToast.info({ message: "<strong>Cargando...</strong>" });

  const resSignIn = await supabase.auth.signInWithPassword({ email, password });

  if (resSignIn.error) {
    setState((state) => ({ ...state, isLoading: false, isDone: true, isError: true }));
    useToast.warning({ message: errorMsg[resSignIn.error.message] });
    return;
  }

  const { user, session } = resSignIn.data;
  const resFavMedia = await supabase.from("favorites").select("favorites_array").eq("user_id", user.id);

  if (resFavMedia.error) {
    useToast.error({ message: "Ha ocurrido un problema al obtener favoritos" });
    return;
  }

  const favorites = resFavMedia?.data?.at(0)?.favorites_array;

  setState((state) => ({ ...state, session, user, favoriteMedia: favorites ?? [] }));

  retrievelAvatarUrl({ path: `${user.id}/avatar` })

  if (navigate) {
    navigate("/");
  }
  useToast.destroy();
}

export const signUp = async ({
  email, password, nickname = "Anónimo", navigate,
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });

  if (error) {
    useToast.warning({ message: errorMsg[error.message] });
    return;
  }

  setState((state) => {
    const { session, user } = data;

    return { ...state, user, session, };
  });

  if (navigate) {
    navigate();
  }
  useToast.success({ message: "Te has registrado" });
}

export const signOut = async ({ navigate }) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    useToast.warning({ message: errorMsg[error.message] });
    return;
  }

  setState(getInitialState());

  if (navigate) {
    navigate()
  };
  useToast.success({ message: "Sesión cerrada", timeout: 1500 });
}

export const deleteAvatar = async () => {
  const { user } = getStore("user");
  const { error } = await supabase.storage.from(bucketName)
    .remove([`${user.id}/avatar`]);

  if (error) {
    useToast.error({ message: "Ocurrió un error al eliminar la foto" });
    return;
  }

  setState((state) => { return { ...state, user: { ...user, avatar: null } } });
  useToast.success({ message: "Foto eliminada", timeout: 2000 });
}

export const uploadAvatar = async ({ file }) => {
  const toast = document.querySelector('.iziToast');
  useToast.info({ message: "<strong>Cargando...</strong>" }, toast);

  const { user } = getStore("user");
  const avatarPath = `${user.id}/avatar`;
  let dataRes = null;
  let message = null;

  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .list(`${user.id}`, {
      search: "avatar"
    });

  if (error) {
    useToast.error({ message: "Ocurrió un error al guardar la foto" });
    return;
  }

  if (!data.length) {
    const uploadRes = await supabase.storage.from(bucketName)
      .upload(avatarPath, file, {
        upsert: false,
        contentType: file.type,
      });

    if (uploadRes.error) {
      useToast.error({ message: "Ocurrió un error al guardar la foto" });
      return;
    }

    dataRes = uploadRes.data.path;
    message = "Foto guardada";
  }

  if (data.length) {
    const updateRes = await supabase
      .storage
      .from(bucketName)
      .update(avatarPath, file, {
        upsert: false,
        contentType: file.type
      });

    if (updateRes.error) {
      useToast.error({ message: "Ocurrió un error al guardar la foto" });
      return;
    }

    dataRes = updateRes.data.path;
    message = "Foto actualizada";
  }

  retrievelAvatarUrl({ path: dataRes });
  useToast.success({ message, timeout: 2000 }, toast);
}

export const deleteAccountUser = ({ navigate }) => {
  useToast.question({
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
          const { user } = getStore("user");
          const auxUserId = user.id;

          // user sign out locally
          const signOutRes = await supabase.auth.signOut();

          if (signOutRes.error) {
            const { error: { message } } = signOutRes;

            useToast.warning({ message: errorMsg[message] });
            return;
          }

          // user deletion
          const { error } = await supabase.rpc('delete_user', { user_id: auxUserId }); // function that delete the user in db

          if (error) {
            useToast.warning({ message: error.message });
            return;
          }

          // user favorite media deletion
          const deleteRes = await supabase.from("favorites").delete().eq("user_id", auxUserId);

          if (deleteRes.error) {
            const { error: { message } } = deleteRes;

            useToast.warning({ message });
            return;
          }

          setState(getInitialState());
          if (navigate) navigate();
          useToast.success({ message: "Cuenta eliminada exitosamente" });
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");
        },
      ],
      ["<button><b>No</b></button>", (instance, toast) => {
        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
      }],
    ],
  });
}