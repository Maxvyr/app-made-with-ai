import React from "react";
import Layout from "@/components/layout/layout";
import Pricing from "@/components/sections/pricing";
import CTA from "@/components/sections/cta";

export default function PricingPage() {
  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Pricing
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Choose the plan that's right for your team. All plans include a
              14-day free trial, no credit card required.
            </p>
          </div>
        </div>
      </div>

      <Pricing />

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              FAQ
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl divide-y divide-gray-900/10">
            {[
              {
                question: "Can I switch plans later?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be prorated.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
              },
              {
                question:
                  "Do you offer discounts for non-profits or educational institutions?",
                answer:
                  "Yes, we offer special pricing for non-profits, educational institutions, and startups. Please contact our sales team for more information.",
              },
              {
                question: "What happens when my trial ends?",
                answer:
                  "At the end of your trial, you can choose to subscribe to one of our plans or your account will be automatically downgraded to our free plan with limited features.",
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer:
                  "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, you can request a full refund within 30 days of your purchase.",
              },
              {
                question: "Do you offer custom plans for large organizations?",
                answer:
                  "Yes, we offer custom plans for organizations with specific needs. Please contact our sales team to discuss your requirements.",
              },
            ].map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-lg font-semibold leading-7 text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-3 text-base leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTA />
    </Layout>
  );
}
