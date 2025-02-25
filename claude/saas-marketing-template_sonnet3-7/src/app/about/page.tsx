import React from "react";
import Layout from "@/components/layout/layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              About Us
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Mission
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At SaaSify, we're on a mission to help teams work smarter, not
              harder. We believe that the right tools can transform how
              businesses operate, enabling them to achieve more with less
              effort.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl lg:mt-20 lg:max-w-4xl">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Our Story
                </h3>
                <p className="mt-4 text-lg text-gray-600">
                  Founded in 2023, SaaSify was born out of frustration with
                  existing workflow solutions that were either too complex, too
                  limited, or too expensive. Our founders, a team of experienced
                  developers and product managers, set out to create a platform
                  that would combine power and simplicity in a way that hadn't
                  been done before.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  What started as a small project has grown into a comprehensive
                  platform used by thousands of teams worldwide. We're proud of
                  what we've built, but we're even more excited about what's to
                  come.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Our Values
                </h3>
                <ul className="mt-4 space-y-4 text-lg text-gray-600">
                  <li>
                    <strong>Simplicity:</strong> We believe that powerful
                    software doesn't have to be complicated. We strive to make
                    every feature intuitive and accessible.
                  </li>
                  <li>
                    <strong>Customer Focus:</strong> Our customers are at the
                    heart of everything we do. We listen to their feedback and
                    continuously improve our platform to meet their needs.
                  </li>
                  <li>
                    <strong>Innovation:</strong> We're never satisfied with the
                    status quo. We're constantly exploring new technologies and
                    approaches to make our platform even better.
                  </li>
                  <li>
                    <strong>Transparency:</strong> We believe in being open and
                    honest with our customers, our partners, and each other.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Join Us
                </h3>
                <p className="mt-4 text-lg text-gray-600">
                  We're always looking for talented individuals who share our
                  passion for creating exceptional software. If you're
                  interested in joining our team, check out our careers page or
                  get in touch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
