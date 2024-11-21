import localFont from "next/font/local";
import { Inter, Exo_2, Bokor } from "next/font/google";

export const bokor = Bokor({
  variable: "--font-bokor",
  weight: "400",
  subsets: ["khmer", "latin"],
});

export const exo2 = Exo_2({
  variable: "--font-exo",
  weight: ["300", "400"],
});

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
