import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

function CartItem({ item }) {
  const { updateQty, removeFromCart, toggleWishlist } = useCart();

  return (
    <div style={{
      display: 'flex', gap: 16, alignItems: 'flex-start',
      padding: '18px', background: 'var(--bg)',
      border: '1px solid var(--border)', borderRadius: 14,
    }}>
      {/* Icon */}
      <div style={{
        width: 72, height: 72, flexShrink: 0,
        background: 'var(--bg2)', borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 34, border: '1px solid var(--border)',
      }}>
        {item.icon}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, color: 'var(--text4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>{item.brand} · {item.category}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 10, lineHeight: 1.35 }}>{item.name}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Qty control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              style={{
                width: 28, height: 28, borderRadius: 7,
                background: 'var(--bg2)', border: '1px solid var(--border)',
                color: 'var(--text)', fontSize: 16, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s', fontWeight: 600,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
            >
              −
            </button>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', minWidth: 20, textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{item.qty}</span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              style={{
                width: 28, height: 28, borderRadius: 7,
                background: 'var(--bg2)', border: '1px solid var(--border)',
                color: 'var(--text)', fontSize: 16, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s', fontWeight: 600,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
            >
              +
            </button>
          </div>

          <button
            onClick={() => { toggleWishlist(item); removeFromCart(item.id); }}
            style={{ fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}
          >
            Save for Later
          </button>

          <button
            onClick={() => removeFromCart(item.id)}
            style={{ fontSize: 11, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.3px' }}>
          {fmt(item.price * item.qty)}
        </div>
        {item.qty > 1 && (
          <div style={{ fontSize: 11, color: 'var(--text4)', marginTop: 3 }}>
            {fmt(item.price)} each
          </div>
        )}
        <div style={{ fontSize: 10, color: 'var(--green)', marginTop: 5, fontWeight: 600 }}>● In Stock</div>
      </div>
    </div>
  );
}

function CheckoutForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const { cartItems, grandTotal, cartTotal, gst } = useCart();
  const [ordered, setOrdered] = useState(false);

  const states = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  if (ordered) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.5px' }}>Order Placed!</h3>
        <p style={{ color: 'var(--text3)', fontSize: 14, lineHeight: 1.6, maxWidth: 320, margin: '0 auto 20px' }}>
          Your order <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>#TG-{Math.floor(Math.random() * 9000 + 1000)}</strong> has been confirmed. You'll pay <strong>{fmt(grandTotal)}</strong> on delivery.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 260, margin: '0 auto' }}>
          <button onClick={onClose} style={{ padding: '10px', borderRadius: 10, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '10px 13px',
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 9, fontSize: 13, color: 'var(--text)', transition: 'border-color 0.15s',
  };

  return (
    <div>
      {/* Steps */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
        {['Address', 'Payment', 'Confirm'].map((s, i) => (
          <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
              background: step > i + 1 ? 'var(--green)' : step === i + 1 ? 'var(--accent)' : 'var(--bg3)',
              color: step >= i + 1 ? '#fff' : 'var(--text4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
            }}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: 12, fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? 'var(--text)' : 'var(--text4)' }}>{s}</span>
            {i < 2 && <div style={{ flex: 1, height: 1, background: 'var(--border)', marginLeft: 8 }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Delivery Address</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>Full Name</label>
              <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Rahul Sharma" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>Mobile</label>
              <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>Email</label>
            <input value={form.email} onChange={e => update('email', e.target.value)} placeholder="rahul@email.com" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div>
            <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>Address</label>
            <input value={form.address} onChange={e => update('address', e.target.value)} placeholder="Flat / House No., Street, Area" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>City</label>
              <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="Mumbai" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>State</label>
              <select value={form.state} onChange={e => update('state', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select</option>
                {states.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>Pincode</label>
              <input value={form.pincode} onChange={e => update('pincode', e.target.value)} placeholder="400001" maxLength={6} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
          </div>
          <button onClick={() => setStep(2)} style={{ padding: '11px', borderRadius: 10, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, marginTop: 8, transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.88'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Continue to Payment →
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Payment Method</h4>
          <div style={{
            border: '2px solid var(--green)', borderRadius: 12,
            padding: '16px', background: 'rgba(52,199,89,0.05)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(52,199,89,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>💵</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Cash on Delivery</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>Pay {fmt(grandTotal)} when your order arrives</div>
            </div>
            <div style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>
            </div>
          </div>
          {['Razorpay / UPI', 'Credit / Debit Card', 'Net Banking'].map(pm => (
            <div key={pm} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.5 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text3)' }}>{pm}</span>
              <span style={{ fontSize: 10, background: 'var(--bg3)', color: 'var(--text4)', padding: '2px 8px', borderRadius: 5, fontWeight: 600 }}>COMING SOON</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: '11px', borderRadius: 10, background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>← Back</button>
            <button onClick={() => setStep(3)} style={{ flex: 2, padding: '11px', borderRadius: 10, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.88'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Review Order →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Order Summary</h4>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <span style={{ color: 'var(--text2)' }}>{item.icon} {item.name} ×{item.qty}</span>
              <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{fmt(item.price * item.qty)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--text3)' }}>Subtotal</span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{fmt(cartTotal)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--text3)' }}>GST (18%)</span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{fmt(gst)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--text3)' }}>Shipping</span><span style={{ color: 'var(--green)', fontWeight: 600 }}>FREE</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, paddingTop: 8, borderTop: '1px solid var(--border)' }}><span>Total (COD)</span><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{fmt(grandTotal)}</span></div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, padding: '11px', borderRadius: 10, background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>← Back</button>
            <button onClick={() => setOrdered(true)} style={{ flex: 2, padding: '11px', borderRadius: 10, background: 'var(--green)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.88'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              ✓ Place Order (COD)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CartPage({ setPage }) {
  const { cartItems, cartTotal, gst, grandTotal, cartCount, wishlist, toggleWishlist, addToCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'TECHGEN10') setCouponApplied(true);
  };

  if (showCheckout) {
    return (
      <div style={{ background: 'var(--bg2)', minHeight: 'calc(100vh - 52px)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 24px' }}>
          <button onClick={() => setShowCheckout(false)} style={{ fontSize: 13, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 4 }}>← Back to Cart</button>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 24, letterSpacing: '-0.4px' }}>Checkout</h2>
            <CheckoutForm onClose={() => { setShowCheckout(false); setPage('home'); }} />
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ background: 'var(--bg2)', minHeight: 'calc(100vh - 52px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🛒</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.5px', marginBottom: 8 }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text3)', fontSize: 14, marginBottom: 24 }}>Add some components to get started</p>
          <button onClick={() => setPage('products')} style={{ padding: '11px 24px', borderRadius: 10, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Browse Products</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg2)', minHeight: 'calc(100vh - 52px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.6px', marginBottom: 24 }}>
          Your Cart <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text4)', fontFamily: 'var(--font-mono)' }}>({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cartItems.map(item => <CartItem key={item.id} item={item} />)}

            {/* Saved for later */}
            {wishlist.length > 0 && (
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.2px' }}>Saved for Later ({wishlist.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {wishlist.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 24 }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text4)', fontFamily: 'var(--font-mono)' }}>{fmt(item.price)}</div>
                      </div>
                      <button onClick={() => { addToCart(item); toggleWishlist(item); }} style={{ fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Move to Cart</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 70 }}>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.2px' }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                {[
                  { label: `Subtotal (${cartCount} items)`, val: fmt(cartTotal) },
                  { label: 'GST (18%)', val: fmt(gst) },
                  { label: 'Shipping', val: 'FREE', color: 'var(--green)' },
                  ...(couponApplied ? [{ label: 'Coupon (TECHGEN10)', val: `-${fmt(grandTotal * 0.1)}`, color: 'var(--orange)' }] : []),
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text3)' }}>{r.label}</span>
                    <span style={{ fontWeight: 600, color: r.color || 'var(--text)', fontFamily: r.label === 'Shipping' || r.label.includes('Coupon') ? 'inherit' : 'var(--font-mono)' }}>{r.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.5px' }}>
                  {fmt(couponApplied ? grandTotal * 0.9 : grandTotal)}
                </span>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(52,199,89,0.06)', border: '1px solid rgba(52,199,89,0.2)',
                borderRadius: 9, padding: '10px 12px', marginBottom: 12,
                fontSize: 12, color: 'var(--green)', fontWeight: 600,
              }}>
                💵 Cash on Delivery — Pay on arrival
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                style={{
                  width: '100%', padding: '13px',
                  borderRadius: 10, background: 'var(--accent)',
                  color: '#fff', fontSize: 14, fontWeight: 700,
                  border: 'none', cursor: 'pointer', transition: 'opacity 0.15s',
                  letterSpacing: '-0.2px',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Proceed to Checkout →
              </button>

              <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text4)', marginTop: 10 }}>
                🔒 Secure checkout · 100% Genuine
              </p>
            </div>

            {/* Coupon */}
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px' }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.1px' }}>Apply Coupon</h4>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  value={coupon} onChange={e => setCoupon(e.target.value)}
                  placeholder="e.g. TECHGEN10"
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: 8,
                    background: 'var(--bg2)', border: `1px solid ${couponApplied ? 'var(--green)' : 'var(--border)'}`,
                    color: 'var(--text)', fontSize: 12,
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = couponApplied ? 'var(--green)' : 'var(--border)'}
                />
                <button
                  onClick={applyCoupon}
                  style={{
                    padding: '8px 14px', borderRadius: 8,
                    background: couponApplied ? 'var(--green)' : 'transparent',
                    color: couponApplied ? '#fff' : 'var(--accent)',
                    border: `1px solid ${couponApplied ? 'var(--green)' : 'var(--accent)'}`,
                    cursor: 'pointer', fontSize: 12, fontWeight: 700,
                  }}
                >
                  {couponApplied ? '✓' : 'Apply'}
                </button>
              </div>
              {couponApplied && <p style={{ fontSize: 11, color: 'var(--green)', marginTop: 6, fontWeight: 600 }}>✓ 10% discount applied!</p>}
              <p style={{ fontSize: 10, color: 'var(--text4)', marginTop: 6 }}>Try: TECHGEN10 for 10% off</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
