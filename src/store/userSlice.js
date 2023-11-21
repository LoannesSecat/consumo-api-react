import iziToast from "izitoast";
import supabase from "~/services/supabase";
import { SUPABASE } from "~/utils/constants.js";
import { getStore } from "~/utils/functions.js";

const initialState = {
  session: {},
  user: {},
  favoriteMedia: [],
}

let readFavoritesChannel = null;

const userSlice = (set) => ({
  ...initialState,

  isSessionActive: async () => {
    const { data, error } = await supabase.auth.getSession();
    const { session } = data;

    if (error) {
      iziToast.error({ message: "Ha ocurrido un problema al verificar la sesión" });
      return;
    }

    return session && Object.keys(session).length ? true : false;
  },

  saveFavoriteMedia: async (mediaData = {}) => {
    const { favoriteMedia: mediaFav, user } = getStore("user");
    const { name, title } = mediaData;

    if (mediaFav.length) {
      await supabase
        .from("favorites")
        .update({ data: mediaFav.concat(mediaData) })
        .eq("user_id", user.id);
    }

    if (!mediaFav.length) {
      await supabase
        .from("favorites")
        .insert({ data: [mediaData], user_id: user.id });
    }

    iziToast.success({ message: `Se agregó <strong>${title ?? name}</strong> a favoritos` });
  },

  deleteFavoriteMedia: async (mediaId = 0) => {
    const { favoriteMedia, user } = getStore("user");
    const auxData = favoriteMedia.find((elm) => elm.id === mediaId);
    const newFavoriteMedia = favoriteMedia.filter((elm) => elm.id !== Number(mediaId));

    const { error } = await supabase
      .from("favorites")
      .update({ data: newFavoriteMedia })
      .eq("user_id", user.id);

    if (error) {
      iziToast.error({ message: `Ha ocurrido un error al eliminar de favoritos` });
      return;
    }

    const { title, name } = auxData;
    iziToast.info({ message: `Se eliminó <strong>${title ?? name}</strong> de favoritos` });
  },

  readFavorites: () => {
    readFavoritesChannel = supabase
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
    supabase.removeChannel(readFavoritesChannel);
    readFavoritesChannel = null;
  },

  authStateChange: () => {
    supabase.auth.onAuthStateChange((event) => {
      const { readFavorites, stopReadFavorites } = getStore("user");

      if (event === "SIGNED_IN") {
        readFavorites();
      }

      if (event === "SIGNED_OUT") {
        stopReadFavorites();
      }
    });
  },



  avatarPath: () => {
    const { user } = getStore("user");

    return `${user?.id}/${user?.id}_avatar.png`;
  },

  changeAvatar: (pathAvatar) => {
    set((prev) => ({
      ...prev,
      USER: {
        ...prev.USER,
        avatar: pathAvatar,
      },
    }));
  },

  logIn: async ({ email, password, navigate }) => {
    const resLogIn = await supabase.auth.signInWithPassword({ email, password });

    if (resLogIn.error) {
      iziToast.warning({ message: ErrorMessage[error.message] });
      return;
    }

    const { user, session } = resLogIn.data;
    const resFavMedia = await supabase
      .from("favorites")
      .select("data")
      .eq("user_id", user.id);

    if (resFavMedia.error) {
      iziToast.error({ message: "Ha ocurrido un problema al obtener favoritos" });
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
  },

  signInUser: async ({ email, password, nickname = "Anónimo", navigateTo, }) => {
    const { data, error } = await supabase.auth.signUp(
      { email, password },
      { data: { nickname } },
    );

    if (error) {
      iziToast.warning({ message: ErrorMessage[error.message] });
    }

    if (data) {
      iziToast.success({ message: "Te has registrado" });
      navigateTo();
    }
  },

  logOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      iziToast.warning({ message: ErrorMessage[error.message] });
      return;
    }

    set(initialState);
    iziToast.success({ message: "Sesión cerrada", timeout: 1500 });
  },

  updateUser: async ({ password, nickname, email, navigate, }) => {
    let dataUser = {};

    if (password) dataUser = { ...dataUser, password };
    if (nickname) dataUser = { ...dataUser, data: { nickname } };
    if (email) dataUser = { ...dataUser, email };

    const { data, error } = await supabase.auth.updateUser(dataUser);

    if (data) {
      const { user } = data;

      set((prev) => ({
        ...prev,
        session: {
          ...prev.session,
          email: user?.email,
          nickname: user?.user_metadata?.nickname,
        },
      }));

      localStorage.removeItem("EVENT");
      if (navigate) navigate("/");
      iziToast.success({ message: "Datos actualizados" });

      return true;
    }

    if (error) {
      iziToast.warning({ message: ErrorMessage[error.message] });

      return false;
    }
  },

  preResetPasswordUser: async ({ email, navigateTo }) => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email,
      { redirectTo: `${location.origin}${location.pathname}` },
    );

    if (data) {
      iziToast.info({
        message: `Se ha enviado un mensaje de confirmación al correo <b>${email}</b>`,
      });
      navigateTo();
      return;
    }

    if (error) {
      iziToast.warning({ message: ErrorMessage[error.message] });
    }
  },

  deleteAvatar: async () => {
    const { data, error } = await supabase.storage.from(AVATAR_STORAGE_NAME)
      .remove([user.getState().avatarPath()]);

    if (error) {
      iziToast.error({ message: "Ocurrió un error al eliminar la foto" });
      return;
    }

    if (data) {
      user.getState().changeAvatar(null);
      iziToast.success({ message: "Foto eliminada", timeout: 2000 });
    }
  },

  uploadAvatar: async ({ file }) => {
    const { error, data } = await supabase.storage.from(AVATAR_STORAGE_NAME)
      .upload(user.getState().avatarPath(), file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file?.type,
      });

    if (error) {
      user.getState().changeAvatar(null);
      iziToast.error({ message: "Ocurrió un error al guardar la foto" });
      return;
    }

    if (data) {
      user.getState().changeAvatar(`${SUPABASE.url_storage}${data.Key}`);
      iziToast.success({ message: "Foto guardada", timeout: 2000 });
    }
  },

  deleteAccountUser: ({ navigate }) => {
    iziToast.question({
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
              iziToast.warning({ message: error.message });
              return;
            }

            const deleteRes = await supabase.from("favorites").delete().eq("user_id", user.id);

            if (deleteRes.error) {
              iziToast.warning({ message: error.message });
              return;
            }

            user.getState().logOut();
            navigate("/");
            iziToast.success({ message: "Cuenta eliminada exitosamente" });
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