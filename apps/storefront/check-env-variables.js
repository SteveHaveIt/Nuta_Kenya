const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    description:
      "https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
]

function checkEnvVariables() {
  const missing = requiredEnvs.filter(
    (env) => !process.env[env.key]
  )

  if (missing.length > 0) {
    console.error("\nMissing required environment variables:\n")

    missing.forEach((env) => {
      console.error(`- ${env.key}`)
      if (env.description) {
        console.error(`  ${env.description}`)
      }
    })

    process.exit(1)
  }
}

module.exports = checkEnvVariables
