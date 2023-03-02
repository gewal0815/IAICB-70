import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({

  
    plugins: [
        { src: '~/plugins/supabase.js', ssr: false }
      ],

    modules: [
       "@nuxtjs/supabase"
      ],


 
});


