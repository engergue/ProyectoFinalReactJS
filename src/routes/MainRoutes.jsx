import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Navegacion, Comunicacion, Pesca, ProductDetails, Cart, Checkout } from "../pages";
import { NavBarComponent } from "../components";

export const MainRoutes = () => {
  return (
    <Router>
      <NavBarComponent />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/equipos-navegacion" element={<Navegacion />} />
            <Route exact path="/equipos-comunicacion" element={<Comunicacion />} />
            <Route exact path="/equipos-pesca" element={<Pesca />} />
            <Route exact path="/productos/:productId" element={<ProductDetails />}/>
            <Route exact path="/cart" element={<Cart />}/>
            <Route exact path="/checkout" element={<Checkout />}/>
        </Routes>
    </Router>
  )
}
