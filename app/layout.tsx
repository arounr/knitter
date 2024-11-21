import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from './ui/header';
import Footer from './ui/footer';
import { Notification } from './types/notification';
import { getNotifications } from './actions';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Knitter',
  description: '',
};

const links = [
  {
    url: '/library',
    name: 'Library',
  },
  {
    url: '/catalog',
    name: 'Catalog',
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();
  // const loggedIn = Boolean(cookieStore.get('jwt')?.value);

  const notificationsResult = await getNotifications();
  const loggedIn = !('error' in notificationsResult); // can borrow result from getting notifs to determine if user is logged in or not

  let notifications: Notification[] = [];
  if (
    'data' in notificationsResult &&
    Array.isArray(notificationsResult.data)
  ) {
    notifications = notificationsResult.data;
  }

  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text-primary)] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header
          loggedIn={loggedIn}
          links={links}
          notifications={notifications}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
