import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

/**
 * Paynector Webhook Handler
 * 
 * Receives payment status updates from Paynector.
 * Endpoint: POST /api/hooks/paynector
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const payload = req.body as Record<string, unknown>
    
    // Log the webhook payload for debugging
    console.log("Paynector webhook received:", JSON.stringify(payload, null, 2))

    // Extract event type from payload
    const event = payload.event as string
    
    // Get the payment associated data
    const paymentData = payload.data || payload

    switch (event) {
      case "checkout.completed":
      case "payment.success":
        // Payment was successful
        // The Payment Module will handle the status update via the provider's getWebhookActionAndData
        console.log("Paynector payment successful:", paymentData)
        
        // Respond to Paynector to acknowledge receipt
        res.status(200).json({ 
          status: "success",
          message: "Webhook received successfully"
        })
        break

      case "checkout.failed":
      case "payment.failed":
        // Payment failed
        console.log("Paynector payment failed:", paymentData)
        
        res.status(200).json({ 
          status: "success",
          message: "Webhook received successfully"
        })
        break

      case "checkout.cancelled":
        // Payment was cancelled
        console.log("Paynector payment cancelled:", paymentData)
        
        res.status(200).json({ 
          status: "success",
          message: "Webhook received successfully"
        })
        break

      default:
        // Unknown event type
        console.log("Paynector unknown event:", event)
        
        res.status(200).json({ 
          status: "success",
          message: "Webhook received"
        })
    }
  } catch (error) {
    console.error("Paynector webhook error:", error)
    
    // Return 500 to trigger retry from Paynector
    res.status(500).json({ 
      status: "error",
      message: "Internal server error"
    })
  }
}

/**
 * Health check endpoint for Paynector webhook
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  res.status(200).json({ 
    status: "healthy",
    provider: "paynector",
    webhook: "active"
  })
}
