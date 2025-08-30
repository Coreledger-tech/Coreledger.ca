"use client";

import React, { useState, useEffect } from "react";
import { PodcastEpisode } from "@/entities/PodcastEpisode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Calendar, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import AudioPlayer from "@/components/AudioPlayer";

export default function Podcast() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadEpisodes();
  }, []);

  const loadEpisodes = async () => {
    try {
      const data = await PodcastEpisode.list('-date');
      setEpisodes(data);
    } catch (error) {
      console.error("Error loading episodes:", error);
    }
  };

  const togglePlay = (episodeId: string) => {
    if (playingEpisode === episodeId) {
      // Same episode - toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // Different episode - start playing new one
      setPlayingEpisode(episodeId);
      setIsPlaying(true);
    }
  };

  const handlePlayerPlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlayerEnded = () => {
    setIsPlaying(false);
    // Optionally auto-play next episode
  };

  return (
    <div className="font-body">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#F5F7F9] via-white to-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0D9488] to-[#002C3E] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-[#002C3E] mb-6">
              Tech <span className="text-[#0D9488]">Conversations</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Deep dives into emerging technologies, product development, and the future of software engineering. Join us as we explore the intersection of AI, data, and developer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#0D9488] hover:bg-[#0f766e] text-white px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://anchor.fm/s/1083dc404/podcast/rss', '_blank')}
              >
                Subscribe to RSS
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#002C3E] px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy', '_blank')}
              >
                Listen on Spotify
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#002C3E] px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://podcasts.apple.com/ca/podcast/coreledger-tech/id1832790756', '_blank')}
              >
                Listen on Apple Podcasts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {episodes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#F5F7F9] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-4">No episodes available yet.</p>
              <p className="text-gray-400 text-sm">Check back soon for our latest conversations about technology and innovation.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {episodes.map((episode: any, index: number) => (
                <div
                  key={episode.id}
                  className="animate-fade-up bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <button
                        onClick={() => togglePlay(episode.id)}
                        className="flex-shrink-0 w-16 h-16 bg-[#0D9488] rounded-2xl flex items-center justify-center hover:bg-[#0f766e] transition-smooth group"
                      >
                        {playingEpisode === episode.id && isPlaying ? (
                          <Pause className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        ) : (
                          <Play className="w-6 h-6 text-white ml-1 group-hover:scale-110 transition-transform" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(episode.date), 'MMM d, yyyy')}
                          </span>
                          {episode.duration && (
                            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {episode.duration}
                            </span>
                          )}
                          {episode.episode_number && (
                            <Badge variant="outline" className="text-xs">
                              Episode {episode.episode_number}
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-heading text-2xl font-bold text-[#002C3E] mb-4 leading-tight">
                          {episode.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {episode.summary}
                        </p>
                        
                        {episode.tags && episode.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <Tag className="w-4 h-4 text-gray-400" />
                            {episode.tags.map((tag: string, tagIndex: number) => (
                              <Badge 
                                key={tagIndex}
                                variant="secondary" 
                                className="bg-[#F5F7F9] text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {/* Platform Links */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-smooth"
                            onClick={() => window.open('https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy', '_blank')}
                          >
                            🎧 Listen on Spotify
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-smooth"
                            onClick={() => window.open('https://podcasts.apple.com/ca/podcast/coreledger-tech/id1832790756', '_blank')}
                          >
                            🍎 Apple Podcasts
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {playingEpisode === episode.id && (
                    <div className="bg-[#F5F7F9] px-8 py-6 border-t border-gray-100">
                      <AudioPlayer
                        src={episode.audio_url || ''}
                        title={episode.title}
                        duration={episode.duration}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayerPlayPause}
                        onEnded={handlePlayerEnded}
                      />
                      
                      <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                          🎵 Direct audio stream • Also available on{' '}
                          <button 
                            onClick={() => window.open('https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy', '_blank')}
                            className="text-[#0D9488] hover:underline"
                          >
                            Spotify
                          </button>
                          {' '}and{' '}
                          <button 
                            onClick={() => window.open('https://podcasts.apple.com/ca/podcast/coreledger-tech/id1832790756', '_blank')}
                            className="text-[#0D9488] hover:underline"
                          >
                            Apple Podcasts
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-24 bg-gradient-to-br from-[#002C3E] to-[#0D9488] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-up">
            <h2 className="font-heading text-4xl font-bold mb-6">
              Never miss an episode
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Subscribe to get notified when we release new conversations about technology, product development, and the future of software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-[#002C3E] hover:bg-white/90 px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://anchor.fm/s/1083dc404/podcast/rss', '_blank')}
              >
                RSS Feed
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#002C3E] px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy', '_blank')}
              >
                Listen on Spotify
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#002C3E] px-8 py-4 text-lg transition-smooth"
                onClick={() => window.open('https://podcasts.apple.com/ca/podcast/coreledger-tech/id1832790756', '_blank')}
              >
                Listen on Apple Podcasts
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
