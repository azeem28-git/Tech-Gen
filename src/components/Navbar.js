import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ currentPage, setPage, onAuthOpen }) {
  const { theme, toggleTheme } = useTheme();
  const { cartCount, wishlist } = useCart();
  const { user, userProfile } = useAuth();
  const [hovered, setHovered] = useState(null);

  const navLinks = ['home', 'products', 'builder', 'prebuilt'];
  const labelOf = { home: 'Home', products: 'Products', builder: 'PC Builder', prebuilt: 'Pre-Built' };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'var(--bg)', borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      transition: 'background 0.25s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', padding: '0 24px', height: 52, gap: 32 }}>
        {/* Logo */}
        <div onClick={() => setPage('home')} style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.5px', color: 'var(--text)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Tech<span style={{ color: 'var(--accent)' }}>Gen</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {navLinks.map(id => (
            <button key={id} onClick={() => setPage(id)}
              onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}
              style={{
                padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                color: currentPage === id ? 'var(--text)' : 'var(--text3)',
                cursor: 'pointer', transition: 'all 0.15s ease', border: 'none',
                background: currentPage === id || hovered === id ? 'var(--bg3)' : 'transparent',
                letterSpacing: '-0.1px',
              }}
            >
              {labelOf[id]}
            </button>
          ))}
          {user && (
            <button onClick={() => setPage('admin')}
              onMouseEnter={() => setHovered('admin')} onMouseLeave={() => setHovered(null)}
              style={{
                padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                color: currentPage === 'admin' ? 'var(--text)' : 'var(--text3)',
                cursor: 'pointer', transition: 'all 0.15s ease', border: 'none',
                background: currentPage === 'admin' || hovered === 'admin' ? 'var(--bg3)' : 'transparent',
              }}
            >
              Admin
            </button>
          )}
        </div>

        {/* Right Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Wishlist */}
          <IconBtn title="Wishlist" onClick={() => setPage('cart')} badge={wishlist.length}>♡</IconBtn>

          {/* Cart */}
          <IconBtn title="Cart" onClick={() => setPage('cart')} badge={cartCount}>🛒</IconBtn>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg2)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 16, transition: 'all 0.15s ease' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg2)'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Auth button */}
          {user ? (
            <button onClick={() => setPage('profile')} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '5px 12px 5px 6px', borderRadius: 20,
              background: 'var(--bg2)', border: '1px solid var(--border)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg2)'}
            >
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent-light)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--accent)', overflow: 'hidden' }}>
                {user.photoURL ? <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (userProfile?.name?.[0]?.toUpperCase() || '?')}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userProfile?.name?.split(' ')[0] || 'Account'}
              </span>
            </button>
          ) : (
            <button onClick={onAuthOpen} style={{ padding: '7px 16px', borderRadius: 8, background: 'var(--accent)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'opacity 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function IconBtn({ title, onClick, badge, children }) {
  return (
    <button onClick={onClick} title={title} style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text2)', transition: 'all 0.15s ease', fontSize: 15, position: 'relative' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg2)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {children}
      {badge > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--accent)', color: '#fff', fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg)' }}>{badge}</span>}
    </button>
  );
}
