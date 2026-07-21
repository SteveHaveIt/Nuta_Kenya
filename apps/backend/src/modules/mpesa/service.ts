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

type MpesaOptions = {
  consumer_key: string
  consumer_secret: string
  shortcode: string
  passkey: string
  initiator_name: string
  security_credential: string
  environment: "live" | "sandbox"
  callback_url: string
  timeout_url: string
  result_url: string
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

export class MpesaService extends AbstractPaymentProvider<MpesaOptions> {
  static readonly TAX_INCLUSIVE = false
  protected options_: MpesaOptions
  private token_: MpesaToken | null = null

  constructor(container: Context, options: MpesaOptions) {
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
          MedusaError.Types.PAYMENT_CONNECTION_ERROR,
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
        MedusaError.Types.PAYMENT_CONNECTION_ERROR,
        error instanceof Error ? error.message : "Failed to get M-PESA access token"
      )
    }
  }

  async getStatus(paymentSessionData: Record<string, unknown>): Promise<PaymentSessionStatus> {
    const status = paymentSessionData.status as string

    switch (status) {
      case "pending":
        return PaymentSessionStatus.PENDING
      case "completed":
      case "completed_success":
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
    const amountNumber = numericAmount.toNumeric()
    const phone = customer?.metadata?.phone as string || this.extractPhoneFromCustomer(customer)
    
    if (!phone) {
      throw new MedusaError(
        MedusaError.Types.PAYMENT_ACTION_REQUIRED,
        "Phone number is required for M-PESA payment"
      )
    }

    const timestamp = this.getTimestamp()
    const password = this.getPassword(timestamp)

    try {
      const token = await this.getAccessToken()

      const payload = {
        BusinessShortCode: parseInt(this.options_.shortcode),
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.ceil(amountNumber),
        PartyA: this.formatPhoneNumber(phone),
        PartyB: parseInt(this.options_.shortcode),
        PhoneNumber: this.formatPhoneNumber(phone),
        CallBackURL: this.options_.callback_url || `${process.env.BASE_URL}/api/hooks/mpesa`,
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
          MedusaError.Types.PAYMENT_CONNECTION_ERROR,
          `M-PESA STK Push error: ${error}`
        )
      }

      const data: MpesaStkPushResponse = await response.json()

      if (data.ResponseCode !== "0") {
        throw new MedusaError(
          MedusaError.Types.PAYMENT_CONNECTION_ERROR,
          `M-PESA error: ${data.ResponseDescription}`
        )
      }

      return {
        id: `mpesa_${Date.now()}`,
        status: "pending",
        merchant_request_id: data.MerchantRequestID,
        checkout_request_id: data.CheckoutRequestID,
        response_code: data.ResponseCode,
        response_description: data.ResponseDescription,
        customer_message: data.CustomerMessage,
        amount: amountNumber,
        currency: currency_code?.toUpperCase() || "KES",
        phone: this.formatPhoneNumber(phone),
        timestamp,
      }
    } catch (error) {
      console.error("M-PESA createPaymentSession error:", error)
      throw new MedusaError(
        MedusaError.Types.PAYMENT_CONNECTION_ERROR,
        error instanceof Error ? error.message : "Failed to initiate M-PESA payment"
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
    if (customer.addresses?.[0]?.phone) return customer.addresses[0].phone
    
    return null
  }

  async updatePaymentSession(
    paymentSessionData: Record<string, unknown>,
    context: PaymentContext
  ): Promise<Record<string, unknown>> {
    const { amount, customer } = context

    const numericAmount = amount instanceof BigNumber ? amount : new BigNumber(amount)
    const phone = this.extractPhoneFromCustomer(customer)

    return {
      ...paymentSessionData,
      amount: numericAmount.toNumeric(),
      phone: phone || paymentSessionData.phone,
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
          status: "completed_success",
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
    return {
      ...paymentSessionData,
      status: "cancelled",
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
      const token = await this.getAccessToken()
      const transactionId = paymentSessionData.transaction_id as string

      if (transactionId) {
        const payload = {
          Initiator: this.options_.initiator_name,
          SecurityCredential: this.options_.security_credential,
          CommandID: "TransactionReversal",
          TransactionID: transactionId,
          Amount: Math.ceil(refundAmount),
          ReceiverParty: parseInt(this.options_.shortcode),
          RecieverIdentifierType: "4",
          ResultURL: this.options_.result_url || `${process.env.BASE_URL}/api/hooks/mpesa/refund`,
          QueueTimeOutURL: this.options_.timeout_url || `${process.env.BASE_URL}/api/hooks/mpesa/timeout`,
          Remarks: "Customer refund",
          Occasion: "Customer refund",
        }

        await fetch(`${this.getApiBaseUrl()}/mpesa/b2c/v1/paymentrequest`, {
          method: "POST",
          headers: this.getHeaders(token),
          body: JSON.stringify(payload),
        })
      }

      return {
        ...paymentSessionData,
        refunded_amount: refundAmount,
        status: "refunded",
      }
    } catch (error) {
      console.error("M-PESA refundPayment error:", error)
      throw new MedusaError(
        MedusaError.Types.PAYMENT_CONNECTION_ERROR,
        error instanceof Error ? error.message : "Failed to process M-PESA refund"
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
    const checkoutRequestId = paymentSessionData.checkout_request_id as string

    if (!checkoutRequestId) {
      return paymentSessionData
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
          status = "completed_success"
        } else if (data.ResultCode === "1032") {
          status = "cancelled"
        } else if (data.ResultCode === "1") {
          status = "expired"
        }

        return {
          ...paymentSessionData,
          ...data,
          status,
        }
      }
    } catch (error) {
      console.error("M-PESA retrievePayment error:", error)
    }

    return paymentSessionData
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload
  ): Promise<WebhookActionDetails> {
    const { rawPayload } = payload

    const body = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload

    if (body.Body?.stkCallback) {
      const callback = body.Body.stkCallback
      const resultCode = callback.ResultCode

      if (resultCode === 0) {
        const item = callback.CallbackMetadata?.Item?.find(
          (i: any) => i.Name === "Amount"
        )
        return {
          action: "authorized",
          data: {
            merchant_request_id: callback.MerchantRequestID,
            checkout_request_id: callback.CheckoutRequestID,
            status: "completed_success",
            amount: item?.Value,
          },
        }
      } else if (resultCode === 1032) {
        return {
          action: "canceled",
          data: {
            merchant_request_id: callback.MerchantRequestID,
            checkout_request_id: callback.CheckoutRequestID,
            status: "cancelled",
            result_code: resultCode,
          },
        }
      } else {
        return {
          action: "failed",
          data: {
            merchant_request_id: callback.MerchantRequestID,
            checkout_request_id: callback.CheckoutRequestID,
            status: "failed",
            result_code: resultCode,
            result_desc: callback.ResultDesc,
          },
        }
      }
    }

    return {
      action: "not_supported",
      data: rawPayload,
    }
  }

  async generatePaymentInstrument(
    context: GenerateInstrumentOptions
  ): Promise<Record<string, unknown>> {
    throw new MedusaError(
      MedusaError.Types.NOT_IMPLEMENTED,
      "M-PESA does not support saved payment methods"
    )
  }

  async updatePaymentInstrument(
    paymentInstrumentId: string,
    data: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    throw new MedusaError(
      MedusaError.Types.NOT_IMPLEMENTED,
      "M-PESA does not support saved payment methods"
    )
  }
}

export default MpesaService
