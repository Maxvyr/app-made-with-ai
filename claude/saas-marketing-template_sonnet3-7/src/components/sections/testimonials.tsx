import React from "react";
import Image from "next/image";

const testimonials = [
  {
    body: "SaaSify has completely transformed how our team works. The collaboration features alone have increased our productivity by 30%.",
    author: {
      name: "Sarah Johnson",
      role: "CTO at TechCorp",
      imageUrl: "/testimonials/person-1.jpg",
    },
  },
  {
    body: "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that have real impact on our bottom line.",
    author: {
      name: "Michael Chen",
      role: "Founder at DataDrive",
      imageUrl: "/testimonials/person-2.jpg",
    },
  },
  {
    body: "Customer support is outstanding. Any time we've had an issue, the team has been quick to respond and resolve it. Truly exceptional service.",
    author: {
      name: "Emily Rodriguez",
      role: "Operations Manager at GrowthCo",
      imageUrl: "/testimonials/person-3.jpg",
    },
  },
  {
    body: "The automation features have saved us countless hours of manual work. What used to take days now happens automatically in the background.",
    author: {
      name: "David Kim",
      role: "Product Manager at AutomateHQ",
      imageUrl: "/testimonials/person-4.jpg",
    },
  },
  {
    body: "We evaluated several platforms before choosing SaaSify. The combination of features, ease of use, and value for money made it the clear winner.",
    author: {
      name: "Lisa Patel",
      role: "CEO at StartupSuccess",
      imageUrl: "/testimonials/person-5.jpg",
    },
  },
  {
    body: "The security features give us peace of mind knowing our sensitive data is protected. Compliance has never been easier to maintain.",
    author: {
      name: "James Wilson",
      role: "Security Director at SecureNet",
      imageUrl: "/testimonials/person-6.jpg",
    },
  },
];

export default function Testimonials() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by thousands of businesses worldwide
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Don&apos;t just take our word for it — hear what our customers have
            to say about their experience with SaaSify.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="flex flex-col justify-between bg-white p-6 shadow-sm rounded-lg"
            >
              <div className="flex-1">
                <p className="text-base leading-7 text-gray-600">
                  {testimonial.body}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-x-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    className="h-full w-full object-cover"
                    src={testimonial.author.imageUrl}
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-sm leading-6 text-gray-600">
                    {testimonial.author.role}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
