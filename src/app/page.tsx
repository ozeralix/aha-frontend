import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Database, Activity } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Secure Health Management with
            <span className="text-blue-600"> Web3</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AHA combines advanced AI with blockchain security to provide personalized health insights while keeping your data private and secure.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register">
              <Button className="text-lg px-8 py-6">Get Started</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="text-lg px-8 py-6">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powered by Advanced Web3 Technology
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-blue-600" />}
            title="EigenLayer Security"
            description="Your health data is verified and secured using EigenLayer's advanced blockchain technology."
          />
          <FeatureCard
            icon={<Lock className="h-6 w-6 text-blue-600" />}
            title="Lit Protocol"
            description="End-to-end encryption and secure access control powered by Lit Protocol."
          />
          <FeatureCard
            icon={<Database className="h-6 w-6 text-blue-600" />}
            title="Decentralized Storage"
            description="Your data remains private and accessible only to you through blockchain technology."
          />
          <FeatureCard
            icon={<Activity className="h-6 w-6 text-blue-600" />}
            title="AI-Powered Insights"
            description="Get personalized health recommendations powered by secure AI analysis."
          />
        </div>
      </div>

      {/* Security Badge Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8">Secured By</h2>
            <div className="flex justify-center items-center space-x-12">
              <div className="text-center">
                <img 
                  src="/api/placeholder/150/50" 
                  alt="EigenLayer" 
                  className="mb-2"
                />
                <p className="text-sm text-gray-600">EigenLayer</p>
              </div>
              <div className="text-center">
                <img 
                  src="/api/placeholder/150/50" 
                  alt="Lit Protocol" 
                  className="mb-2"
                />
                <p className="text-sm text-gray-600">Lit Protocol</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}