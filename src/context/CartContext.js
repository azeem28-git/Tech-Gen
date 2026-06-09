import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  subscribeCart, addToCart as fsAddToCart,
  updateCartQty as fsUpdateQty, removeFromCart as fsRemoveFromCart,
  addToWishlist as fsAddWishlist, removeFromWishlist as fsRemoveWishlist,
  getWishlist,
} from '../firebase/firestore';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!user) return;
    setSyncing(true);
    const unsub = subscribeCart(user.uid, (items) => {
      setCartItems(items);
      setSyncing(false);
    });
    getWishlist(user.uid).then(setWishlist);
    return () => unsub();
  }, [user]);

  const addToCart = useCallback(async (product) => {
    if (user) {
      await fsAddToCart(user.uid, product);
    } else {
      setCartItems(prev => {
        const exists = prev.find(i => i.id === product.id);
        if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
        return [...prev, { ...product, qty: 1 }];
      });
    }
  }, [user]);

  const removeFromCart = useCallback(async (id) => {
    if (user) {
      await fsRemoveFromCart(user.uid, id);
    } else {
      setCartItems(prev => prev.filter(i => i.id !== id));
    }
  }, [user]);

  const updateQty = useCallback(async (id, qty) => {
    if (user) {
      await fsUpdateQty(user.uid, id, qty);
    } else {
      if (qty < 1) return setCartItems(prev => prev.filter(i => i.id !== id));
      setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    }
  }, [user]);

  const toggleWishlist = useCallback(async (product) => {
    const alreadyIn = wishlist.some(i => i.id === product.id);
    if (user) {
      if (alreadyIn) {
        await fsRemoveWishlist(user.uid, product.id);
        setWishlist(prev => prev.filter(i => i.id !== product.id));
      } else {
        await fsAddWishlist(user.uid, product);
        setWishlist(prev => [...prev, product]);
      }
    } else {
      setWishlist(prev =>
        alreadyIn ? prev.filter(i => i.id !== product.id) : [...prev, product]
      );
    }
  }, [user, wishlist]);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  const cartTotal  = cartItems.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  const cartCount  = cartItems.reduce((s, i) => s + (i.qty || 1), 0);
  const gst        = cartTotal * 0.18;
  const grandTotal = cartTotal + gst;

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQty,
      wishlist, toggleWishlist, isWishlisted,
      cartTotal, cartCount, gst, grandTotal, syncing,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
