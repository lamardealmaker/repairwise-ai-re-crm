import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
    data-oid="3qbeart"
  />
)
Pagination.displayName = "Pagination"
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
    data-oid="ev4n092"
  />
))
PaginationContent.displayName = "PaginationContent"
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} data-oid="yjj4jhx" />
))
PaginationItem.displayName = "PaginationItem"
type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size
      }),
      className
    )}
    {...props}
    data-oid="9_buzb4"
  />
)
PaginationLink.displayName = "PaginationLink"
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
    data-oid="-_hu9_g"
  >
    <ChevronLeft className="size-4" data-oid="1c6pfkn" />
    <span data-oid="813g0pq">Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
    data-oid="th.8jt8"
  >
    <span data-oid="ixea16r">Next</span>
    <ChevronRight className="size-4" data-oid="avqv448" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}
    data-oid="98yaa6g"
  >
    <MoreHorizontal className="size-4" data-oid="3tntoc3" />
    <span className="sr-only" data-oid="lg.qezg">
      More pages
    </span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
