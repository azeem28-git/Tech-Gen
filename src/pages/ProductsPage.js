import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories, brands } from '../data/products';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const priceRanges = [
  { label: 'Under ₹10,000', min: 0, max: 10000 },
  { label: '₹10K – ₹25K', min: 10000, max: 25000 },
  { label: '₹25K – ₹60K', min: 25000, max: 60000 },
  { label: '₹60K – ₹1L', min: 60000, max: 100000 },
  { label: '₹1L+', min: 100000, max: Infinity },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'discount', label: 'Best Discount' },
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sort, setSort] = useState('popular');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleCat = (id) => setSelectedCats(p => p.includes(id) ? p.filter(c => c !== id) : [...p, id]);
  const toggleBrand = (b) => setSelectedBrands(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()));
    if (selectedCats.length) list = list.filter(p => selectedCats.includes(p.category));
    if (selectedBrands.length) list = list.filter(p => selectedBrands.includes(p.brand));
    if (selectedPrice) list = list.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'discount': list.sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp); break;
      default: list.sort((a, b) => b.reviews - a.reviews); break;
    }
    return list;
  }, [search, selectedCats, selectedBrands, selectedPrice, sort]);

  const clearAll = () => { setSelectedCats([]); setSelectedBrands([]); setSelectedPrice(null); setSearch(''); };
  const hasFilters = selectedCats.length || selectedBrands.length || selectedPrice || search;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 52px)' }}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside style={{
          width: 230, flexShrink: 0,
          background: 'var(--bg)',
          borderRight: '1px solid var(--border)',
          padding: '20px 16px',
          position: 'sticky', top: 52,
          height: 'calc(100vh - 52px)',
          overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.2px' }}>Filters</span>
            {hasFilters && (
              <button onClick={clearAll} style={{ fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Clear All</button>
            )}
          </div>

          <FilterSection title="Category">
            {categories.map(cat => (
              <CheckItem
                key={cat.id}
                label={`${cat.icon} ${cat.name}`}
                checked={selectedCats.includes(cat.id)}
                onChange={() => toggleCat(cat.id)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Brand">
            {brands.slice(0, 10).map(b => (
              <CheckItem key={b} label={b} checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
            ))}
          </FilterSection>

          <FilterSection title="Price Range">
            {priceRanges.map(r => (
              <label key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 0' }}>
                <input
                  type="radio" name="price"
                  checked={selectedPrice?.label === r.label}
                  onChange={() => setSelectedPrice(r)}
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 500 }}>{r.label}</span>
              </label>
            ))}
            {selectedPrice && (
              <button onClick={() => setSelectedPrice(null)} style={{ fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', marginTop: 4, fontWeight: 500 }}>Clear</button>
            )}
          </FilterSection>

          <FilterSection title="Rating">
            {[4, 3, 2].map(r => (
              <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '4px 0' }}>
                <input type="checkbox" style={{ accentColor: 'var(--accent)' }} />
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>
                  {'★'.repeat(r)}{'☆'.repeat(5 - r)} {r}+
                </span>
              </label>
            ))}
          </FilterSection>
        </aside>
      )}

      {/* Main */}
      <div style={{ flex: 1, padding: '20px 24px', background: 'var(--bg2)' }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 20, flexWrap: 'wrap',
        }}>
          <button
            onClick={() => setSidebarOpen(s => !s)}
            style={{
              width: 36, height: 36, borderRadius: 9,
              background: 'var(--bg)', border: '1px solid var(--border)',
              cursor: 'pointer', fontSize: 16, display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--text2)',
              flexShrink: 0,
            }}
            title="Toggle Filters"
          >
            ☰
          </button>

          {/* Search */}
          <div style={{ flex: 1, position: 'relative', maxWidth: 360 }}>
            <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text4)', fontSize: 14 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search components..."
              style={{
                width: '100%', padding: '8px 12px 8px 34px',
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 9, fontSize: 13, color: 'var(--text)',
                outline: 'none', transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div style={{ fontSize: 13, color: 'var(--text4)', fontWeight: 500, marginLeft: 'auto' }}>
            {filtered.length} products
          </div>

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              padding: '7px 12px', borderRadius: 9,
              background: 'var(--bg)', border: '1px solid var(--border)',
              color: 'var(--text)', fontSize: 13, cursor: 'pointer', outline: 'none',
            }}
          >
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Active filter chips */}
        {hasFilters > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {selectedCats.map(c => {
              const cat = categories.find(x => x.id === c);
              return (
                <Chip key={c} label={cat?.name} onRemove={() => toggleCat(c)} />
              );
            })}
            {selectedBrands.map(b => <Chip key={b} label={b} onRemove={() => toggleBrand(b)} />)}
            {selectedPrice && <Chip label={selectedPrice.label} onRemove={() => setSelectedPrice(null)} />}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text4)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text3)' }}>No products found</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Try adjusting your filters</div>
            <button onClick={clearAll} style={{ marginTop: 16, padding: '8px 18px', borderRadius: 9, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Clear Filters</button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: 14,
          }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 20, borderBottom: '1px solid var(--border2)', paddingBottom: 20 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          marginBottom: open ? 10 : 0,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text4)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{title}</span>
        <span style={{ color: 'var(--text4)', fontSize: 12, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>▼</span>
      </button>
      {open && <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{children}</div>}
    </div>
  );
}

function CheckItem({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 0' }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ accentColor: 'var(--accent)', width: 13, height: 13 }} />
      <span style={{ fontSize: 12, color: checked ? 'var(--text)' : 'var(--text3)', fontWeight: checked ? 500 : 400 }}>{label}</span>
    </label>
  );
}

function Chip({ label, onRemove }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: 'var(--accent-light)', border: '1px solid var(--accent)',
      borderRadius: 20, padding: '3px 10px',
      fontSize: 11, fontWeight: 500, color: 'var(--accent)',
    }}>
      {label}
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: 13, lineHeight: 1, padding: 0 }}>×</button>
    </div>
  );
}
