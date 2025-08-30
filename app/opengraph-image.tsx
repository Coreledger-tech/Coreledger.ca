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
        }}
      >
        <div
          style={{
            backgroundImage: 'linear-gradient(135deg, #0D9488 0%, #002C3E 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: 72,
            fontWeight: 900,
            marginBottom: 20,
          }}
        >
          Coreledger Technologies
        </div>
        <div
          style={{
            color: '#374151',
            fontSize: 36,
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.3,
          }}
        >
          Build smarter AI, not bigger bills
        </div>
        <div
          style={{
            color: '#6B7280',
            fontSize: 24,
            fontWeight: 400,
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Developer-first AI infrastructure • Contextus SDK • 40% cost reduction
        </div>
      </div>
    ),
    { ...size }
  )
}
