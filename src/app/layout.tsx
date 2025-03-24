import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import ReduxProvider from './redux-provider';

import './globals.scss';
import 'react-datepicker/dist/react-datepicker.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Сборка',
  description: 'Сборка',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
