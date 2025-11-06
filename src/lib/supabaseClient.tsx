import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_DATABASE_PROJECT_URL;
const supabaseKey = import.meta.env.DATABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);