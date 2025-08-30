"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Zap, Target, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Careers() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    superpower: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Auto-dismiss success messages
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    
    try {
      const response = await fetch('/api/send-career-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thanks for your application! We\'ll review it and get back to you soon.');
        setFormData({ name: "", email: "", superpower: "", message: "" });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const values = [
    {
      icon: Heart,
      title: "Craft Over Scale",
      description: "We believe in building fewer things exceptionally well rather than many things adequately."
    },
    {
      icon: Users,
      title: "Collaborative Excellence",
      description: "Great products emerge from diverse perspectives and transparent, respectful collaboration."
    },
    {
      icon: Zap,
      title: "Continuous Learning",
      description: "Technology evolves rapidly. We stay curious, experiment boldly, and learn from both successes and failures."
    },
    {
      icon: Target,
      title: "Impact First",
      description: "Every line of code, every feature, every decision should measurably improve the developer experience."
    }
  ];

  const roleTypes = [
    "AI/ML Engineers",
    "Full-Stack Developers", 
    "Product Designers",
    "Research Scientists",
    "Technical Writers",
    "Developer Advocates"
  ];

  return (
    <div className="font-body">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#F5F7F9] via-white to-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-[#002C3E] mb-6">
              Join Our <span className="text-[#0D9488]">Mission</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're building the future of intelligent software infrastructure. If you're passionate about creating tools that empower developers and push technological boundaries, we want to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="font-heading text-4xl font-bold text-[#002C3E] mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide how we work, build, and grow together
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="animate-fade-up text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#002C3E] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#002C3E] mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Status - Floating Modal Card */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F6FBFC] rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 animate-fade-up">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <Badge className="bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488] px-4 py-2 text-sm font-medium">
                  Current Status
                </Badge>
              </div>
              
              <h2 className="font-heading text-4xl font-bold text-[#002C3E] mb-8">
                No Formal Roles Yet
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                We're still in the early stages of building our team. Rather than posting specific job descriptions, we're looking for exceptional people who can define their own role and drive impact.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {roleTypes.map((role, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="bg-white text-gray-700 border-gray-200 hover:border-[#0D9488] hover:text-[#0D9488] transition-colors px-4 py-2"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                If you have a super-power that could help us build thinking machines, tell us about it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="font-heading text-4xl font-bold text-[#002C3E] mb-6">
              Tell us about your superpower
            </h2>
            <p className="text-xl text-gray-600">
              We don't have specific roles open right now, but we're always interested in connecting with exceptional people. Share what makes you unique.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden animate-fade-up">
            <div className="bg-gradient-to-r from-[#0D9488] to-[#002C3E] p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-2">
                Career Application Form
              </h3>
              <p className="text-white/90">
                Let's start a conversation about how you could contribute to our mission.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#002C3E] font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#002C3E] font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="superpower" className="text-[#002C3E] font-medium">
                  What's your superpower? *
                </Label>
                <Input
                  id="superpower"
                  type="text"
                  value={formData.superpower}
                  onChange={(e) => handleInputChange('superpower', e.target.value)}
                  placeholder="e.g., Building lightning-fast APIs, Making complex data simple, Creating beautiful UIs..."
                  className="border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[#002C3E] font-medium">
                  Tell us more
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Share your experience, what you're passionate about, or any cool projects you've worked on..."
                  className="border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488] h-32"
                />
              </div>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm font-medium">{submitMessage}</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm font-medium">{submitMessage}</p>
                </div>
              )}
              
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-[#0D9488] hover:bg-[#0f766e] text-white py-4 text-lg transition-smooth"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Application
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Remote Work */}
      <section className="py-16 bg-gradient-to-br from-[#002C3E] to-[#0D9488] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="font-heading text-4xl font-bold mb-6">
              Built for Remote
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              We're a distributed team that values flexibility, autonomy, and work-life integration. Great work happens when people have the freedom to do their best thinking.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="font-heading font-bold mb-2">Global Team</h3>
                <p className="text-white/80 text-sm">Work from anywhere in compatible time zones</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="font-heading font-bold mb-2">Flexible Hours</h3>
                <p className="text-white/80 text-sm">Focus time when you're most productive</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-heading font-bold mb-2">Async First</h3>
                <p className="text-white/80 text-sm">Thoughtful communication over constant meetings</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
