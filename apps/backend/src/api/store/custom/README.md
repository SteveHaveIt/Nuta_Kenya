# Custom Store API Routes

This directory contains custom API routes for the store.

## Webhook Endpoints

### Paynector Webhook
- **Endpoint**: `POST /api/store/custom/hooks/paynector`
- **Purpose**: Receives payment status updates from Paynector
- **Health Check**: `GET /api/store/custom/hooks/paynector`

### M-PESA Webhook
- **Endpoint**: `POST /api/store/custom/hooks/mpesa`
- **Purpose**: Receives STK push callbacks from Safaricom M-PESA
- **Health Check**: `GET /api/store/custom/hooks/mpesa`

## Configuration

Set the following environment variables for webhook URLs:

```
# Paynector
PAYNECTOR_WEBHOOK_URL = https://your-domain.com/api/store/custom/hooks/paynector

# M-PESA (must be HTTPS for production)
MPESA_CALLBACK_URL = https://your-domain.com/api/store/custom/hooks/mpesa
BASE_URL = https://your-domain.com
```
