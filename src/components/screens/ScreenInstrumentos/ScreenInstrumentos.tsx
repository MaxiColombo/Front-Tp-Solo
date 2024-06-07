
import { ProductoInstrumento } from "../ProductoInstrumento/ProductoInstrumento";
import { Instrument } from "../../../types/Instrument";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";

export const ScreenInstrumentos = () => {
  //const user = useAppSelector((state) => state.user);


  //declaramos el useState
  const [instrumentos, setInstrumentos] = useState<Instrument[]>([]);

  


  
  //utilizamos useEffect
  useEffect(() => {
    axios.get("http://localhost:8080/api/instrumentos/all").then((response) => {
        setInstrumentos(response.data);
    });
  }, []);

  return (
    <>
      <ProductoInstrumento instrumentos={instrumentos} />
    </>
  );
};
