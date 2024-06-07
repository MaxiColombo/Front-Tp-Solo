import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Home } from "../components/screens/Home/Home";
import { AddInstrument } from "../components/screens/Instrumentos/AddInstruments";
import { EditInstrument } from "../components/screens/Instrumentos/EditInstrument";
import { ScreenInstrumentos } from "../components/screens/ScreenInstrumentos/ScreenInstrumentos";
import { CartMP } from "../components/screens/Cart/CartMP";
import { Login } from "../components/screens/Usuario/Usuario";
import { NavbarCrud } from "../components/ui/NavBarCrud/NavBarCrud";
import { ScreenCharts } from "../components/screens/Charts/ScreenCharts";
import { HomeHendrix } from "../components/screens/TP4/HendrixHome";
import { Maps } from "../components/screens/TP4/Maps";

export const AppRouter = () => {
  const total = useAppSelector((state) => state.cart.totalCount);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";



  return (
    <>
      {isLoggedIn && <NavbarCrud />}
      <div className="container">
        <div className="d-flex py-4">
          {isLoggedIn && (
            <>
              
            </>
          )}
        </div>
        
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/homeHendrix" element={<HomeHendrix />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/listProducts" element={<Home />} />
              <Route path="/addInstrument" element={<AddInstrument />} />
              <Route path="/editInstrument/:id" element={<EditInstrument />} />
              <Route path="/viewInstrument/:id" />
              <Route path="/cart" element={<CartMP />} />
              <Route path="/productos" element={<ScreenInstrumentos />} />
              <Route path="/charts" element={<ScreenCharts/>} />
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </div>
    </>
  );
};
