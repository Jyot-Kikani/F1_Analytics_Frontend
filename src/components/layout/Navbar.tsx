'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../themeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/20 text-foreground shadow-sm transition-colors duration-300 rounded-full my-5 backdrop-blur-[10px] z-50 fixed left-1/2 transform -translate-x-1/2 w-[80%]">
      <div className="container mx-auto px-8 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          F1 Analytics
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavLinks />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-muted transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLinks />
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}

function NavLinks() {
  const baseClass =
    "block px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const linkClass = `${baseClass} text-muted-foreground hover:text-primary`;

  return (
    <>
      <Link href="/compare" className={linkClass}>
        Compare
      </Link>
      <Link href="/schedule" className={linkClass}>
        Schedule
      </Link>
      <Link href="/profile" className={linkClass}>
        Profile
      </Link>
      <Link href="/auth" className={linkClass}>
        Sign In
      </Link>
    </>
  );
}
