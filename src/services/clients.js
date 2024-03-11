import { createClient } from "@supabase/supabase-js";
import { envVars } from "~/utils/constants";

export default {
  supabase: createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_KEY),
};
