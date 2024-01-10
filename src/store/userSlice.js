import clients from "~/services/clients.js";
import { SUPABASE, errorMsg } from "~/utils/constants.js";
import { getStore, useToast } from "~/utils/functions.js";

const initialState = {
  session: {},
  user: {},
  favoriteMedia: [],
}

let readFavoritesChannel = null;

const userSlice = (set) => ({
  ...initialState,

  isSessionActive: async () => {
    const { data, error } = await clients.supabase.auth.getSession();
    const { session } = data;

    if (error) {
      useToast.error({ message: "Ha ocurrido un problema al verificar la sesión" });
      return;
    }

    return session && Object.keys(session).length ? true : false;
  },

  saveFavoriteMedia: async (mediaData = {}) => {
    useToast.info({ message: "<strong>Cargando...</strong>" });

    const { favoriteMedia: mediaFav, user } = getStore("user");
    const { name, title } = mediaData;

    if (mediaFav.length) {
      await clients.supabase
        .from("favorites")
        .update({ data: mediaFav.concat(mediaData) })
        .eq("user_id", user.id);
    }

    if (!mediaFav.length) {
      await clients.supabase
        .from("favorites")
        .insert({ data: [mediaData], user_id: user.id });
    }

    useToast.success({ message: `Se agregó <strong>${title ?? name}</strong> a favoritos` });
  },

  deleteFavoriteMedia: async (mediaId = 0) => {
    const { favoriteMedia, user } = getStore("user");
    const auxData = favoriteMedia.find((elm) => elm.id === mediaId);
    const newFavoriteMedia = favoriteMedia.filter((elm) => elm.id !== Number(mediaId));

    const { error } = await clients.supabase
      .from("favorites")
      .update({ data: newFavoriteMedia })
      .eq("user_id", user.id);

    if (error) {
      useToast.error({ message: `Ha ocurrido un error al eliminar de favoritos` });
      return;
    }

    const { title, name } = auxData;
    useToast.info({ message: `Se eliminó <strong>${title ?? name}</strong> de favoritos` });
  },

  readFavorites: () => {
    readFavoritesChannel = clients.supabase
      .channel("read_favorites")
      .on("postgres_changes", { event: "*", schema: "public", table: "favorites" }, (payload) => {
        const { new: { data } } = payload;

        if (!data) {
          set((state) => ({ ...state, favoriteMedia: [] }))
          return;
        }

        set((state) => ({ ...state, favoriteMedia: data }))
      })
      .subscribe()
  },

  stopReadFavorites: async () => {
    clients.supabase.removeChannel(readFavoritesChannel);
    readFavoritesChannel = null;
  },

  authStateChange: () => {
    clients.supabase.auth.onAuthStateChange((event) => {
      const { readFavorites, stopReadFavorites } = getStore("user");

      if (event === "SIGNED_IN") {
        readFavorites();
      }

      if (event === "SIGNED_OUT") {
        stopReadFavorites();
      }
    });
  },

  updateUserData: async (values = { password, nickname, email, navigate: () => { } }) => {
    const { navigate, ...valuesToChange } = values;
    const resUpdateUser = await clients.supabase.auth.updateUser(valuesToChange);
    const resGetSession = await clients.supabase.auth.getSession();

    if (resUpdateUser.error) {
      const { error } = resUpdateUser;
      useToast.warning({ message: errorMsg[error.message] });
      return;
    }

    if (resGetSession.error) {
      const { error } = resGetSession;
      useToast.warning({ message: errorMsg[error.message] });
      return;
    }

    const { user } = resUpdateUser.data;
    const { session } = resGetSession.data;

    set((state) => ({ ...state, user, session }));

    if (navigate) navigate();
    useToast.success({ message: "Datos actualizados" });
  },

  requestResetPassword: async ({ email }) => {
    const { error } = await clients.supabase.auth.resetPasswordForEmail(
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
  },



  avatarPath: () => {
    const { user } = getStore("user");

    return `${user?.id}/${user?.id}_avatar.png`;
  },

  changeAvatar: (pathAvatar) => {
    set((prev) => ({
      ...prev,
      user: {
        ...prev.USER,
        avatar: pathAvatar,
      },
    }));
  },

  logIn: async ({ email, password, navigate }) => {
    useToast.info({ message: "<strong>Cargando...</strong>" });

    const resLogIn = await clients.supabase.auth.signInWithPassword({ email, password });

    if (resLogIn.error) {
      set((state) => ({ ...state, isLoading: false, isDone: true, isError: true }));
      useToast.warning({ message: errorMsg[resLogIn.error.message] });
      return;
    }

    const { user, session } = resLogIn.data;
    const resFavMedia = await clients.supabase
      .from("favorites")
      .select("data")
      .eq("user_id", user.id);

    if (resFavMedia.error) {
      useToast.error({ message: "Ha ocurrido un problema al obtener favoritos" });
      return;
    }

    const dbFav = resFavMedia?.data?.at(0)?.data;

    set((state) => ({
      ...state,
      session,
      user,
      ...(dbFav ? { favoriteMedia: dbFav } : {})
    }));

    navigate("/");
    useToast.destroy();
  },

  signInUser: async ({ email, password, nickname = "Anónimo", navigateTo, }) => {
    const { data, error } = await clients.supabase.auth.signUp(
      { email, password },
      { data: { nickname } },
    );

    if (error) {
      useToast.warning({ message: errorMsg[error.message] });
    }

    if (data) {
      useToast.success({ message: "Te has registrado" });
      navigateTo();
    }
  },

  logOut: async ({ navigate }) => {
    useToast.info({ message: "<strong>Cargando...</strong>" });

    const { error } = await clients.supabase.auth.signOut();

    if (error) {
      useToast.warning({ message: errorMsg[error.message] });
      return;
    }

    set(initialState);
    if (navigate) navigate();
    useToast.success({ message: "Sesión cerrada", timeout: 1500 });
  },

  deleteAvatar: async () => {
    const { data, error } = await clients.supabase.storage.from(AVATAR_STORAGE_NAME)
      .remove([user.getState().avatarPath()]);

    if (error) {
      useToast.error({ message: "Ocurrió un error al eliminar la foto" });
      return;
    }

    if (data) {
      user.getState().changeAvatar(null);
      useToast.success({ message: "Foto eliminada", timeout: 2000 });
    }
  },

  uploadAvatar: async ({ file }) => {
    const { error, data } = await clients.supabase.storage.from(AVATAR_STORAGE_NAME)
      .upload(user.getState().avatarPath(), file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file?.type,
      });

    if (error) {
      user.getState().changeAvatar(null);
      useToast.error({ message: "Ocurrió un error al guardar la foto" });
      return;
    }

    if (data) {
      user.getState().changeAvatar(`${SUPABASE.url_storage}${data.Key}`);
      useToast.success({ message: "Foto guardada", timeout: 2000 });
    }
  },

  deleteAccountUser: ({ navigate }) => {
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
            const { user } = user.getState();
            const s = createClient(
              import.meta.env.VITE_SUPABASE_URL,
              import.meta.env.VITE_SSR,
            );

            instance.hide({ transitionOut: "fadeOut" }, toast, "button");

            const { error } = await s.auth.api.deleteUser(user.id);

            if (error) {
              useToast.warning({ message: error.message });
              return;
            }

            const deleteRes = await clients.supabase.from("favorites").delete().eq("user_id", user.id);

            if (deleteRes.error) {
              const { error: { message } } = deleteRes;

              useToast.warning({ message });
              return;
            }

            user.getState().logOut();
            navigate("/");
            useToast.success({ message: "Cuenta eliminada exitosamente" });
          },
        ],
        ["<button><b>No</b></button>", (instance, toast) => {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");
        }],
      ],
    });
  }
})

export default userSlice