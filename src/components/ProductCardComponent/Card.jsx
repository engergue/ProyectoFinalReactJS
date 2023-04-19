import React from 'react'
import { Link } from 'react-router-dom';
import { CartButtons } from "../CartButtonsComponent";
import "./Card.css";

export const Card = ( {producto} ) => {
  return (
    
      <div className="card">
        <Link to={`/productos/${producto.id}`} className="card-link">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="card-img"
          />
          <div className="card-body">
            <h2 className="card-title">{producto.nombre}</h2>
            <p className="precio">$ {producto.precio} USD</p>
            <p className="card-text">{producto.descripcion}</p>
            
          </div>
        </Link>
      </div>
    
  )
}
