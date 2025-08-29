// Podcast RSS feed utilities

export interface PodcastEpisode {
  title: string;
  description: string;
  duration: string;
  pubDate: string;
  link: string;
}

export async function getLatestPodcastEpisode(): Promise<PodcastEpisode | null> {
  try {
    // Use a CORS proxy or your own API endpoint to fetch the RSS feed
    // For development, you can use a public CORS proxy
    const response = await fetch('/api/podcast-rss');
    
    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // Get the first item (latest episode)
    const items = xmlDoc.querySelectorAll('item');
    if (items.length === 0) {
      return null;
    }

    const latestItem = items[0];
    
    const title = latestItem.querySelector('title')?.textContent || 'Latest Episode';
    const description = latestItem.querySelector('description')?.textContent || '';
    const duration = latestItem.querySelector('itunes\\:duration, duration')?.textContent || '';
    const pubDate = latestItem.querySelector('pubDate')?.textContent || '';
    const link = latestItem.querySelector('link')?.textContent || '';
    
    // Get actual audio URL from enclosure tag
    const enclosure = latestItem.querySelector('enclosure');
    const audioUrl = enclosure?.getAttribute('url') || link;

    // Clean up description (remove HTML tags and CDATA)
    const cleanDescription = description
      .replace(/<!\[CDATA\[/g, '')
      .replace(/\]\]>/g, '')
      .replace(/<[^>]*>/g, '')
      .substring(0, 100) + '...';

    return {
      title: title.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, ''),
      description: cleanDescription,
      duration,
      pubDate,
      link: audioUrl // Use the actual audio URL for playback
    };
  } catch (error) {
    console.error('Error fetching podcast episode:', error);
    
    // Fallback to the latest known episode from your RSS feed
    return {
      title: "Coreledger's Last Deal on Wall Street: The Gift, the Pivot, and the Future of Human–AI Collaboration",
      description: "We built for the heartbeat of Wall Street/Bay Street, matching engines that moved orders in microseconds...",
      duration: "16:56",
      pubDate: "Thu, 21 Aug 2025 15:00:00 GMT",
      link: "https://podcasters.spotify.com/pod/show/kelvin-musodza/episodes/Coreledgers-Last-Deal-on-Wall-Street-The-Gift--the-Pivot--and-the-Future-of-HumanAI-Collaboration-e36sb5g/a-a54043bce-4b3c-45a9-a2c7-b6b2e12bf270"
    };
  }
}
