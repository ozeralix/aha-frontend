"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Activity,
  Heart,
  Brain,
  Moon,
  ChevronRight,
  User,
  Bell,
  Settings,
  LineChart,
  Calendar,
  ClipboardList,
  AlertCircle,
  Trophy,
  Lightbulb
} from 'lucide-react';

// Types
interface HealthMetrics {
  steps: number;
  heartRate: number;
  sleepHours: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  age?: number;
}

interface HealthInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'achievement';
  message: string;
  timestamp: Date;
}

interface UserData {
  name: string;
  metrics: HealthMetrics;
  insights: HealthInsight[];
}

interface HealthFormData {
  age: number;
  sleepHours: number;
  steps: number;
}

// AI Insight Generation Logic
const generateHealthInsights = (metrics: HealthMetrics): HealthInsight[] => {
  const insights: HealthInsight[] = [];
  const currentDate = new Date();

  // Age-based insights
  if (metrics.age > 0) {
    if (metrics.age < 18) {
      insights.push({
        id: 'age-1',
        type: 'recommendation',
        message: 'As a teenager, aim for 8-10 hours of sleep for optimal growth and development.',
        timestamp: currentDate
      });
    } else if (metrics.age >= 18 && metrics.age < 65) {
      insights.push({
        id: 'age-2',
        type: 'recommendation',
        message: 'Adults should aim for 7-9 hours of sleep per night for optimal health.',
        timestamp: currentDate
      });
    } else {
      insights.push({
        id: 'age-3',
        type: 'recommendation',
        message: 'Seniors should maintain regular sleep schedules and aim for 7-8 hours of sleep.',
        timestamp: currentDate
      });
    }
  }

  // Steps-based insights
  if (metrics.steps > 0) {
    if (metrics.steps < 5000) {
      insights.push({
        id: 'steps-1',
        type: 'alert',
        message: 'Your daily steps are below recommended levels. Try to increase activity gradually.',
        timestamp: currentDate
      });
    } else if (metrics.steps >= 5000 && metrics.steps < 8000) {
      insights.push({
        id: 'steps-2',
        type: 'recommendation',
        message: 'You\'re on the right track! Try to reach 10,000 steps for optimal health benefits.',
        timestamp: currentDate
      });
    } else {
      insights.push({
        id: 'steps-3',
        type: 'achievement',
        message: 'Great job maintaining an active lifestyle! Keep up the good work!',
        timestamp: currentDate
      });
    }
  }

  // Sleep-based insights
  if (metrics.sleepHours > 0) {
    if (metrics.sleepHours < 6) {
      insights.push({
        id: 'sleep-1',
        type: 'alert',
        message: 'You might be sleep deprived. Try to increase your sleep duration gradually.',
        timestamp: currentDate
      });
    } else if (metrics.sleepHours > 9) {
      insights.push({
        id: 'sleep-2',
        type: 'recommendation',
        message: 'You\'re sleeping more than average. Consider consulting a healthcare provider.',
        timestamp: currentDate
      });
    } else {
      insights.push({
        id: 'sleep-3',
        type: 'achievement',
        message: 'You\'re maintaining a healthy sleep schedule!',
        timestamp: currentDate
      });
    }
  }

  // Combined insights
  if (metrics.steps > 0 && metrics.sleepHours > 0) {
    if (metrics.steps > 8000 && metrics.sleepHours < 7) {
      insights.push({
        id: 'combined-1',
        type: 'recommendation',
        message: 'While your activity level is great, consider getting more rest for better recovery.',
        timestamp: currentDate
      });
    }
    if (metrics.steps < 5000 && metrics.sleepHours > 8) {
      insights.push({
        id: 'combined-2',
        type: 'recommendation',
        message: 'You\'re getting good rest, but try to increase your daily activity levels.',
        timestamp: currentDate
      });
    }
  }

  return insights;
};

// Mock data fetching function
const fetchUserData = async (formData?: HealthFormData): Promise<UserData> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const metrics = {
    steps: formData?.steps || 0,
    heartRate: 72,
    sleepHours: formData?.sleepHours || 0,
    bloodPressure: {
      systolic: 120,
      diastolic: 80
    },
    age: formData?.age || 0
  };

  return {
    name: "John Doe",
    metrics: metrics,
    insights: generateHealthInsights(metrics)
  };
};

// Navigation Component
const Navigation = () => (
  <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <span className="text-4xl font-bold text-blue-600 text-left">AHA</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </nav>
);

// Sidebar Component
const Sidebar = ({ onNavigate, currentView }) => {
  const menuItems = [
    { icon: <Activity className="h-5 w-5" />, label: 'Dashboard', view: 'dashboard' },
    { icon: <LineChart className="h-5 w-5" />, label: 'Analytics', view: 'analytics' },
    { icon: <Calendar className="h-5 w-5" />, label: 'History', view: 'history' },
    { icon: <ClipboardList className="h-5 w-5" />, label: 'Health Form', view: 'form' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', view: 'settings' }
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col p-4">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant={currentView === item.view ? "secondary" : "ghost"}
            className="justify-start mb-2 w-full"
            onClick={() => onNavigate(item.view)}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

// Health Form Component
const HealthForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<HealthFormData>({
    age: initialData?.age || 0,
    sleepHours: initialData?.sleepHours || 0,
    steps: initialData?.steps || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Information Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
              placeholder="Enter your age"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sleep">Average Hours of Sleep</Label>
            <Input
              id="sleep"
              type="number"
              step="0.1"
              value={formData.sleepHours}
              onChange={(e) => setFormData(prev => ({ ...prev, sleepHours: parseFloat(e.target.value) || 0 }))}
              placeholder="Enter average hours of sleep"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="steps">Daily Steps</Label>
            <Input
              id="steps"
              type="number"
              value={formData.steps}
              onChange={(e) => setFormData(prev => ({ ...prev, steps: parseInt(e.target.value) || 0 }))}
              placeholder="Enter daily steps"
            />
          </div>

          <Button type="submit" className="w-full">
            Save Health Information
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Health Metrics Card
const HealthMetricsCard = ({ metrics }: { metrics: HealthMetrics }) => {
  const MetricItem = ({ icon, label, value, unit }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-full">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold">
            {value}
            <span className="text-sm ml-1">{unit}</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricItem
            icon={<User className="h-5 w-5 text-blue-600" />}
            label="Age"
            value={metrics.age || 0}
            unit="years"
          />
          <MetricItem
            icon={<Activity className="h-5 w-5 text-blue-600" />}
            label="Steps"
            value={metrics.steps}
            unit="steps"
          />
          <MetricItem
            icon={<Heart className="h-5 w-5 text-blue-600" />}
            label="Heart Rate"
            value={metrics.heartRate}
            unit="bpm"
          />
          <MetricItem
            icon={<Moon className="h-5 w-5 text-blue-600" />}
            label="Sleep"
            value={metrics.sleepHours}
            unit="hours"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// AI Insights Card
const AIInsightsCard: React.FC<{ insights: HealthInsight[] }> = ({ insights }) => {
  if (!insights || insights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <CardTitle>AI Health Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">No insights available yet. Please fill out your health information.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-purple-600" />
          <CardTitle>AI Health Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg transition-colors cursor-pointer ${
                insight.type === 'alert' 
                  ? 'bg-red-50 hover:bg-red-100' 
                  : insight.type === 'achievement'
                  ? 'bg-green-50 hover:bg-green-100'
                  : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    {insight.type === 'alert' && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    {insight.type === 'achievement' && (
                      <Trophy className="h-4 w-4 text-green-500" />
                    )}
                    {insight.type === 'recommendation' && (
                      <Lightbulb className="h-4 w-4 text-blue-500" />
                    )}
                    <p className="text-sm font-medium text-gray-900">
                      {insight.message}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(insight.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const loadData = async (formData?: HealthFormData) => {
    try {
      const data = await fetchUserData(formData);
      setUserData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load health data');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFormSubmit = async (formData: HealthFormData) => {
    await loadData(formData);
    setCurrentView('dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <main className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome back, {userData?.name}
          </h1>
          {currentView === 'form' ? (
            <div className="max-w-md mx-auto">
              <HealthForm 
                onSubmit={handleFormSubmit}
                initialData={{
                  age: userData?.metrics.age || 0,
                  sleepHours: userData?.metrics.sleepHours || 0,
                  steps: userData?.metrics.steps || 0
                }}
              />
            </div>
          ) : currentView === 'dashboard' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <HealthMetricsCard metrics={userData?.metrics} />
              </div>
              <div>
                <AIInsightsCard insights={userData?.insights} />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              This section is under development
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;