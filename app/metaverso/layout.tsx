import { Sora, Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

const fontHeadline = Sora({
  subsets: ["latin"],
  variable: "--font-env-headline",
  weight: ["600", "700"],
});

const fontBody = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-env-body",
  weight: ["400", "500"],
});

const fontLabel = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-env-label",
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "UAPAverse | Metaverso Tecnológico",
  description:
    "Feria tecnológica 3D de UAPA y CADESOFT — Universidad Abierta para Adultos",
};

export default function MetaversoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${fontHeadline.variable} ${fontBody.variable} ${fontLabel.variable} relative h-screen w-screen overflow-hidden bg-[#030014]`}
    >
      {children}
    </div>
  );
}
