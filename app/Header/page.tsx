'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 backdrop-blur-lg z-20 bg-[#0f172a] shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <p className="text-white/70 md:block">Droplabs zadanie rekrutacyjne</p>

        <nav className="flex space-x-4 items-center">
          <Link href="/" passHref>
            <span className="text-white/70 text-xl xl:text-2xl font-bold hover:text-white cursor-pointer">
              HOME
            </span>
          </Link>

          <Link href="/products" passHref>
            <span className="text-white/70 text-xl xl:text-2xl font-bold hover:text-white cursor-pointer">
              PRODUCTS
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
