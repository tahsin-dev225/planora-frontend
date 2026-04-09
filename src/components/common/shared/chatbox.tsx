"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { role: "ai", text: "Hi there! I'm Planora AI. How can I help you plan your next event in Bangladesh?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply || "Sorry, I couldn't process that." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-500 z-[60] flex items-center justify-center
          ${isOpen ? 'bg-gray-800 text-white rotate-90 scale-0 opacity-0' : 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-primary/30 hover:scale-110 hover:-translate-y-1 scale-100 opacity-100 rotate-0'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-[60] w-[90vw] sm:w-[400px] h-[600px] max-h-[85vh] flex flex-col bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 pointer-events-none translate-y-10'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-inner">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">Planora AI</h3>
              <p className="text-white/80 text-xs font-medium">Event Planning Assistant</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white transition-colors relative z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div data-lenis-prevent="true" className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-black/20 flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}>
              {m.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-auto border border-primary/20 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              
              <div 
                className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm shadow-sm
                  ${m.role === "user" 
                    ? "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded-br-sm border border-gray-200 dark:border-white/5" 
                    : "bg-primary text-white rounded-bl-sm shadow-primary/20"
                  }`}
              >
                {m.text}
              </div>

              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center flex-shrink-0 mt-auto border border-gray-300 dark:border-white/5 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start animate-in fade-in">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-auto border border-primary/20 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-primary text-white shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-[#161616] border-t border-gray-200 dark:border-white/5 relative z-10">
          <form onSubmit={sendMessage} className="relative flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-gray-100 dark:bg-[#202020] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white text-sm rounded-full pl-5 pr-14 py-3.5 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 shadow-inner"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-1.5 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:scale-95 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-md active:scale-95"
            >
              <Send className="w-4 h-4 mr-0.5 mt-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}