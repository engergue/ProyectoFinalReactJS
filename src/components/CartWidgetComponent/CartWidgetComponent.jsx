import React, { useContext } from 'react'
import cartImage from './images/cart.png'
import styles from './CartWidgetComponent.module.css'
import stylesCart from './CartWidgetComponent.module.css'
import { CartContext } from '../../context'



export const CartWidgetComponent = () => {

  const { itemCount } = useContext(CartContext); 

  return (
    <div className={styles.cartWidget}>
      <img src={cartImage} alt="Carrito de Compras"/>
      <div className={stylesCart.qtyDisplay}>{itemCount.qtyItems}</div>
    </div>
  )
}
