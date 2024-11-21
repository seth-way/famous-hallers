import "./globals.css";
import cx from "classnames";
import { sfPro, exo2, inter } from "@/app/fonts";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Providers from "@/app/providers";
import Navbar from "@/app/components/layout/navbar";
import Footer from "@/app/components/layout/footer";

export const metadata = {
  title: "Famous Hallers",
  description: "A sports trivia challenge.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={cx(exo2.variable, inter.variable, sfPro.variable)}>
        <Providers>
          <main className="font-exo relative flex min-h-screen w-full flex-col items-center bg-background text-foreground dark">
            <Suspense fallback="...">
              <Navbar />
            </Suspense>
            {children}
            <Footer />
          </main>
        </Providers>
        <VercelAnalytics />
      </body>
    </html>
  );
}
