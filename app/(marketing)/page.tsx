/*
<ai_context>
This server page is the marketing homepage.
</ai_context>
*/

"use server"

import { FeaturesSection } from "@/components/landing/features"
import { HeroSection } from "@/components/landing/hero"
export default async function HomePage() {
  return (
    <div className="pb-20" data-oid="zquwmmn">
      <HeroSection data-oid="0u-n5me" />
      {/* social proof */}
      <FeaturesSection data-oid=":a0dkn6" />
      {/* pricing */}
      {/* faq */}
      {/* blog */}
      {/* footer */}
    </div>
  )
}
