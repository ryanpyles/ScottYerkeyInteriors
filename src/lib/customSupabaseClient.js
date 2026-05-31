import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ttqxhrxrkewmyyiqaafn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0cXhocnhya2V3bXl5aXFhYWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMzUzNzQsImV4cCI6MjA4NjcxMTM3NH0.3o543e5ECA7HsN8NsoKJplQ3lWACcB3SxYzm7R8_YaM';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
