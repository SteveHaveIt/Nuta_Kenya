import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

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
  plugins: [
    {
      resolve: "./src/plugins/payment-providers",
      options: {
        paynector: {
          api_key: process.env.PAYNECTOR_API_KEY,
          environment: process.env.PAYNECTOR_ENVIRONMENT || "test",
        },
        mpesa: {
          consumer_key: process.env.MPESA_CONSUMER_KEY,
          consumer_secret: process.env.MPESA_CONSUMER_SECRET,
          shortcode: process.env.MPESA_SHORTCODE,
          passkey: process.env.MPESA_PASSKEY,
          initiator_name: process.env.MPESA_INITIATOR_NAME,
          security_credential: process.env.MPESA_SECURITY_CREDENTIAL,
          environment: process.env.MPESA_ENVIRONMENT || "sandbox",
          callback_url: process.env.MPESA_CALLBACK_URL,
          timeout_url: process.env.MPESA_TIMEOUT_URL,
          result_url: process.env.MPESA_RESULT_URL,
        },
      },
    },
  ],
})
