"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonButton from "@/components/ui/NeonButton";
import {
  orderableItems,
  upsellPrompts,
  type CartItem,
  type OrderItem,
  type UpsellPrompt,
} from "@/data/ordering";

export default function OrderingSection() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeUpsell, setActiveUpsell] = useState<UpsellPrompt | null>(null);

  function addToCart(item: OrderItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });

    const prompt = upsellPrompts.find((u) => u.triggerId === item.id);
    if (prompt) {
      setActiveUpsell(prompt);
      setTimeout(() => setActiveUpsell(null), 4000);
    }
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  }

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  const grouped = orderableItems.reduce<Record<string, OrderItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section id="order" className="bg-void py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl text-text-primary leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Order Ahead
        </h2>
        <p className="text-text-muted text-sm mb-10">
          Pick what you want. We&apos;ll have it ready.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Menu list */}
          <div className="lg:col-span-3">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-8">
                <p className="text-xs tracking-[0.2em] uppercase text-text-faint mb-3 pb-2 border-b border-white/5">
                  {category}
                </p>
                {items.map((item) => {
                  const inCart = cart.find((c) => c.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b border-white/5"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="text-text-primary text-sm font-medium truncate">{item.name}</span>
                        <span className="text-text-faint text-xs flex-shrink-0">${item.price.toFixed(2)}</span>
                      </div>
                      {inCart ? (
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            aria-label={`Remove one ${item.name}`}
                            className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                          >
                            −
                          </button>
                          <span className="text-text-primary text-sm w-5 text-center tabular-nums">
                            {inCart.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            aria-label={`Add another ${item.name}`}
                            className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          aria-label={`Add ${item.name} to order`}
                          className="flex-shrink-0 text-xs text-text-faint hover:text-neon focus-visible:text-neon transition-colors tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon rounded px-1"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Cart */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <p
                className="text-xl text-text-primary mb-6 tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your Order
              </p>

              {cart.length === 0 ? (
                <p className="text-text-faint text-sm py-6">
                  Nothing yet. Add something from the menu.
                </p>
              ) : (
                <>
                  <div className="flex flex-col gap-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-sm">
                        <span className="text-text-muted tabular-nums w-4">{item.quantity}x</span>
                        <span className="text-text-primary flex-1">{item.name}</span>
                        <span className="text-text-muted tabular-nums">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-white/5 mb-4" />

                  <div className="flex justify-between mb-6">
                    <span className="text-text-primary font-medium">Total</span>
                    <span className="text-text-primary font-medium tabular-nums">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <NeonButton fullWidth href="tel:2072030042">
                    Call to Place Order
                  </NeonButton>
                  <p className="text-text-faint text-xs text-center mt-3">
                    207-203-0042
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upsell toast */}
      <AnimatePresence>
        {activeUpsell && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 glass px-5 py-3 flex items-center gap-4 whitespace-nowrap rounded-lg"
          >
            <span className="text-text-primary text-sm">{activeUpsell.message}</span>
            <button
              onClick={() => {
                addToCart({
                  id: activeUpsell.addItemId,
                  name: activeUpsell.addItemName,
                  price: activeUpsell.addPrice,
                  category: "",
                });
                setActiveUpsell(null);
              }}
              className="text-neon text-xs font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon rounded"
            >
              Add
            </button>
            <button
              onClick={() => setActiveUpsell(null)}
              aria-label="Dismiss"
              className="text-text-faint text-xs hover:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon rounded"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
