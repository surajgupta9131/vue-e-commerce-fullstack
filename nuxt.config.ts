// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components:[{
    path:'~/components',
    pathPrefix:false
  }],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt',"@prisma/nuxt", 'nuxt-nodemailer'],
  runtimeConfig:{
    // PRIVATE
    JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    public:{
      // PUBLIC
    }
  },
   nodemailer: {
    from: '"Test-App-Nuxt" <surajgupta.coder@gmail.com>',
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASSWRD,
    },
  },
})