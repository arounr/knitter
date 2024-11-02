'use client';

import Link from 'next/link';
import { FiUser, FiLogIn } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  loggedIn: boolean;
}

export default function Header({ loggedIn }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center justify-between p-4 relative">
      
      {/* Profile or Login Icon on the Right */}
      <div className="absolute right-4">
        {loggedIn ? (
          <Link href="/profile" passHref>
            <button
              className={`flex items-center ${
                pathname === '/profile' ? 'text-[var(--color-button-bg)]' : 'text-[var(--color-text-primary)]'
              } hover:text-[var(--color-button-bg)]`}
            >
              <FiUser size={24} />
            </button>
          </Link>
        ) : (
          <Link href="/login" passHref>
            <button
              className={`flex items-center ${
                pathname === '/login' ? 'text-[var(--color-button-bg)]' : 'text-[var(--color-text-primary)]'
              } hover:text-[var(--color-button-bg)]`}
            >
              <FiLogIn size={24} />
            </button>
          </Link>
        )}
      </div>

      <div className="mx-auto flex space-x-4 items-center">
        <Link
          href="/library"
          className={`text-sm ${
            pathname === '/library' ? 'text-[var(--color-button-bg)]' : 'text-[var(--color-text-secondary)]'
          } hover:text-[var(--color-button-bg)]`}
        >
          Library
        </Link>
        
        {/* Centered Logo */}
        <Link href="/" className="text-lg font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-button-bg)]">
          Knitter
        </Link>

        <Link
          href="/catalog"
          className={`text-sm ${
            pathname === '/catalog' ? 'text-[var(--color-button-bg)]' : 'text-[var(--color-text-secondary)]'
          } hover:text-[var(--color-button-bg)]`}
        >
          Catalog
        </Link>
      </div>
    </header>
  );
}
