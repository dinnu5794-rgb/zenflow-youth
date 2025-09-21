import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNav from "@/components/layout/BottomNav";
import { 
  User, 
  Mail, 
  Calendar, 
  Bell, 
  Shield, 
  Heart,
  Settings,
  LogOut,
  Camera,
  Save
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    age: "19",
    gender: "prefer-not-to-say",
    role: "student"
  });

  const [notifications, setNotifications] = useState({
    dailyTips: true,
    moodReminders: true,
    chatMessages: true,
    weeklyReports: false
  });

  const [privacy, setPrivacy] = useState({
    shareProgress: false,
    anonymousData: true,
    mentorAccess: true
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.info(`${key} ${value ? 'enabled' : 'disabled'}`);
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast.info(`Privacy setting updated`);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-calm pb-20">
      {/* Header */}
      <div className="p-6 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profile & Settings</h1>
            <p className="text-foreground-muted">Manage your account and preferences</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Information */}
        <Card className="wellness-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>
              {isEditing ? "Edit your personal information" : "Your personal information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-20 h-20 ring-4 ring-primary/20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={userData.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">{userData.name}</h3>
                <p className="text-foreground-muted capitalize">{userData.role}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground-muted">Member since Jan 2024</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-foreground-muted" />
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground-muted" />
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-foreground-muted" />
                  <Input
                    id="age"
                    type="number"
                    value={userData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  value={userData.gender} 
                  onValueChange={(value) => handleInputChange("gender", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-3">
                <Button 
                  onClick={handleSaveProfile}
                  className="wellness-button bg-primary hover:bg-primary-deep text-primary-foreground"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-secondary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose what notifications you'd like to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'dailyTips', label: 'Daily Wellness Tips', description: 'Receive personalized tips and reminders' },
              { key: 'moodReminders', label: 'Mood Check Reminders', description: 'Gentle reminders to log your mood' },
              { key: 'chatMessages', label: 'AI Chat Responses', description: 'Notifications for AI companion messages' },
              { key: 'weeklyReports', label: 'Weekly Progress Reports', description: 'Summary of your wellness journey' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-sm text-foreground-muted">{item.description}</div>
                </div>
                <Switch
                  checked={notifications[item.key as keyof typeof notifications]}
                  onCheckedChange={(checked) => handleNotificationChange(item.key, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Privacy & Data
            </CardTitle>
            <CardDescription>Control how your data is used and shared</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'shareProgress', label: 'Share Progress with Community', description: 'Allow others to see your wellness journey' },
              { key: 'anonymousData', label: 'Anonymous Data Collection', description: 'Help improve the app with anonymous usage data' },
              { key: 'mentorAccess', label: 'Counselor Access', description: 'Allow approved counselors to view your progress' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-sm text-foreground-muted">{item.description}</div>
                </div>
                <Switch
                  checked={privacy[item.key as keyof typeof privacy]}
                  onCheckedChange={(checked) => handlePrivacyChange(item.key, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="wellness-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start h-12"
                onClick={() => toast.info("Support contact opened")}
              >
                <Heart className="w-5 h-5 mr-3 text-primary" />
                Contact Support
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;