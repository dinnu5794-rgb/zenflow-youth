import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/layout/BottomNav";
import { 
  TrendingUp, 
  Heart, 
  Brain,
  Activity,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import { toast } from "sonner";

const Tracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const [todayStress, setTodayStress] = useState<number | null>(null);

  // Mock data for demonstration
  const moodData = [
    { day: "Mon", mood: 7, stress: 4 },
    { day: "Tue", mood: 6, stress: 6 },
    { day: "Wed", mood: 8, stress: 3 },
    { day: "Thu", mood: 5, stress: 7 },
    { day: "Fri", mood: 9, stress: 2 },
    { day: "Sat", mood: 8, stress: 3 },
    { day: "Sun", mood: 7, stress: 4 }
  ];

  const weeklyStats = {
    avgMood: 7.1,
    avgStress: 4.1,
    moodTrend: "up",
    stressTrend: "down"
  };

  const insights = [
    {
      type: "positive",
      icon: TrendingUp,
      title: "Mood Improving",
      description: "Your mood has been trending upward over the past week. Keep up the great work!",
      color: "text-success"
    },
    {
      type: "neutral",
      icon: Brain,
      title: "Stress Management",
      description: "Your stress levels are moderate. Consider trying some mindfulness exercises.",
      color: "text-warning"
    },
    {
      type: "tip",
      icon: Heart,
      title: "Weekend Boost",
      description: "You tend to feel better on weekends. What activities bring you joy?",
      color: "text-primary"
    }
  ];

  const handleMoodLog = (mood: number, type: 'mood' | 'stress') => {
    if (type === 'mood') {
      setTodayMood(mood);
      toast.success(`Mood logged: ${mood}/10`);
    } else {
      setTodayStress(mood);
      toast.success(`Stress level logged: ${mood}/10`);
    }
  };

  const getMoodColor = (value: number) => {
    if (value >= 8) return "bg-success";
    if (value >= 6) return "bg-wellness-green";
    if (value >= 4) return "bg-warning";
    return "bg-destructive";
  };

  const getStressColor = (value: number) => {
    if (value <= 3) return "bg-success";
    if (value <= 5) return "bg-wellness-green";
    if (value <= 7) return "bg-warning";
    return "bg-destructive";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUp className="w-4 h-4 text-success" />;
      case "down": return <ArrowDown className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-foreground-muted" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm pb-20">
      {/* Header */}
      <div className="p-6 bg-card/50 backdrop-blur-sm border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">Mood & Stress Tracker</h1>
        <p className="text-foreground-muted">Monitor your emotional wellness journey</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Today's Logging */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="wellness-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="w-5 h-5 text-primary" />
                Today's Mood
              </CardTitle>
              <CardDescription>How are you feeling right now?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Button
                    key={num}
                    variant={todayMood === num ? "default" : "outline"}
                    size="sm"
                    className={`h-10 text-sm ${
                      todayMood === num 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    }`}
                    onClick={() => handleMoodLog(num, 'mood')}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-foreground-muted">
                <span>Very Low</span>
                <span>Excellent</span>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="w-5 h-5 text-secondary" />
                Stress Level
              </CardTitle>
              <CardDescription>Rate your current stress level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Button
                    key={num}
                    variant={todayStress === num ? "default" : "outline"}
                    size="sm"
                    className={`h-10 text-sm ${
                      todayStress === num 
                        ? "bg-secondary text-white" 
                        : "hover:bg-secondary/10"
                    }`}
                    onClick={() => handleMoodLog(num, 'stress')}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-foreground-muted">
                <span>Very Relaxed</span>
                <span>Very Stressed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Overview */}
        <Card className="wellness-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  Weekly Overview
                </CardTitle>
                <CardDescription>Your emotional patterns this week</CardDescription>
              </div>
              
              <div className="flex space-x-2">
                {["week", "month"].map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                    className="capitalize"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">{weeklyStats.avgMood}</span>
                  {getTrendIcon(weeklyStats.moodTrend)}
                </div>
                <p className="text-sm text-foreground-muted">Average Mood</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-secondary" />
                  <span className="text-2xl font-bold">{weeklyStats.avgStress}</span>
                  {getTrendIcon(weeklyStats.stressTrend)}
                </div>
                <p className="text-sm text-foreground-muted">Average Stress</p>
              </div>
            </div>

            <div className="space-y-3">
              {moodData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-12">{data.day}</span>
                  
                  <div className="flex-1 mx-4 space-y-1">
                    <div className="flex items-center justify-between text-xs text-foreground-muted">
                      <span>Mood</span>
                      <span>{data.mood}/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getMoodColor(data.mood)}`}
                        style={{ width: `${data.mood * 10}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-foreground-muted">
                      <span>Stress</span>
                      <span>{data.stress}/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getStressColor(data.stress)}`}
                        style={{ width: `${data.stress * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Insights & Trends</h2>
          
          <div className="space-y-3">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <Card key={index} className="wellness-card">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-background-secondary flex items-center justify-center flex-shrink-0">
                        <IconComponent className={`w-5 h-5 ${insight.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                        <p className="text-sm text-foreground-muted">{insight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Tracker;