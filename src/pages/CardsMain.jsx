import React, { useState } from 'react';
import Cards from './Cards';
import Cart from './Cart';


const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  return (
    <div>
      <h1>My Store</h1>
   <Cards/>
    </div>
  );
};

export default App;
