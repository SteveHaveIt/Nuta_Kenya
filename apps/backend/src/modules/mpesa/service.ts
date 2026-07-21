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

export type MpesaOptions = {
  consumer_key: string
  consumer_secret: string
  shortcode: string
  passkey: string
  environment: "live" | "sandbox"
}

type MpesaToken = {
  access_token: string
  expires_at: number
}

type MpesaStkPushResponse = {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

class MpesaService extends AbstractPaymentProvider<MpesaOptions> {
  static identifier = "mpesa"

  protected options_: MpesaOptions
  private token_: MpesaToken | null = null

  constructor(container: any, options: MpesaOptions) {
    super(container, options)
    this.options_ = options
  }

  protected getApiBaseUrl(): string {
    return this.options_.environment === "live"
      ? "https://api.safaricom.co.ke"
      : "https://sandbox.safaricom.co.ke"
  }

  protected getAuthUrl(): string {
    return `${this.getApiBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`
  }

  protected getStkPushUrl(): string {
    return `${this.getApiBaseUrl()}/mpesa/stkpush/v1/processrequest`
  }

  protected getStkQueryUrl(): string {
    return `${this.getApiBaseUrl()}/mpesa/stkpush/v1/query`
  }

  protected getHeaders(authToken: string): Record<string, string> {
    return {
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json",
    }
  }

  protected getAuthHeaders(): Record<string, string> {
    const credentials = Buffer.from(
      `${this.options_.consumer_key}:${this.options_.consumer_secret}`
    ).toString("base64")

    return {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/json",
    }
  }

  static validateOptions(options: Record<string, unknown>): void {
    if (!options.consumer_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "M-PESA consumer_key is required in the provider's options."
      )
    }
    if (!options.consumer_secret) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "M-PESA consumer_secret is required in the provider's options."
      )
    }
    if (!options.shortcode) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "M-PESA shortcode is required in the provider's options."
      )
    }
  }

  private async getAccessToken(): Promise<string> {
    if (this.token_ && this.token_.expires_at > Date.now()) {
      return this.token_.access_token
    }

    try {
      const response = await fetch(this.getAuthUrl(), {
        method: "GET",
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new MedusaError(
          MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
          `M-PESA OAuth error: ${error}`
        )
      }

      const data = await response.json()

      this.token_ = {
        access_token: data.access_token,
        expires_at: Date.now() + (data.expires_in - 60) * 1000,
      }

      return this.token_.access_token
    } catch (error) {
      console.error("M-PESA getAccessToken error:", error)
      throw new MedusaError(
        MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
        error instanceof Error ? error.message : "Failed to get M-PESA access token"
      )
    }
  }

  protected getTimestamp(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")
    return `${year}${month}${day}${hours}${minutes}${seconds}`
  }

  protected getPassword(timestamp: string): string {
    return Buffer.from(
      `${this.options_.shortcode}${this.options_.passkey}${timestamp}`
    ).toString("base64")
  }

  protected formatPhoneNumber(phone: string): string {
    let formatted = phone.replace(/[^0-9]/g, "")
    
    if (formatted.startsWith("0")) {
      formatted = "254" + formatted.substring(1)
    } else if (formatted.startsWith("+")) {
      formatted = formatted.substring(1)
    }
    
    if (!formatted.startsWith("254")) {
      formatted = "254" + formatted
    }
    
    return formatted
  }

  protected extractPhoneFromCustomer(customer: any): string | null {
    if (!customer) return null
    if (customer.phone) return customer.phone
    if (customer.metadata?.phone) return customer.metadata.phone
    if (customer.shipping_address?.phone) return customer.shipping_address.phone
    return null
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

    // For M-PESA, we need to get the phone number from the cart during checkout
    // The phone number should be provided by the customer during checkout
    // For now, we'll return a pending status and expect the webhook to update it
    const timestamp = this.getTimestamp()
    const password = this.getPassword(timestamp)

    try {
      const token = await this.getAccessToken()

      const payload = {
        BusinessShortCode: parseInt(this.options_.shortcode),
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.ceil(numericAmount as number),
        PartyA: "254000000000", // Default placeholder - should be provided by customer
        PartyB: parseInt(this.options_.shortcode),
        PhoneNumber: "254000000000", // Default placeholder
        CallBackURL: `${process.env.BASE_URL}/api/hooks/mpesa`,
        AccountReference: `ORDER-${Date.now()}`,
        TransactionDesc: `Payment for order - ${currency_code}`,
      }

      const response = await fetch(this.getStkPushUrl(), {
        method: "POST",
        headers: this.getHeaders(token),
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new MedusaError(
          MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
          `M-PESA STK Push error: ${error}`
        )
      }

      const data: MpesaStkPushResponse = await response.json()

      if (data.ResponseCode !== "0") {
        throw new MedusaError(
          MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
          `M-PESA error: ${data.ResponseDescription}`
        )
      }

      return {
        id: data.CheckoutRequestID,
        data: {
          merchant_request_id: data.MerchantRequestID,
          checkout_request_id: data.CheckoutRequestID,
          response_code: data.ResponseCode,
          response_description: data.ResponseDescription,
          customer_message: data.CustomerMessage,
          amount: numericAmount,
          currency: currency_code?.toUpperCase() || "KES",
          timestamp,
        },
      }
    } catch (error) {
      console.error("M-PESA initiatePayment error:", error)
      throw new MedusaError(
        MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
        error instanceof Error ? error.message : "Failed to initiate M-PESA payment"
      )
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    return {
      data: {
        ...input.data,
        status: "pending_authorization",
      },
      status: "pending_authorization",
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
    const checkoutRequestId = input.data?.checkout_request_id as string

    if (!checkoutRequestId) {
      return input.data || {}
    }

    try {
      const token = await this.getAccessToken()
      const timestamp = this.getTimestamp()

      const payload = {
        BusinessShortCode: parseInt(this.options_.shortcode),
        Password: this.getPassword(timestamp),
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      }

      const response = await fetch(this.getStkQueryUrl(), {
        method: "POST",
        headers: this.getHeaders(token),
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = await response.json()
        
        let status = "pending"
        if (data.ResultCode === "0") {
          status = "captured"
        } else if (data.ResultCode === "1032") {
          status = "cancelled"
        } else if (data.ResultCode === "1") {
          status = "expired"
        }

        return {
          ...input.data,
          ...data,
          status,
        }
      }
    } catch (error) {
      console.error("M-PESA retrievePayment error:", error)
    }

    return input.data || {}
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return { data: input.data }
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    return {
      status: "pending",
      data: input.data || {},
    }
  }

  async getWebhookActionAndData(
    input: WebhookInput
  ): Promise<WebhookResult> {
    const rawPayload = input.rawData
    const body = (typeof rawPayload === "string" ? JSON.parse(rawPayload) : rawPayload) as Record<string, unknown>

    if ((body as any).Body?.stkCallback) {
      const callback = (body as any).Body.stkCallback
      const resultCode = callback.ResultCode

      if (resultCode === 0) {
        return {
          action: "authorized",
          data: {
            session_id: callback.CheckoutRequestID as string,
            amount: 0,
          },
        }
      } else if (resultCode === 1032) {
        return {
          action: "canceled",
          data: {
            session_id: callback.CheckoutRequestID as string,
            amount: 0,
          },
        }
      } else {
        return {
          action: "failed",
          data: {
            session_id: callback.CheckoutRequestID as string,
            amount: 0,
          },
        }
      }
    }

    return {
      action: "not_supported",
      data: {
        session_id: "",
        amount: 0,
      },
    }
  }
}

export default MpesaService
