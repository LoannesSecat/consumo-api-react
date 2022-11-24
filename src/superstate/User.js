import { createClient } from "@supabase/supabase-js";
import { ls } from "@superstate/adapters";
import { superstate } from "@superstate/core";
import iziToast from "izitoast";
import supabase from "~/services/supabase";
import ErrorMessage from "~/services/supabase/ErrorMessage.json";
import Parameters from "~/utils/Parameters";

const FAV_TABLE_NAME = "favorites";
const AVATAR_STORAGE_NAME = "avatars";
const { SUPABASE } = Parameters;
const INITIAL_STATE = {
  USER: {},
  TOKEN: {},
  SESSION: false,
  FAVORITES: [],
};

const UserC = {
  state: superstate(INITIAL_STATE)
    .use([ls("MP_USER")])
    .extend({
      avatarPath({ now }) {
        return `${now().USER.id}/${now().USER.id}_avatar.png`;
      },

      async readFavorites({ now, set }) {
        const { data, error } = await supabase
          .from(FAV_TABLE_NAME)
          .select("favorite")
          .match({ user_id: now().USER.id });

        if (error) {
          iziToast.error({ message: error.message });
          return;
        }

        if (data) {
          set((prev) => ({
            ...prev, FAVORITES: data[0]?.favorite ?? data,
          }));
        }
      },

      reset({ set }) {
        set(INITIAL_STATE);
      },

      changeAvatar({ set }, pathAvatar) {
        set((prev) => ({
          ...prev,
          USER: {
            ...prev.USER,
            avatar: pathAvatar,
          },
        }));
      },
    }),

  getUser: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      iziToast.warning({ message: error.message });
      return;
    }

    if (session) {
      const { access_token, refresh_token, user } = session;
      const { data: { publicUrl } } = supabase.storage.from(AVATAR_STORAGE_NAME)
        .getPublicUrl(`${user.id}/${user.id}_avatar.png`);

      UserC.state.set((prev) => ({
        ...prev,
        USER: {
          email: user?.email,
          nickname: user?.user_metadata?.nickname,
          id: user?.id,
          avatar: publicUrl,
        },
        TOKEN: { access_token, refresh_token },
        SESSION: true,
      }));

      await UserC.state.readFavorites();
    }
  },

  logInUser: async ({ email, password, navigate }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      iziToast.warning({
        message: ErrorMessage[error.message],
      });
    }

    if (data.user) {
      navigate("/");
    }
  },

  signInUser: async ({
    email,
    password,
    nickname = "Anónimo",
    navigateTo,
  }) => {
    const { data, error } = await supabase.auth.signUp(
      { email, password },
      { data: { nickname } },
    );

    if (error) {
      iziToast.warning({
        message: ErrorMessage[error.message],
      });
    }

    if (data) {
      iziToast.success({ message: "Te has registrado" });
      navigateTo();
    }
  },

  signOutUser: async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      UserC.state.reset();
      iziToast.success({ message: "Sesión cerrada", timeout: 1500 });
      return;
    }

    if (error) {
      iziToast.warning({ message: ErrorMessage[error.message] });
    }
  },

  updateUser: async ({
    password,
    nickname,
    email,
    navigate,
  }) => {
    let dataUser = {};

    if (password) dataUser = { ...dataUser, password };
    if (nickname) dataUser = { ...dataUser, data: { nickname } };
    if (email) dataUser = { ...dataUser, email };

    const { data, error } = await supabase.auth.updateUser(dataUser);

    if (data) {
      const { user } = data;

      UserC.state.set((prev) => ({
        ...prev,
        USER: {
          ...prev.USER,
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
      .remove([UserC.state.avatarPath()]);

    if (error) {
      iziToast.error({ message: "Ocurrió un error al eliminar la foto" });
      return;
    }

    if (data) {
      UserC.state.changeAvatar(null);
      iziToast.success({ message: "Foto eliminada", timeout: 2000 });
    }
  },

  uploadAvatar: async ({ file }) => {
    const { error, data } = await supabase.storage.from(AVATAR_STORAGE_NAME)
      .upload(UserC.state.avatarPath(), file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file?.type,
      });

    if (error) {
      UserC.state.changeAvatar(null);
      iziToast.error({ message: "Ocurrió un error al guardar la foto" });
      return;
    }

    if (data) {
      UserC.state.changeAvatar(`${SUPABASE.url_storage}${data.Key}`);
      iziToast.success({ message: "Foto guardada", timeout: 2000 });
    }
  },

  manipulateFavorites: async ({ mediaData = {}, type = "" }) => {
    const FAV = UserC.state.now().FAVORITES;
    const { USER } = UserC.state.now();

    if (type === "create") {
      if (FAV.length > 0) {
        const updateRes = await supabase
          .from(FAV_TABLE_NAME)
          .update({ favorite: [...FAV, mediaData] })
          .eq("user_id", USER.id)
          .select();

        if (updateRes.error) {
          iziToast.error({ message: updateRes.error.message });
          return;
        }

        if (updateRes.data) {
          UserC.state.set((prev) => ({
            ...prev, FAVORITES: updateRes.data[0].favorite,
          }));
          iziToast.info({ message: `<b>${mediaData.title}</b> ha sido agregado a favoritos` });
        }
      }

      if (FAV.length === 0) {
        const insertRes = await supabase
          .from(FAV_TABLE_NAME)
          .insert({ favorite: [mediaData], user_id: USER.id })
          .select();

        if (insertRes.error) {
          iziToast.error({ message: insertRes.error.message });
          return;
        }

        if (insertRes.data) {
          UserC.state.set((prev) => ({
            ...prev, FAVORITES: insertRes.data[0].favorite,
          }));
          iziToast.info({ message: `<b>${mediaData.title}</b> ha sido agregado a favoritos` });
        }
      }
    }

    if (type === "delete") {
      const filterData = FAV?.filter((el) => el.id !== mediaData.id);

      const deleteRes = await supabase
        .from(FAV_TABLE_NAME)
        .update({ favorite: filterData })
        .eq("user_id", USER.id)
        .select();

      if (deleteRes.error) {
        iziToast.error({ message: deleteRes.error.message });
        return;
      }

      if (deleteRes.data) {
        UserC.state.set((prev) => ({
          ...prev, FAVORITES: deleteRes.data[0].favorite,
        }));
        iziToast.info({ message: `Eliminaste <b>${mediaData.title}</b> de favoritos` });
      }
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
            const { USER } = UserC.state.now();
            const s = createClient(
              import.meta.env.VITE_SUPABASE_URL,
              import.meta.env.VITE_SSR,
            );

            instance.hide({ transitionOut: "fadeOut" }, toast, "button");

            const { error } = await s.auth.api.deleteUser(USER.id);

            if (error) {
              iziToast.warning({ message: error.message });
              return;
            }

            const deleteRes = await supabase.from("favorites").delete().eq("user_id", USER.id);

            if (deleteRes.error) {
              iziToast.warning({ message: error.message });
              return;
            }

            UserC.signOutUser();
            navigate("/");
            iziToast.success({ message: "Cuenta eliminada exitosamente" });
          },
        ],
        ["<button><b>No</b></button>", (instance, toast) => {
          instance.hide({ transitionOut: "fadeOut" }, toast, "button");
        }],
      ],
    });
  },
};

export default UserC;
