import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart3, MessageCircle, BookOpen, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: BarChart3, label: "Tracker", path: "/tracker" },
  { icon: MessageCircle, label: "Chat", path: "/chat" },
  { icon: BookOpen, label: "Resources", path: "/resources" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-foreground-muted hover:text-foreground hover:bg-muted"
              }`}
            >
              <IconComponent className={`w-5 h-5 mb-1 ${isActive ? "animate-pulse-glow" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;