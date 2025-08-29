"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { Product, ProductData } from "@/entities/Product";

export default function Lab() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await Product.list();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-800 border-green-200";
      case "Beta":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Lab":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const modelZooItems = [
    {
      name: "DistilBERT-Reconciler",
      url: "https://huggingface.co/kelvi23/DistilBERT-Reconciler"
    },
    {
      name: "BERT baseline",
      url: "https://huggingface.co/Coreledger/bert-breaks-v0"
    },
    {
      name: "Next-day fails forecaster",
      url: "https://huggingface.co/kelvi23/Streaming-fail-forecaster"
    },
    {
      name: "Settlement-stress flagger",
      url: "https://huggingface.co/kelvi23/settlement-stress-flagger-v1"
    }
  ];

  return (
    <div className="font-body">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#F5F7F9] via-white to-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0D9488] to-[#002C3E] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Github className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-[#002C3E] mb-6">
              The <span className="text-[#0D9488]">Lab</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our research and development hub where we experiment with cutting-edge technologies, contribute to open-source, and share our learnings with the developer community.
            </p>
          </div>
        </div>
      </section>

      {/* Open Source Strategy */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up prose prose-lg max-w-none">
            <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-8">
              Our Open-Sourcing Strategy
            </h2>
            
            <div className="bg-[#F5F7F9] rounded-2xl p-8 mb-12 border border-gray-100">
              <h3 className="font-heading text-2xl font-bold text-[#002C3E] mb-4">
                Building in Public
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that the best technology emerges from collaborative development and transparent iteration. Our open-source approach isn't just about giving back—it's about building better products through community engagement and shared innovation.
              </p>
              
              <h4 className="font-heading text-xl font-bold text-[#002C3E] mb-3">Core Principles</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0D9488] rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Research-First Development:</strong> Every project starts with thorough research and experimentation, making our findings available to the community.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0D9488] rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Production-Quality Standards:</strong> Our open-source tools meet the same quality standards as our commercial products, with comprehensive documentation and testing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0D9488] rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Community-Driven Evolution:</strong> We actively engage with users, incorporating feedback and contributions to improve functionality and usability.</span>
                </li>
              </ul>
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#002C3E] mb-6">
              Current Focus Areas
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're evolving into a developer-first AI studio, building tools and platforms that empower engineers to work smarter with large language models.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <h4 className="font-heading text-xl font-bold text-[#002C3E] mb-3">
                  Developer Platforms
                </h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Platforms and APIs that help developers transform complex challenges into simple solutions.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Flagship product:</strong> Contextus, your AI scalpel that cuts token bills by 40% without upgrading your model. We help your AI prioritize what matters & discard the rest. Contextus plugs in whether you're vibe coding prototypes or building with agent pipelines, making your LLM calls run smaller, faster, and truer to your intents.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <h4 className="font-heading text-xl font-bold text-[#002C3E] mb-3">
                  AI/ML Tooling
                </h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Specialized models and tools for exception handling, reconciliation, and next-gen AI experiences.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Includes open-sourced ML models (DistilBERT-Reconciler, Fail-Forecaster, Stress-Flagger) available on Hugging Face.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Commitment to publishing research, white papers, and developer resources to push AI forward.
                </p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#002C3E] mb-6">
              Contributing Guidelines
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              We welcome contributions from developers at all levels. Whether you're fixing bugs, adding features, or improving documentation, your input helps make these tools better for everyone.
            </p>
            
            <div className="bg-[#002C3E] rounded-2xl p-8 text-white mb-12">
              <h4 className="font-heading text-xl font-bold mb-4">Getting Started</h4>
              <div className="bg-black/20 rounded-lg p-4 font-mono text-sm mb-4">
                <div className="text-green-400"># Clone any of our repositories</div>
                <div className="text-white">git clone https://github.com/Coreledger-tech/[repo-name]</div>
                <div className="text-white">cd [repo-name]</div>
                <div className="text-green-400"># Follow the setup instructions in README.md</div>
                <div className="text-white">cargo build --release</div>
              </div>
              <p className="text-white/90 text-sm">
                Each repository includes comprehensive setup instructions, contribution guidelines, and development documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Model Zoo */}
      <section className="py-12 bg-[#F5F7F9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-up">
            <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-3">
              Open Source Models
            </h2>
            <p className="text-gray-600">
              Research models and tools available on Hugging Face
            </p>
          </div>
          
          {/* Model Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 animate-fade-up">
            <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-heading text-lg font-semibold text-[#002C3E] group-hover:text-[#0D9488] transition-colors">
                  DistilBERT-Reconciler
                </h4>
                <a 
                  href="https://huggingface.co/kelvi23/DistilBERT-Reconciler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0D9488] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Fine-tuned DistilBERT on 3.2M labeled post-trade break descriptions + resolution actions.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-heading text-lg font-semibold text-[#002C3E] group-hover:text-[#0D9488] transition-colors">
                  Fails Forecaster
                </h4>
                <a 
                  href="https://huggingface.co/kelvi23/Streaming-fail-forecaster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0D9488] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Predicts next-day settlement-fail notional for US Treasuries & corporates using XGBoost + LightGBM.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-heading text-lg font-semibold text-[#002C3E] group-hover:text-[#0D9488] transition-colors">
                  Settlement Stress Flagger
                </h4>
                <a 
                  href="https://huggingface.co/kelvi23/settlement-stress-flagger-v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0D9488] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Flags days where settlement fails are in the top-10% of historic values for proactive remediation.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-all group opacity-75">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-heading text-lg font-semibold text-[#002C3E] group-hover:text-[#0D9488] transition-colors">
                  BERT-Breaks <span className="text-sm text-gray-500">Coming Soon</span>
                </h4>
                <a 
                  href="https://huggingface.co/Coreledger/bert-breaks-v0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0D9488] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vanilla BERT baseline for exception handling & reconciliation project. Training in progress.
              </p>
            </div>
          </div>

          {/* White Paper Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 animate-fade-up">
            <h3 className="font-heading text-2xl font-bold text-[#002C3E] mb-6">
              White Paper
            </h3>
            <div className="bg-[#F5F7F9] rounded-xl p-6">
              <blockquote className="text-gray-700 leading-relaxed mb-4">
                <em>Musodza, K. (2025). Bond Settlement Automated Exception Handling and Reconciliation. Zenodo.</em>
              </blockquote>
              <div className="space-y-2">
                <div>
                  <a 
                    href="https://github.com/Coreledger-tech/Exception-handling-reconciliation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0D9488] hover:text-[#0f766e] underline transition-colors"
                  >
                    AI Powered Bond Post-Trade Break Detection & Resolution — GitHub
                  </a>
                </div>
                <div>
                  <span className="text-gray-600">DOI: </span>
                  <a 
                    href="https://doi.org/10.5281/zenodo.16828730"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0D9488] hover:text-[#0f766e] underline transition-colors"
                  >
                    10.5281/zenodo.16828730
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-4">
              Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From production-ready platforms to experimental lab projects, explore our tools and contributions to the developer community.
            </p>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#F5F7F9] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">Loading projects...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product: ProductData, index: number) => (
                <div
                  key={product.id}
                  className="animate-fade-up bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0D9488] to-[#002C3E] rounded-xl flex items-center justify-center">
                        {product.href?.includes('github') ? (
                          <Github className="w-6 h-6 text-white" />
                        ) : (
                          <ExternalLink className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(product.status)} border font-medium`}
                      >
                        {product.status}
                      </Badge>
                    </div>
                    
                    <h3 className="font-heading text-2xl font-bold text-[#002C3E] mb-3 group-hover:text-[#0D9488] transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {product.tagline}
                    </p>
                    
                    {product.description && (
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                    
                    <Button
                      variant="outline"
                      className="w-full border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-smooth group"
                      onClick={() => window.open(product.href, '_blank')}
                    >
                      {product.href?.includes('github') ? 'View on GitHub' : 'Launch Product'}
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  {product.status === 'Live' && (
                    <div className="bg-gradient-to-r from-[#0D9488] to-[#002C3E] p-4">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="font-medium">Production Ready</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center animate-fade-up">
            <Button 
              size="lg" 
              className="bg-[#0D9488] hover:bg-[#0f766e] text-white px-8 py-4 text-lg transition-smooth"
              onClick={() => window.open('https://github.com/Coreledger-tech', '_blank')}
            >
              View All Projects on GitHub
              <Github className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
