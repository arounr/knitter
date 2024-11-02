import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found</title>
      </head>
      <body className="min-h-screen flex items-center justify-center bg-[var(--color-background)] font-sans text-[var(--color-text-primary)]">
        <div className="text-center p-4">
          <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link href="/" className="mt-4 inline-block px-4 py-2 bg-[var(--color-button-bg)] text-white rounded-md hover:bg-[var(--color-button-bg-hover)]">
            Go Back Home
          </Link>
        </div>
      </body>
    </html>
  );
}
