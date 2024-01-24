import React, { useState } from 'react';
import './App.css'
const App = () => {
  const [size, setSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [showBill, setShowBill] = useState(false);

  const changeSize = newSize => {
    setSize(newSize);
    setQuantity(1)
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    const item = { size, quantity };
    setCart(prevCart => [...prevCart, item]);
    alert(`Added ${quantity} ${size} coffee(s) to the cart!`);
  };

  const generateBill = () => {
    setShowBill(true);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {
      let price;
      switch (item.size) {
        case 'small':
          price = 2.5;
          break;
        case 'medium':
          price = 3.0;
          break;
        case 'large':
          price = 3.5;
          break;
        default:
          price = 0;
      }
      total += price * item.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div className="coffee-machine">
      <h1>Coffee Machine Vendor</h1>
      <div className="coffee-options">
        <button className="size-btn" onClick={() => changeSize('small')}>Small</button>
        <button className="size-btn" onClick={() => changeSize('medium')}>Medium</button>
        <button className="size-btn" onClick={() => changeSize('large')}>Large</button>
      </div>
      <div className="quantity">
        <button onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button className="order-btn" onClick={addToCart}>Add to Cart</button>
      <button className="bill-btn" onClick={generateBill}>Generate Bill</button>
      {showBill && (
        <div className="bill">
          <h2>Order Summary</h2>
          {cart.map((item, index) => (
            <p key={index}>{item.quantity} {item.size} coffee(s)</p>
          ))}
          <p>Total: ${calculateTotal()}</p>
        </div>
      )}
    </div>
  );
};

export default App;
