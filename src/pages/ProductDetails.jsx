import React from "react";
import { useParams } from "react-router-dom";
import { CartButtons } from "../components/CartButtonsComponent";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import "./ProductDetails.css";

export const ProductDetails = () => {
  const { productId } = useParams();
  const [productData, setProductData] = React.useState({});
  // const producto = ProductsInfo.find((p) => p.slug === productSlug);
  // const categoria = ProductsInfo.find((p) => p.categoria === productCat);

  React.useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "productos", productId);

    getDoc(docRef)
      .then((producto) => {
        setProductData({ id: producto.id, ...producto.data()});
      })
      .catch((err) => console.log(err));
  }, [productId]);

  return (
    <div className="detalle-producto">
      <div className="product-left">
        <img src={productData.imagen} alt={productData.nombre} className="img-fluid" />
      </div>
      <div className="product-right">
        <h2>{productData.nombre}</h2>
        <p className="precio">$ {productData.precio} USD</p>
        <p className="card-text">{productData.descripcion}</p>
        <div className="botones-detalle">
          <CartButtons />
        </div>
      </div>
      
    </div>
  );
};