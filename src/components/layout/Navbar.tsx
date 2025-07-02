import Link from "next/link";
import ThemeToggle from "../themeToggle";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          F1 Analytics
        </Link>
        <div>
          <Link
            href="/compare"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Compare
          </Link>
          <Link
            href="/schedule"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Schedule
          </Link>
          <Link
            href="/profile"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Profile
          </Link>
          <Link
            href="/auth"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Sign In
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
