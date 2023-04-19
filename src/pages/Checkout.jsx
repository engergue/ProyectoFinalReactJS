import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { CartContext } from "../context";
import { PaymentSuccess } from "../components";



const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentButton: {
    borderRadius: "12px",
    marginTop: "10px",
    fontSize: "1rem",
    justifyContent: "center",
    display: "grid",
    width: "100%",
  },
  textFormulario: {
    display: "block",
    textAlign: "center",
    fontSize: "20px"
  },
  inputFormulario: {
    width: "100%",
    border: "none",
    borderRadius: "20px",
    padding: "10px",
    margin: "20px 0",
  },
};

// Para pruebas pueden usar:
//Tarjeta: 4509953566233704
//Fecha de vencimiento: 11/25
//Codigo de seguridad: 123
//Estos son datos de prueba que brinda mercado pago para desarrolladores
//Mas info: https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards

export const Checkout = () => {

  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [paymentId, setPaymentId] = React.useState("");

  const { itemCount } = React.useContext(CartContext);
  const navigate = useNavigate();

  const location = useLocation();
  const total = location.state;
  const handleSubmit = (e) => {
    e.preventDefault();
    //Para ver los datos ingresados
    const name = e.target.name.value;
    const cardNumber = e.target.cardNumber.value;
    const expirationDate = e.target.expirationDate.value;
    const cvc = e.target.cvc.value;

    // Aquí puedes manejar el envío del formulario, como validar y procesar los datos
    console.log("Nombre en la tarjeta:", name);
    console.log("Número de tarjeta:", cardNumber);
    console.log("Fecha de vencimiento:", expirationDate);
    console.log("Código de seguridad (CVC):", cvc);
    console.log("Total a pagar:", total);

    // Ojo en producción, no se suelen guardar datos de tarjetas y demás. Solo el metodo de pago (si fue tarjeta, efectivo, etc) y datos de compra en si
    // por ejemplo el id de los productos y cantidad. Además se suele guardar el estado de la transaccion, por ejemplo si fue aprobada o rechazada por la entidad.
    // puede ser mercadopago, visa, etc... Esto lo pueden ver en las APIs de cada entidad que quieran integrar

    const newProduct = {
      nombre: name,
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvc: cvc,
      total: total,
      products: itemCount, //Ids y cantidades
      status: "Aprobada", //Deberán modificar según corresponda
    };
    const db = getFirestore();
    const productCollection = collection(db, "sales");
    addDoc(productCollection, newProduct)
      .then(({ id }) => {
        setPaymentSuccess(true);
        setPaymentId(id);
      })
      .catch((err) => console.log(err))
      
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  return (
    <Container style={styles.container} fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">DATOS DE PAGO</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label style={styles.textFormulario}>Nombre de la Tarjeta</Form.Label>
              <Form.Control style={styles.inputFormulario}
                type="text"
                placeholder="Nombre completo"
                required
              />
            </Form.Group>

            <Form.Group controlId="cardNumber">
              <Form.Label style={styles.textFormulario}>Número de tarjeta</Form.Label>
              <Form.Control style={styles.inputFormulario}
                type="text"
                pattern="[0-9]{16}"
                placeholder="1234 5678 9012 3456"
                required
              />
            </Form.Group>

            <Form.Group controlId="expirationDate">
              <Form.Label style={styles.textFormulario}>Fecha de vencimiento</Form.Label>
              <Form.Control style={styles.inputFormulario} type="month" required />
            </Form.Group>

            <Form.Group controlId="cvc">
              <Form.Label style={styles.textFormulario}>Código de seguridad (CVC)</Form.Label>
              <Form.Control style={styles.inputFormulario}
                type="text"
                pattern="[0-9]{3}"
                placeholder="123"
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={styles.paymentButton}
            >
              {(
                `Pagar $${total}`
              )}
            </Button>
          </Form>
        </Col>
      </Row>
      {paymentSuccess && <PaymentSuccess paymentId={paymentId} />}
    </Container>
  );
};
