import React from 'react';
import { Card } from '../components';
import { collection, getDocs, getFirestore} from "firebase/firestore";

export const Pesca = () => {

  const [productsData, setProductsData] = React.useState([]);
  
  React.useEffect(() => {
    const db = getFirestore();

    const itemsCollection = collection(db, 'productos');
    getDocs(itemsCollection)
      .then((productos) => {
        if (productos.length === 0) {
         console.log("No hay productos");
        }

        setProductsData(
          productos.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
        );
      })
      .catch((err) => console.log(err))
  }, []);

  return (
    <div className='productos'>

      {productsData.map(function(producto){
        if(producto.categoria === "equipos-pesca"){
          return <Card key={producto.id} producto={producto} />
        } 
         return null;
      })}

    </div>
    
  )
}