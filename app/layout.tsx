import type { Metadata } from "next";
import { Sora, Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import "./globals.css";
// 1. Cargamos Sora para los titulares (Headlines)
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "800"], // Incluye los pesos usados en tus bocetos
});

// 2. Cargamos Hanken Grotesk para los textos del cuerpo (Body)
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "600"],
});

// 3. Cargamos Space Grotesk para la data técnica, botones y etiquetas HUD
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "UAPA VERSE - Feria Tecnológica Virtual",
  description: "Plataforma inmersiva de innovación digital impulsada por UAPA y CADESOFT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${hankenGrotesk.variable} ${spaceGrotesk.variable} bg-background text-on-surface antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
