const SUPABASE_URL = 'https://lkvmhziesvcbocnahltn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrdm1oemllc3ZjYm9jbmFobHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3ODkyNzAsImV4cCI6MjA5NzM2NTI3MH0.3oCjyUUTIVhTaGNgYPSzAii7ThzfvEDNmn2As7-IEi0';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
