import Link from "next/link";
import type { ReactNode } from "react";
import { CartCount } from "@/components/velune-store/VeluneCart";

export function VeluneStoreShell({ children }: { children: ReactNode }) {
  return (
    <div className="veluneStore">
      <header className="header">
        <div className="wrap nav">
          <Link className="brand" href="/store">Velune</Link>
          <nav className="links" aria-label="Velune store navigation">
            <Link href="/store#shop">Shop</Link>
            <Link href="/store#series">Series</Link>
            <Link href="/store/shipping">Shipping</Link>
            <Link href="/store/returns">Returns</Link>
            <Link className="cartPill" href="/store/cart">Bag (<CartCount />)</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="footer" id="footer">
        <div className="wrap footerGrid">
          <div>
            <h4>Velune Quiet Extracts</h4>
            <p>Low-saturation botanical daily tonics and gentle home objects for calm, simple routines.</p>
            <p>Currency: USD. Current sales region: United States.</p>
          </div>
          <div>
            <h4>Support</h4>
            <Link href="/store/shipping">Shipping</Link>
            <Link href="/store/returns">Returns</Link>
            <Link href="/store/contact">Contact</Link>
          </div>
          <div>
            <h4>Orders</h4>
            <Link href="/store/cart">Shopping Bag</Link>
            <Link href="/store/checkout">Checkout</Link>
            <Link href="/store/track-order">Track Order</Link>
          </div>
          <div>
            <h4>Legal</h4>
            <Link href="/store/privacy">Privacy Policy</Link>
            <Link href="/store/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
