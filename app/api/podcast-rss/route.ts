import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://anchor.fm/s/1083dc404/podcast/rss', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Coreledger-Bot/1.0)',
      },
      // Ensure we always fetch fresh RSS (avoid edge/runtime caches)
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rssData = await response.text();
    
    return new NextResponse(rssData, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        // Disable caching so new episodes appear immediately
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    
    // Return a minimal fallback RSS with latest known episode
    const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Coreledger Tech</title>
        <item>
          <title><![CDATA[Coreledger's Last Deal on Wall Street: The Gift, the Pivot, and the Future of Human–AI Collaboration]]></title>
          <description><![CDATA[We built for the heartbeat of Wall Street/Bay Street, matching engines that moved orders in microseconds, AI models that spotted settlement failures before they happened, and pipelines tuned for the chaos of bond markets. Then, the rules changed.]]></description>
          <pubDate>Thu, 21 Aug 2025 15:00:00 GMT</pubDate>
          <itunes:duration>00:16:56</itunes:duration>
          <link>https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy</link>
        </item>
      </channel>
    </rss>`;
    
    return new NextResponse(fallbackRss, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
