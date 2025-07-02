import ThemeToggle from "../themeToggle";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-bold">
          F1 Analytics
        </a>
        <div>
          <a
            href="/compare"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Compare
          </a>
          <a
            href="/schedule"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Schedule
          </a>
          <a
            href="/profile"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Profile
          </a>
          <a
            href="/auth"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Sign In
          </a>
          <ThemeToggle />
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
}
