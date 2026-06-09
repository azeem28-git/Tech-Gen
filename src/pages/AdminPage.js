import React, { useState } from 'react';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const metrics = [
  { icon: '💰', label: 'Total Revenue', value: '₹42.8L', change: '+18.4%', up: true },
  { icon: '📦', label: 'Total Orders', value: '1,247', change: '+12.1%', up: true },
  { icon: '👥', label: 'Registered Users', value: '8,392', change: '+9.6%', up: true },
  { icon: '📋', label: 'Active Products', value: '147', change: '2 low stock', up: false },
];

const orders = [
  { id: '#TG-4821', customer: 'Arjun Sharma', items: 'RTX 4080, i9-14900K', amount: 204998, payment: 'COD', status: 'processing', date: '07 Jun 2026' },
  { id: '#TG-4820', customer: 'Priya Nair', items: 'Mid Range Gaming PC', amount: 124999, payment: 'COD', status: 'shipped', date: '06 Jun 2026' },
  { id: '#TG-4819', customer: 'Rohan Mehta', items: 'Ryzen 9 7950X, 32GB RAM', amount: 64498, payment: 'COD', status: 'delivered', date: '05 Jun 2026' },
  { id: '#TG-4818', customer: 'Sneha Kulkarni', items: 'Pro Workstation', amount: 249999, payment: 'COD', status: 'processing', date: '05 Jun 2026' },
  { id: '#TG-4817', customer: 'Karan Verma', items: 'RTX 3060, Monitor 27"', amount: 52499, payment: 'COD', status: 'cancelled', date: '04 Jun 2026' },
  { id: '#TG-4816', customer: 'Divya Reddy', items: 'Ryzen 7 7700X Build', amount: 87999, payment: 'COD', status: 'delivered', date: '04 Jun 2026' },
  { id: '#TG-4815', customer: 'Amit Singh', items: 'Starter Gaming PC', amount: 65999, payment: 'COD', status: 'packed', date: '03 Jun 2026' },
];

const sampleProducts = [
  { name: 'AMD Ryzen 9 7950X', category: 'CPU', price: 49999, stock: 15, status: 'active', rating: 4.9 },
  { name: 'NVIDIA RTX 4090 24GB', category: 'GPU', price: 159999, stock: 5, status: 'active', rating: 5.0 },
  { name: 'Samsung 990 Pro 2TB', category: 'SSD', price: 12999, stock: 30, status: 'active', rating: 4.9 },
  { name: 'Corsair Dominator 32GB', category: 'RAM', price: 14999, stock: 2, status: 'low', rating: 4.8 },
  { name: 'ASUS ROG Z790 Hero', category: 'MB', price: 42999, stock: 0, status: 'oos', rating: 4.7 },
];

const statusColors = {
  processing: { bg: 'rgba(255,159,10,0.1)', color: '#ff9f0a', border: 'rgba(255,159,10,0.25)', label: 'Processing' },
  shipped: { bg: 'rgba(0,113,227,0.1)', color: 'var(--accent)', border: 'rgba(0,113,227,0.25)', label: 'Shipped' },
  delivered: { bg: 'rgba(52,199,89,0.1)', color: 'var(--green)', border: 'rgba(52,199,89,0.25)', label: 'Delivered' },
  cancelled: { bg: 'rgba(255,59,48,0.1)', color: 'var(--red)', border: 'rgba(255,59,48,0.25)', label: 'Cancelled' },
  packed: { bg: 'rgba(88,86,214,0.1)', color: '#5856d6', border: 'rgba(88,86,214,0.25)', label: 'Packed' },
};

const navItems = [
  { group: 'Overview', items: [{ id: 'dashboard', icon: '📊', label: 'Dashboard' }, { id: 'analytics', icon: '📈', label: 'Analytics' }] },
  { group: 'Catalog', items: [{ id: 'products', icon: '📦', label: 'Products' }, { id: 'categories', icon: '🗂️', label: 'Categories' }] },
  { group: 'Operations', items: [{ id: 'orders', icon: '🛒', label: 'Orders' }, { id: 'users', icon: '👥', label: 'Users' }, { id: 'reviews', icon: '⭐', label: 'Reviews' }] },
  { group: 'Finance', items: [{ id: 'revenue', icon: '💰', label: 'Revenue' }, { id: 'invoices', icon: '📄', label: 'Invoices' }] },
];

function StatusBadge({ status }) {
  const s = statusColors[status] || statusColors.processing;
  return (
    <span style={{
      display: 'inline-block', padding: '3px 9px', borderRadius: 5,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>
      {s.label}
    </span>
  );
}

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeView, setActiveView] = useState('orders');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', minHeight: 'calc(100vh - 52px)' }}>
      {/* Sidebar */}
      <aside style={{
        background: 'var(--bg)', borderRight: '1px solid var(--border)',
        padding: '16px 0', position: 'sticky', top: 52,
        height: 'calc(100vh - 52px)', overflowY: 'auto',
      }}>
        <div style={{ padding: '8px 16px 14px', borderBottom: '1px solid var(--border)', marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.2px' }}>TechGen Admin</div>
          <div style={{ fontSize: 10, color: 'var(--text4)', marginTop: 2 }}>Console v2.0</div>
        </div>

        {navItems.map(group => (
          <div key={group.group} style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text4)', letterSpacing: '1px', textTransform: 'uppercase', padding: '10px 16px 5px' }}>
              {group.group}
            </div>
            {group.items.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 16px', background: 'none', border: 'none',
                  cursor: 'pointer', transition: 'all 0.15s',
                  borderLeft: `2px solid ${activeNav === item.id ? 'var(--accent)' : 'transparent'}`,
                  background: activeNav === item.id ? 'var(--accent-light)' : 'transparent',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span style={{ fontSize: 13, fontWeight: activeNav === item.id ? 600 : 400, color: activeNav === item.id ? 'var(--accent)' : 'var(--text3)' }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main */}
      <main style={{ padding: '28px', background: 'var(--bg2)', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.6px' }}>Dashboard</h1>
            <p style={{ fontSize: 12, color: 'var(--text4)', marginTop: 3 }}>Sunday, 07 Jun 2026 · Welcome back, Admin</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '8px 14px', borderRadius: 9, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Export Report</button>
            <button style={{ padding: '8px 16px', borderRadius: 9, background: 'var(--accent)', color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Add Product</button>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {metrics.map(m => (
            <div key={m.label} style={{
              background: 'var(--bg)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '18px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{m.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.8px', fontFamily: 'var(--font-mono)' }}>{m.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text4)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{m.label}</div>
              <div style={{ fontSize: 11, marginTop: 8, fontWeight: 600, color: m.up ? 'var(--green)' : 'var(--orange)' }}>
                {m.up ? '↑' : '⚠'} {m.change}
              </div>
            </div>
          ))}
        </div>

        {/* Tab navigation */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {[['orders', '🛒 Orders'], ['products', '📦 Products'], ['users', '👥 Users']].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              style={{
                padding: '7px 14px', borderRadius: 9,
                border: `1px solid ${activeView === id ? 'var(--accent)' : 'var(--border)'}`,
                background: activeView === id ? 'var(--accent-light)' : 'var(--bg)',
                color: activeView === id ? 'var(--accent)' : 'var(--text3)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        {activeView === 'orders' && (
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.3px' }}>Recent Orders</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <select style={{ padding: '5px 10px', borderRadius: 7, background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 11, cursor: 'pointer' }}>
                  <option>All Status</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Order ID', 'Customer', 'Items', 'Amount', 'Payment', 'Status', 'Date', 'Action'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={o.id} style={{ borderBottom: i < orders.length - 1 ? '1px solid var(--border2)' : 'none', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{o.id}</td>
                      <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--text)', fontWeight: 500 }}>{o.customer}</td>
                      <td style={{ padding: '11px 14px', fontSize: 11, color: 'var(--text3)', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.items}</td>
                      <td style={{ padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{fmt(o.amount)}</td>
                      <td style={{ padding: '11px 14px', fontSize: 11, color: 'var(--text3)', fontWeight: 600 }}>{o.payment}</td>
                      <td style={{ padding: '11px 14px' }}><StatusBadge status={o.status} /></td>
                      <td style={{ padding: '11px 14px', fontSize: 11, color: 'var(--text4)' }}>{o.date}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <button style={{ fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                          {o.status === 'delivered' ? 'Invoice →' : 'Update →'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Table */}
        {activeView === 'products' && (
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.3px' }}>Product Inventory</h3>
              <button style={{ padding: '7px 14px', borderRadius: 9, background: 'var(--accent)', color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Add Product</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleProducts.map((p, i) => (
                  <tr key={p.name}
                    style={{ borderBottom: i < sampleProducts.length - 1 ? '1px solid var(--border2)' : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.name}</td>
                    <td style={{ padding: '11px 14px', fontSize: 11, color: 'var(--text4)', fontWeight: 600 }}>{p.category}</td>
                    <td style={{ padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{fmt(p.price)}</td>
                    <td style={{ padding: '11px 14px', fontSize: 12, fontWeight: 700, color: p.stock === 0 ? 'var(--red)' : p.stock <= 3 ? 'var(--orange)' : 'var(--text)' }}>{p.stock === 0 ? 'Out of Stock' : `${p.stock} units`}</td>
                    <td style={{ padding: '11px 14px', fontSize: 12, color: '#ff9f0a', fontWeight: 600 }}>★ {p.rating}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 5,
                        textTransform: 'uppercase', letterSpacing: '0.5px',
                        background: p.status === 'active' ? 'rgba(52,199,89,0.1)' : p.status === 'low' ? 'rgba(255,159,10,0.1)' : 'rgba(255,59,48,0.1)',
                        color: p.status === 'active' ? 'var(--green)' : p.status === 'low' ? 'var(--orange)' : 'var(--red)',
                      }}>
                        {p.status === 'oos' ? 'Out of Stock' : p.status === 'low' ? 'Low Stock' : 'Active'}
                      </span>
                    </td>
                    <td style={{ padding: '11px 14px', display: 'flex', gap: 8 }}>
                      <button style={{ fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                      <button style={{ fontSize: 11, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Table */}
        {activeView === 'users' && (
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.3px' }}>Registered Users</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Name', 'Email', 'City', 'Orders', 'Total Spent', 'Joined', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Arjun Sharma', email: 'arjun@gmail.com', city: 'Mumbai', orders: 4, spent: 384996, joined: 'Jan 2025' },
                  { name: 'Priya Nair', email: 'priya@gmail.com', city: 'Bengaluru', orders: 2, spent: 189999, joined: 'Mar 2025' },
                  { name: 'Rohan Mehta', email: 'rohan@gmail.com', city: 'Delhi', orders: 7, spent: 542890, joined: 'Nov 2024' },
                  { name: 'Sneha Kulkarni', email: 'sneha@gmail.com', city: 'Pune', orders: 1, spent: 249999, joined: 'May 2026' },
                  { name: 'Karan Verma', email: 'karan@gmail.com', city: 'Hyderabad', orders: 3, spent: 124500, joined: 'Feb 2025' },
                ].map((u, i, arr) => (
                  <tr key={u.email}
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border2)' : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{u.name}</td>
                    <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--text3)' }}>{u.email}</td>
                    <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--text3)' }}>{u.city}</td>
                    <td style={{ padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{u.orders}</td>
                    <td style={{ padding: '11px 14px', fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{fmt(u.spent)}</td>
                    <td style={{ padding: '11px 14px', fontSize: 11, color: 'var(--text4)' }}>{u.joined}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <button style={{ fontSize: 11, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Block</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
