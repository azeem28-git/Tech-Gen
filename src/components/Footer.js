import React from 'react';

export default function Footer({ setPage }) {
  const links = {
    'Shop': ['CPU', 'GPU', 'Motherboard', 'RAM', 'SSD', 'PSU', 'Monitor'],
    'Services': ['PC Builder', 'Pre-Built PCs', 'Custom Orders', 'Bulk Buying', 'Corporate'],
    'Support': ['Track Order', 'Returns & Refunds', 'Warranty Claims', 'Contact Us', 'FAQ'],
    'Company': ['About TechGen', 'Careers', 'Press', 'Privacy Policy', 'Terms & Conditions'],
  };

  return (
    <footer style={{
      background: 'var(--bg)', borderTop: '1px solid var(--border)',
      padding: '48px 24px 24px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.5px' }}>
              Tech<span style={{ color: 'var(--accent)' }}>Gen</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text4)', lineHeight: 1.7, maxWidth: 240 }}>
              India's premier PC components and custom build platform. Premium parts, expert guidance, delivered to your door.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {['🐦', '📸', '▶️', '💬'].map((icon, i) => (
                <button key={i} style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  cursor: 'pointer', fontSize: 14, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-light)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg2)'; }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>{group}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {items.map(item => (
                  <a key={item} href="#" onClick={e => e.preventDefault()} style={{
                    fontSize: 13, color: 'var(--text3)', transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontSize: 12, color: 'var(--text4)' }}>© 2026 TechGen India Pvt. Ltd. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['GST: 27AABCT3518Q1ZV', '💵 COD Available', '🚚 Pan-India Shipping'].map(t => (
              <span key={t} style={{ fontSize: 11, color: 'var(--text4)', fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
