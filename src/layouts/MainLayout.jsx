import React from "react";
import { NavBarComponent } from "../components";

export const MainLayout = ({ children }) => {
  const mainLayoutStyles = {
    color: "black",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={mainLayoutStyles}>
      <div>{children}</div>
    </div>
  );
};
