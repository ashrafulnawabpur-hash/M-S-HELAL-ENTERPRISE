import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "./data";

export interface CartLine {
  id: string;
  qty: number;
}

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  qty: number;
}

export type OrderStatus = "Pending" | "Confirmed" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    company: string;
    phone: string;
    address: string;
    note: string;
  };
  delivery: { label: string; charge: number };
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
}

export interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  contact: string;
  subject: string;
  message: string;
}

interface StoreValue {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;

  cart: CartLine[];
  cartCount: number;
  subtotal: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  orders: Order[];
  placeOrder: (o: Omit<Order, "id" | "createdAt" | "status">) => Order;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;

  inquiries: Inquiry[];
  addInquiry: (i: Omit<Inquiry, "id" | "createdAt">) => void;
  deleteInquiry: (id: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function persist(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => load("he_products_v4", PRODUCTS));
  const [cart, setCart] = useState<CartLine[]>(() => load("he_cart", []));
  const [orders, setOrders] = useState<Order[]>(() => load("he_orders", []));
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => load("he_inquiries", []));

  useEffect(() => persist("he_products_v4", products), [products]);
  useEffect(() => persist("he_cart", cart), [cart]);
  useEffect(() => persist("he_orders", orders), [orders]);
  useEffect(() => persist("he_inquiries", inquiries), [inquiries]);

  /* ------------------------------ products ----------------------------- */
  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => [
      { ...p, id: "p" + Date.now().toString(36) },
      ...prev,
    ]);
  }, []);

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetProducts = useCallback(() => {
    setProducts(PRODUCTS);
  }, []);

  /* -------------------------------- cart ------------------------------- */
  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found)
        return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(999, l.qty + qty) } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(999, qty) } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const productMap = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);

  const subtotal = useMemo(
    () =>
      cart.reduce((s, l) => {
        const p = productMap.get(l.id);
        return p ? s + p.price * l.qty : s;
      }, 0),
    [cart, productMap],
  );

  /* ------------------------------- orders ------------------------------ */
  const placeOrder = useCallback(
    (o: Omit<Order, "id" | "createdAt" | "status">) => {
      const order: Order = {
        ...o,
        id: "HE-" + String(Date.now()).slice(-6),
        createdAt: new Date().toISOString(),
        status: "Pending",
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return order;
    },
    [],
  );

  const setOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }, []);

  /* ------------------------------ inquiries ---------------------------- */
  const addInquiry = useCallback((i: Omit<Inquiry, "id" | "createdAt">) => {
    setInquiries((prev) => [
      { ...i, id: "INQ-" + String(Date.now()).slice(-6), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      resetProducts,
      cart,
      cartCount,
      subtotal,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      orders,
      placeOrder,
      setOrderStatus,
      deleteOrder,
      inquiries,
      addInquiry,
      deleteInquiry,
    }),
    [
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      resetProducts,
      cart,
      cartCount,
      subtotal,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      orders,
      placeOrder,
      setOrderStatus,
      deleteOrder,
      inquiries,
      addInquiry,
      deleteInquiry,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
