import { PaynectorService } from "./paynector"
import { MpesaService } from "./mpesa"

export default {
  paynector: {
    load: async () => {
      return {
        services: [PaynectorService],
      }
    },
  },
  mpesa: {
    load: async () => {
      return {
        services: [MpesaService],
      }
    },
  },
}

export { PaynectorService, MpesaService }
