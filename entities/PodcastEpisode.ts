// PodcastEpisode entity for the Coreledger website

export interface PodcastEpisodeData {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  audio_url?: string;
  duration?: string;
  episode_number?: number;
  season?: number;
  spotify_url?: string;
}

export class PodcastEpisode {
  static async list(sortBy?: string): Promise<PodcastEpisodeData[]> {
    try {
      // Fetch from our RSS API endpoint
      const response = await fetch('/api/podcast-rss');
      
      if (!response.ok) {
        throw new Error('Failed to fetch RSS feed');
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      const items = xmlDoc.querySelectorAll('item');
      const episodes: PodcastEpisodeData[] = [];

      items.forEach((item, index) => {
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const duration = item.querySelector('itunes\\:duration, duration')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        
        // Get actual audio URL from enclosure tag
        const enclosure = item.querySelector('enclosure');
        const audioUrl = enclosure?.getAttribute('url') || link;
        
        // Clean title and description
        const cleanTitle = title.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
        const cleanDescription = description
          .replace(/<!\[CDATA\[/g, '')
          .replace(/\]\]>/g, '')
          .replace(/<[^>]*>/g, '')
          .substring(0, 300) + '...';

        // Extract tags from title and description
        const tags: string[] = [];
        if (cleanTitle.toLowerCase().includes('ai') || cleanDescription.toLowerCase().includes('artificial intelligence')) {
          tags.push('AI');
        }
        if (cleanTitle.toLowerCase().includes('wall street') || cleanDescription.toLowerCase().includes('finance')) {
          tags.push('Finance');
        }
        if (cleanDescription.toLowerCase().includes('contextus')) {
          tags.push('Contextus');
        }
        if (cleanDescription.toLowerCase().includes('settlement') || cleanDescription.toLowerCase().includes('trade')) {
          tags.push('Trading');
        }
        if (cleanDescription.toLowerCase().includes('blockchain')) {
          tags.push('Blockchain');
        }

        // Generate episode ID from title
        const id = cleanTitle.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 50);

        // Extract season and episode info if available
        let season, episode_number;
        const seasonMatch = cleanDescription.match(/Season (\d+)/i);
        const episodeMatch = cleanDescription.match(/episode (\d+)/i);
        
        if (seasonMatch) season = parseInt(seasonMatch[1]);
        if (episodeMatch) episode_number = parseInt(episodeMatch[1]);

        episodes.push({
          id: id || `episode-${index}`,
          title: cleanTitle,
          date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          tags,
          summary: cleanDescription,
          duration: duration,
          episode_number,
          season,
          spotify_url: "https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy",
          audio_url: audioUrl
        });
      });

      // Sort by date descending if specified
      if (sortBy === '-date') {
        return episodes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }

      return episodes;
    } catch (error) {
      console.error('Error fetching podcast episodes:', error);
      
      // Fallback to latest known episodes from RSS
      return [
        {
          id: "last-deal-wall-street",
          title: "Coreledger's Last Deal on Wall Street: The Gift, the Pivot, and the Future of Human–AI Collaboration",
          date: "2025-08-21T15:00:00Z",
          tags: ["AI", "Finance", "Contextus", "Pivot"],
          summary: "We built for the heartbeat of Wall Street/Bay Street, matching engines that moved orders in microseconds, AI models that spotted settlement failures before they happened, and pipelines tuned for the chaos of bond markets. Then, the rules changed...",
          duration: "16:56",
          season: 4,
          episode_number: 2,
          spotify_url: "https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy"
        },
        {
          id: "gift-to-wall-street",
          title: "Coreledger's Gift to Wall Street: Closing One Chapter, Opening Another",
          date: "2025-08-20T17:00:00Z",
          tags: ["AI", "Finance", "Open Source"],
          summary: "We built for the fast lane of Wall Street, AI models predicting settlement risks, a fast matching engine fine-tuned for bonds, and tools to cut through the chaos of trading desks. Now, we're handing them over. Free. Open source.",
          duration: "6:01",
          season: 4,
          episode_number: 1,
          spotify_url: "https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy"
        }
      ];
    }
  }
}
