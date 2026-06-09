import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function ProductCard({ product, onClick }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => onClick && onClick(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.22s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow)' : 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image area */}
      <div style={{
        height: 150, background: 'var(--bg2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 52, position: 'relative',
        borderBottom: '1px solid var(--border2)',
      }}>
        {product.icon}
        {product.badge && (
          <span style={{
            position: 'absolute', top: 10, left: 10,
            background: product.badge === 'SALE' ? 'var(--red)' :
              product.badge === 'NEW' ? 'var(--accent)' :
              product.badge === 'BESTSELLER' ? 'var(--green)' :
              product.badge === 'FLAGSHIP' ? '#8b5cf6' : 'var(--accent)',
            color: '#fff',
            fontSize: 9, fontWeight: 700,
            padding: '3px 8px', borderRadius: 5,
            letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span style={{
            position: 'absolute', top: 10, right: 38,
            background: 'var(--orange)', color: '#000',
            fontSize: 9, fontWeight: 700,
            padding: '3px 7px', borderRadius: 5,
            letterSpacing: '0.3px',
          }}>
            -{discount}%
          </span>
        )}
        <button
          onClick={handleWish}
          style={{
            position: 'absolute', top: 8, right: 8,
            background: wishlisted ? 'rgba(255,59,48,0.1)' : 'var(--bg)',
            border: `1px solid ${wishlisted ? 'var(--red)' : 'var(--border)'}`,
            borderRadius: 8, width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 13,
            transition: 'all 0.15s ease',
          }}
        >
          {wishlisted ? '❤️' : '♡'}
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 14px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text4)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 4 }}>
          {product.brand}
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.35, marginBottom: 10, flex: 1 }}>
          {product.name}
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 1 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ fontSize: 11, color: s <= Math.round(product.rating) ? '#ff9f0a' : 'var(--border)' }}>★</span>
            ))}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text4)', fontWeight: 500 }}>{product.rating} ({product.reviews})</span>
        </div>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.5px' }}>
              {fmt(product.price)}
            </span>
            {product.mrp > product.price && (
              <span style={{ fontSize: 11, color: 'var(--text4)', textDecoration: 'line-through', marginLeft: 5 }}>
                {fmt(product.mrp)}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            style={{
              width: 32, height: 32, borderRadius: 9,
              background: added ? 'var(--green)' : 'var(--accent)',
              color: '#fff', border: 'none', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s ease',
              fontWeight: 700,
            }}
          >
            {added ? '✓' : '+'}
          </button>
        </div>

        {/* Stock */}
        <div style={{ marginTop: 8, fontSize: 10, fontWeight: 600, color: product.stock > 10 ? 'var(--green)' : product.stock > 0 ? 'var(--orange)' : 'var(--red)', letterSpacing: '0.3px' }}>
          {product.stock > 10 ? '● In Stock' : product.stock > 0 ? `● Only ${product.stock} left` : '● Out of Stock'}
        </div>
      </div>
    </div>
  );
}
