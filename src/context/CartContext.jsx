import React, { createContext, useState } from "react";

//Creamos el contexto para el carrito de compras

export const CartContext = createContext();

// Creamos el provider de nuestro context como un componente HOC el cual recibirá un children

export const CartProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState({ qtyItems: 0, products: [] });

  return (
    <CartContext.Provider
      value={{
        itemCount,
        setItemCount,
      }}
    > 
      {children}
    </CartContext.Provider>
  );
};
