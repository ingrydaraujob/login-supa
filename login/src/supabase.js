import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xrumhnwulfkoxmvdsroe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhydW1obnd1bGZrb3htdmRzcm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MDIxNDUsImV4cCI6MjA4MTQ3ODE0NX0.22Vuus35325e9yphgqKGI9iSreV9kTYRGScHwHRlWh0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
