"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (submitStatus.type === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' }); // Clear previous status
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({ name: "", email: "", company: "", message: "" });
        setSubmitStatus({
          type: 'success',
          message: 'Success! Your message has been sent. We\'ll get back to you soon. Check your email for a confirmation.'
        });
      } else {
        console.error('API Error:', result);
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again or email us directly at kmusodza@coreledger.ca'
        });
      }
    } catch (error) {
      console.error('Network Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error: Please check your connection and try again, or email us directly at kmusodza@coreledger.ca'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-body">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#F5F7F9] via-white to-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-[#002C3E] mb-6">
              Let&apos;s <span className="text-[#0D9488]">Connect</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you&apos;re interested in our products, want to discuss a partnership, or have questions about our technology, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-fade-up">
              <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-8">
                Send us a message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Label htmlFor="company" className="text-[#002C3E] font-medium">
                    Company
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]"
                    placeholder="Your organization (optional)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#002C3E] font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488] h-32"
                    placeholder="Tell us about your project, questions, or how we can help..."
                    required
                  />
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                  <div className={`p-4 rounded-lg border ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      {submitStatus.type === 'success' ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      )}
                      <p className="text-sm font-medium">{submitStatus.message}</p>
                    </div>
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
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="animate-fade-up">
              <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-8">
                Get in touch
              </h2>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#002C3E] mb-2">
                      Location
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Vancouver, BC, Canada<br />
                      Pacific Time Zone
                    </p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#002C3E] mb-2">
                      Email
                    </h3>
                    <a 
                      href="mailto:info@coreledger.ca" 
                      className="text-[#0D9488] hover:text-[#0f766e] transition-colors"
                    >
                      info@coreledger.ca
                    </a>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="pt-8 border-t border-gray-100">
                  <h3 className="font-heading font-bold text-[#002C3E] mb-6">
                    Follow our work
                  </h3>
                  <div className="flex gap-4 flex-wrap">
                    <a
                      href="https://github.com/coreledger-tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#002C3E] rounded-xl flex items-center justify-center hover:bg-[#0D9488] transition-colors group"
                    >
                      <Github className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/core-ledger-technology/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#002C3E] rounded-xl flex items-center justify-center hover:bg-[#0D9488] transition-colors group"
                    >
                      <Linkedin className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href="https://x.com/Coreledger_tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#002C3E] rounded-xl flex items-center justify-center hover:bg-[#0D9488] transition-colors group"
                    >
                      <Twitter className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href="https://www.facebook.com/people/Coreledger-Technologies/61563241262398/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#002C3E] rounded-xl flex items-center justify-center hover:bg-[#0D9488] transition-colors group"
                      title="Facebook"
                    >
                      <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="https://medium.com/@coreledger_tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#002C3E] rounded-xl flex items-center justify-center hover:bg-[#0D9488] transition-colors group"
                      title="Medium"
                    >
                      <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Response Time */}
                <div className="bg-[#F5F7F9] rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-[#002C3E] mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We typically respond within 24 hours during business days. For urgent technical matters, please include "URGENT" in your subject line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#002C3E] to-[#0D9488] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="font-heading text-4xl font-bold mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Whether you're looking to integrate our products, explore partnership opportunities, or discuss custom solutions, we're here to help turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-[#002C3E] hover:bg-white/90 px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://contextus.coreledger.ca', '_blank')}
              >
                Try Contextus
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#002C3E] px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://github.com/coreledger-tech', '_blank')}
              >
                View Our Code
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
