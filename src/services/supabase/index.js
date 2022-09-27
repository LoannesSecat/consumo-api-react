import { createClient } from "@supabase/supabase-js";
import { GetUser } from "~/redux/actions/UserActions";
import Parameters from "~/utils/Parameters";

const { SUPABASE } = Parameters;
const supabase = createClient(SUPABASE.url, SUPABASE.key);

export function onAuthStateChange() {
  return supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
      GetUser();
    }
  });
}

export default supabase;
