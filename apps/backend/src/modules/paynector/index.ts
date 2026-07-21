import { Module } from "@medusajs/framework"
import { PaynectorService } from "./service"

export const PAYNECTOR_MODULE = "paynector"

export default Module(PAYNECTOR_MODULE, {
  service: PaynectorService,
})
