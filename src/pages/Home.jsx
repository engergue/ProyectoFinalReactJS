import React from 'react'
import { ItemListContainerComponent, Card } from "../components";

import { collection, getDocs, getFirestore} from "firebase/firestore";

export const Home = () => {

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
    <div className="productos">
      <ItemListContainerComponent />
      {productsData.map((producto) => (
        <Card key={producto.id} producto={producto} />
      ))}
      <div>
      </div>
    </div>
    
  )
}
