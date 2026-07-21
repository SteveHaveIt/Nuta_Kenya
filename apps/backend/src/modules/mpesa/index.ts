import { Module } from "@medusajs/framework"
import { MpesaService } from "./service"

export const MPESA_MODULE = "mpesa"

export default Module(MPESA_MODULE, {
  service: MpesaService,
})
