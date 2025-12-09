import Header from "./Header/page";
import "./globals.css";

export const metadata = {
  title: "Droplabs  zadanie",
  description: "Zadanie rekrutacyjne dla Droplabs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="relative">
      <body className={`$ antialiased bg-[#0f172a]`}>
        <div>
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
