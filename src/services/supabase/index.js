import { createClient } from "@supabase/supabase-js";
import { GetUser, SessionUser } from "~/redux/actions/UserActions";
import Parameters from "~/utils/Parameters";

const { SUPABASE } = Parameters;
const supabase = createClient(SUPABASE.url, SUPABASE.key);

export function AuthStateChange() {
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
      SessionUser(event === "SIGNED_IN");
      GetUser();
      localStorage.removeItem("EVENT");
    }

    if (event === "PASSWORD_RECOVERY") {
      localStorage.setItem("EVENT", event);
    }
  });
}

export default supabase;
