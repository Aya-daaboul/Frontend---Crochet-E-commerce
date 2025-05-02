import { createContext, useContext, useState } from "react";

const CartNumberContext = createContext();

export const CartNumberProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const incrementCart = (amount = 1) => {
    setCartCount((prev) => prev + amount);
  };

  const resetCart = () => {
    setCartCount(0);
  };

  return (
    <CartNumberContext.Provider value={{ cartCount, incrementCart, resetCart }}>
      {children}
    </CartNumberContext.Provider>
  );
};

export const useCartNumber = () => useContext(CartNumberContext);
