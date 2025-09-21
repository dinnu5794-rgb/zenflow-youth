import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNav from "@/components/layout/BottomNav";
import { 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Calendar, 
  Bell, 
  Sparkles,
  Brain,
  Zap,
  BookOpen,
  Activity
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [userName] = useState("Alex");
  const [currentMood, setCurrentMood] = useState<string | null>(null);

  const dailyTips = [
    {
      icon: Heart,
      title: "Mindful Breathing",
      description: "Take 5 deep breaths to center yourself",
      category: "Mindfulness",
      gradient: "bg-gradient-wellness"
    },
    {
      icon: Brain,
      title: "Gratitude Practice",
      description: "Write down 3 things you're grateful for today",
      category: "Reflection",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Zap,
      title: "Quick Movement",
      description: "Do 10 jumping jacks to boost your energy",
      category: "Physical",
      gradient: "bg-gradient-hero"
    }
  ];

  const quickActions = [
    { icon: MessageCircle, label: "AI Chat", color: "text-primary", path: "/chat" },
    { icon: BookOpen, label: "Journal", color: "text-secondary", path: "/journal" },
    { icon: Activity, label: "Meditation", color: "text-wellness-green", path: "/meditation" },
    { icon: TrendingUp, label: "Progress", color: "text-accent", path: "/tracker" }
  ];

  const moodOptions = [
    { emoji: "😊", label: "Great", value: "great" },
    { emoji: "🙂", label: "Good", value: "good" },
    { emoji: "😐", label: "Okay", value: "okay" },
    { emoji: "😔", label: "Low", value: "low" },
    { emoji: "😰", label: "Stressed", value: "stressed" }
  ];

  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
    toast.success(`Mood logged: ${mood}`);
  };

  const handleQuickAction = (action: any) => {
    toast.info(`Opening ${action.label}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-calm pb-20">
      {/* Header */}
      <div className="p-6 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 ring-2 ring-primary/20">
              <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
              <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-foreground">Good morning, {userName}!</h1>
              <p className="text-sm text-foreground-muted">How are you feeling today?</p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Mood Check */}
        <Card className="wellness-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="w-5 h-5 text-primary" />
              Quick Mood Check
            </CardTitle>
            <CardDescription>How are you feeling right now?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-2">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.value}
                  variant={currentMood === mood.value ? "default" : "outline"}
                  size="sm"
                  className={`flex-1 h-auto py-3 flex-col gap-1 ${
                    currentMood === mood.value 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => handleMoodSelect(mood.value)}
                >
                  <span className="text-lg">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Wellness Tips */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Daily Wellness Tips</h2>
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          </div>
          
          <div className="space-y-3">
            {dailyTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <Card key={index} className="wellness-card cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl ${tip.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{tip.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {tip.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground-muted">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card key={index} className="wellness-card cursor-pointer group" onClick={() => handleQuickAction(action)}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-background-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <IconComponent className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <h3 className="font-medium text-foreground">{action.label}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Weekly Progress Preview */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              This Week's Progress
            </CardTitle>
            <CardDescription>You're doing great! Keep it up.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground-muted">Mood Logs</span>
                <span className="text-sm font-medium">5/7 days</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '71%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground-muted">Meditation Minutes</span>
                <span className="text-sm font-medium">45 mins</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating AI Chat Button */}
      <Button className="fab">
        <MessageCircle className="w-6 h-6" />
      </Button>

      <BottomNav />
    </div>
  );
};

export default Dashboard;