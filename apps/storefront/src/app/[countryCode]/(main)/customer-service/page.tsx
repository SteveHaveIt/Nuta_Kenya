import { Metadata } from "next"

import UnderlineLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "Customer Service",
  description: "Get help with your orders, returns, and frequently asked questions.",
}

type Params = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function CustomerServicePage(props: Params) {
  const params = await props.params
  const countryCode = params.countryCode

  return (
    <div className="py-12 content-container" data-testid="customer-service-page">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl-semi text-ui-fg-base mb-8">Customer Service</h1>
        
        <section className="mb-12">
          <h2 className="text-xl-semi text-ui-fg-base mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-base-semi text-ui-fg-base mb-2">How do I track my order?</h3>
              <p className="text-regular text-ui-fg-subtle">
                Once your order is shipped, you will receive a confirmation email with a tracking number. 
                You can also track your order by logging into your account and visiting the Orders section.
              </p>
            </div>
            
            <div>
              <h3 className="text-base-semi text-ui-fg-base mb-2">What is your return policy?</h3>
              <p className="text-regular text-ui-fg-subtle">
                We accept returns within 14 days of delivery. Products must be unused and in their original packaging. 
                Please contact our support team to initiate a return.
              </p>
            </div>
            
            <div>
              <h3 className="text-base-semi text-ui-fg-base mb-2">How long does shipping take?</h3>
              <p className="text-regular text-ui-fg-subtle">
                Standard shipping typically takes 3-5 business days within Kenya. 
                Express shipping options are available at checkout for faster delivery.
              </p>
            </div>
            
            <div>
              <h3 className="text-base-semi text-ui-fg-base mb-2">Can I change my order after placing it?</h3>
              <p className="text-regular text-ui-fg-subtle">
                We process orders quickly. Please contact us immediately if you need to make changes. 
                We will do our best to accommodate your request before shipment.
              </p>
            </div>
            
            <div>
              <h3 className="text-base-semi text-ui-fg-base mb-2">What payment methods do you accept?</h3>
              <p className="text-regular text-ui-fg-subtle">
                We accept mobile money (M-Pesa), credit/debit cards, and bank transfers. 
                All payments are processed securely.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-xl-semi text-ui-fg-base mb-4">Contact Us</h2>
          
          <div className="bg-gray-50 p-6 rounded-rounded">
            <p className="text-regular text-ui-fg-subtle mb-4">
              Our customer support team is here to help you with any questions or concerns.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-base-semi text-ui-fg-base">Email:</span>
                <span className="text-regular text-ui-fg-subtle">support@nuta.ke</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base-semi text-ui-fg-base">Phone:</span>
                <span className="text-regular text-ui-fg-subtle">+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base-semi text-ui-fg-base">Hours:</span>
                <span className="text-regular text-ui-fg-subtle">Monday - Friday, 9am - 6pm EAT</span>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl-semi text-ui-fg-base mb-4">Need More Help?</h2>
          <p className="text-regular text-ui-fg-subtle mb-4">
            Can&apos;t find what you&apos;re looking for? Reach out to us and we&apos;ll be happy to assist you.
          </p>
          <UnderlineLink href={`/${countryCode}/account`}>
            Go to Account
          </UnderlineLink>
        </section>
      </div>
    </div>
  )
}
