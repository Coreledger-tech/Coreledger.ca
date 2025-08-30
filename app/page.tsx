"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/entities/Product";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ExternalLink, Calendar, Clock, GitBranch, Database, Zap } from "lucide-react";
import Link from "next/link";
import { getLatestPodcastEpisode, PodcastEpisode } from "@/lib/podcast";
import { format } from "date-fns";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [latestEpisode, setLatestEpisode] = useState<PodcastEpisode | null>(null);

  useEffect(() => {
    loadProducts();
    loadLatestEpisode();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await Product.list();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const loadLatestEpisode = async () => {
    try {
      const episode = await getLatestPodcastEpisode();
      setLatestEpisode(episode);
    } catch (error) {
      console.error("Error loading latest episode:", error);
    }
  };

  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#F5F7F9] via-white to-[#F5F7F9] flex items-center">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230D9488' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-[#002C3E] leading-tight mb-8">
              Invent. Build. <span className="text-[#0D9488]">Iterate.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Coreledger builds practical, developer-first AI products. Contextus cuts waste from LLM context so teams ship faster and spend less.
            Now you can get sharper results at a fraction of the cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-[#0D9488] hover:bg-[#0f766e] text-white px-8 py-4 text-lg transition-smooth group"
                onClick={() => window.open('https://contextus.coreledger.ca', '_blank')}
              >
                Explore Contextus
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/lab">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white px-8 py-4 text-lg transition-smooth"
                >
                  Our Lab
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="font-heading text-4xl font-bold text-[#002C3E] mb-6">
              What we build
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We focus on foundational technologies that power the next generation of intelligent applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-fade-up bg-gradient-to-br from-[#F5F7F9] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-smooth">
              <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-[#0D9488]" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#002C3E] mb-4">
                Context & Data Models
              </h3>
              <p className="text-gray-600 leading-relaxed">
              Structures that keep facts straight and relationships intact, so your AI answers with context, not guesses.
              </p>
            </div>
            
            <div className="animate-fade-up bg-gradient-to-br from-[#F5F7F9] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-smooth">
              <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#0D9488]" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#002C3E] mb-4">
                AI Tooling
              </h3>
              <p className="text-gray-600 leading-relaxed">
                SDKs and APIs that plug into your stack in minutes, not months. Now you can optimize GPT or Claude without upgrading models.
              </p>
            </div>
            
            <div className="animate-fade-up bg-gradient-to-br from-[#F5F7F9] to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-smooth">
              <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mb-6">
                <GitBranch className="w-6 h-6 text-[#0D9488]" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#002C3E] mb-4">
                Production Foundations
              </h3>
              <p className="text-gray-600 leading-relaxed">
                High-performance pipelines, observability, and guardrails that scale from a single dev to the whole org—without surprise costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product - Contextus */}
      <section className="py-24 bg-gradient-to-br from-[#002C3E] to-[#0D9488] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Featured Product
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                Contextus
              </h2>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Your AI scalpel that cuts token costs by 40% without upgrading your model. LLMs have a memory cap, the context window. Every extra token costs money and risks drift or hallucination. Contextus helps your AI prioritize what matters & discard the rest, allowing developers and teams to save 40 percent while improving accuracy.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-[#002C3E] hover:bg-white/90 px-8 py-4 text-lg transition-smooth group"
                onClick={() => window.open('https://contextus.coreledger.ca', '_blank')}
              >
                Launch Demo
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="animate-fade-up">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#0D9488] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-heading font-bold text-[#002C3E] text-lg">Contextus Demo</p>
                    <p className="text-gray-600 text-sm">AI Token Optimizer</p>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="font-heading text-4xl font-bold text-[#002C3E] mb-6">
              From fintech to frontier tech
            </h2>
            <p className="text-xl text-gray-600">
              How we got here & why we're obsessed with reliability.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0D9488] to-transparent"></div>
            
            <div className="space-y-12">
              <div className="flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 max-w-md shadow-lg border border-gray-100 animate-fade-up relative">
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#0D9488] rounded-full border-4 border-white"></div>
                  <div className="text-[#0D9488] font-bold text-lg mb-2">2019–2024</div>
                  <h3 className="font-heading text-xl font-bold text-[#002C3E] mb-3">Fintech Foundation</h3>
                  <p className="text-gray-600">
                    We built for regulated markets: matching engines, reconciliation, and hard data problems. It taught us discipline, accuracy, latency, and cost control.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 max-w-md shadow-lg border border-gray-100 animate-fade-up relative">
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#0D9488] rounded-full border-4 border-white"></div>
                  <div className="text-[#0D9488] font-bold text-lg mb-2">2025+</div>
                  <h3 className="font-heading text-xl font-bold text-[#002C3E] mb-3">Technology Studio</h3>
                  <p className="text-gray-600">
                  We’re applying those muscles to AI. First with Contextus, then a suite of developer tools that make large models practical in production.    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="font-heading text-4xl font-bold text-[#002C3E] mb-6">
                Latest Episode
              </h2>
              {latestEpisode ? (
                <div className="bg-[#F5F7F9] rounded-2xl p-8 border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <Link href="/podcast">
                      <button className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center hover:bg-[#0f766e] transition-smooth group">
                        <Play className="w-6 h-6 text-white ml-1 group-hover:scale-110 transition-transform" />
                      </button>
                    </Link>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-[#002C3E] line-clamp-2">
                        {latestEpisode.title}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-600 text-sm mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {latestEpisode.pubDate ? format(new Date(latestEpisode.pubDate), 'MMM dd, yyyy') : 'Recent'}
                        </span>
                        {latestEpisode.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {latestEpisode.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {latestEpisode.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/podcast">
                      <Button variant="outline" className="border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-smooth">
                        Listen to all episodes
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-300 text-gray-600 hover:bg-gray-50 transition-smooth"
                      onClick={() => window.open('https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy', '_blank')}
                    >
                      🎧 Spotify
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-300 text-gray-600 hover:bg-gray-50 transition-smooth"
                      onClick={() => window.open('https://podcasts.apple.com/ca/podcast/coreledger-tech/id1832790756', '_blank')}
                    >
                      🍎 Apple
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#F5F7F9] rounded-2xl p-8 border border-gray-100">
                  <div className="animate-pulse">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
                    <div className="h-10 bg-gray-300 rounded w-40"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="animate-fade-up">
              <div className="relative">
                <div className="bg-gradient-to-br from-[#0D9488] to-[#002C3E] rounded-2xl p-12 text-white text-center">
                  <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4">Tech Conversations</h3>
                  <p className="text-white/90 leading-relaxed">
                    Deep dives into emerging technologies, product development, and the future of software engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Research & Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-4">
              Latest Research & Articles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Insights, research findings, and technical deep-dives from our team on AI, context engineering, and developer tools.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12 animate-fade-up">
            {/* Article 1 - GPT-5 Context Windows */}
            <article className="group cursor-pointer" onClick={() => window.open('https://www.linkedin.com/pulse/gpt-5-dropped-bigger-context-windows-still-fail-sg9ac?trk=public_post_feed-article-content', '_blank')}>
              <div className="bg-gradient-to-br from-[#3B4FA0] to-[#2D3E7F] rounded-xl p-8 text-white h-64 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="absolute inset-0 opacity-10">
                  <div className="w-32 h-32 border border-white/20 rounded-full absolute -top-10 -right-10"></div>
                  <div className="w-20 h-20 border border-white/20 rounded-full absolute top-20 right-8"></div>
                  <div className="w-16 h-16 bg-white/10 rounded-lg absolute bottom-16 right-12 transform rotate-45"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-white/20 text-xs px-3 py-1 rounded-full font-medium">Blog</span>
                    <span className="bg-blue-500/30 text-xs px-3 py-1 rounded-full font-medium">LinkedIn</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 leading-tight">
                    GPT-5 Dropped, but Bigger Context Windows Still Fail
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Even with larger context windows, the core problem remains: long inputs degrade, compression distorts relationships, and costs rise.
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-white/60 text-xs">Aug 11, 2025</span>
                  <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </div>
              </div>
            </article>

            {/* Article 2 - Context Engineering SDK */}
            <article className="group cursor-pointer" onClick={() => window.open('https://www.linkedin.com/pulse/beyond-prompt-crafting-introducing-contextus-context-coreledger-ljmnc', '_blank')}>
              <div className="bg-gradient-to-br from-[#0D9488] to-[#0f766e] rounded-xl p-8 text-white h-64 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="absolute inset-0 opacity-10">
                  <div className="w-24 h-24 border-2 border-white/20 rounded-lg absolute top-4 right-4 transform rotate-12"></div>
                  <div className="w-16 h-16 bg-white/10 rounded-full absolute bottom-20 right-8"></div>
                  <div className="w-12 h-12 border border-white/20 rounded-full absolute bottom-8 right-20"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-white/20 text-xs px-3 py-1 rounded-full font-medium">Blog</span>
                    <span className="bg-blue-500/30 text-xs px-3 py-1 rounded-full font-medium">LinkedIn</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 leading-tight">
                    Beyond Prompt Crafting: Introducing Contextus
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Prompt engineering has limitations. Context engineering is the next evolution for building reliable AI applications.
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-white/60 text-xs">Jul 24, 2025</span>
                  <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </div>
              </div>
            </article>

            {/* Article 3 - RAG Evaluation */}
            <article className="group cursor-pointer">
              <div className="bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-xl p-8 text-white h-64 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="absolute inset-0 opacity-10">
                  <div className="w-28 h-28 border border-white/20 rounded-xl absolute -top-6 -right-6 transform rotate-45"></div>
                  <div className="w-16 h-16 bg-white/10 rounded-lg absolute bottom-12 right-4"></div>
                  <div className="w-8 h-8 border border-white/20 rounded-full absolute bottom-4 right-16"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-white/20 text-xs px-3 py-1 rounded-full font-medium">Blog</span>
                    <span className="bg-orange-500/30 text-xs px-3 py-1 rounded-full font-medium">Coming Soon</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 leading-tight">
                    An Overview on RAG Evaluation
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Deep dive into evaluation metrics and methodologies for Retrieval-Augmented Generation systems.
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-white/60 text-xs">Coming Soon</span>
                  <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </div>
              </div>
            </article>
          </div>

          {/* View All Articles Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <Button 
              size="lg" 
              variant="outline"
              className="border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white px-8 py-4 text-lg transition-smooth"
              onClick={() => window.open('https://www.linkedin.com/company/core-ledger-technology/', '_blank')}
            >
              View All Articles
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-4 text-lg transition-smooth"
              onClick={() => window.open('https://medium.com/@coreledger_tech', '_blank')}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              Read on Medium
            </Button>
          </div>
        </div>
      </section>

      {/* Mini About */}
      <section className="py-24 bg-[#F5F7F9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <div className="w-36 h-36 bg-gradient-to-br from-[#0D9488] to-[#002C3E] rounded-2xl mx-auto mb-8 flex items-center justify-center p-6">
              <Image 
                src="/footer-logo.png" 
                alt="Coreledger Technologies" 
                width={100} 
                height={50}
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </div>
            <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-6">
              Built by engineers, for engineers
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We’re product-minded engineers. We ship, measure, and shave off the rough edges until it works in the real world. Our fintech years trained us to value correctness and cost, so every tool we build helps teams move faster and trust the output.
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-[#0D9488] hover:bg-[#0f766e] text-white px-8 py-4 text-lg transition-smooth"
              >
                Get in touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
