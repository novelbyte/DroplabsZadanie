import Header from "./Header/page";
import Cart from "./cart/Cart";
import { CartProvider } from "./cart/CartContext";
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
      <body className="antialiased bg-[#0f172a]">
        <div>
          <CartProvider>
          <Header />
          <Cart />
          <main>{children}</main>
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
