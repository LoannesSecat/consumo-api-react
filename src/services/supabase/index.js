import { createClient } from "@supabase/supabase-js";
import ToolC from "~/superstate/Tool";
import UserC from "~/superstate/User";
import Parameters from "~/utils/Parameters";

const { SUPABASE } = Parameters;
const supabase = createClient(SUPABASE.url, SUPABASE.key);
const { searchText } = ToolC;

export function AuthStateChange() {
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      await UserC.getUser();
      localStorage.removeItem("EVENT");
    }

    if (event === "SIGNED_OUT") {
      searchText();
    }

    if (event === "PASSWORD_RECOVERY") {
      localStorage.setItem("EVENT", event);
    }
  });
}

export default supabase;
