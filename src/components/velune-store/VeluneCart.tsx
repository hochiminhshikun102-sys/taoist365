"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatUsd, type VeluneProduct } from "@/lib/velune-store";

type CartItem = { sku: string; slug: string; name: string; price: number; qty: number };
const CART_KEY = "velune_audit_cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(CART_KEY) || "[]") as CartItem[];
  } catch {
    return [];
  }
}

function writeCart(cart: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("velune-cart-change"));
}

export function CartCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => setCount(readCart().reduce((sum, item) => sum + item.qty, 0));
    update();
    window.addEventListener("velune-cart-change", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("velune-cart-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return <>{count}</>;
}

export function ProductPurchaseControls({ product }: { product: VeluneProduct }) {
  const [qty, setQty] = useState(1);
  const add = () => {
    const cart = readCart();
    const existing = cart.find((item) => item.sku === product.sku);
    if (existing) existing.qty += qty;
    else cart.push({ sku: product.sku, slug: product.slug, name: product.productName, price: product.price, qty });
    writeCart(cart);
  };
  const buyNow = () => {
    add();
    window.location.href = "/store/checkout";
  };
  return (
    <div className="qtyRow">
      <input
        aria-label="Quantity"
        type="number"
        min={1}
        max={12}
        value={qty}
        onChange={(event) => setQty(Math.max(1, Number(event.target.value) || 1))}
      />
      <button className="button" type="button" onClick={add}>Add to Cart</button>
      <button className="buttonSecondary" type="button" onClick={buyNow}>Buy Now</button>
    </div>
  );
}

export function CartRuntime() {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const update = () => setCart(readCart());
    update();
    window.addEventListener("velune-cart-change", update);
    return () => window.removeEventListener("velune-cart-change", update);
  }, []);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const remove = (sku: string) => writeCart(cart.filter((item) => item.sku !== sku));

  if (!cart.length) {
    return <div className="notice">Your bag is empty. <Link href="/store#shop">Return to the collection</Link>.</div>;
  }

  return (
    <>
      <table className="cartTable">
        <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Action</th></tr></thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.sku}>
              <td><Link href={`/store/products/${item.slug}`}>{item.name}</Link><br /><small>{item.sku}</small></td>
              <td>{item.qty}</td>
              <td>{formatUsd(item.price * item.qty)}</td>
              <td><button className="buttonSecondary" type="button" onClick={() => remove(item.sku)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="notice" style={{ marginTop: 16 }}>
        <strong>Estimated subtotal: {formatUsd(subtotal)} USD</strong><br />
        Shipping is currently limited to United States addresses for review.
      </div>
      <div style={{ marginTop: 16 }}>
        <Link className="button" href="/store/checkout">Proceed to Checkout</Link>
      </div>
    </>
  );
}

export function CheckoutRuntime() {
  const [submitted, setSubmitted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => setCart(readCart()), []);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {submitted ? (
        <div className="notice">
          <strong>Order request received.</strong><br />
          This review storefront records a basic checkout request for flow testing. Payment activation remains disabled until merchant approval.
        </div>
      ) : null}
      <div className="notice" style={{ marginTop: submitted ? 16 : 0 }}>
        <strong>Order summary: {formatUsd(subtotal)} USD</strong><br />United States delivery only during review.
      </div>
      <form
        className="formGrid"
        onSubmit={(event) => {
          event.preventDefault();
          writeCart([]);
          setCart([]);
          setSubmitted(true);
        }}
      >
        <div className="field"><label>First name</label><input required autoComplete="given-name" /></div>
        <div className="field"><label>Last name</label><input required autoComplete="family-name" /></div>
        <div className="field"><label>Email</label><input required type="email" autoComplete="email" /></div>
        <div className="field"><label>Phone</label><input required autoComplete="tel" /></div>
        <div className="field"><label>Address line 1</label><input required autoComplete="address-line1" /></div>
        <div className="field"><label>Address line 2</label><input autoComplete="address-line2" /></div>
        <div className="field"><label>City</label><input required autoComplete="address-level2" /></div>
        <div className="field"><label>State</label><input required autoComplete="address-level1" /></div>
        <div className="field"><label>ZIP code</label><input required autoComplete="postal-code" /></div>
        <div className="field"><label>Country</label><select required defaultValue="United States"><option>United States</option></select></div>
        <div className="field" style={{ gridColumn: "1 / -1" }}><label>Order note</label><textarea rows={4} /></div>
        <button className="button" type="submit">Submit Checkout Request</button>
      </form>
    </>
  );
}
