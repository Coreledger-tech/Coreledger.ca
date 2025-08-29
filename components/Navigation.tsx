"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Contextus", href: "/contextus" },
    { name: "Podcast", href: "/podcast" },
    { name: "Lab", href: "/lab" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-smooth ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/navbar-logo.png" 
              alt="Coreledger Technologies" 
              width={180} 
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-body text-sm font-medium transition-smooth hover:text-[#0D9488] ${
                  pathname === item.href 
                    ? 'text-[#0D9488]' 
                    : 'text-[#002C3E]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact">
              <Button 
                size="sm" 
                className="bg-[#0D9488] hover:bg-[#0f766e] text-white transition-smooth"
              >
                Let's talk
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                    pathname === item.href
                      ? 'text-[#0D9488] bg-[#F5F7F9]'
                      : 'text-[#002C3E] hover:text-[#0D9488] hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link href="/contact">
                  <Button 
                    size="sm" 
                    className="w-full bg-[#0D9488] hover:bg-[#0f766e] text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Let's talk
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
