'use client';

import Link from 'next/link';
import { FiLogIn, FiSettings } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  loggedIn: boolean;
  links: { url: string; name: string }[];
}

export default function Header({ loggedIn, links }: HeaderProps) {
  const pathname = usePathname();

  // Divide the links into left and right arrays to balance them around the centered logo

  const leftLinks = links.slice(0, Math.floor((links.length + 1) / 2));
  const rightLinks = links.slice(Math.floor((links.length + 1) / 2));

  return (
    <header className="w-full flex items-center justify-between p-4 relative">
      {/* Profile or Login Icon on the Right */}
      <div className="absolute right-4">
        {loggedIn ? (
          <Link href="/profile" passHref>
            <button
              className={`flex items-center ${
                pathname === '/profile'
                  ? 'text-[var(--color-button-bg)]'
                  : 'text-[var(--color-text-primary)]'
              } hover:text-[var(--color-button-bg)]`}
            >
              <FiSettings size={24} />
            </button>
          </Link>
        ) : (
          <Link href="/login" passHref>
            <button
              className={`flex items-center ${
                pathname === '/login'
                  ? 'text-[var(--color-button-bg)]'
                  : 'text-[var(--color-text-primary)]'
              } hover:text-[var(--color-button-bg)]`}
            >
              <FiLogIn size={24} />
            </button>
          </Link>
        )}
      </div>

      <div className="mx-auto flex space-x-4 items-center">
        {/* Left Links */}
        {leftLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className={`text-sm ${
              pathname === link.url
                ? 'text-[var(--color-button-bg)]'
                : 'text-[var(--color-text-secondary)]'
            } hover:text-[var(--color-button-bg)]`}
          >
            {link.name}
          </Link>
        ))}

        {/* Centered Logo */}
        <Link
          href="/"
          className="text-lg font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-button-bg)]"
        >
          Knitter
        </Link>

        {/* Right Links */}
        {rightLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className={`text-sm ${
              pathname === link.url
                ? 'text-[var(--color-button-bg)]'
                : 'text-[var(--color-text-secondary)]'
            } hover:text-[var(--color-button-bg)]`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
