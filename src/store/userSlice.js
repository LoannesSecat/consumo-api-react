import clients from "~/services/clients.js";
import { errorMsg } from "~/utils/constants.js";
import { getStore, useToast } from "~/utils/functions.js";

const initialState = {
  session: {},
  user: {},
  favoriteMedia: [],
};

let readFavoritesChannel = null;
const bucketName = "avatars";

const userSlice = (set) => ({
  ...initialState,

  isSessionActive: async () => {
    const { data, error } = await clients.supabase.auth.getSession();
    const { session } = data;

    if (error) {
      useToast.error({ message: "Ha ocurrido un problema al verificar la sesión" });
      return;
    }

    return !!(session && Object.keys(session).length);
  },

  saveFavoriteMedia: async (mediaData = {}) => {
    useToast.info({ message: "<strong>Cargando...</strong>" });

    const { favoriteMedia: mediaFav, user } = getStore("user");
    const { name, title } = mediaData;
    const userHasFavorites = await clients.supabase.from("favorites").select("data").eq("user_id", user.id);

    if (mediaFav.length && userHasFavorites) {
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

    useToast.success({ message: `Se agregó <strong>"${title ?? name}"</strong> a favoritos` });
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
      useToast.error({ message: "Ha ocurrido un error al eliminar de favoritos" });
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
          set((state) => ({ ...state, favoriteMedia: [] }));
          return;
        }

        set((state) => ({ ...state, favoriteMedia: data }));
      })
      .subscribe();
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

  updateUserData: async (values = {
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
    const resUpdateUser = await clients.supabase.auth.updateUser(valuesToChange);
    const resGetSession = await clients.supabase.auth.getSession();

    if (resUpdateUser.error) {
      const { error } = resUpdateUser;
      useToast.warning({ message: errorMsg[error.message] });
      return false;
    }

    if (resGetSession.error) {
      const { error } = resGetSession;
      useToast.warning({ message: errorMsg[error.message] });
      return false;
    }

    const { user } = resUpdateUser.data;
    const { session } = resGetSession.data;

    set((state) => {
      return {
        ...state, user: { ...state.user, ...user }, session
      };
    });

    if (navigate) navigate();
    useToast.success({ message: "Dato(s) actualizado(s)", timeout: 2000 }, toast);
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
    const { retrievelAvatarUrl } = getStore("user");

    if (resLogIn.error) {
      set((state) => ({
        ...state, isLoading: false, isDone: true, isError: true,
      }));
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
      ...(dbFav ? { favoriteMedia: dbFav } : {}),
    }));

    retrievelAvatarUrl({ path: `${user.id}/avatar` })

    navigate("/");
    useToast.destroy();
  },

  signInUser: async ({
    email, password, nickname = "Anónimo", navigate,
  }) => {
    const { data, error } = await clients.supabase.auth.signUp({
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

    set((state) => {
      const { session, user } = data;

      return { ...state, user, session, }
    });
    useToast.success({ message: "Te has registrado" });
    navigate();
  },

  logOut: async ({ navigate }) => {
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
    const { user } = getStore("user");
    const { data, error } = await clients.supabase.storage.from(bucketName)
      .remove([`${user.id}/avatar`]);

    if (error) {
      useToast.error({ message: "Ocurrió un error al eliminar la foto" });
      return;
    }

    if (data) {
      set((state) => { return { ...state, user: { ...user, avatar: null } } });
      useToast.success({ message: "Foto eliminada", timeout: 2000 });
    }
  },

  uploadAvatar: async ({ file }) => {
    const toast = document.querySelector('.iziToast');
    useToast.info({ message: "<strong>Cargando...</strong>" }, toast);

    const { user, retrievelAvatarUrl } = getStore("user");
    const avatarPath = `${user.id}/avatar`;
    let dataRes = null;
    let message = null;

    const { data, error } = await clients.supabase
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
      const uploadRes = await clients.supabase.storage.from(bucketName)
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
      const updateRes = await clients.supabase
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
  },

  retrievelAvatarUrl: ({ path }) => {
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

    set((state) => { return { ...state, user: { ...user, avatar: parsedUrl } } });
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
            const { user } = getStore("user");
            const auxUserId = user.id;

            // user sign out locally
            const signOutRes = await clients.supabase.auth.signOut();

            if (signOutRes.error) {
              const { error: { message } } = signOutRes;

              useToast.warning({ message: errorMsg[message] });
              return;
            }

            // user deletion
            const { error } = await clients.supabase.rpc('delete_user', { user_id: auxUserId }); // function that delete the user in db

            if (error) {
              useToast.warning({ message: error.message });
              return;
            }

            // user favorite media deletion
            const deleteRes = await clients.supabase.from("favorites").delete().eq("user_id", auxUserId);

            if (deleteRes.error) {
              const { error: { message } } = deleteRes;

              useToast.warning({ message });
              return;
            }

            set(initialState);
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
  },
});

export default userSlice;
