import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

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
    const payload = req.body as Record<string, unknown>
    
    // Log the callback payload for debugging
    console.log("M-PESA callback received:", JSON.stringify(payload, null, 2))

    // M-PESA sends the callback in Body.stkCallback
    const body = payload.Body as Record<string, unknown> | undefined
    const stkCallback = body?.stkCallback as Record<string, unknown> | undefined

    if (!stkCallback) {
      console.log("M-PESA: No stkCallback in payload")
      res.status(200).json({ 
        ResultCode: 0,
        ResultDesc: "Accepted"
      })
      return
    }

    const resultCode = stkCallback.ResultCode as number
    const checkoutRequestId = stkCallback.CheckoutRequestID as string
    const merchantRequestId = stkCallback.MerchantRequestID as string

    // Log the transaction details
    console.log(`M-PESA STK Callback:`, {
      resultCode,
      checkoutRequestId,
      merchantRequestId,
      ResultDesc: stkCallback.ResultDesc
    })

    // Extract transaction details if successful
    if (resultCode === 0 && stkCallback.CallbackMetadata) {
      const callbackMetadata = stkCallback.CallbackMetadata as { Item?: Array<{ Name: string; Value: number | string }> }
      const metadata = callbackMetadata.Item || []
      
      const transactionDetails: Record<string, unknown> = {}
      metadata.forEach((item) => {
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
