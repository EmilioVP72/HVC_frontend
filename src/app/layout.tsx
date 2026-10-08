import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070708',
};

export const metadata: Metadata = {
  title: 'Aurum Fitness | Elite Performance Platform',
  description: 'Sistema Fitness de alto rendimiento con arquitectura Full Stack Express y Next.js. Paleta Dorado y Negro.',
  keywords: ['fitness', 'rutinas', 'hipertrofia', 'entrenamiento', 'aurum fitness', 'gold aesthetic'],
  authors: [{ name: 'Senior Full Stack Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
