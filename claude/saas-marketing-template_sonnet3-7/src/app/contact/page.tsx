import React from "react";
import Layout from "@/components/layout/layout";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Contact Us
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get in Touch
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have questions about SaaSify? We're here to help. Fill out the
              form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-xl">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Company
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="w-full sm:w-auto">
                  Send message
                </Button>
              </div>
            </form>
          </div>

          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Other Ways to Reach Us
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-6">
                <h4 className="text-base font-semibold leading-7 text-gray-900">
                  Email
                </h4>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  <a
                    href="mailto:support@saasify.com"
                    className="text-primary hover:underline"
                  >
                    support@saasify.com
                  </a>
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <h4 className="text-base font-semibold leading-7 text-gray-900">
                  Phone
                </h4>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  <a
                    href="tel:+1-555-123-4567"
                    className="text-primary hover:underline"
                  >
                    +1 (555) 123-4567
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
