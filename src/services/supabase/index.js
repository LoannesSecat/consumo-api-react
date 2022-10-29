import { createClient } from "@supabase/supabase-js";
import Parameters from "~/utils/Parameters";
import { SearchText } from "../ToolServices";
import { GetUser, SessionUser } from "../UserServices";

const { SUPABASE } = Parameters;
const supabase = createClient(SUPABASE.url, SUPABASE.key);

export function AuthStateChange() {
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
      SessionUser(event === "SIGNED_IN");
      await GetUser();
      localStorage.removeItem("EVENT");
    }

    if (event === "SIGNED_OUT") {
      SearchText();
    }

    if (event === "PASSWORD_RECOVERY") {
      localStorage.setItem("EVENT", event);
    }
  });
}

export default supabase;
