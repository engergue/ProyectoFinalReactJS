import React from "react";
// import styles from "./App.module.css";
import { CartProvider } from "./context";
import { MainLayout } from "./layouts";
import { MainRoutes } from "./routes/MainRoutes";

function App() {

  return (
    <MainLayout>
       <CartProvider>
          <MainRoutes />
       </CartProvider>
    </MainLayout>
  );
}

export default App;
