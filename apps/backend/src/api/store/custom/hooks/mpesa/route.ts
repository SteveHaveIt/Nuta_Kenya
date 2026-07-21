import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { PaymentProviderService } from "@medusajs/medusa"

/**
 * M-PESA STK Callback Handler
 * 
 * Receives payment confirmations from Safaricom M-PESA.
 * Endpoint: POST /api/hooks/mpesa
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const payload = req.body
    
    // Log the callback payload for debugging
    console.log("M-PESA callback received:", JSON.stringify(payload, null, 2))

    // Get the M-PESA payment provider service
    const paymentProviderService: PaymentProviderService = req.scope.resolve(
      Modules.PAYMENT
    )

    // M-PESA sends the callback in Body.stkCallback
    const stkCallback = payload.Body?.stkCallback

    if (!stkCallback) {
      console.log("M-PESA: No stkCallback in payload")
      res.status(200).json({ 
        ResultCode: 0,
        ResultDesc: "Accepted"
      })
      return
    }

    const resultCode = stkCallback.ResultCode
    const checkoutRequestId = stkCallback.CheckoutRequestID
    const merchantRequestId = stkCallback.MerchantRequestID

    // Log the transaction details
    console.log(`M-PESA STK Callback:`, {
      resultCode,
      checkoutRequestId,
      merchantRequestId,
      ResultDesc: stkCallback.ResultDesc
    })

    // Extract transaction details if successful
    if (resultCode === 0 && stkCallback.CallbackMetadata) {
      const metadata = stkCallback.CallbackMetadata.Item || []
      
      const transactionDetails: Record<string, any> = {}
      metadata.forEach((item: { Name: string; Value: number | string }) => {
        transactionDetails[item.Name] = item.Value
      })

      console.log("M-PESA Transaction Details:", transactionDetails)
    }

    // Respond to M-PESA immediately to acknowledge receipt
    // M-PESA expects a quick response
    res.status(200).json({ 
      ResultCode: 0,
      ResultDesc: "Accepted"
    })

    // Note: The actual payment status update is handled by the payment provider's
    // getWebhookActionAndData method which is called by the Payment Module
    // when processing webhook notifications through the internal event system.

  } catch (error) {
    console.error("M-PESA webhook error:", error)
    
    // Return 500 to trigger retry from M-PESA
    // M-PESA will retry failed callbacks multiple times
    res.status(500).json({ 
      ResultCode: 1,
      ResultDesc: "Internal server error"
    })
  }
}

/**
 * Health check endpoint for M-PESA webhook
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  res.status(200).json({ 
    status: "healthy",
    provider: "mpesa",
    webhook: "active"
  })
}
