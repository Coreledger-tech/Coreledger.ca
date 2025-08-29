"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Contextus() {
  return (
    <div className="font-body">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#F5F7F9] via-white to-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 text-[#0D9488] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-[#0D9488] rounded-full animate-pulse"></div>
              Vibe Coding Optimizer
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-[#002C3E] mb-6">
              Cut Your AI Token Bill by <span className="text-[#0D9488]">40%</span><br />
              without Upgrading Your Model
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Now you can get sharper results at a fraction of the cost. Join 50+ early testers already cutting costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-[#0D9488] hover:bg-[#0f766e] text-white px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://contextus.coreledger.ca', '_blank')}
              >
                Get Early Access
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold">50+</div>
                  <span>Early testers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-800">40%</div>
                  <span>Avg. cost reduction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up">
            <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-8 text-center">
              When Projects Grow, Context Breaks
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p className="text-xl mb-6">
                Have you ever worked tirelessly on a detailed software project, only to find yourself lost as it grows more complex? It's like trying to follow a story with missing pages—the more you progress, the more context you lose.
              </p>
              
              <p className="mb-6">
                <strong>LLMs face the same struggle.</strong> They have a memory cap, the context window. Every extra token costs money and risks drift or hallucination. As projects expand, essential context becomes fragmented or compressed multiple times, causing inaccuracies and frustrating misinterpretations.
              </p>
              
              <div className="bg-[#F5F7F9] rounded-2xl p-8 my-8">
                <h3 className="font-heading text-xl font-bold text-[#002C3E] mb-4">Think of it like this:</h3>
                <p className="mb-4">
                  Imagine copying a long recipe onto sticky notes. One note says "fold in the egg whites," but the note that told you to separate the eggs sits in another stack. Another says "bake for 12 minutes," but as the stack grows, the note that says "preheat oven" goes missing.
                </p>
                <p>
                  When the model can only see a handful of notes at a time, it loses the thread that ties steps together. Small gaps become misunderstandings, and sometimes turn into confident hallucinations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 bg-gradient-to-br from-[#002C3E] to-[#0D9488] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="font-heading text-3xl font-bold mb-8">
              Contextus is Your AI Scalpel
            </h2>
            <p className="text-xl mb-12 text-white/90 leading-relaxed">
              We help your AI prioritize what matters & discard the rest, allowing developers and teams to save 40 percent while improving accuracy.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-3">Faster, Cheaper Calls</h3>
                <p className="text-white/80 text-sm">Slash AI token usage by up to 40% per project & improve quality.</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-3">No Model Upgrades Needed</h3>
                <p className="text-white/80 text-sm">Optimize GPT or Claude without upgrading your existing setup.</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-3">Built-in Guardrails</h3>
                <p className="text-white/80 text-sm">Block unsafe commands before they ever run with intelligent policies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-4">
              Developer-Ready Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful tools to make your LLM applications more efficient and cost-effective, whether you're vibe coding prototypes or building with agent pipelines.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#002C3E] mb-2">Relevance Scoring</h3>
                    <p className="text-gray-600">Rank context intelligently to ensure your AI focuses on what matters most.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#002C3E] mb-2">Policy Engine</h3>
                    <p className="text-gray-600">Customize guardrails with powerful filtering and safety policies.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#002C3E] mb-2">Cost Analytics</h3>
                    <p className="text-gray-600">Track token savings in real time and monitor your optimization impact.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-up">
              <div className="bg-[#002C3E] rounded-2xl p-8 text-white">
                <h3 className="font-heading text-xl font-bold mb-4">Simple API & IDE plug-in</h3>
                <p className="text-white/80 mb-6">Integrate context optimization into your workflow with just a few lines of code.</p>
                
                <div className="bg-black/20 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-green-400"># contextus-example.py</div>
                  <div className="text-blue-300">from contextus import compile_context</div>
                  <div className="mt-2"></div>
                  <div className="text-green-400"># Simple guardrails</div>
                  <div className="text-white">policy = {"{"}drop_if_matches: [</div>
                  <div className="text-orange-300 ml-4">r"rm\s+-rf\s+/(?!tmp)",  # destructive shell</div>
                  <div className="text-orange-300 ml-4">r"DROP\s+TABLE\s+\w+",   # DB wipe</div>
                  <div className="text-white">]{"}"}</div>
                  <div className="mt-2"></div>
                  <div className="text-white">result = compile_context(</div>
                  <div className="text-white ml-4">messages=[ ... ],  # your chat/code/doc blocks</div>
                  <div className="text-white ml-4">policy=policy,</div>
                  <div className="text-white ml-4">strategy="structure-aware",</div>
                  <div className="text-white ml-4">scoring="query-aware"</div>
                  <div className="text-white">)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-[#F5F7F9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="font-heading text-3xl font-bold text-[#002C3E] mb-12">
              Join 50+ early testers already cutting costs
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#0D9488] mb-2">50+</div>
                <div className="text-gray-600 text-sm">Early testers</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#0D9488] mb-2">≈40%</div>
                <div className="text-gray-600 text-sm">Avg. token reduction</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#0D9488] mb-2">Auto‑blocked</div>
                <div className="text-gray-600 text-sm">Unsafe ops prevented</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm text-left">
                <blockquote className="text-gray-700 mb-4">
                  "Prompt sizes dropped immediately, and our AI stopped drifting off task."
                </blockquote>
                <cite className="text-sm text-gray-500">— Staff Engineer, fintech (pilot)</cite>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-left">
                <blockquote className="text-gray-700 mb-4">
                  "We stayed on our current GPT tier and still hit our cost target."
                </blockquote>
                <cite className="text-sm text-gray-500">— Founder, dev tools startup</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Research & Articles */}
      <section className="py-16 bg-white">
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#002C3E] to-[#0D9488] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="font-heading text-4xl font-bold mb-6">
              Ready to cut your AI costs?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Join 50+ early testers who are already saving 40% on their AI token bills. Get started with Contextus today and see the difference context engineering makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-[#002C3E] hover:bg-white/90 px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://contextus.coreledger.ca', '_blank')}
              >
                Get Early Access
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#002C3E] px-8 py-4 text-lg transition-smooth"
                >
                  Talk to our team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
