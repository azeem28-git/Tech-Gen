import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import BuilderPage from './pages/BuilderPage';
import PrebuiltPage from './pages/PrebuiltPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const [page, setPage] = useState('home');
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'signup'

  const renderPage = () => {
    switch (page) {
      case 'home':     return <HomePage setPage={setPage} onAuthOpen={() => setAuthModal('login')} />;
      case 'products': return <ProductsPage />;
      case 'builder':  return <BuilderPage setPage={setPage} />;
      case 'prebuilt': return <PrebuiltPage setPage={setPage} />;
      case 'cart':     return <CartPage setPage={setPage} onAuthRequired={() => setAuthModal('login')} />;
      case 'admin':    return <AdminPage />;
      case 'profile':  return <ProfilePage setPage={setPage} />;
      default:         return <HomePage setPage={setPage} onAuthOpen={() => setAuthModal('login')} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar currentPage={page} setPage={setPage} onAuthOpen={() => setAuthModal('login')} />
      <main style={{ flex: 1 }}>{renderPage()}</main>
      {page !== 'admin' && <Footer setPage={setPage} />}
      {authModal && <AuthModal initialView={authModal} onClose={() => setAuthModal(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
