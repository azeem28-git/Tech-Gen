import React, { useState } from 'react';
import { prebuiltPCs } from '../data/products';
import { useCart } from '../context/CartContext';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const specIcons = { cpu: '🖥️', gpu: '🎮', ram: '💾', storage: '💿', psu: '⚡', cabinet: '📦' };

function PerfBar({ label, val, max = 240 }) {
  const pct = Math.round((val / max) * 100);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
        <span style={{ color: 'var(--text3)' }}>{label}</span>
        <span style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{val} FPS</span>
      </div>
      <div style={{ height: 4, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))', borderRadius: 2, transition: 'width 0.8s ease' }} />
      </div>
    </div>
  );
}

function PrebuiltCard({ pc, setPage }) {
  const [hovered, setHovered] = useState(false);
  const [tab, setTab] = useState('specs');
  const { addToCart } = useCart();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg)',
        border: `1px solid ${pc.featured ? 'var(--accent)' : hovered ? 'var(--border)' : 'var(--border)'}`,
        borderRadius: 18, overflow: 'hidden',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? 'var(--shadow-lg)' : pc.featured ? '0 0 0 1px var(--accent)' : 'var(--shadow-card)',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}
    >
      {pc.badge && (
        <div style={{
          position: 'absolute', top: 14, right: -28,
          background: pc.badge === 'PRO' ? '#8b5cf6' : 'var(--accent)',
          color: '#fff', fontSize: 9, fontWeight: 800,
          padding: '5px 36px', letterSpacing: '1px',
          textTransform: 'uppercase',
          transform: 'rotate(45deg) translateX(18px)',
          zIndex: 10,
        }}>
          {pc.badge}
        </div>
      )}

      {/* Image */}
      <div style={{
        height: 170, background: 'var(--bg2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 64, borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}>
        {pc.icon}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '6px 14px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.05))',
          fontSize: 10, fontWeight: 700, color: 'var(--text4)',
          textTransform: 'uppercase', letterSpacing: '1px',
        }}>
          {pc.tier}
        </div>
      </div>

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.4px', marginBottom: 4 }}>{pc.name}</h3>
        <p style={{ fontSize: 12, color: 'var(--text4)', marginBottom: 14, fontStyle: 'italic' }}>{pc.tagline}</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
          {['specs', 'performance'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '5px 12px', borderRadius: 7,
                fontSize: 11, fontWeight: 600,
                border: `1px solid ${tab === t ? 'var(--accent)' : 'var(--border)'}`,
                background: tab === t ? 'var(--accent-light)' : 'transparent',
                color: tab === t ? 'var(--accent)' : 'var(--text4)',
                cursor: 'pointer', transition: 'all 0.15s',
                textTransform: 'capitalize', letterSpacing: '0.3px',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'specs' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
            {Object.entries(pc.specs).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <span style={{ width: 20, textAlign: 'center', fontSize: 14 }}>{specIcons[k]}</span>
                <span style={{ width: 68, fontSize: 10, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{k}</span>
                <span style={{ color: 'var(--text)', fontWeight: 500, flex: 1 }}>{v}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Gaming FPS</div>
              <PerfBar label="Cyberpunk 2077 (Ultra 1440p)" val={pc.fps.cyberpunk} max={240} />
              <PerfBar label="Warzone (High 1440p)" val={pc.fps.warzone} max={240} />
              <PerfBar label="FIFA (Max 4K)" val={pc.fps.fifa} max={240} />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Overall Score</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  border: `3px solid var(--accent)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {pc.perfScore}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>
                    {pc.perfScore >= 95 ? 'Exceptional' : pc.perfScore >= 85 ? 'Excellent' : 'Great'}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text4)' }}>Performance Score</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Warranty */}
        <div style={{
          marginTop: 14, padding: '8px 12px',
          background: 'rgba(52,199,89,0.06)', border: '1px solid rgba(52,199,89,0.15)',
          borderRadius: 8, fontSize: 11, color: 'var(--green)', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span>🛡️</span> {pc.warranty} Warranty
        </div>

        {/* Price + CTA */}
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.8px' }}>
              {fmt(pc.price)}
            </div>
            <div style={{ fontSize: 10, color: 'var(--green)', fontWeight: 600, marginTop: 2 }}>✓ COD Available</div>
          </div>
          <button
            onClick={() => {
              addToCart({ id: `prebuilt-${pc.id}`, name: pc.name, price: pc.price, icon: pc.icon, brand: 'TechGen', category: 'Pre-Built', stock: 3 });
              setPage('cart');
            }}
            style={{
              padding: '10px 18px', borderRadius: 10,
              background: 'var(--accent)', color: '#fff',
              fontSize: 13, fontWeight: 700,
              border: 'none', cursor: 'pointer',
              transition: 'opacity 0.15s',
              letterSpacing: '-0.1px',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PrebuiltPage({ setPage }) {
  return (
    <div style={{ background: 'var(--bg2)', minHeight: 'calc(100vh - 52px)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg)', borderBottom: '1px solid var(--border)',
        padding: '44px 24px 36px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', border: '1px solid var(--border)',
            borderRadius: 20, padding: '4px 14px', marginBottom: 14,
            fontSize: 11, fontWeight: 600, color: 'var(--text4)',
            letterSpacing: '0.8px', textTransform: 'uppercase',
          }}>Hand-Assembled in India</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'var(--text)', letterSpacing: '-1px', marginBottom: 10 }}>
            Pre-Built Custom PCs
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.65 }}>
            Every PC is assembled, stress-tested for 72 hours, and quality-verified before shipping. Cash on Delivery available.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {prebuiltPCs.map(pc => (
            <PrebuiltCard key={pc.id} pc={pc} setPage={setPage} />
          ))}
        </div>

        {/* Badges strip */}
        <div style={{
          marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {['🧪 72-Hour Stress Tested', '🛡️ On-Site Warranty', '🚚 Free Shipping', '💵 COD Available', '📞 Dedicated Support'].map(b => (
            <div key={b} style={{
              padding: '8px 16px', borderRadius: 20,
              border: '1px solid var(--border)', background: 'var(--bg)',
              fontSize: 12, fontWeight: 500, color: 'var(--text3)',
            }}>
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
