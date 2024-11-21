'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiLogIn, FiSettings, FiBell } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { Notification } from '@/types/notification';
import NotificationPopup from './notification-popup';
import { acceptNotification, declineNotification } from '@/actions';

interface HeaderProps {
  loggedIn: boolean;
  links: { url: string; name: string }[];
  notifications: Notification[];
}

export default function Header({
  loggedIn,
  links,
  notifications: initialNotifications,
}: HeaderProps) {
  const pathname = usePathname();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const closePopup = () => setIsPopupOpen(false);

  const handleAccept = (id: number) => {
    acceptNotification(id);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const handleDecline = (id: number) => {
    declineNotification(id);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const handleDismiss = (id: number) => {
    declineNotification(id);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const leftLinks = links.slice(0, Math.floor((links.length + 1) / 2));
  const rightLinks = links.slice(Math.floor((links.length + 1) / 2));

  return (
    <header className="w-full flex items-center justify-between p-4 relative bg-[var(--color-background)]">
      <div className="absolute right-4 flex space-x-4 items-center">
        {/* Notification Icon */}
        {loggedIn && (
          <div className="relative">
            <button
              onClick={togglePopup}
              className="relative flex items-center text-[var(--color-text-primary)] hover:text-[var(--color-button-bg)]"
            >
              <FiBell size={24} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-error)] text-[var(--color-white-text)] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            {isPopupOpen && (
              <NotificationPopup
                notifications={notifications}
                onClose={closePopup}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onDismiss={handleDismiss}
              />
            )}
          </div>
        )}

        {/* Settings Icon */}
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
