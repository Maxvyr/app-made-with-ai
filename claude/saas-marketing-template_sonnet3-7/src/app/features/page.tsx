import React from "react";
import Layout from "@/components/layout/layout";
import Features from "@/components/sections/features";
import CTA from "@/components/sections/cta";

export default function FeaturesPage() {
  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything You Need to Succeed
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              SaaSify provides a comprehensive set of tools designed to help
              your team work more efficiently and effectively.
            </p>
          </div>
        </div>
      </div>

      <Features />

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Integrations
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Connect with Your Favorite Tools
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              SaaSify integrates seamlessly with the tools you already use,
              making it easy to incorporate into your existing workflow.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              {[
                {
                  name: "Communication",
                  description:
                    "Connect with Slack, Microsoft Teams, and other communication platforms to keep everyone in the loop.",
                },
                {
                  name: "Project Management",
                  description:
                    "Integrate with Jira, Asana, Trello, and more to keep your projects on track.",
                },
                {
                  name: "Development",
                  description:
                    "Connect with GitHub, GitLab, Bitbucket, and other development tools to streamline your workflow.",
                },
                {
                  name: "Marketing",
                  description:
                    "Integrate with HubSpot, Mailchimp, and other marketing tools to boost your campaigns.",
                },
                {
                  name: "Sales",
                  description:
                    "Connect with Salesforce, HubSpot CRM, and other sales tools to close more deals.",
                },
                {
                  name: "Customer Support",
                  description:
                    "Integrate with Zendesk, Intercom, and other support tools to provide better service.",
                },
              ].map((integration) => (
                <div key={integration.name} className="flex flex-col">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">
                    {integration.name}
                  </h3>
                  <p className="mt-4 flex-auto text-base leading-7 text-gray-600">
                    {integration.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CTA />
    </Layout>
  );
}
