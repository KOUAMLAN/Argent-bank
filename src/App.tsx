import React, { useEffect, PropsWithChildren } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchUserProfile } from './state/authSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import TransactionsPage from './pages/TransactionsPage';

/**
 * AppLayout, c'est comme un cadre. Toutes les pages qu'on met dedans auront un en-tête et un pied de page.
 */
const AppLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

/**
 * App, c'est le grand chef d'orchestre des routes. Il décide quelle page montrer en fonction de l'adresse.
 */
const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
     <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <LoginPage />} />
        
        <Route path="/*" element={
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/account/:accountId/transactions" element={<TransactionsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
  );
};

/**
 * Root, c'est le tout premier composant qui enveloppe notre application pour que le système d'adresses (BrowserRouter) fonctionne partout.
 */
const Root: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;