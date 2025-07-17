import React from 'react';
import { Routes, Route } from 'react-router';
import Nav from './pages/navigation/Nav';
import Footer from './Footer';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import routes from './Routes';
import ProtectedRoute from './ProtectedRoute';

const stripePromise = loadStripe('pk_test_4eC39HqLyjWDarjtT1zdp7dc'); // Replace in production

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <Nav />
        <Routes>
          {routes.map(({ path, element, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute>{element}</ProtectedRoute>
                ) : (
                  element
                )
              }
            />
          ))}
        </Routes>
        <Footer />
      </div>
    </Elements>
  );
};

export default App;
