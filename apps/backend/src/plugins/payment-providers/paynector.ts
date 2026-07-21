import {
  AbstractPaymentProvider,
  BigNumber,
  GenerateInstrumentOptions,
  PaymentContext,
  PaymentSessionStatus,
  ProviderWebhookPayload,
  WebhookActionDetails,
} from "@medusajs/framework/utils"
import { MedusaError } from "@medusajs/framework"
import { Context } from "@medusajs/framework/types"

type PaynectorOptions = {
  api_key: string
  environment: "live" | "test"
}

export class PaynectorService extends AbstractPaymentProvider<PaynectorOptions> {
  static readonly TAX_INCLUSIVE = false
  protected options_: PaynectorOptions

  constructor(container: Context, options: PaynectorOptions) {
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

  async getStatus(paymentSessionData: Record<string, unknown>): Promise<PaymentSessionStatus> {
    const status = paymentSessionData.status as string

    switch (status) {
      case "pending":
        return PaymentSessionStatus.PENDING
      case "completed":
      case "successful":
        return PaymentSessionStatus.AUTHORIZED
      case "failed":
      case "cancelled":
        return PaymentSessionStatus.CANCELED
      case "expired":
        return PaymentSessionStatus.EXPIRED
      default:
        return PaymentSessionStatus.PENDING
    }
  }

  async createPaymentSession(
    context: PaymentContext
  ): Promise<Record<string, unknown>> {
    const { amount, currency_code, customer } = context

    const numericAmount = amount instanceof BigNumber ? amount : new BigNumber(amount)

    const payload = {
      amount: numericAmount.toNumeric(),
      currency: currency_code?.toUpperCase() || "KES",
      email: customer?.email,
      phone: customer?.metadata?.phone as string || "",
      description: `Order payment - ${currency_code}`,
      callback_url: `${process.env.BASE_URL}/api/hooks/paynector`,
      reference: `ORDER-${Date.now()}`,
      metadata: {
        customer_id: customer?.id,
      },
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
          MedusaError.Types.PAYMENT_CONNECTION_ERROR,
          `Paynector API error: ${error}`
        )
      }

      const data = await response.json()

      return {
        id: data.id || `paynector_${Date.now()}`,
        status: "pending",
        checkout_url: data.checkout_url,
        amount: payload.amount,
        currency: payload.currency,
        reference: payload.reference,
        session_id: data.id,
        ...data,
      }
    } catch (error) {
      console.error("Paynector createPaymentSession error:", error)
      throw new MedusaError(
        MedusaError.Types.PAYMENT_CONNECTION_ERROR,
        error instanceof Error ? error.message : "Failed to create Paynector payment session"
      )
    }
  }

  async updatePaymentSession(
    paymentSessionData: Record<string, unknown>,
    context: PaymentContext
  ): Promise<Record<string, unknown>> {
    const { amount, customer } = context

    const numericAmount = amount instanceof BigNumber ? amount : new BigNumber(amount)

    return {
      ...paymentSessionData,
      amount: numericAmount.toNumeric(),
      customer_email: customer?.email,
    }
  }

  async authorizePaymentSession(
    paymentSessionData: Record<string, unknown>,
    context: PaymentContext
  ): Promise<{ status: PaymentSessionStatus; data: Record<string, unknown> }> {
    const status = await this.getStatus(paymentSessionData)

    if (status === PaymentSessionStatus.PENDING) {
      return {
        status,
        data: {
          ...paymentSessionData,
          status: "pending",
        },
      }
    }

    if (status === PaymentSessionStatus.AUTHORIZED) {
      return {
        status,
        data: {
          ...paymentSessionData,
          status: "authorized",
        },
      }
    }

    return {
      status,
      data: paymentSessionData,
    }
  }

  async cancelPaymentSession(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    try {
      const sessionId = paymentSessionData.session_id as string

      if (sessionId) {
        await fetch(`${this.getApiBaseUrl()}/v1/checkout/${sessionId}/cancel`, {
          method: "POST",
          headers: this.getHeaders(),
        })
      }

      return {
        ...paymentSessionData,
        status: "cancelled",
      }
    } catch (error) {
      console.error("Paynector cancelPaymentSession error:", error)
      return {
        ...paymentSessionData,
        status: "cancelled",
      }
    }
  }

  async capturePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const status = await this.getStatus(paymentSessionData)

    if (status === PaymentSessionStatus.AUTHORIZED) {
      return {
        ...paymentSessionData,
        status: "captured",
      }
    }

    throw new MedusaError(
      MedusaError.Types.PAYMENT_ACTION_REQUIRED,
      "Payment capture requires authorization"
    )
  }

  async refundPayment(
    paymentSessionData: Record<string, unknown>,
    refundAmount: number
  ): Promise<Record<string, unknown>> {
    try {
      const sessionId = paymentSessionData.session_id as string

      if (sessionId) {
        await fetch(`${this.getApiBaseUrl()}/v1/refund`, {
          method: "POST",
          headers: this.getHeaders(),
          body: JSON.stringify({
            transaction_id: sessionId,
            amount: refundAmount,
            reason: "Customer refund",
          }),
        })
      }

      return {
        ...paymentSessionData,
        refunded_amount: refundAmount,
        status: "refunded",
      }
    } catch (error) {
      console.error("Paynector refundPayment error:", error)
      throw new MedusaError(
        MedusaError.Types.PAYMENT_CONNECTION_ERROR,
        error instanceof Error ? error.message : "Failed to process refund"
      )
    }
  }

  async deletePaymentSession(
    paymentSessionData: Record<string, unknown>
  ): Promise<void> {
    await this.cancelPaymentSession(paymentSessionData)
  }

  async retrievePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const sessionId = paymentSessionData.session_id as string

    if (!sessionId) {
      return paymentSessionData
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
          ...paymentSessionData,
          ...data,
          status: data.status,
        }
      }
    } catch (error) {
      console.error("Paynector retrievePayment error:", error)
    }

    return paymentSessionData
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload
  ): Promise<WebhookActionDetails> {
    const { data, rawPayload } = payload
    const event = (rawPayload as any).event as string

    switch (event) {
      case "checkout.completed":
      case "payment.success":
        return {
          action: "authorized",
          data: {
            session_id: data.id,
            status: "authorized",
          },
        }
      case "checkout.failed":
      case "payment.failed":
        return {
          action: "failed",
          data: {
            session_id: data.id,
            status: "failed",
          },
        }
      case "checkout.cancelled":
        return {
          action: "canceled",
          data: {
            session_id: data.id,
            status: "cancelled",
          },
        }
      default:
        return {
          action: "not_supported",
          data: rawPayload as Record<string, unknown>,
        }
    }
  }

  async generatePaymentInstrument(
    context: GenerateInstrumentOptions
  ): Promise<Record<string, unknown>> {
    throw new MedusaError(
      MedusaError.Types.NOT_IMPLEMENTED,
      "Paynector does not support saved payment methods"
    )
  }

  async updatePaymentInstrument(
    paymentInstrumentId: string,
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    throw new MedusaError(
      MedusaError.Types.NOT_IMPLEMENTED,
      "Paynector does not support saved payment methods"
    )
  }
}

export default PaynectorService
