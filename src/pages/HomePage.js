import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const heroStats = [
  { value: '500+', label: 'Products' },
  { value: '50K+', label: 'Orders' },
  { value: '4.8★', label: 'Rating' },
  { value: 'COD', label: 'Available' },
];

export default function HomePage({ setPage }) {
  const [tick, setTick] = useState(0);
  const trending = products.filter(p => p.badge).slice(0, 4);

  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        padding: '64px 24px 48px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle dot grid background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px', opacity: 0.4,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 640 }}>
            {/* Tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              border: '1px solid var(--border)', borderRadius: 20,
              padding: '4px 12px 4px 8px', marginBottom: 20,
            }}>
              <span style={{
                background: 'var(--accent)', width: 6, height: 6,
                borderRadius: '50%', display: 'inline-block',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text3)' }}>India's Premier PC Platform</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              color: 'var(--text)',
              marginBottom: 16,
            }}>
              Build Your{' '}
              <span style={{ color: 'var(--accent)' }}>Dream PC</span>
              {' '}with TechGen
            </h1>

            <p style={{
              fontSize: 17, lineHeight: 1.65,
              color: 'var(--text3)', marginBottom: 28,
              fontWeight: 400, maxWidth: 480,
            }}>
              Premium PC components, intelligent build recommendations, and ready-made custom PCs. Delivered across India with Cash on Delivery.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => setPage('builder')}
                style={{
                  padding: '11px 22px', borderRadius: 10,
                  background: 'var(--accent)', color: '#fff',
                  fontSize: 14, fontWeight: 600,
                  border: 'none', cursor: 'pointer',
                  letterSpacing: '-0.2px', transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Build My PC →
              </button>
              <button
                onClick={() => setPage('products')}
                style={{
                  padding: '11px 22px', borderRadius: 10,
                  background: 'transparent',
                  color: 'var(--text)',
                  fontSize: 14, fontWeight: 600,
                  border: '1px solid var(--border)', cursor: 'pointer',
                  letterSpacing: '-0.2px', transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                Browse Components
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: 32, marginTop: 36,
              paddingTop: 28, borderTop: '1px solid var(--border)',
            }}>
              {heroStats.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.5px', fontFamily: 'var(--font-mono)' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text4)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse { 0%,100%{opacity:0.5;transform:scale(0.9)} 50%{opacity:1;transform:scale(1)} }
        `}</style>
      </section>

      {/* Categories */}
      <section style={{ padding: '44px 24px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHeader title="Shop by Category" sub="All the components you need" onSeeAll={() => setPage('products')} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
            gap: 10,
          }}>
            {categories.map(cat => (
              <CategoryCard key={cat.id} cat={cat} onClick={() => setPage('products')} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section style={{ padding: '32px 24px', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '28px 32px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 20,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: -40, top: -40,
              width: 200, height: 200, borderRadius: '50%',
              background: 'var(--accent-light)', pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>
                Limited Time
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.5px', marginBottom: 4 }}>
                RTX 4090 Gaming Bundle
              </div>
              <div style={{ fontSize: 14, color: 'var(--text3)' }}>
                Complete rig with RGB components. Ships in 3–5 business days.
              </div>
              <button
                onClick={() => setPage('prebuilt')}
                style={{
                  marginTop: 14, padding: '9px 18px', borderRadius: 9,
                  background: 'var(--accent)', color: '#fff',
                  fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Shop Now →
              </button>
            </div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text4)', marginBottom: 4 }}>Starting from</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '-1px' }}>
                {fmt(249999)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 4, fontWeight: 500 }}>✓ COD Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section style={{ padding: '44px 24px', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHeader title="Trending This Week" sub="Most popular picks" onSeeAll={() => setPage('products')} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}>
            {trending.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => setPage('products')} />
            ))}
          </div>
        </div>
      </section>

      {/* Why TechGen */}
      <section style={{ padding: '44px 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHeader title="Why TechGen?" sub="Built for Indian PC enthusiasts" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '🛡️', title: 'Genuine Products', desc: '100% authentic components from authorized distributors with full warranty' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Same-day dispatch in major cities. Pan-India delivery in 3–7 days' },
              { icon: '💵', title: 'Cash on Delivery', desc: 'Pay when you receive. No upfront payment required for orders under ₹2L' },
              { icon: '🔧', title: 'Expert Support', desc: 'PC building guidance from certified experts available 7 days a week' },
            ].map(item => (
              <div key={item.title} style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '20px',
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.2px' }}>{item.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.55 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, sub, onSeeAll }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.5px' }}>{title}</h2>
        {sub && <p style={{ fontSize: 12, color: 'var(--text4)', marginTop: 3 }}>{sub}</p>}
      </div>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          style={{
            background: 'transparent', border: '1px solid var(--border)',
            borderRadius: 8, padding: '5px 12px',
            fontSize: 12, fontWeight: 500, color: 'var(--accent)',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          View All →
        </button>
      )}
    </div>
  );
}

function CategoryCard({ cat, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--accent-light)' : 'var(--bg)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 12, padding: '14px 8px',
        textAlign: 'center', cursor: 'pointer',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.icon}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: hovered ? 'var(--accent)' : 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        {cat.name}
      </div>
    </div>
  );
}
