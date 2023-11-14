import { createClient } from "@supabase/supabase-js";
import store from "~/store";
import { SUPABASE } from "~/utils/Parameters";

const supabase = createClient(SUPABASE.url, SUPABASE.key);

export function AuthStateChange() {
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      await store.user.getState().getUser()
      localStorage.removeItem("EVENT");
    }

    if (event === "SIGNED_OUT") {
      store.media.getState().searchText()
    }

    if (event === "PASSWORD_RECOVERY") {
      localStorage.setItem("EVENT", event);
    }
  });
}

export default supabase;
