'use client'
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">

      <h1 className="text-5xl font-bold mb-4 text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Ups! Strona, której szukasz, nie istnieje.
      </p>
      <Link href="/">
        <a className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Powrót do strony głównej
        </a>
      </Link>
    </div>
  );
}
