import localFont from "next/font/local";
import { Inter, Exo_2 } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const exo2 = Exo_2({
  variable: "--font-exo",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
