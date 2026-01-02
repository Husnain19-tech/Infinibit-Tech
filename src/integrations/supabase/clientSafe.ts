// Client wrapper that keeps the app running even if Vite env injection fails.
// NOTE: This uses only PUBLIC values (project URL + publishable/anon key).
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const FALLBACK_PROJECT_ID = "cvnqtpkziixlerhaukiy";
const FALLBACK_URL = `https://${FALLBACK_PROJECT_ID}.supabase.co`;
// Public (anon/publishable) key - safe to ship in frontend.
const FALLBACK_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bnF0cGt6aWl4bGVyaGF1a2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3ODc2MjIsImV4cCI6MjA4MTM2MzYyMn0.P81xHZE1TciKFKu7N6PZlsXLCRy2WJdZYK56oFQilYk";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ??
  (import.meta.env.VITE_SUPABASE_PROJECT_ID
    ? `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`
    : FALLBACK_URL);

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? FALLBACK_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
