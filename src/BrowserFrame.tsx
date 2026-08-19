import React from 'react';

/**
 * BrowserFrame — a polished, theme-aware "browser window" chrome you can wrap
 * around any content to present it as a live site.
 *
 *   <BrowserFrame url="sujaymulagund.com" title="Sujay Mulagund">
 *     <Portfolio />
 *   </BrowserFrame>
 *
 * Notes
 * - Generic: `children` can be a real component, an <iframe>, or an <img>.
 * - `height` sets the scrollable viewport; content scrolls inside the window
 *   just like a real browser. Pass height="auto" to let content define height.
 * - Self-contained: no external CSS or icon deps (inline SVG only).
 */

type BrowserFrameProps = {
  url?: string;
  title?: string;
  theme?: 'light' | 'dark';
  /** viewport height, e.g. '520px' | '70vh' | 'auto' */
  height?: string;
  /** show the second/third inactive tabs */
  showTabs?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function BrowserFrame({
  url = 'sujaymulagund.com',
  title = 'Sujay Mulagund',
  theme = 'dark',
  height = '560px',
  showTabs = true,
  children,
  className = '',
}: BrowserFrameProps) {
  const dark = theme === 'dark';

  const c = dark
    ? {
        chrome: '#1c1c1e',
        chrome2: '#161618',
        border: '#2c2c2e',
        text: '#e6e6e6',
        muted: '#8a8a8e',
        bar: '#2a2a2c',
        barText: '#c9c9cd',
        tabActive: '#0f0f0f',
        tabIdle: '#242426',
        viewport: '#0f0f0f',
      }
    : {
        chrome: '#e9e7e2',
        chrome2: '#dfdcd5',
        border: '#d6d3ca',
        text: '#2a2a2a',
        muted: '#8a877f',
        bar: '#faf9f6',
        barText: '#5b584f',
        tabActive: '#faf9f6',
        tabIdle: '#e2dfd8',
        viewport: '#faf9f6',
      };

  return (
    <div
      className={className}
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${c.border}`,
        background: c.chrome,
        boxShadow: dark
          ? '0 40px 80px -30px rgba(0,0,0,0.7), 0 12px 30px -12px rgba(0,0,0,0.5)'
          : '0 40px 80px -30px rgba(60,55,45,0.35), 0 12px 30px -12px rgba(60,55,45,0.2)',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Title bar: traffic lights + tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 10,
          padding: '10px 14px 0',
          background: c.chrome2,
        }}
      >
        <div style={{ display: 'flex', gap: 8, padding: '0 6px 10px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((dot) => (
            <span
              key={dot}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: dot,
                display: 'inline-block',
              }}
            />
          ))}
        </div>

        {/* Active tab */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            maxWidth: 220,
            padding: '9px 14px',
            background: c.tabActive,
            color: c.text,
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            fontSize: 12.5,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Favicon color={c.text} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
          <span style={{ color: c.muted, marginLeft: 2, fontSize: 14, lineHeight: 1 }}>×</span>
        </div>

        {showTabs && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 14px',
              background: c.tabIdle,
              color: c.muted,
              borderTopLeftRadius: 9,
              borderTopRightRadius: 9,
              fontSize: 12.5,
              whiteSpace: 'nowrap',
            }}
          >
            <span>New Tab</span>
          </div>
        )}
        <span style={{ color: c.muted, fontSize: 18, paddingBottom: 6 }}>+</span>
      </div>

      {/* Toolbar: nav buttons + address bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 16px',
          background: c.chrome,
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <div style={{ display: 'flex', gap: 14, color: c.muted }}>
          <Chevron dir="left" />
          <Chevron dir="right" />
          <Reload />
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 30,
            padding: '0 12px',
            borderRadius: 15,
            background: c.bar,
            color: c.barText,
            border: `1px solid ${c.border}`,
            fontSize: 13,
          }}
        >
          <Lock color={c.muted} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {url}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 14, color: c.muted }}>
          <Share />
          <Dots />
        </div>
      </div>

      {/* Viewport */}
      <div
        style={{
          height: height === 'auto' ? undefined : height,
          overflow: height === 'auto' ? 'visible' : 'auto',
          background: c.viewport,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---- inline icons ---- */

function Favicon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="6" fill={color} opacity="0.12" />
      <path d="M7 15l3-6 2 4 2-3 3 5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

function Reload() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function Lock({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function Share() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v13" />
    </svg>
  );
}

function Dots() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="12" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="19" cy="12" r="1.7" />
    </svg>
  );
}
