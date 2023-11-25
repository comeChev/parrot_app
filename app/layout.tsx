import "./globals.css";

import NextAuthProvider from "@/providers/Nextauth.provider";
import { Toaster } from "react-hot-toast";
import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#991B1B",
};
export const metadata = {
  title: "Garage V. Parrot",
  description:
    "Bienvenue sur le site Garage V. Parrot. Situés à Toulouse, dans le Gard en France, nous sommes spécialisés dans la réparation, l'entretien et la vente de véhicules de toutes marques.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`flex flex-col min-h-screen w-full`}>
        <NextAuthProvider>
          <Toaster position="top-right" />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
