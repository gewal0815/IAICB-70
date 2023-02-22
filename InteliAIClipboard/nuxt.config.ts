import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({



    modules: [
        '@nuxtjs/supabase'
      ],
      supabase: {
        url: 'https://tthpipuymqkvbpzewjuw.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0aHBpcHV5bXFrdmJwemV3anV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5NzgwNDcsImV4cCI6MTk5MjU1NDA0N30.1qGoCdgV-KOatTKOilvN9BLlW6Tk1TKyyCdk_Q7UXDA'
      }

 
});
