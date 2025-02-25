import React from "react";
import {
  BarChart3,
  Clock,
  Cloud,
  Code2,
  Lock,
  MessageSquare,
  Settings,
  Zap,
} from "lucide-react";

const features = [
  {
    name: "Analytics",
    description:
      "Get detailed insights into your business performance with our powerful analytics tools.",
    icon: BarChart3,
  },
  {
    name: "Real-time Collaboration",
    description:
      "Work together with your team in real-time, no matter where they are located.",
    icon: MessageSquare,
  },
  {
    name: "Cloud Storage",
    description:
      "Store and access your files securely from anywhere with our cloud storage solution.",
    icon: Cloud,
  },
  {
    name: "Advanced Security",
    description:
      "Rest easy knowing your data is protected with enterprise-grade security features.",
    icon: Lock,
  },
  {
    name: "Automation",
    description:
      "Save time and reduce errors by automating repetitive tasks and workflows.",
    icon: Zap,
  },
  {
    name: "Developer API",
    description:
      "Extend functionality and integrate with other tools using our comprehensive API.",
    icon: Code2,
  },
  {
    name: "Customization",
    description:
      "Tailor the platform to your specific needs with extensive customization options.",
    icon: Settings,
  },
  {
    name: "24/7 Support",
    description:
      "Get help whenever you need it with our round-the-clock customer support.",
    icon: Clock,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful features to boost your productivity
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform provides all the tools you need to streamline your
            workflow, collaborate with your team, and grow your business.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
