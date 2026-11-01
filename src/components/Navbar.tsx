"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { assetUrl } from "@/lib/assets";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "skills", "projects", "experience", "contact"];
      const scrollPos = window.scrollY + 140;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4">
      <nav
        className={`flex items-center justify-between gap-4 md:gap-12 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/[0.08] backdrop-blur-xl transition-all duration-300 w-full max-w-xl md:max-w-max ${
          scrolled
            ? "bg-black/85 shadow-[0_8px_32px_rgba(0,0,0,0.6)] border-white/[0.12]"
            : "bg-black/70 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        }`}
      >
        {/* Brand / Logo */}
        <Link
          href="#home"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 font-bold text-sm tracking-tight text-white hover:text-white/90 transition-colors shrink-0"
        >
          <img
            src={assetUrl("/logo.webp")}
            alt="Rukshan Amodya"
            className="w-5 h-5 object-contain rounded-full border border-white/10"
          />
          <span className="text-xs sm:text-sm font-semibold tracking-tight">amodya.dev</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 text-xs md:text-sm font-medium transition-all rounded-full ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full bg-white/[0.06] text-neutral-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-4 right-4 bg-black/95 border border-white/[0.12] rounded-2xl p-4 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? "bg-white/[0.1] text-white font-semibold"
                    : "text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200"
                }`}
              >
                <span>{link.name}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
