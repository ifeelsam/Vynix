"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "@/components/ui/resizable-navbar"
import { VynixLogo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Plus, Search, Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { usePrivy } from "@privy-io/react-auth"

export function MainNav() {
  const pathname = usePathname()
  const navItems = [
    // { name: "Cards", link: "#" },
    // { name: "Sets", link: "#" },
    { name: "Auctions", link: "#" },
    { name: "Marketplace", link: "/marketplace" },
    // { name: "Drops", link: "#" },
  ]
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [pftImg, setPfpImg] = useState<string>("https://api.dicebear.com/9.x/glass/svg?seed=Vynix")

  // This would be replaced with actual authentication logic
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const {login, authenticated, ready, user} = usePrivy()
  // Toggle authentication for demo purposes
  const handleLogin = () => login({loginMethods: ["google", "email"]})

  const handleLogout = () => {
    setIsAuthenticated(false)
  }
  let pfpImg;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const dropdown = document.getElementById("profile-dropdown")
      if (dropdown && !dropdown.contains(target)) {
        setIsProfileDropdownOpen(false)
      }
    }
    if (authenticated && ready ){
       setIsAuthenticated(true)
    }
    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isProfileDropdownOpen, authenticated, ready])

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <motion.div layout>
        <Link href='/'>
          <VynixLogo />
          </Link>
        </motion.div>
        <NavItems
          items={navItems.map((item) => ({
            ...item,
            active: pathname === item.link,
          }))}
        />
        <div className="flex items-center gap-2">
          {/* Search Bar */}
          <div className="relative">
            <AnimatePresence>
              {isSearchExpanded ? (
                <motion.div
                  initial={{ width: 40, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 40, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex items-center"
                >
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pr-8 rounded-full bg-white/80 dark:bg-[#1A1A1A]/80 border-[#E4E1FF] dark:border-[#2A2A2A]"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 rounded-full"
                    onClick={() => setIsSearchExpanded(false)}
                  >
                    <X className="h-4 w-4 text-[#121F3D] dark:text-[#E0E0E0]" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsSearchExpanded(true)}
                  >
                    <Search className="h-5 w-5 text-[#121F3D] dark:text-[#E0E0E0]" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isAuthenticated ? (
            <>
              {/* Create Button - Only shown when authenticated */}
              <div className="relative group">
                <Link href="/marketplace/create">
                  <Button
                    className={cn(
                      "rounded-full text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF] hover:scale-105 transition-transform",
                      pathname.includes("/marketplace/create") && "shadow-[0_0_15px_rgba(108,99,255,0.3)]",
                    )}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create
                  </Button>
                </Link>
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#1A1A1A] shadow-lg border border-[#E4E1FF] dark:border-[#2A2A2A] p-2 hidden group-hover:block z-10">
                  <Link href="/marketplace/create">
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8F9FF] dark:hover:bg-[#1A1A1A] text-[#121F3D] dark:text-[#E0E0E0]">
                      List a Card
                    </button>
                  </Link>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8F9FF] dark:hover:bg-[#1A1A1A] text-[#121F3D] dark:text-[#E0E0E0]">
                    Bulk Upload
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8F9FF] dark:hover:bg-[#1A1A1A] text-[#121F3D] dark:text-[#E0E0E0]">
                    Create Collection
                  </button>
                </div>
              </div>

              {/* Authenticated Actions */}
              <ThemeToggle />
              {/* <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5 text-[#121F3D] dark:text-[#E0E0E0]" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-[#FF6B6B] dark:bg-[#FF7E7E] rounded-full"></span>
              </Button> */}
              <div className="relative">
                <button
                  className="h-9 w-9 rounded-full overflow-hidden border-2 border-white dark:border-[#1A1C36] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] dark:focus:ring-[#8075FF]"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                    <Image
                      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.id}`}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  
                </button>

                {isProfileDropdownOpen && (
                  <div
                    id="profile-dropdown"
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#1A1A1A] shadow-lg border border-[#E4E1FF] dark:border-[#2A2A2A] p-2 z-20"
                  >
                    <Link href="/profile">
                      <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8F9FF] dark:hover:bg-[#1A1A1A] text-[#121F3D] dark:text-[#E0E0E0]">
                        My Profile
                      </button>
                    </Link>
                    <Link href="/marketplace">
                      <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8F9FF] dark:hover:bg-[#1A1A1A] text-[#121F3D] dark:text-[#E0E0E0]">
                        My Collection
                      </button>
                    </Link>
                    <Link href="/marketplace">
                      <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8F9FF] dark:hover:bg-[#1A1A1A] text-[#121F3D] dark:text-[#E0E0E0]">
                        Settings
                      </button>
                    </Link>
                    <div className="my-1 border-t border-[#E4E1FF] dark:border-[#2A2A2A]"></div>
                    <button
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8F9FF] dark:hover:bg-[#1A1A1A] text-[#FF6B6B] dark:text-[#FF7E7E]"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Unauthenticated Actions */}
              <ThemeToggle />
              <Button
                className="rounded-full z-20 text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF]"
                onClick={handleLogin}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <VynixLogo size="sm" />
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <AnimatePresence>
              {isSearchExpanded ? (
                <motion.div
                  initial={{ width: 40, opacity: 0 }}
                  animate={{ width: 150, opacity: 1 }}
                  exit={{ width: 40, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative"
                >
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pr-8 h-9 rounded-full bg-white/80 dark:bg-[#1A1A1A]/80 border-[#E4E1FF] dark:border-[#2A2A2A]"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-9 w-9 rounded-full"
                    onClick={() => setIsSearchExpanded(false)}
                  >
                    <X className="h-4 w-4 text-[#121F3D] dark:text-[#E0E0E0]" />
                  </Button>
                </motion.div>
              ) : (
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSearchExpanded(true)}>
                  <Search className="h-5 w-5 text-[#121F3D] dark:text-[#E0E0E0]" />
                </Button>
              )}
            </AnimatePresence>

            {isAuthenticated && (
              <Link href="/marketplace/create">
                <Button
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF]"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <ThemeToggle />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`relative text-[#121F3D] dark:text-[#E0E0E0] font-medium text-lg py-2 ${
                pathname === item.link ? "text-[#6C63FF] dark:text-[#8075FF]" : ""
              }`}
            >
              <span className="block">{item.name}</span>
              {pathname === item.link && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6C63FF] dark:bg-[#8075FF] rounded-full" />
              )}
            </a>
          ))}

          {isAuthenticated ? (
            <>
              <div className="pt-4 border-t border-[#E4E1FF]/20 dark:border-[#2A2A2A] mt-4">
                <h3 className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm mb-2">Create</h3>
                <a
                  href="/marketplace/create"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#121F3D] dark:text-[#E0E0E0] font-medium py-2"
                >
                  List a Card
                </a>
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#121F3D] dark:text-[#E0E0E0] font-medium py-2"
                >
                  Bulk Upload
                </a>
                <a
                  href="/marketplace/create"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#121F3D] dark:text-[#E0E0E0] font-medium py-2"
                >
                  Create Collection
                </a>
              </div>
              <div className="pt-4 border-t border-[#E4E1FF]/20 dark:border-[#2A2A2A] mt-4">
                <a
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#121F3D] dark:text-[#E0E0E0] font-medium py-2"
                >
                  My Profile
                </a>
                <a
                  href="#"
                  onClick={() => {
                    setIsAuthenticated(false)
                    setIsMobileMenuOpen(false)
                  }}
                  className="block text-[#121F3D] dark:text-[#E0E0E0] font-medium py-2"
                >
                  Logout
                </a>
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col gap-4 pt-4 border-t border-[#E4E1FF]/20 dark:border-[#2A2A2A] mt-4">
              <NavbarButton
                onClick={() => {
                  setIsAuthenticated(true)
                  setIsMobileMenuOpen(false)
                }}
                variant="primary"
                className="w-full"
              >
                Get Started
              </NavbarButton>
            </div>
          )}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
