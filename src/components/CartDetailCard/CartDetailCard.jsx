import React from "react";
import styles from "./CartDetailCard.module.css";

export const CartDetailCard = ({ product, qty }) => {
  return (
    <div className={styles.cardsWrapper}>
      {product.activo && (
        <div className={styles.itemWrapper}>
          <div className={styles.itemImage}>
            <img src={product.imagen} alt={product.nombre} />
          </div>
          <div className={styles.productInfo}>
            <h2>{product.nombre}</h2>
            <p>{product.descripcion}</p>
            <p>Precio: <b>${product.precio}</b></p>
            <p>Cantidad: <b>{qty.qty}</b></p>
          </div>
        </div>
      )}
    </div>
  );
};
