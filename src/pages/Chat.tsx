import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import BottomNav from "@/components/layout/BottomNav";
import { Send, ArrowLeft, Heart, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI wellness companion. I'm here to listen, support, and help you navigate your mental wellness journey. How are you feeling today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string) => {
    // Simple keyword-based responses for demo
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("sad") || lowerMessage.includes("down") || lowerMessage.includes("depressed")) {
      return "I hear that you're feeling down, and I want you to know that your feelings are valid. It's okay to have difficult days. Would you like to try a quick breathing exercise together, or would you prefer to talk about what's making you feel this way?";
    }
    
    if (lowerMessage.includes("anxious") || lowerMessage.includes("worried") || lowerMessage.includes("stress")) {
      return "Anxiety can feel overwhelming, but remember that you're not alone in this. Let's take a moment to ground ourselves. Can you name 5 things you can see around you right now? This is a technique called 5-4-3-2-1 grounding that can help calm your mind.";
    }
    
    if (lowerMessage.includes("angry") || lowerMessage.includes("mad") || lowerMessage.includes("frustrated")) {
      return "I understand you're feeling frustrated. Anger is a natural emotion that tells us something important needs attention. Would it help to talk about what's causing these feelings? Sometimes expressing what's bothering us can help us process it better.";
    }
    
    if (lowerMessage.includes("good") || lowerMessage.includes("great") || lowerMessage.includes("happy")) {
      return "That's wonderful to hear! I'm so glad you're feeling positive. What's been contributing to your good mood today? Celebrating these moments can help us remember what brings us joy.";
    }
    
    if (lowerMessage.includes("tired") || lowerMessage.includes("exhausted")) {
      return "Feeling tired can affect our emotional well-being too. Are you getting enough sleep? Sometimes fatigue can make everything feel more difficult. Let's talk about some healthy sleep habits that might help you feel more rested.";
    }
    
    return "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you've been feeling lately? Remember, there's no judgment here – this is your safe space to express yourself.";
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(newMessage),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickResponses = [
    "I'm feeling anxious",
    "I had a good day",
    "I'm feeling overwhelmed",
    "I need some motivation"
  ];

  const handleQuickResponse = (response: string) => {
    setNewMessage(response);
    setTimeout(handleSendMessage, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col pb-20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <Avatar className="w-10 h-10 ring-2 ring-primary/20">
            <AvatarFallback className="bg-gradient-primary text-white">
              <Brain className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="font-semibold text-foreground">AI Wellness Companion</h1>
            <p className="text-sm text-success flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              Online & Ready to Help
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
              {!message.isUser && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-primary text-white text-xs">
                    <Heart className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <Card className={`${
                message.isUser 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card hover:bg-card-hover"
              } wellness-card`}>
                <CardContent className="p-3">
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 opacity-70 ${
                    message.isUser ? "text-primary-foreground/70" : "text-foreground-muted"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-primary text-white text-xs">
                  <Heart className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              
              <Card className="bg-card wellness-card">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Responses */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-foreground-muted mb-3">Quick responses:</p>
          <div className="flex flex-wrap gap-2">
            {quickResponses.map((response, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickResponse(response)}
                className="text-xs"
              >
                {response}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-card/80 backdrop-blur-sm border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isTyping}
            className="wellness-button bg-primary hover:bg-primary-deep text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chat;