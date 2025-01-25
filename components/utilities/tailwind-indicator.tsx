/*
<ai_context>
This server component provides a tailwind indicator for the app in dev mode.
</ai_context>
*/

"use server"

export async function TailwindIndicator() {
  // Don't show in production
  if (process.env.NODE_ENV === "production") return null
  return (
    <div
      className="fixed bottom-12 left-3 z-50 flex size-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white"
      data-oid=".93a6yw"
    >
      <div className="block sm:hidden" data-oid="uoy--1k">
        xs
      </div>
      <div className="hidden sm:block md:hidden" data-oid="h6x3.o:">
        sm
      </div>
      <div className="hidden md:block lg:hidden" data-oid="o9kpvr7">
        md
      </div>
      <div className="hidden lg:block xl:hidden" data-oid="3p:qoi7">
        lg
      </div>
      <div className="hidden xl:block 2xl:hidden" data-oid="nwzp_pa">
        xl
      </div>
      <div className="hidden 2xl:block" data-oid="blzg7-l">
        2xl
      </div>
    </div>
  )
}
