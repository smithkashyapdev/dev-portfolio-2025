import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import ThemeProvider from './provider/ThemeProvider';

const geistFont = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Smith Kashyap | Full Stack Developer',
  description:
    'Portfolio of Smith Kashyap — a passionate full stack and mobile developer skilled in React, Node.js, MongoDB, and modern web technologies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistFont.variable}>
      <body className={geistFont.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
