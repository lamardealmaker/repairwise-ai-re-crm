/*
<ai_context>
This server page displays pricing options for the product, integrating Stripe payment links.
</ai_context>
*/

"use server"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
export default async function PricingPage() {
  const { userId } = await auth()
  return (
    <div className="container mx-auto py-12" data-oid="tk_j:mt">
      <h1 className="mb-8 text-center text-3xl font-bold" data-oid="rgb5pbg">
        Choose Your Plan
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2" data-oid="4oo3d5o">
        <PricingCard
          title="Monthly Plan"
          price="$10"
          description="Billed monthly"
          buttonText="Subscribe Monthly"
          buttonLink={
            process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY || "#"
          }
          userId={userId}
          data-oid="y_pic5u"
        />
        <PricingCard
          title="Yearly Plan"
          price="$100"
          description="Billed annually"
          buttonText="Subscribe Yearly"
          buttonLink={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY || "#"}
          userId={userId}
          data-oid="9dl11we"
        />
      </div>
    </div>
  )
}
interface PricingCardProps {
  title: string
  price: string
  description: string
  buttonText: string
  buttonLink: string
  userId: string | null
}
function PricingCard({
  title,
  price,
  description,
  buttonText,
  buttonLink,
  userId
}: PricingCardProps) {
  const finalButtonLink = userId
    ? `${buttonLink}?client_reference_id=${userId}`
    : buttonLink
  return (
    <Card className="flex h-full flex-col" data-oid=":wqous9">
      <CardHeader data-oid="v-mqzm-">
        <CardTitle className="text-2xl" data-oid="ox6mb1:">
          {title}
        </CardTitle>
        <CardDescription data-oid="ax40qz4">{description}</CardDescription>
      </CardHeader>
      <CardContent
        className="flex grow items-center justify-center"
        data-oid="v4c3m1z"
      >
        <p className="text-4xl font-bold" data-oid="5u1yzib">
          {price}
        </p>
      </CardContent>
      <CardFooter data-oid=".vrlhnr">
        <Button className="w-full" asChild data-oid="hilawxn">
          <a
            href={finalButtonLink}
            className={cn(
              "inline-flex items-center justify-center",
              finalButtonLink === "#" && "pointer-events-none opacity-50"
            )}
            data-oid="8k_5mg6"
          >
            {buttonText}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
