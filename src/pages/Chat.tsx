import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi! I'm your financial assistant. Tell me about your expenses and I'll help you track them. You can say things like 'I spent 250 pesos on gas' or ask 'Where did I spend more money this week?'",
    sender: "bot",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    content: "I spent 250 pesos on gas with my credit card",
    sender: "user",
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: "3",
    content: "Got it! I've recorded your expense:\n\n💳 **Gas** - $250 MXN\n📅 Today\n💰 Credit Card\n\nWould you like to add any notes or categorize it differently?",
    sender: "bot",
    timestamp: new Date(Date.now() - 2900000),
  },
  {
    id: "4",
    content: "Where did I spend more money this week?",
    sender: "user",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "5",
    content: "Based on your expenses this week, here's a breakdown:\n\n🍔 **Food & Dining** - $1,200 MXN (42%)\n⛽ **Transportation** - $850 MXN (30%)\n🛒 **Groceries** - $500 MXN (18%)\n🎬 **Entertainment** - $280 MXN (10%)\n\nFood & Dining is your biggest category. Would you like tips on reducing these expenses?",
    sender: "bot",
    timestamp: new Date(Date.now() - 1700000),
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've noted that! Is there anything specific you'd like me to help you with regarding your expenses?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <PageTransition>
      <div className="flex h-screen flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 border-b border-border bg-card px-6 py-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Financial Assistant</h1>
            <p className="text-sm text-muted-foreground">Always here to help with your expenses</p>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">AI Powered</span>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-background px-6 py-4">
          <div className="mx-auto max-w-3xl space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.sender === "user"
                        ? "bg-chat-user text-primary-foreground"
                        : "bg-chat-bot text-foreground shadow-fintech-sm"
                    )}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        message.sender === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl bg-chat-bot px-4 py-3 shadow-fintech-sm">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-muted-foreground" />
                      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-muted-foreground [animation-delay:0.2s]" />
                      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-muted-foreground [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-card px-6 py-4"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me about an expense or ask a question..."
              className="flex-1 border-0 bg-secondary focus-visible:ring-1 focus-visible:ring-primary"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
            Try: "I spent 500 on groceries" or "Show me my monthly summary"
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
