import React, { useContext } from "react";
import { collection, getDoc, doc, getFirestore } from "firebase/firestore";
import { CartContext } from "../context";
import { CartDetailCard, CartPaymentDetails, Loader } from "../components";
import { useNavigate } from "react-router-dom";

//Esta función crea las referencias de los productos utilizando los IDs del itemCount.
//Una vez hecho eso, con Promise.all,
//devuelve el array resultante de ejecutar todas las llamadas segun la cantidad de productos (ids) agregados al carrito
const fetchProductsByIds = async (ids) => {
  const db = getFirestore();
  const productRefs = ids.map((id) => doc(collection(db, "productos"), id));

  const productSnapshots = await Promise.all(
    productRefs.map((productRef) => getDoc(productRef))
  );

  // Aqui hacemos el return de los productos y verificamos que exista, podemos usar length también. Se puede mejorar
  const products = productSnapshots.map((productSnapshot) => {
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      return null;
    }
  });

  return products.filter((product) => product !== null);
};

const styles = {
  cartWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100vh",
  },
  productCardDetail: {
    width: "60%",
  },
};

export const Cart = () => {
  const [error, setError] = React.useState(false);
  const [productsData, setProductsData] = React.useState([]);
  

  const { itemCount } = useContext(CartContext);
  React.useEffect(() => {
    const ids = itemCount.products.map((product) => product.productId);
    fetchProductsByIds(ids)
      .then((res) => setProductsData(res))
      .catch((err) => setError(err))

  }, [itemCount.products]);

  //Función complementaria para poder encontrar el id según el id enviado en el calculo del total
  const findQtyByProductId = (productId) => {
    const item = itemCount.products.find(
      (item) => item.productId === productId
    );
    return item ? item.qty : 0;
  };

  //Calcula el total macheando el id de productsData con itemCount para respetar las cantidades
  const total = productsData
    .map((product) => product.precio * findQtyByProductId(product.id))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate("/checkout", { state: total });
  };

  return(
    <div style={styles.cartWrapper}>
      <div style={styles.productCardDetail}>
        {productsData.map((product) => (
          <CartDetailCard
            key={product.id}
            product={product}
            qty={itemCount.products.find(
              (item) => item.productId === product.id
            )}
          />
        ))}
      </div>
      <div>
        <CartPaymentDetails total={total} onClick={handleCheckoutClick} />
      </div>
    </div>
  );
};
