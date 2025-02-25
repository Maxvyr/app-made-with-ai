"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "/contact",
    price: { monthly: "$29", annually: "$290" },
    description: "Perfect for small teams just getting started.",
    features: [
      "5 team members",
      "20GB storage",
      "Basic analytics",
      "Email support",
      "Basic integrations",
    ],
    mostPopular: false,
  },
  {
    name: "Professional",
    id: "tier-professional",
    href: "/contact",
    price: { monthly: "$79", annually: "$790" },
    description: "Ideal for growing teams that need more features.",
    features: [
      "Unlimited team members",
      "100GB storage",
      "Advanced analytics",
      "Priority email support",
      "Advanced integrations",
      "Custom workflows",
      "API access",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "/contact",
    price: { monthly: "$199", annually: "$1,990" },
    description: "For large organizations with complex needs.",
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "Custom analytics",
      "24/7 phone & email support",
      "Premium integrations",
      "Custom workflows",
      "Dedicated API support",
      "Single sign-on (SSO)",
      "Dedicated account manager",
      "Custom contract",
    ],
    mostPopular: false,
  },
];

export default function Pricing() {
  const [frequency, setFrequency] = React.useState("monthly");

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Plans for teams of all sizes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the perfect plan for your needs. Always know what you'll pay
            with our transparent pricing.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 bg-gray-100">
            <button
              type="button"
              className={`rounded-full px-2.5 py-1 ${
                frequency === "monthly" ? "bg-white shadow" : ""
              }`}
              onClick={() => setFrequency("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`rounded-full px-2.5 py-1 ${
                frequency === "annually" ? "bg-white shadow" : ""
              }`}
              onClick={() => setFrequency("annually")}
            >
              Annually <span className="text-primary">(Save 20%)</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 ${
                tier.mostPopular
                  ? "lg:z-10 lg:rounded-b-none lg:rounded-t-none lg:shadow-lg lg:-my-8 lg:px-8 lg:py-12"
                  : tierIdx === 0
                  ? "lg:rounded-r-none"
                  : "lg:rounded-l-none"
              }`}
            >
              {tier.mostPopular ? (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-1 text-center text-xs font-semibold text-white">
                  Most popular
                </div>
              ) : null}
              <div className="mb-8">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">
                  {tier.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.price[frequency]}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /month
                  </span>
                </p>
                <Button
                  variant={tier.mostPopular ? "default" : "outline"}
                  className="mt-6 w-full"
                  asChild
                >
                  <Link href={tier.href}>Get started</Link>
                </Button>
              </div>
              <div className="mt-2 flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Includes:
                  </p>
                  <ul role="list" className="mt-4 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-x-3 text-sm leading-6 text-gray-600"
                      >
                        <Check
                          className="h-5 w-5 flex-none text-primary"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
