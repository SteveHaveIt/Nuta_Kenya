import {
  AbstractPaymentProvider,
  MedusaError,
} from "@medusajs/framework/utils"
import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
} from "@medusajs/framework/types"
import { PaymentActions } from "@medusajs/framework/types"

// Type definitions for webhook handling
type WebhookInput = {
  data: Record<string, unknown>
  rawData: string | Buffer<ArrayBufferLike>
  headers: Record<string, unknown>
}

type WebhookResult = {
  action: PaymentActions
  data: {
    session_id: string
    amount: number
  }
}

export type PaynectorOptions = {
  api_key: string
  environment: "live" | "test"
}

class PaynectorService extends AbstractPaymentProvider<PaynectorOptions> {
  static identifier = "paynector"

  protected options_: PaynectorOptions

  constructor(container: any, options: PaynectorOptions) {
    super(container, options)
    this.options_ = options
  }

  protected getApiBaseUrl(): string {
    return this.options_.environment === "live"
      ? "https://api.paynector.com"
      : "https://sandbox.paynector.com"
  }

  protected getHeaders(): Record<string, string> {
    return {
      "Authorization": `Bearer ${this.options_.api_key}`,
      "Content-Type": "application/json",
    }
  }

  static validateOptions(options: Record<string, unknown>): void {
    if (!options.api_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "API key is required in the provider's options."
      )
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const { amount, currency_code } = input

    const numericAmount = typeof amount === "object" && "numeric" in amount 
      ? amount.numeric 
      : typeof amount === "object" && "value" in amount 
        ? amount.value 
        : amount

    const payload = {
      amount: numericAmount,
      currency: currency_code?.toUpperCase() || "KES",
      description: `Order payment - ${currency_code}`,
      callback_url: `${process.env.BASE_URL}/api/hooks/paynector`,
      reference: `ORDER-${Date.now()}`,
    }

    try {
      const response = await fetch(`${this.getApiBaseUrl()}/v1/checkout`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new MedusaError(
          MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
          `Paynector API error: ${error}`
        )
      }

      const data = await response.json()

      return {
        id: data.id || `paynector_${Date.now()}`,
        data: {
          checkout_url: data.checkout_url,
          amount: payload.amount,
          currency: payload.currency,
          reference: payload.reference,
          session_id: data.id,
          ...data,
        },
      }
    } catch (error) {
      console.error("Paynector initiatePayment error:", error)
      throw new MedusaError(
        MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
        error instanceof Error ? error.message : "Failed to create Paynector payment session"
      )
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    const checkoutUrl = input.data?.checkout_url as string | undefined

    if (checkoutUrl) {
      return {
        data: {
          ...input.data,
          status: "pending_authorization",
          checkout_url: checkoutUrl,
        },
        status: "pending_authorization",
      }
    }

    return {
      data: input.data,
      status: "authorized",
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    return {
      data: {
        ...input.data,
        status: "captured",
      },
    }
  }

  async cancelPayment(
    input: CancelPaymentInput
  ): Promise<CancelPaymentOutput> {
    try {
      const sessionId = input.data?.session_id as string

      if (sessionId) {
        await fetch(`${this.getApiBaseUrl()}/v1/checkout/${sessionId}/cancel`, {
          method: "POST",
          headers: this.getHeaders(),
        })
      }
    } catch (error) {
      console.error("Paynector cancelPayment error:", error)
    }

    return {
      data: {
        ...input.data,
        status: "cancelled",
      },
    }
  }

  async refundPayment(
    input: RefundPaymentInput
  ): Promise<RefundPaymentOutput> {
    try {
      const sessionId = input.data?.session_id as string

      if (sessionId) {
        await fetch(`${this.getApiBaseUrl()}/v1/refund`, {
          method: "POST",
          headers: this.getHeaders(),
          body: JSON.stringify({
            transaction_id: sessionId,
            amount: input.amount,
            reason: "Customer refund",
          }),
        })
      }
    } catch (error) {
      console.error("Paynector refundPayment error:", error)
    }

    return {
      data: {
        ...input.data,
        refunded_amount: input.amount,
      },
    }
  }

  async deletePayment(
    input: DeletePaymentInput
  ): Promise<DeletePaymentOutput> {
    await this.cancelPayment(input)
    return { data: input.data }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    const sessionId = input.data?.session_id as string

    if (!sessionId) {
      return input.data || {}
    }

    try {
      const response = await fetch(
        `${this.getApiBaseUrl()}/v1/checkout/${sessionId}`,
        {
          method: "GET",
          headers: this.getHeaders(),
        }
      )

      if (response.ok) {
        const data = await response.json()
        return {
          ...input.data,
          ...data,
        }
      }
    } catch (error) {
      console.error("Paynector retrievePayment error:", error)
    }

    return input.data || {}
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return { data: input.data }
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const sessionId = input.data?.session_id as string | undefined
    
    if (!sessionId) {
      return {
        status: "pending",
        data: input.data || {},
      }
    }

    return {
      status: "pending",
      data: input.data || {},
    }
  }

  async getWebhookActionAndData(
    input: WebhookInput
  ): Promise<WebhookResult> {
    const rawPayload = input.rawData
    const body = (typeof rawPayload === "string" ? JSON.parse(rawPayload) : {}) as Record<string, unknown>
    const event = body.event as string

    switch (event) {
      case "checkout.completed":
      case "payment.success":
        return {
          action: "authorized",
          data: {
            session_id: body.id as string || "",
            amount: body.amount as number || 0,
          },
        }
      case "checkout.failed":
      case "payment.failed":
        return {
          action: "failed",
          data: {
            session_id: body.id as string || "",
            amount: body.amount as number || 0,
          },
        }
      default:
        return {
          action: "not_supported",
          data: {
            session_id: "",
            amount: 0,
          },
        }
    }
  }
}

export default PaynectorService
