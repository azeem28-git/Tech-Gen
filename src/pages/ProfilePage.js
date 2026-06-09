import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders, getCustomBuilds, deleteCustomBuild } from '../firebase/firestore';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const statusColor = {
  processing: 'var(--orange)', shipped: 'var(--accent)',
  delivered: 'var(--green)', cancelled: 'var(--red)', packed: '#5856d6',
};

export default function ProfilePage({ setPage }) {
  const { user, userProfile, logOut, updateUserProfile, changePassword, authError, clearError } = useAuth();
  const [tab, setTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pwErr, setPwErr] = useState('');
  const [pwOk, setPwOk] = useState(false);

  // Profile form state
  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: '', state: '', pincode: ''
  });

  // Password form
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });

  const states = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];

  useEffect(() => {
    if (userProfile) {
      setForm({
        name: userProfile.name || '',
        phone: userProfile.phone || '',
        address: userProfile.address || '',
        city: userProfile.city || '',
        state: userProfile.state || '',
        pincode: userProfile.pincode || '',
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (user && tab === 'orders') getOrders(user.uid).then(setOrders);
    if (user && tab === 'builds') getCustomBuilds(user.uid).then(setBuilds);
  }, [user, tab]);

  const handleSaveProfile = async () => {
    setSaving(true);
    await updateUserProfile(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwErr(''); setPwOk(false);
    if (pwForm.next !== pwForm.confirm) return setPwErr('Passwords do not match.');
    if (pwForm.next.length < 6) return setPwErr('New password must be at least 6 characters.');
    const res = await changePassword(pwForm.current, pwForm.next);
    if (res.success) { setPwOk(true); setPwForm({ current: '', next: '', confirm: '' }); }
    else setPwErr(authError);
  };

  const inputStyle = {
    width: '100%', padding: '10px 13px',
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 9, fontSize: 13, color: 'var(--text)',
    fontFamily: 'var(--font-sf)', outline: 'none',
    transition: 'border-color 0.15s',
  };

  const tabs = [
    { id: 'profile', label: '👤 Profile' },
    { id: 'orders',  label: '📦 Orders' },
    { id: 'builds',  label: '🔧 Saved Builds' },
    { id: 'security', label: '🔒 Security' },
  ];

  return (
    <div style={{ background: 'var(--bg2)', minHeight: 'calc(100vh - 52px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 14, padding: '20px 24px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'var(--accent-light)', border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, flexShrink: 0,
          }}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              userProfile?.name?.[0]?.toUpperCase() || '👤'
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{userProfile?.name || 'Your Account'}</div>
            <div style={{ fontSize: 12, color: 'var(--text4)', marginTop: 2 }}>{user?.email}</div>
          </div>
          <button
            onClick={async () => { await logOut(); setPage('home'); }}
            style={{
              padding: '7px 16px', borderRadius: 9,
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--red)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,59,48,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '7px 16px', borderRadius: 9, fontSize: 12, fontWeight: 600,
              border: `1px solid ${tab === t.id ? 'var(--accent)' : 'var(--border)'}`,
              background: tab === t.id ? 'var(--accent-light)' : 'var(--bg)',
              color: tab === t.id ? 'var(--accent)' : 'var(--text3)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {tab === 'profile' && (
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Personal Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <LabeledInput label="Full Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="Your name" inputStyle={inputStyle} />
                <LabeledInput label="Phone" value={form.phone} onChange={v => setForm(p => ({ ...p, phone: v }))} placeholder="+91 98765 43210" inputStyle={inputStyle} />
              </div>
              <LabeledInput label="Email" value={user?.email || ''} disabled placeholder="" inputStyle={{ ...inputStyle, opacity: 0.6 }} />
              <LabeledInput label="Address" value={form.address} onChange={v => setForm(p => ({ ...p, address: v }))} placeholder="Flat, street, area" inputStyle={inputStyle} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <LabeledInput label="City" value={form.city} onChange={v => setForm(p => ({ ...p, city: v }))} placeholder="Mumbai" inputStyle={inputStyle} />
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>State</label>
                  <select value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Select</option>
                    {states.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <LabeledInput label="Pincode" value={form.pincode} onChange={v => setForm(p => ({ ...p, pincode: v }))} placeholder="400001" inputStyle={inputStyle} />
              </div>
              <button
                onClick={handleSaveProfile} disabled={saving}
                style={{
                  alignSelf: 'flex-start', padding: '10px 22px', borderRadius: 10,
                  background: saved ? 'var(--green)' : 'var(--accent)', color: '#fff',
                  fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
                  transition: 'all 0.2s', opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {tab === 'orders' && (
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Order History</h3>
            </div>
            {orders.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text4)' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>📦</div>
                <div style={{ fontWeight: 600, color: 'var(--text3)', fontSize: 14 }}>No orders yet</div>
                <button onClick={() => setPage('products')} style={{ marginTop: 14, padding: '8px 18px', borderRadius: 9, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Browse Products</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {orders.map((o, i) => (
                  <div key={o.id} style={{ padding: '16px 20px', borderBottom: i < orders.length - 1 ? '1px solid var(--border2)' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>#{o.id.slice(0, 8).toUpperCase()}</span>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                          background: `${statusColor[o.status]}18`,
                          color: statusColor[o.status],
                          textTransform: 'uppercase', letterSpacing: '0.5px',
                        }}>
                          {o.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text4)' }}>
                        {o.items?.length} item{o.items?.length !== 1 ? 's' : ''} · {o.payment}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{fmt(o.grandTotal)}</div>
                      <div style={{ fontSize: 11, color: 'var(--text4)', marginTop: 2 }}>
                        {o.createdAt?.toDate?.()?.toLocaleDateString('en-IN') || 'Recently'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Builds Tab */}
        {tab === 'builds' && (
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Saved PC Builds</h3>
            </div>
            {builds.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text4)' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🔧</div>
                <div style={{ fontWeight: 600, color: 'var(--text3)', fontSize: 14 }}>No saved builds</div>
                <button onClick={() => setPage('builder')} style={{ marginTop: 14, padding: '8px 18px', borderRadius: 9, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Go to PC Builder</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {builds.map((b, i) => (
                  <div key={b.id} style={{ padding: '16px 20px', borderBottom: i < builds.length - 1 ? '1px solid var(--border2)' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 28 }}>🖥️</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{b.purpose || 'Custom'} Build</div>
                      <div style={{ fontSize: 12, color: 'var(--text4)', marginTop: 2 }}>Budget: {fmt(b.budget || 0)}</div>
                    </div>
                    <button onClick={async () => { await deleteCustomBuild(user.uid, b.id); setBuilds(prev => prev.filter(x => x.id !== b.id)); }} style={{ fontSize: 12, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Security Tab */}
        {tab === 'security' && (
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>Change Password</h3>
            {user?.providerData?.[0]?.providerId === 'google.com' ? (
              <div style={{ padding: '16px', background: 'var(--bg2)', borderRadius: 10, fontSize: 13, color: 'var(--text3)' }}>
                You're signed in with Google. Password management is handled by your Google account.
              </div>
            ) : (
              <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
                <LabeledInput label="Current Password" type="password" value={pwForm.current} onChange={v => { setPwForm(p => ({ ...p, current: v })); setPwErr(''); clearError(); }} placeholder="••••••••" inputStyle={inputStyle} />
                <LabeledInput label="New Password" type="password" value={pwForm.next} onChange={v => { setPwForm(p => ({ ...p, next: v })); setPwErr(''); }} placeholder="Min 6 characters" inputStyle={inputStyle} />
                <LabeledInput label="Confirm New Password" type="password" value={pwForm.confirm} onChange={v => { setPwForm(p => ({ ...p, confirm: v })); setPwErr(''); }} placeholder="••••••••" inputStyle={inputStyle} />

                {pwErr && <div style={{ fontSize: 12, color: 'var(--red)', fontWeight: 500 }}>{pwErr}</div>}
                {pwOk  && <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>✓ Password updated successfully!</div>}

                <button type="submit" style={{ alignSelf: 'flex-start', padding: '10px 22px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                  Update Password
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange, placeholder, type = 'text', disabled, inputStyle }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{label}</label>
      <input
        type={type} value={value} disabled={disabled}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder} style={inputStyle}
        onFocus={e => !disabled && (e.target.style.borderColor = 'var(--accent)')}
        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
      />
    </div>
  );
}
