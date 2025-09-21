import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Bell, 
  Search,
  Filter,
  MoreHorizontal,
  Activity,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  const stats = [
    {
      title: "Total Users",
      value: "1,284",
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Users",
      value: "892",
      change: "+8%",
      icon: Activity,
      color: "text-success"
    },
    {
      title: "Chat Sessions",
      value: "2,156",
      change: "+23%",
      icon: MessageSquare,
      color: "text-secondary"
    },
    {
      title: "High Risk Alerts",
      value: "12",
      change: "-4%",
      icon: AlertTriangle,
      color: "text-warning"
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Sarah M.",
      email: "sarah.m@example.com",
      status: "active",
      lastActive: "2 min ago",
      moodTrend: "improving",
      riskLevel: "low"
    },
    {
      id: 2,
      name: "Alex K.",
      email: "alex.k@example.com",
      status: "active",
      lastActive: "15 min ago",
      moodTrend: "stable",
      riskLevel: "low"
    },
    {
      id: 3,
      name: "Jordan P.",
      email: "jordan.p@example.com",
      status: "inactive",
      lastActive: "2 hours ago",
      moodTrend: "declining",
      riskLevel: "medium"
    },
    {
      id: 4,
      name: "Taylor R.",
      email: "taylor.r@example.com",
      status: "active",
      lastActive: "5 min ago",
      moodTrend: "improving",
      riskLevel: "low"
    }
  ];

  const handleUserAction = (userId: number, action: string) => {
    toast.info(`${action} action for user ${userId}`);
  };

  const handleBroadcastNotification = () => {
    toast.success("Notification sent to all users");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-white";
      case "inactive": return "bg-muted text-foreground-muted";
      default: return "bg-muted text-foreground-muted";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return "📈";
      case "declining": return "📉";
      case "stable": return "➡️";
      default: return "➡️";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-foreground-muted">Monitor and support youth mental wellness</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button onClick={handleBroadcastNotification} className="wellness-button bg-primary hover:bg-primary-deep text-primary-foreground">
              <Bell className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="wellness-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-xs ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                      {stat.change} from last {selectedTimeframe}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-background-secondary flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Mood Trends Overview
            </CardTitle>
            <CardDescription>Average mood scores across all users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground-muted">Overall Wellness</span>
                <span className="text-sm font-medium">7.2/10</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-wellness h-3 rounded-full" style={{ width: '72%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground-muted">Stress Levels</span>
                <span className="text-sm font-medium">4.1/10</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-primary h-3 rounded-full" style={{ width: '41%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground-muted">Engagement</span>
                <span className="text-sm font-medium">8.5/10</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-hero h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              Daily Activity
            </CardTitle>
            <CardDescription>User engagement patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                const activity = Math.floor(Math.random() * 100) + 1;
                return (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-12">{day}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-secondary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${activity}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-foreground-muted w-12 text-right">{activity}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card className="wellness-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                User Management
              </CardTitle>
              <CardDescription>Monitor and manage user accounts</CardDescription>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-lg hover:bg-card-hover transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`/placeholder-avatar-${user.id}.jpg`} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{user.name}</h4>
                      <Badge className={getStatusColor(user.status)} variant="secondary">
                        {user.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground-muted">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm text-foreground-muted">Last Active</p>
                    <p className="text-sm font-medium">{user.lastActive}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-foreground-muted">Mood Trend</p>
                    <p className="text-sm font-medium flex items-center gap-1">
                      <span>{getTrendIcon(user.moodTrend)}</span>
                      {user.moodTrend}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-foreground-muted">Risk Level</p>
                    <p className={`text-sm font-medium ${getRiskColor(user.riskLevel)}`}>
                      {user.riskLevel}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUserAction(user.id, "view")}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;