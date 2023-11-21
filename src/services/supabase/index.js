import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "~/utils/constants.js";

const supabase = createClient(SUPABASE.url, SUPABASE.key);

export default supabase;
