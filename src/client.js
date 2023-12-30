import { SupabaseClient } from "@supabase/supabase-js";

const supabase = new SupabaseClient(
    'https://txpemvuqgyynqtsyptgn.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cGVtdnVxZ3l5bnF0c3lwdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExOTkxMjMsImV4cCI6MjAxNjc3NTEyM30.WSYqy--KE4P5lKye2gvxEmsOAEeWXIeyP6NylXCpAHg'
    )

export default supabase