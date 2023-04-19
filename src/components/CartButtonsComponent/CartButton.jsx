import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context";

export const CartButtons = () => {
  const [qtyState, setQtyState] = React.useState(1);

  const { productId } = useParams();

  const { itemCount, setItemCount } = useContext(CartContext);

  const AddQty = () => {
    if (qtyState === 5) return;
    setQtyState(qtyState + 1);
  };
  const LessQty = () => {
    if (qtyState === 1) return;
    setQtyState(qtyState - 1);
  };

  const addToCart = () => {
    const existingProduct = itemCount.products.find(
      (p) => p.productId === productId
    );
    if (existingProduct) {
      existingProduct.qty += qtyState;
    } else {
      const newProduct = {
        productId,
        qty: qtyState,
      };
      setItemCount((prevState) => ({
        qtyItems: prevState.qtyItems + qtyState,
        products: [...prevState.products, newProduct],
      }));
    }
  };
 
  
  return (
    <>
      <div className="contador">
        <button className="lessButton" onClick={LessQty}>-</button>
        <div>{qtyState}</div>
        <button className="addButton" onClick={AddQty}>+</button>
      </div>
      <button className="btn btn-primary" onClick={addToCart}>Agregar al carrito</button>
    </>
  );
};
