import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add Item
  const addToCart = (food) => {
    const exist = cartItems.find(item => item._id === food._id);

    if (exist) {
      setCartItems(cartItems.map(item =>
        item._id === food._id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...food, qty: 1 }]);
    }
  };

  // Remove Item
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  // Update Quantity
  const updateQty = (id, qty) => {
    setCartItems(cartItems.map(item =>
      item._id === id ? { ...item, qty } : item
    ));
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeItem,
        updateQty,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

