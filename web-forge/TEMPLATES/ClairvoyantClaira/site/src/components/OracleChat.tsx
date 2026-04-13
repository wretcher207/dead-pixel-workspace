"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "oracle";
  content: string;
};

const oracleResponses = [
  "The cards suggest a period of transformation. What you're clinging to is the very thing blocking what's trying to reach you.",
  "I see water in your reading — emotion, intuition, something beneath the surface you haven't named yet. Trust what your body already knows.",
  "There's a door you keep walking past. You know which one. The hesitation isn't wisdom — it's fear dressed up as patience.",
  "The moon is waning. This is a time for release, not pursuit. Let something go this week and notice what fills the space.",
  "Your question carries its own answer. Read it back to yourself slowly. You already know.",
  "I see two paths, but you're not choosing between them — you're choosing between who you are and who you're becoming. They both cost something.",
  "Something buried is surfacing. Don't push it back down. The discomfort is the healing.",
];

export default function OracleChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "oracle",
      content:
        "The veil is thin tonight. Ask what weighs on you — I'll share what I see.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate oracle response
    setTimeout(() => {
      const response =
        oracleResponses[Math.floor(Math.random() * oracleResponses.length)];
      setMessages((prev) => [...prev, { role: "oracle", content: response }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  return (
    <section id="oracle" className="py-24 sm:py-32 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
            Ask the Oracle
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold text-glow mb-4">
            A Glimpse Beyond
          </h2>
          <p className="text-foreground/50 max-w-md mx-auto">
            Not a replacement for a real reading. Think of it as a candle in a
            dark room — enough light to see the next step.
          </p>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden border-glow"
        >
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gold/10">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="text-gold text-sm font-medium">The Oracle</p>
              <p className="text-foreground/40 text-xs">
                {isTyping ? "Gazing into the beyond..." : "Online"}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 sm:h-96 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gold/15 text-foreground/90 rounded-br-md"
                        : "bg-navy-lighter/50 text-foreground/70 rounded-bl-md border border-gold/10"
                    }`}
                  >
                    {msg.role === "oracle" && (
                      <Sparkles className="w-3 h-3 text-gold/50 inline-block mr-1 -mt-0.5" />
                    )}
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-navy-lighter/50 rounded-2xl rounded-bl-md px-4 py-3 border border-gold/10">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-gold/40 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 sm:px-6 py-4 border-t border-gold/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your question..."
                className="flex-1 bg-navy-lighter/40 border border-gold/10 rounded-full px-5 py-3 text-sm text-foreground/90 placeholder:text-foreground/30 focus:outline-none focus:border-gold/30 focus:shadow-[0_0_15px_rgba(252,211,77,0.1)] transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
