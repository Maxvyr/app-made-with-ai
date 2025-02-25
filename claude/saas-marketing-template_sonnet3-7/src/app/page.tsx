import React from "react";
import Layout from "@/components/layout/layout";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Testimonials from "@/components/sections/testimonials";
import Pricing from "@/components/sections/pricing";
import CTA from "@/components/sections/cta";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </Layout>
  );
}
