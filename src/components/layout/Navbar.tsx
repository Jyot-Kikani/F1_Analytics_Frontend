"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../themeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`bg-background/20 text-foreground shadow-sm transition-colors duration-300 ${
        isOpen ? "rounded-[30px]" : "rounded-[64px]"
      } my-5 backdrop-blur-[10px] z-50 fixed top-0 left-1/2 transform -translate-x-1/2 w-[80%]`}
    >
      <div className="container mx-auto px-8 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          F1 Analytics
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavLinks onLinkClick={() => setIsOpen(false)} />
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
      <div
        className={`
        md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? "max-h-96" : "max-h-0"}
      `}
      >
        <div className="px-4 pb-4 pt-2 space-y-2">
          <NavLinks onLinkClick={() => setIsOpen(false)} />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const baseClass =
    "block px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const linkClass = `${baseClass} text-muted-foreground hover:text-primary`;

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <>
      <Link href="/compare" className={linkClass} onClick={handleLinkClick}>
        Compare
      </Link>
      <Link href="/schedule" className={linkClass} onClick={handleLinkClick}>
        Schedule
      </Link>
      <Link href="/profile" className={linkClass} onClick={handleLinkClick}>
        Profile
      </Link>
      <Link href="/auth" className={linkClass} onClick={handleLinkClick}>
        Sign In
      </Link>
    </>
  );
}
