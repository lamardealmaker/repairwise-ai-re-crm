/*
<ai_context>
This client component provides the header for the app.
</ai_context>
*/

"use client"

import { Button } from "@/components/ui/button"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser
} from "@clerk/nextjs"
import { Menu, Rocket, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ThemeSwitcher } from "./utilities/theme-switcher"
const navLinks = [
  {
    href: "/about",
    label: "About"
  },
  {
    href: "/pricing",
    label: "Pricing"
  },
  {
    href: "/contact",
    label: "Contact"
  }
]
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useUser()
  const userRole = user?.publicMetadata?.role as string
  const signedInLinks = [
    {
      href: userRole === "staff" ? "/staff/tickets" : "/tenant/tickets",
      label: "Maintenance"
    }
  ]
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${isScrolled ? "bg-background/80 shadow-sm backdrop-blur-sm" : "bg-background"}`}
      data-oid=":.9t1wi"
    >
      <div
        className="mx-auto flex max-w-screen-2xl items-center justify-between p-4"
        data-oid="mn-fjy8"
      >
        <div
          className="flex items-center space-x-2 hover:cursor-pointer hover:opacity-80"
          data-oid="8_adis8"
        >
          <Rocket className="size-6" data-oid="yucn_9c" />
          <Link href="/" className="flex items-center" data-oid="gwf7bii">
            <span className="text-lg font-semibold" data-oid="13579_4">
              RepairWise
            </span>
          </Link>
        </div>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 space-x-2 font-semibold md:flex"
          data-oid="2hkge28"
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 hover:opacity-80"
              data-oid="onwx_-c"
            >
              {link.label}
            </Link>
          ))}

          <SignedIn data-oid="fm99:tp">
            {signedInLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1 hover:opacity-80"
                data-oid="e:adu-j"
              >
                {link.label}
              </Link>
            ))}
          </SignedIn>
        </nav>

        <div className="flex items-center space-x-4" data-oid="p73co-q">
          <ThemeSwitcher data-oid="et4yhxb" />

          <SignedOut data-oid="i_y-5.m">
            <Link href="/login" data-oid="h9k0v7h">
              <Button variant="outline" data-oid="-dwfe0b">
                Login
              </Button>
            </Link>

            <Link href="/signup" data-oid="hn6:rka">
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                data-oid="qh1ad8b"
              >
                Sign Up
              </Button>
            </Link>
          </SignedOut>

          <SignedIn data-oid="3pw974c">
            <UserButton afterSignOutUrl="/" data-oid="v:8juo-" />
          </SignedIn>

          <div className="md:hidden" data-oid="sl6lr6e">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              data-oid="04.0lr_"
            >
              {isMenuOpen ? (
                <X className="size-6" data-oid="8vi2rpb" />
              ) : (
                <Menu className="size-6" data-oid="xmbdzmv" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          className="bg-primary-foreground text-primary p-4 md:hidden"
          data-oid="6eoyq5q"
        >
          <ul className="space-y-2" data-oid="1_o2i_x">
            <li data-oid="a6-j2ce">
              <Link
                href="/"
                className="block hover:underline"
                onClick={toggleMenu}
                data-oid="6utn2aj"
              >
                Home
              </Link>
            </li>
            {navLinks.map(link => (
              <li key={link.href} data-oid="bag5m1n">
                <Link
                  href={link.href}
                  className="block hover:underline"
                  onClick={toggleMenu}
                  data-oid="jmof2ne"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <SignedIn data-oid="hvbyiqn">
              {signedInLinks.map(link => (
                <li key={link.href} data-oid="nv5:h:0">
                  <Link
                    href={link.href}
                    className="block hover:underline"
                    onClick={toggleMenu}
                    data-oid="rqzsce1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </SignedIn>
          </ul>
        </nav>
      )}
    </header>
  )
}
