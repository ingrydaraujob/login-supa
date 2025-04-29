import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjjoxstjdnotffwzfhco.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdqam94c3RqZG5vdGZmd3pmaGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MjA3NzQsImV4cCI6MjA2MDM5Njc3NH0.zc5vRcTQ1Hzj_UPXCJ1FyRL71fVMQAZOWNWjlR1x3gs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
