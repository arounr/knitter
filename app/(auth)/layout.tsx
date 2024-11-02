import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import Footer from '../ui/footer';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Knitter',
  description: '',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col bg-[var(--color-background)] font-sans text-[var(--color-text-primary)] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='flex-grow flex flex-col items-center justify-center w-full'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
