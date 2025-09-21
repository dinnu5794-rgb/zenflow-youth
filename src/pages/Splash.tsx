import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Brain, Sparkles } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => navigate("/onboarding"), 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`fixed inset-0 bg-gradient-hero flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center text-white animate-fade-in">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse-glow">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <Brain className="absolute -top-2 -right-2 w-8 h-8 text-wellness-green animate-bounce" />
          <Sparkles className="absolute -bottom-1 -left-3 w-6 h-6 text-wellness-orange animate-pulse" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">MindWell</h1>
        <p className="text-xl font-light opacity-90">Your Mental Wellness Journey</p>
        
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;