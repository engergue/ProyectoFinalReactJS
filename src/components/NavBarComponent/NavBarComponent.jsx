import React from 'react'
import NavItem from './NavItem'
import { Link } from 'react-router-dom';
import styles from "./NavBarComponent.module.css"
import { CartWidgetComponent } from '../CartWidgetComponent/CartWidgetComponent'

export const NavBarComponent = () => {
  return (
    <nav className={styles.nav}>
      <header><Link to={`/`}><img src="../logo.png" /></Link></header>
      <div className={styles.navItems}>
        <NavItem label="Home" src="/" />
        <NavItem label="Equipos de Navegación" src="/equipos-navegacion" />
        <NavItem label="Equipos de Comunicación" src="/equipos-comunicacion" />
        <NavItem label="Equipos para Pesca" src="/equipos-pesca" />
        <NavItem label={<CartWidgetComponent />} src="/cart" />       
      </div>
      
    </nav>
  )
}