import NextAuthProvider from "@/providers/Nextauth.provider";
import "./globals.css";
import { Assistant, Inter, Lora, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const monserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const lora = Lora({
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-lora",
});
const assistant = Assistant({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-assistant",
});

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
      <body
        className={`${monserrat.variable} ${lora.variable} ${assistant.variable}`}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
