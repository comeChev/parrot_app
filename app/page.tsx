import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Bienvenue sur le site du Garage V. Parrot</h1>
      <Link href="/upload">Upload image</Link>
    </main>
  );
}
