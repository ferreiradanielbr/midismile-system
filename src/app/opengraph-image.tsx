import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// next/og's satori renderer can't read CSS variables or Tailwind classes —
// it needs literal color values, so the design-token rule doesn't apply here.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          background: 'linear-gradient(135deg, #0F1923 0%, #0B2D40 50%, #0A3850 100%)',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
          }}
        >
          MediSmile Group
        </div>
        <div style={{ fontSize: 32, fontWeight: 600, color: '#22C9A5' }}>
          The Smile You Deserve. The Care You Trust.
        </div>
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.6)' }}>
          Orlando, FL · Winter Springs &amp; Ocoee
        </div>
      </div>
    ),
    { ...size },
  );
}
