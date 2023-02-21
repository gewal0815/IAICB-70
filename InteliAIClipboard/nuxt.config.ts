import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig ({

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '~/server/api/index.js'
    },

    serverMiddleware: [
      '~/server/api/index.js'
    ]
  }


})


