import Link from "next/link";

// Modern UI Footer component with dark mode support
export default function AppFooter() {
  return (
    <footer className="w-full bg-white/80 dark:bg-zinc-900/80 border-t border-green-100 dark:border-zinc-700 py-6 flex flex-col items-center gap-2 transition-colors">
      <div className="flex items-center gap-2 text-green-700 dark:text-green-300 font-bold text-lg">
        <span className="text-2xl">⛽</span>
        <span>Fuel Calculator</span>
      </div>
      <div className="text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
      <div className="flex gap-4 mt-1">
        <Link
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition"
        >
          GitHub
        </Link>
        <Link
          href="/privacy"
          className="text-gray-500 dark:text-gray-400 hover:underline hover:text-green-700 dark:hover:text-green-300 transition"
        >
          Privacy
        </Link>
        <Link
          href="/contact"
          className="text-gray-500 dark:text-gray-400 hover:underline hover:text-green-700 dark:hover:text-green-300 transition"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}