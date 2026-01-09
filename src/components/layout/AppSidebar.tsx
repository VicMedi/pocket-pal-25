import { User, MessageCircle, Receipt, Wallet } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Account", url: "/account", icon: User },
  { title: "Chat", url: "/chat", icon: MessageCircle },
  { title: "Expenses", url: "/expenses", icon: Receipt },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar"
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">SpendWise</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.url;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <NavLink
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                  <span>{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                    />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent/50 p-3">
            <p className="text-xs text-muted-foreground">
              Track your expenses with ease
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
