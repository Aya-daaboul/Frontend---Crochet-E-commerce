import { createContext, useContext, useState } from "react";

const CartNumberContext = createContext();
// This context will be used to manage the cart number across the application
// and provide a way to increment or reset the cart count.
export const CartNumberProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const incrementCart = (amount = 1) => {
    setCartCount((prev) => prev + amount);
  };

  const resetCart = () => {
    setCartCount(0);
  };

  return (
    // The CartNumberContext.Provider component provides the cartCount, incrementCart, and resetCart functions to its children.
    <CartNumberContext.Provider value={{ cartCount, incrementCart, resetCart }}>
      {children}
    </CartNumberContext.Provider>
  );
};

export const useCartNumber = () => useContext(CartNumberContext);
