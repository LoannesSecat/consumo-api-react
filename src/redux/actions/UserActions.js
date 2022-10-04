import iziToast from "izitoast";
import supabase from "~/services/Supabase";
import ErrorMessage from "~/services/supabase/ErrorMessage.json";
import MyDispatch from "~/utils/MyDispatch";
import MyStore from "~/utils/MyStore";
import UserTypes from "../ActionsCreators/UserTypes";

export async function LogInUser({ email, password, navigateTo }) {
  const { data, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    iziToast.warning({
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
    iziToast.warning({
      message: ErrorMessage[error.message],
    });
  }

  if (data) {
    iziToast.success({
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

export async function ResetPasswordUser({
  email = undefined, password = undefined, navigateTo,
}) {
  const USER_DATA = MyStore({ reducer: "user", value: "userData" });
  const IN_SESSION = Object.keys(USER_DATA).length;

  const ExecuteNavigate = () => { if (navigateTo) navigateTo(); };

  if (IN_SESSION) {
    const { data, error } = await supabase.auth.update({
      password,
    });

    if (data) {
      iziToast.success({ message: "Contraseña actualizada" });
      ExecuteNavigate();
    }

    if (error) {
      iziToast.warning({ message: error.message });
    }
  }

  if (!IN_SESSION) {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email,
      { redirectTo: location.href },
    );

    if (data) {
      iziToast.info({
        message: `Se ha enviado un mensaje de confirmación al correo <b>${email}</b>`,
      });
      ExecuteNavigate();
    }

    if (error) {
      iziToast.warning({
        message: ErrorMessage[error.message],
      });
    }
  }
}
