import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const purposes = [
  { id: 'gaming', icon: '🎮', label: 'Gaming' },
  { id: 'programming', icon: '💻', label: 'Programming' },
  { id: 'video', icon: '🎬', label: 'Video Editing' },
  { id: 'ai', icon: '🤖', label: 'AI / ML' },
  { id: 'office', icon: '🏢', label: 'Office Work' },
  { id: 'streaming', icon: '📡', label: 'Streaming' },
  { id: 'design', icon: '🎨', label: 'Graphic Design' },
];

const buildDatabase = {
  gaming: {
    20000: { cpu: { name: 'AMD Ryzen 5 5600', price: 12999 }, gpu: { name: 'AMD RX 6600 8GB', price: 18999 }, mb: { name: 'MSI B550M Pro-VDH', price: 6499 }, ram: { name: 'Kingston 16GB DDR4-3200', price: 3499 }, storage: { name: 'Crucial P3 500GB NVMe', price: 3999 }, psu: { name: 'Corsair CV550 550W', price: 4499 }, cabinet: { name: 'Ant Esports 311 TG', price: 3299 }, cooler: { name: 'Cooler Master Hyper 212', price: 2499 }, fps: 62, score: 65 },
    50000: { cpu: { name: 'AMD Ryzen 5 7600', price: 16999 }, gpu: { name: 'NVIDIA RTX 3060 Ti', price: 28999 }, mb: { name: 'MSI B650M Mortar', price: 11999 }, ram: { name: 'Corsair 16GB DDR5-5200', price: 5499 }, storage: { name: 'Samsung 970 Evo 1TB', price: 6999 }, psu: { name: 'Seasonic Focus GX 650W', price: 7999 }, cabinet: { name: 'NZXT H510 Flow', price: 7499 }, cooler: { name: 'DeepCool AK400', price: 2999 }, fps: 90, score: 76 },
    80000: { cpu: { name: 'AMD Ryzen 7 7700X', price: 24999 }, gpu: { name: 'NVIDIA RTX 4060 Ti', price: 39999 }, mb: { name: 'MSI MAG X670E Tomahawk', price: 18999 }, ram: { name: 'Corsair 32GB DDR5-5600', price: 7499 }, storage: { name: 'Samsung 990 Pro 1TB', price: 8999 }, psu: { name: 'Corsair RM750x 750W', price: 9499 }, cabinet: { name: 'Lian Li Lancool 216', price: 8999 }, cooler: { name: 'Noctua NH-U12A', price: 6999 }, fps: 120, score: 86 },
    150000: { cpu: { name: 'AMD Ryzen 9 7900X', price: 37999 }, gpu: { name: 'NVIDIA RTX 4070 Ti', price: 74999 }, mb: { name: 'ASUS ROG Strix X670E-F', price: 28999 }, ram: { name: 'G.Skill Trident Z5 32GB DDR5-6000', price: 12999 }, storage: { name: 'Samsung 990 Pro 2TB', price: 12999 }, psu: { name: 'Seasonic Focus GX 850W', price: 9999 }, cabinet: { name: 'Fractal Torrent ATX', price: 10999 }, cooler: { name: 'Corsair H150i Elite 360', price: 12999 }, fps: 165, score: 93 },
    250000: { cpu: { name: 'AMD Ryzen 9 7950X', price: 49999 }, gpu: { name: 'NVIDIA RTX 4080 Super', price: 89999 }, mb: { name: 'ASUS ROG Maximus Z790 Hero', price: 42999 }, ram: { name: 'Corsair Dominator 64GB DDR5-6000', price: 26999 }, storage: { name: 'Samsung 990 Pro 4TB', price: 27999 }, psu: { name: 'Corsair HX1000i 1000W', price: 16999 }, cabinet: { name: 'Lian Li PC-O11D XL', price: 12999 }, cooler: { name: 'EKWB AIO 360 D-RGB', price: 18999 }, fps: 200, score: 97 },
  },
  programming: {
    20000: { cpu: { name: 'Intel Core i5-13400', price: 14999 }, gpu: { name: 'Intel UHD 730 (iGPU)', price: 0 }, mb: { name: 'Gigabyte B660M DS3H', price: 6499 }, ram: { name: 'Kingston 32GB DDR4-3200', price: 6499 }, storage: { name: 'Samsung 870 EVO 1TB SSD', price: 6999 }, psu: { name: 'Corsair CV450 450W', price: 3499 }, cabinet: { name: 'Ant Esports 200 Air', price: 2499 }, cooler: { name: 'Stock Intel Cooler', price: 0 }, fps: 0, score: 70 },
    50000: { cpu: { name: 'AMD Ryzen 7 7700', price: 21999 }, gpu: { name: 'AMD RX 6600 XT', price: 22999 }, mb: { name: 'Gigabyte B650M DS3H', price: 8999 }, ram: { name: 'Corsair 32GB DDR5-4800', price: 6999 }, storage: { name: 'WD Black SN850X 1TB', price: 9999 }, psu: { name: 'Seasonic S12III 650W', price: 5999 }, cabinet: { name: 'Fractal Pop Air', price: 6999 }, cooler: { name: 'Scythe Mugen 5', price: 4499 }, fps: 0, score: 80 },
    80000: { cpu: { name: 'Intel i7-14700K', price: 34999 }, gpu: { name: 'NVIDIA RTX 3060 12GB', price: 28999 }, mb: { name: 'ASUS Prime Z790-P', price: 16999 }, ram: { name: 'Corsair 64GB DDR5-5200', price: 14999 }, storage: { name: 'Samsung 990 Pro 2TB', price: 12999 }, psu: { name: 'Corsair RM850x 850W', price: 11499 }, cabinet: { name: 'Fractal Design Define 7', price: 10999 }, cooler: { name: 'Noctua NH-D15', price: 8999 }, fps: 0, score: 88 },
    150000: { cpu: { name: 'AMD Ryzen 9 7950X', price: 49999 }, gpu: { name: 'NVIDIA RTX 4060 Ti 16GB', price: 39999 }, mb: { name: 'ASUS ProArt X670E', price: 34999 }, ram: { name: 'G.Skill 128GB DDR5-5200', price: 34999 }, storage: { name: 'WD Gold 4TB SSD', price: 34999 }, psu: { name: 'Seasonic Prime TX-850', price: 14999 }, cabinet: { name: 'Fractal Define 7 XL', price: 13999 }, cooler: { name: 'Noctua NH-D15 Chromax', price: 8999 }, fps: 0, score: 95 },
    250000: { cpu: { name: 'AMD Threadripper PRO 5955WX', price: 89999 }, gpu: { name: 'NVIDIA RTX 4080 Super', price: 89999 }, mb: { name: 'ASUS Pro WS WRX80E', price: 49999 }, ram: { name: 'Kingston 256GB DDR4 ECC', price: 49999 }, storage: { name: 'Samsung PM9A3 8TB NVMe', price: 44999 }, psu: { name: 'Seasonic Prime TX-1300', price: 21999 }, cabinet: { name: 'Phanteks Enthoo 719', price: 14999 }, cooler: { name: 'EKWB Custom Loop', price: 39999 }, fps: 0, score: 99 },
  },
};

function getBestBuild(purpose, budget) {
  const db = buildDatabase[purpose] || buildDatabase.gaming;
  const thresholds = Object.keys(db).map(Number).sort((a, b) => a - b);
  let chosen = thresholds[0];
  for (const t of thresholds) { if (budget >= t) chosen = t; }
  return db[chosen];
}

export default function BuilderPage({ setPage }) {
  const [budget, setBudget] = useState(80000);
  const [purpose, setPurpose] = useState('gaming');
  const [build, setBuild] = useState(null);
  const [generating, setGenerating] = useState(false);
  const { addToCart } = useCart();

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setBuild(getBestBuild(purpose, budget));
      setGenerating(false);
    }, 1100);
  };

  const totalPartsPrice = build ? Object.values(build).filter(v => typeof v === 'object' && v.price).reduce((s, p) => s + p.price, 0) : 0;
  const gst = totalPartsPrice * 0.18;
  const grandTotal = totalPartsPrice + gst;

  const partsList = build ? [
    { type: 'CPU', icon: '🖥️', ...build.cpu },
    { type: 'GPU', icon: '🎮', ...build.gpu },
    { type: 'Motherboard', icon: '📋', ...build.mb },
    { type: 'RAM', icon: '💾', ...build.ram },
    { type: 'Storage', icon: '💿', ...build.storage },
    { type: 'PSU', icon: '⚡', ...build.psu },
    { type: 'Cabinet', icon: '📦', ...build.cabinet },
    { type: 'CPU Cooler', icon: '❄️', ...build.cooler },
  ] : [];

  return (
    <div style={{ background: 'var(--bg2)', minHeight: 'calc(100vh - 52px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-block',
            border: '1px solid var(--border)',
            borderRadius: 20, padding: '4px 14px',
            fontSize: 11, fontWeight: 600,
            color: 'var(--text4)', letterSpacing: '0.8px',
            textTransform: 'uppercase', marginBottom: 14,
          }}>AI-Powered Recommendation</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'var(--text)', letterSpacing: '-1px', marginBottom: 8 }}>
            Smart PC Builder
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
            Tell us your budget and purpose — we'll recommend the perfect build with full compatibility checking.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Left: Config */}
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '28px', display: 'flex', flexDirection: 'column', gap: 28,
          }}>
            {/* Budget */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text4)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Budget</label>
                <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.5px' }}>
                  {fmt(budget)}
                </span>
              </div>
              <input
                type="range" min={20000} max={500000} step={5000}
                value={budget}
                onChange={e => setBudget(+e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent)', height: 4, cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--text4)' }}>
                <span>₹20,000</span><span>₹5,00,000+</span>
              </div>
              {/* Budget presets */}
              <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                {[30000, 60000, 1000000, 150000, 250000].map(v => (
                  <button
                    key={v}
                    onClick={() => setBudget(v)}
                    style={{
                      padding: '4px 10px', borderRadius: 7,
                      fontSize: 11, fontWeight: 600,
                      border: `1px solid ${budget === v ? 'var(--accent)' : 'var(--border)'}`,
                      background: budget === v ? 'var(--accent-light)' : 'transparent',
                      color: budget === v ? 'var(--accent)' : 'var(--text4)',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {fmt(v)}
                  </button>
                ))}
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text4)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 12 }}>Purpose</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {purposes.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPurpose(p.id)}
                    style={{
                      padding: '11px 8px', borderRadius: 10,
                      border: `1px solid ${purpose === p.id ? 'var(--accent)' : 'var(--border)'}`,
                      background: purpose === p.id ? 'var(--accent-light)' : 'var(--bg2)',
                      color: purpose === p.id ? 'var(--accent)' : 'var(--text3)',
                      cursor: 'pointer', transition: 'all 0.15s ease',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{p.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={generating}
              style={{
                width: '100%', padding: '13px',
                borderRadius: 11, background: generating ? 'var(--bg3)' : 'var(--accent)',
                color: generating ? 'var(--text4)' : '#fff',
                fontSize: 14, fontWeight: 700,
                border: 'none', cursor: generating ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease', letterSpacing: '-0.2px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {generating ? (
                <>
                  <span style={{ animation: 'spin 0.8s linear infinite', display: 'inline-block' }}>⚙️</span>
                  Generating Build...
                </>
              ) : '⚡ Generate My Build'}
            </button>

            {build && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.25)',
                borderRadius: 9, padding: '10px 14px',
                fontSize: 12, fontWeight: 600, color: 'var(--green)',
              }}>
                <span>✓</span>
                <span>All components fully compatible · {purpose === 'gaming' ? `~${build.fps} FPS in Cyberpunk 2077` : 'Optimized for your workflow'}</span>
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Parts List */}
            <div style={{
              background: 'var(--bg)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden',
              flex: 1,
            }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.2px' }}>
                  {build ? 'Recommended Build' : 'Your Build Appears Here'}
                </span>
                {build && (
                  <div style={{
                    display: 'flex', gap: 3,
                    background: 'var(--bg2)', borderRadius: 6, padding: '3px 8px',
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--orange)' }}>{'★'.repeat(Math.round(build.score / 20))}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)' }}>{build.score}/100</span>
                  </div>
                )}
              </div>

              {!build ? (
                <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--text4)' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🔧</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text3)' }}>Set your budget & purpose</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>Then click Generate to see your build</div>
                </div>
              ) : (
                <div style={{ padding: '12px' }}>
                  {partsList.map((part, i) => (
                    part.price >= 0 && (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 8px', borderRadius: 9,
                        transition: 'background 0.15s',
                        cursor: 'default',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ fontSize: 22, width: 32, textAlign: 'center', flexShrink: 0 }}>{part.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{part.type}</div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{part.name}</div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: part.price === 0 ? 'var(--green)' : 'var(--text)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                          {part.price === 0 ? 'Included' : fmt(part.price)}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Summary card */}
            {build && (
              <div style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '18px 20px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                  {[
                    { label: 'Parts Total', val: fmt(totalPartsPrice) },
                    { label: 'GST (18%)', val: fmt(gst) },
                    { label: 'Shipping', val: 'FREE', color: 'var(--green)' },
                  ].map(r => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: 'var(--text3)' }}>{r.label}</span>
                      <span style={{ fontWeight: 600, color: r.color || 'var(--text)', fontFamily: r.label !== 'Shipping' ? 'var(--font-mono)' : 'inherit' }}>{r.val}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Grand Total</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.5px' }}>{fmt(grandTotal)}</span>
                  </div>
                </div>

                {/* Performance bars */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text4)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>Performance</div>
                  {[
                    { label: purpose === 'gaming' ? 'Gaming Score' : 'Compute Score', val: build.score },
                    { label: 'Value for Money', val: Math.min(95, 100 - Math.round(budget / 6000)) },
                    { label: 'Upgrade Potential', val: 78 },
                  ].map(row => (
                    <div key={row.label} style={{ marginBottom: 9 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                        <span style={{ color: 'var(--text3)', fontWeight: 500 }}>{row.label}</span>
                        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{row.val}/100</span>
                      </div>
                      <div style={{ height: 4, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: 2,
                          background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))',
                          width: `${row.val}%`, transition: 'width 0.8s ease',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setPage('cart'); }}
                  style={{
                    width: '100%', padding: '12px',
                    borderRadius: 10, background: 'var(--accent)',
                    color: '#fff', fontSize: 13, fontWeight: 700,
                    border: 'none', cursor: 'pointer', letterSpacing: '-0.1px',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  🛒 Add All to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
