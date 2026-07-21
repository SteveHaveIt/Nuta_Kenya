import { type SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function webhookEventHandler({
  event,
  container,
}: SubscriberArgs<{ data: Record<string, unknown> }>) {
  const logger = container.resolve("logger")
  
  logger.info(`Webhook event received: ${event.name}`)
  logger.info(`Webhook data: ${JSON.stringify(event.data, null, 2)}`)
}

export const config: SubscriberConfig = {
  event: ["payment.pending", "payment.authorized", "payment.captured"],
}
