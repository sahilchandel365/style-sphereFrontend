import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cards.css'; // Import the new CSS styling
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/auth/products') // Adjust to match your backend
      .then(response => {
        const productsWithSelection = response.data.map(product => ({
          ...product,
          selectedQuantity: 1,
        }));
        setProducts(productsWithSelection);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (event, productId) => {
    const selectedQty = Number(event.target.value);
    setProducts(prev =>
      prev.map(product =>
        product._id === productId
          ? { ...product, selectedQuantity: selectedQty }
          : product
      )
    );
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, selectedQuantity: product.selectedQuantity }
            : item
        );
      } else {
        return [...prev, product];
      }
    });

    navigate('/cart', { state: { cartItems: [...cartItems, product] } });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
     <h1 className="cart-heading">🛍️ Style Sphere Cart</h1>
      <p className="cart-subheading">
        Buy premium salon essentials & <span className="highlight">pay always less</span> — because beauty should be affordable.
      </p>
    
    <div className="cards-container">
      {products.map((product) => (
        <div key={product._id} className="card">
          <img
            src={`http://localhost:8080/uploads/${product.image}`}
            alt={product.name}
            className="product-image"
          />
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price.toFixed(2)}</p>
          <p>Quantity Available: {product.quantity}</p>

          {product.quantity < 10 && product.quantity > 0 && (
            <p className="few-left-message">Few left in stock!</p>
          )}

          <div className="quantity-selector">
            <label htmlFor={`quantity-${product._id}`}>Select Quantity:</label>
            <select
              id={`quantity-${product._id}`}
              value={product.selectedQuantity}
              onChange={(e) => handleQuantityChange(e, product._id)}
              disabled={product.quantity <= 0}
            >
              {[...Array(Math.min(5, Number(product.quantity))).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => handleAddToCart(product)}
            disabled={product.selectedQuantity > product.quantity || product.quantity <= 0}
          >
            {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      ))}
    </div>
</>
  );
};

export default Cards;
