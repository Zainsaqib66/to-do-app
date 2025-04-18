'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb] dark:from-[#0f172a] dark:to-[#1e293b] text-[#111827] dark:text-[#f3f4f6] transition-all">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <Image
          className="dark:invert"
          src="/todo-icon.svg"
          alt="Todo App Logo"
          width={80}
          height={80}
          priority
        />
        <h1 className="text-3xl font-bold">Welcome to Your Todo App 🚀</h1>
        <p className="max-w-md text-base sm:text-lg text-gray-700 dark:text-gray-300">
          Organize your day, manage tasks, and get more done with your simple and beautiful Todo list.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            className="rounded-full border border-transparent bg-[#3f51b5] text-white px-5 py-3 text-sm font-medium hover:bg-[#2c3e91] transition"
            href="/first"
          >
            Start Managing Tasks
          </Link>
          <a
            className="rounded-full border border-gray-300 dark:border-gray-600 px-5 py-3 text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap justify-center text-sm text-gray-600 dark:text-gray-400">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Powered by Next.js
        </a>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Deployed on Vercel
        </a>
      </footer>
    </div>
  );
}
