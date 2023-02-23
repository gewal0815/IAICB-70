import { createClient } from '@supabase/supabase-js';

export default (context, inject) => {
  const supabaseUrl = 'https://tthpipuymqkvbpzewjuw.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0aHBpcHV5bXFrdmJwemV3anV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5NzgwNDcsImV4cCI6MTk5MjU1NDA0N30.1qGoCdgV-KOatTKOilvN9BLlW6Tk1TKyyCdk_Q7UXDA';

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  inject('supabase', supabase);

  
};
