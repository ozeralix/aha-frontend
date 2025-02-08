"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Calendar
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

// Mock data fetching function
const fetchUserData = async (): Promise<UserData> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    name: "John Doe",
    metrics: {
      steps: 1000,
      heartRate: 72,
      sleepHours: 7.5,
      bloodPressure: {
        systolic: 120,
        diastolic: 80
      }
    },
    insights: [
      {
        id: '1',
        type: 'achievement',
        message: "Great job! You've reached your weekly step goal.",
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'recommendation',
        message: 'Consider going to bed 30 minutes earlier to improve sleep quality.',
        timestamp: new Date()
      }
    ]
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
const Sidebar = () => {
  const menuItems = [
    { icon: <Activity className="h-5 w-5" />, label: 'Dashboard' },
    { icon: <LineChart className="h-5 w-5" />, label: 'Analytics' },
    { icon: <Calendar className="h-5 w-5" />, label: 'History' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings' }
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col p-4">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="justify-start mb-2 w-full"
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
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
const AIInsightsCard = ({ insights }: { insights: HealthInsight[] }) => (
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
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {insight.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {insight.timestamp.toLocaleDateString()}
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

// Main Dashboard Component
const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load health data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
      <Sidebar />
      <main className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome back, {userData?.name}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HealthMetricsCard metrics={userData?.metrics} />
            </div>
            <div>
            <AIInsightsCard insights={userData?.insights} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;