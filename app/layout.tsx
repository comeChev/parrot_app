import NextAuthProvider from "@/providers/Nextauth.provider";
import "./globals.css";

export const metadata = {
  title: "Garage V. Parrot",
  description:
    "Bienvenue sur le site de la Garage V. Parrot. Nous sommes spécialisés dans la réparation, l'entretien et la vente de véhicules de toutes marques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`flex flex-col min-h-screen font-title w-full`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
