"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, Volume2, Github, Linkedin, Twitter } from "lucide-react";
import { getLatestPodcastEpisode, PodcastEpisode } from "@/lib/podcast";
import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestEpisode, setLatestEpisode] = useState<PodcastEpisode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);

  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        const episode = await getLatestPodcastEpisode();
        setLatestEpisode(episode);
      } catch (error) {
        console.error('Failed to fetch latest episode:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestEpisode();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubscribeStatus('error');
      setSubscribeMessage('Please enter a valid email address');
      return;
    }

    setSubscribeStatus('loading');
    setSubscribeMessage('');

    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeStatus('success');
        setSubscribeMessage('🎉 Thanks for subscribing! Check your email for confirmation.');
        setEmail('');
        
        // Auto-dismiss success message after 5 seconds
        setTimeout(() => {
          setSubscribeStatus('idle');
          setSubscribeMessage('');
        }, 5000);
      } else {
        setSubscribeStatus('error');
        setSubscribeMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscribeStatus('error');
      setSubscribeMessage('Network error. Please check your connection and try again.');
    }
  };

  const handlePlayPodcast = () => {
    if (!showPlayer) {
      // First click: Show player and start playing
      setShowPlayer(true);
      setIsPlaying(true);
    } else {
      // Subsequent clicks: Hide player
      setShowPlayer(false);
      setIsPlaying(false);
    }
  };

  const handlePlayerPlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlayerEnded = () => {
    setIsPlaying(false);
  };



  return (
    <footer className="bg-[#002C3E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xl font-bold mb-4">
              Stay updated with our latest innovations
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                required
                disabled={subscribeStatus === 'loading'}
              />
              <Button 
                type="submit" 
                variant="secondary" 
                className="bg-[#0D9488] hover:bg-[#0f766e] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={subscribeStatus === 'loading'}
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            
            {/* Status Messages */}
            {subscribeMessage && (
              <div className={`mt-3 p-3 rounded-lg text-sm flex items-center gap-2 ${
                subscribeStatus === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {subscribeStatus === 'success' ? (
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{subscribeMessage}</span>
              </div>
            )}
            
            {subscribeStatus === 'idle' && (
              <p className="text-white/60 text-sm mt-2">
                Get insights on our latest products and open-source projects
              </p>
            )}
          </div>

          {/* Mini Player */}
          <div className="bg-white/5 rounded-xl p-4">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300/20 rounded-full animate-pulse"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-300/20 rounded animate-pulse mb-1"></div>
                  <div className="h-3 bg-gray-300/20 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                                  <button
                  onClick={handlePlayPodcast}
                  className="w-10 h-10 bg-[#0D9488] rounded-full flex items-center justify-center hover:bg-[#0f766e] transition-smooth"
                  title={showPlayer ? "Close Player" : "Play Latest Episode"}
                >
                  {showPlayer && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {latestEpisode?.title || "Latest Episode"}
                    </p>
                    <p className="text-xs text-white/60 truncate">
                      {latestEpisode?.description || "Coreledger Tech Podcast"}
                    </p>
                    {latestEpisode?.duration && (
                      <p className="text-xs text-white/40">
                        {latestEpisode.duration}
                      </p>
                    )}
                  </div>
                  <Volume2 className="w-4 h-4 text-white/60" />
                </div>
                
                {/* Custom Audio Player */}
                {showPlayer && latestEpisode && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <AudioPlayer
                      src={latestEpisode.link || ''}
                      title={latestEpisode.title}
                      duration={latestEpisode.duration}
                      isPlaying={isPlaying}
                      onPlayPause={handlePlayerPlayPause}
                      onEnded={handlePlayerEnded}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-xs text-white/40">
                        🎧 Latest episode • Also on{' '}
                        <button 
                          onClick={() => window.open('https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy', '_blank')}
                          className="text-white/60 hover:text-white underline"
                        >
                          Spotify
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 sm:mb-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/footer-logo.png" 
                alt="Coreledger Technologies" 
                width={150} 
                height={38}
                className="h-10 w-auto"
              />
            </Link>
            <span className="text-white/40 text-sm">Vancouver, BC</span>
          </div>
          <div className="flex items-center space-x-3">
            <a 
              href="https://github.com/Coreledger-tech" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://www.linkedin.com/company/core-ledger-technology/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://x.com/Coreledger_tech" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              title="X (Twitter)"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://podcasts.apple.com/us/podcast/coreledger-tech/id1832790756" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              title="Apple Podcasts"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24l1.42-1.42C8.59 14.23 8 13.17 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.17-.59 2.23-1.18 2.82l1.42 1.42C17.33 15.16 18 13.66 18 12c0-3.31-2.69-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
            </a>
            <a 
              href="https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy?si=14aa578b24a04bfc" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              title="Spotify Podcast"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.6 14.4c-.2.3-.5.4-.8.2-2.2-1.3-5-1.6-8.3-.9-.3.1-.6-.1-.7-.4s.1-.6.4-.7c3.6-.8 6.7-.4 9.2 1 .3.2.4.6.2.8zm1.1-2.5c-.2.4-.7.5-1.1.3-2.5-1.5-6.3-2-9.3-1.1-.4.1-.8-.1-.9-.5s.1-.8.5-.9c3.4-1 7.7-.5 10.5 1.3.4.2.5.6.3.9zm.1-2.6c-3-1.8-7.9-2-10.8-1.1-.5.2-1-.2-1.2-.7s.2-1 .7-1.2c3.3-1 8.8-.5 12.3 1.3.4.2.6.7.4 1.1-.2.4-.7.6-1.1.4z"/>
              </svg>
            </a>
            <a 
              href="https://medium.com/@coreledger_tech" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              title="Medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/people/Coreledger-Technologies/61563241262398/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              title="Facebook"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="text-center text-white/40 text-xs mt-6">
          <p>© 2025 Coreledger Technologies Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
