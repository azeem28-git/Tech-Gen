import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Create or fetch Firestore user document
  const syncUserDoc = async (firebaseUser, extraData = {}) => {
    const ref = doc(db, 'users', firebaseUser.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const newProfile = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || extraData.name || '',
        email: firebaseUser.email,
        phone: extraData.phone || '',
        photoURL: firebaseUser.photoURL || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        role: 'user',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(ref, newProfile);
      setUserProfile(newProfile);
    } else {
      setUserProfile(snap.data());
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await syncUserDoc(firebaseUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const clearError = () => setAuthError('');

  // ---------- Sign Up ----------
  const signUp = async (name, email, password, phone = '') => {
    clearError();
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(newUser, { displayName: name });
      await syncUserDoc(newUser, { name, phone });
      return { success: true };
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  // ---------- Sign In ----------
  const signIn = async (email, password) => {
    clearError();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  // ---------- Google Sign In ----------
  const signInWithGoogle = async () => {
    clearError();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserDoc(result.user);
      return { success: true };
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  // ---------- Sign Out ----------
  const logOut = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  // ---------- Forgot Password ----------
  const resetPassword = async (email) => {
    clearError();
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  // ---------- Change Password ----------
  const changePassword = async (currentPassword, newPassword) => {
    clearError();
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      return { success: true };
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  // ---------- Update Profile ----------
  const updateUserProfile = async (data) => {
    clearError();
    try {
      const ref = doc(db, 'users', user.uid);
      await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
      if (data.name) await updateProfile(user, { displayName: data.name });
      setUserProfile(prev => ({ ...prev, ...data }));
      return { success: true };
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      authError,
      clearError,
      signUp,
      signIn,
      signInWithGoogle,
      logOut,
      resetPassword,
      changePassword,
      updateUserProfile,
      isAdmin: userProfile?.role === 'admin',
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Human-readable Firebase error messages
function firebaseErrorMessage(code) {
  const map = {
    'auth/email-already-in-use':    'An account with this email already exists.',
    'auth/invalid-email':           'Please enter a valid email address.',
    'auth/weak-password':           'Password must be at least 6 characters.',
    'auth/user-not-found':          'No account found with this email.',
    'auth/wrong-password':          'Incorrect password. Please try again.',
    'auth/invalid-credential':      'Invalid email or password.',
    'auth/too-many-requests':       'Too many attempts. Please try again later.',
    'auth/network-request-failed':  'Network error. Check your connection.',
    'auth/popup-closed-by-user':    'Sign-in popup was closed. Please try again.',
    'auth/requires-recent-login':   'Please sign in again to make this change.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}
