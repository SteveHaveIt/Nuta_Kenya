import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Build providers array based on available credentials
const paymentProviders = []

// Always include Paynector if API key is set
if (process.env.PAYNECTOR_API_KEY) {
  paymentProviders.push({
    resolve: "./src/modules/paynector",
    id: "paynector",
    options: {
      api_key: process.env.PAYNECTOR_API_KEY,
      environment: process.env.PAYNECTOR_ENVIRONMENT || "test",
    },
  })
}

// Only include M-PESA if all required credentials are set
if (process.env.MPESA_CONSUMER_KEY && process.env.MPESA_CONSUMER_SECRET && process.env.MPESA_SHORTCODE) {
  paymentProviders.push({
    resolve: "./src/modules/mpesa",
    id: "mpesa",
    options: {
      consumer_key: process.env.MPESA_CONSUMER_KEY,
      consumer_secret: process.env.MPESA_CONSUMER_SECRET,
      shortcode: process.env.MPESA_SHORTCODE,
      passkey: process.env.MPESA_PASSKEY || "",
      environment: process.env.MPESA_ENVIRONMENT || "sandbox",
    },
  })
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: paymentProviders,
      },
    },
  ],
})
