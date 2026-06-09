// ============================================================
//  TechGen – Firestore Service Layer
//  All database reads/writes go through these helpers.
// ============================================================

import {
  collection, doc, getDoc, getDocs, addDoc, setDoc,
  updateDoc, deleteDoc, query, where, orderBy, limit,
  serverTimestamp, increment, onSnapshot, writeBatch,
  arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { db } from '../firebase/config';

// ─── COLLECTION REFS ────────────────────────────────────────
const Col = {
  users:        () => collection(db, 'users'),
  products:     () => collection(db, 'products'),
  categories:   () => collection(db, 'categories'),
  orders:       () => collection(db, 'orders'),
  orderItems:   (orderId) => collection(db, 'orders', orderId, 'items'),
  cart:         (uid) => collection(db, 'users', uid, 'cart'),
  wishlist:     (uid) => collection(db, 'users', uid, 'wishlist'),
  reviews:      (productId) => collection(db, 'products', productId, 'reviews'),
  customBuilds: (uid) => collection(db, 'users', uid, 'customBuilds'),
};

// ─── PRODUCTS ───────────────────────────────────────────────

export const getProducts = async (filters = {}) => {
  try {
    let q = Col.products();
    const constraints = [];
    if (filters.category) constraints.push(where('category', '==', filters.category));
    if (filters.brand)    constraints.push(where('brand', '==', filters.brand));
    if (filters.maxPrice) constraints.push(where('price', '<=', filters.maxPrice));
    constraints.push(orderBy('createdAt', 'desc'));
    if (filters.limit)    constraints.push(limit(filters.limit));
    q = query(q, ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('getProducts:', err);
    return [];
  }
};

export const getProduct = async (id) => {
  const snap = await getDoc(doc(db, 'products', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const addProduct = async (data) => {
  return addDoc(Col.products(), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), rating: 0, reviewCount: 0 });
};

export const updateProduct = async (id, data) => {
  return updateDoc(doc(db, 'products', id), { ...data, updatedAt: serverTimestamp() });
};

export const deleteProduct = async (id) => deleteDoc(doc(db, 'products', id));

export const seedProducts = async (productsArray) => {
  const batch = writeBatch(db);
  productsArray.forEach(p => {
    const ref = doc(Col.products());
    batch.set(ref, { ...p, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  });
  await batch.commit();
};

// ─── CART ────────────────────────────────────────────────────

export const getCart = async (uid) => {
  const snap = await getDocs(Col.cart(uid));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addToCart = async (uid, product) => {
  const ref = doc(db, 'users', uid, 'cart', String(product.id));
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return updateDoc(ref, { qty: increment(1), updatedAt: serverTimestamp() });
  }
  return setDoc(ref, { ...product, qty: 1, addedAt: serverTimestamp(), updatedAt: serverTimestamp() });
};

export const updateCartQty = async (uid, productId, qty) => {
  const ref = doc(db, 'users', uid, 'cart', String(productId));
  if (qty < 1) return deleteDoc(ref);
  return updateDoc(ref, { qty, updatedAt: serverTimestamp() });
};

export const removeFromCart = async (uid, productId) => {
  return deleteDoc(doc(db, 'users', uid, 'cart', String(productId)));
};

export const clearCart = async (uid) => {
  const snap = await getDocs(Col.cart(uid));
  const batch = writeBatch(db);
  snap.docs.forEach(d => batch.delete(d.ref));
  return batch.commit();
};

// Live cart listener
export const subscribeCart = (uid, callback) => {
  return onSnapshot(Col.cart(uid), (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

// ─── WISHLIST ────────────────────────────────────────────────

export const getWishlist = async (uid) => {
  const snap = await getDocs(Col.wishlist(uid));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addToWishlist = async (uid, product) => {
  return setDoc(doc(db, 'users', uid, 'wishlist', String(product.id)), { ...product, addedAt: serverTimestamp() });
};

export const removeFromWishlist = async (uid, productId) => {
  return deleteDoc(doc(db, 'users', uid, 'wishlist', String(productId)));
};

// ─── ORDERS ──────────────────────────────────────────────────

export const createOrder = async (uid, cartItems, address, totals) => {
  const orderRef = await addDoc(Col.orders(), {
    uid,
    address,
    items: cartItems,
    subtotal:   totals.subtotal,
    gst:        totals.gst,
    shipping:   0,
    grandTotal: totals.grandTotal,
    payment:    'COD',
    status:     'processing',
    statusHistory: [{ status: 'processing', timestamp: serverTimestamp() }],
    createdAt:  serverTimestamp(),
    updatedAt:  serverTimestamp(),
  });

  // Decrement stock for each product
  const batch = writeBatch(db);
  cartItems.forEach(item => {
    const ref = doc(db, 'products', String(item.id));
    batch.update(ref, { stock: increment(-item.qty) });
  });
  await batch.commit();

  // Clear cart
  await clearCart(uid);

  return orderRef.id;
};

export const getOrders = async (uid) => {
  const q = query(Col.orders(), where('uid', '==', uid), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getAllOrders = async (limitCount = 50) => {
  const q = query(Col.orders(), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateOrderStatus = async (orderId, status) => {
  return updateDoc(doc(db, 'orders', orderId), {
    status,
    updatedAt: serverTimestamp(),
    statusHistory: arrayUnion({ status, timestamp: new Date() }),
  });
};

// Live orders listener for admin
export const subscribeOrders = (callback) => {
  const q = query(Col.orders(), orderBy('createdAt', 'desc'), limit(50));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

// ─── REVIEWS ─────────────────────────────────────────────────

export const addReview = async (productId, uid, { rating, comment, userName }) => {
  const ref = doc(db, 'products', productId, 'reviews', uid);
  await setDoc(ref, { uid, userName, rating, comment, createdAt: serverTimestamp() });

  // Recompute average
  const snap = await getDocs(Col.reviews(productId));
  const all = snap.docs.map(d => d.data().rating);
  const avg = all.reduce((s, r) => s + r, 0) / all.length;
  await updateDoc(doc(db, 'products', productId), {
    rating: Math.round(avg * 10) / 10,
    reviewCount: all.length,
  });
};

export const getReviews = async (productId) => {
  const snap = await getDocs(query(Col.reviews(productId), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── CUSTOM BUILDS ───────────────────────────────────────────

export const saveCustomBuild = async (uid, build) => {
  return addDoc(Col.customBuilds(uid), { ...build, savedAt: serverTimestamp() });
};

export const getCustomBuilds = async (uid) => {
  const snap = await getDocs(query(Col.customBuilds(uid), orderBy('savedAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const deleteCustomBuild = async (uid, buildId) => {
  return deleteDoc(doc(db, 'users', uid, 'customBuilds', buildId));
};

// ─── ADMIN: DASHBOARD STATS ──────────────────────────────────

export const getDashboardStats = async () => {
  try {
    const [ordersSnap, usersSnap, productsSnap] = await Promise.all([
      getDocs(Col.orders()),
      getDocs(Col.users()),
      getDocs(Col.products()),
    ]);

    const orders = ordersSnap.docs.map(d => d.data());
    const totalRevenue = orders.reduce((s, o) => s + (o.grandTotal || 0), 0);
    const totalOrders = orders.length;
    const totalUsers = usersSnap.size;
    const totalProducts = productsSnap.size;

    const statusCounts = orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {});

    return { totalRevenue, totalOrders, totalUsers, totalProducts, statusCounts };
  } catch (err) {
    console.error('getDashboardStats:', err);
    return { totalRevenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0, statusCounts: {} };
  }
};
