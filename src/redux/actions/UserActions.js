import iziToast from "izitoast";
import supabase from "~/services/Supabase";
import ErrorMessage from "~/services/supabase/ErrorMessage.json";
import MyDispatch from "~/utils/MyDispatch";
import UserTypes from "../ActionsCreators/UserTypes";

export async function LogIn({ email, password }) {
  const { error } = await supabase.auth.signIn(
    {
      email,
      password,
    },
  );

  if (error) {
    iziToast.warning({
      message: ErrorMessage[error.message],
    });

    return false;
  }

  return true;
}

export async function SignIn({ email, password, nickname = "Anónimo" }) {
  const { error } = await supabase.auth.signUp(
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
    iziToast.warning({
      message: ErrorMessage[error.message],
    });

    return false;
  }

  iziToast.info({
    message: `Se ha enviado un correo de verificación a <b>${email}</b>`,
  });

  return true;
}

export async function SignOut() {
  const { error } = await supabase.auth.signOut();

  if (!error) {
    MyDispatch({ type: UserTypes.DELETE_USER });
    MyDispatch({ type: UserTypes.DELETE_TOKEN });

    iziToast.success({
      message: "Sesión cerrada",
      timeout: 1500,
    });
  }

  if (error) {
    iziToast.warning({
      message: ErrorMessage[error.message],
    });
  }
}

export async function GetUser() {
  const SESSION = supabase.auth.session();

  if (SESSION) {
    const { user, error } = await supabase.auth.api.getUser(SESSION.access_token);
    const { email, user_metadata } = user;
    const { access_token, refresh_token } = SESSION;

    if (error) {
      iziToast.warning({
        message: "Error al cargar datos del usuario",
      });
    }

    MyDispatch({
      type: UserTypes.READ_USER,
      payload: { email, nickname: user_metadata.nickname },
    });

    MyDispatch({
      type: UserTypes.READ_TOKEN,
      payload: { access_token, refresh_token },
    });
  }
}
