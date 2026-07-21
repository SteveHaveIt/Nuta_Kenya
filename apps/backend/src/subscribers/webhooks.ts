import { type SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function webhookEventHandler({
  event,
  container,
}: SubscriberArgs<{ trigger: string; data: Record<string, unknown> }>) {
  const logger = container.resolve("logger")
  
  logger.info(`Webhook event received: ${event.trigger}`)
  logger.info(`Webhook data: ${JSON.stringify(event.data, null, 2)}`)
}

export const config: SubscriberConfig = {
  event: [
    // Paynector webhook events
    "paynector.payment.pending",
    "paynector.payment.success",
    "paynector.payment.failed",
    "paynector.payment.cancelled",
    
    // M-PESA webhook events  
    "mpesa.payment.pending",
    "mpesa.payment.success",
    "mpesa.payment.failed",
    "mpesa.payment.cancelled",
  ],
}
