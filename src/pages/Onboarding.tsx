import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageCircle, Heart, BarChart3, PenTool } from "lucide-react";

const onboardingSteps = [
  {
    icon: MessageCircle,
    title: "AI-Powered Support",
    description: "Get personalized emotional guidance from our empathetic AI companion, available 24/7 to listen and help.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Heart,
    title: "Daily Wellness Tips",
    description: "Receive curated daily tips and mindfulness exercises tailored to your emotional needs and goals.",
    gradient: "bg-gradient-wellness"
  },
  {
    icon: BarChart3,
    title: "Mood & Stress Tracking",
    description: "Monitor your emotional patterns with visual charts and insights to understand your mental wellness journey.",
    gradient: "bg-gradient-hero"
  },
  {
    icon: PenTool,
    title: "Journaling & Reflection",
    description: "Express your thoughts safely through guided journaling and receive AI insights on your emotional patterns.",
    gradient: "bg-gradient-calm"
  }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/auth");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipToAuth = () => {
    navigate("/auth");
  };

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="opacity-70 hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={skipToAuth}
          className="text-foreground-muted hover:text-foreground"
        >
          Skip
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="px-6 mb-8">
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full flex-1 transition-all duration-300 ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className={`w-32 h-32 rounded-full ${currentStepData.gradient} flex items-center justify-center mb-8 shadow-floating`}>
          <IconComponent className="w-16 h-16 text-white" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-foreground">
          {currentStepData.title}
        </h1>
        
        <p className="text-lg text-foreground-muted mb-12 max-w-sm leading-relaxed">
          {currentStepData.description}
        </p>
      </div>

      {/* Footer */}
      <div className="p-6">
        <Button
          onClick={nextStep}
          className="w-full h-12 text-lg font-medium wellness-button bg-primary hover:bg-primary-deep text-primary-foreground"
        >
          {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;