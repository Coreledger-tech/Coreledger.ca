import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(135deg, #F5F7F9 0%, #ffffff 50%, #F5F7F9 100%)',
          fontSize: 60,
          fontWeight: 700,
          position: 'relative',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'repeating-linear-gradient(45deg, #0D9488, #0D9488 10px, transparent 10px, transparent 20px)',
          }}
        />
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <div
            style={{
              background: '#0D9488',
              borderRadius: 16,
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
              fontSize: 40,
            }}
          >
            C
          </div>
          <div
            style={{
              backgroundImage: 'linear-gradient(135deg, #0D9488 0%, #002C3E 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: 72,
              fontWeight: 900,
            }}
          >
            Contextus
          </div>
        </div>
        
        <div
          style={{
            color: '#374151',
            fontSize: 42,
            fontWeight: 600,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          Cut Your AI Token Bill by 40%
        </div>
        
        <div
          style={{
            color: '#6B7280',
            fontSize: 28,
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Trim LLM context • Boost accuracy • No model upgrades needed
        </div>
        
        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            background: '#0D9488',
            color: 'white',
            padding: '12px 24px',
            borderRadius: 25,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          by Coreledger Technologies
        </div>
      </div>
    ),
    { ...size }
  )
}
