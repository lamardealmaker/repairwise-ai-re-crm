/*
<ai_context>
This server layout provides a shared header and basic structure for (marketing) routes.
</ai_context>
*/

"use server"

import Header from "@/components/header"
export default async function MarketingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col" data-oid="xjeoin2">
      <Header data-oid="0v7v-5t" />

      <div className="flex-1" data-oid="1f9z6fu">
        {children}
      </div>
    </div>
  )
}
