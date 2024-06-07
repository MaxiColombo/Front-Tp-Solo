import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CategoryInstrument } from "../../../types/CategoryInstrument";
import { Instrument } from "../../../types/Instrument";

const url = "http://localhost:8080/api/";

export const AddInstrument = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [instrument, setInstrument] = useState<Instrument>({
    id: 0,
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: 0,
    costoEnvio: "",
    cantidadVendida: 0,
    descripcion: "",
    cantidad: 0,
    categoria: { id: 0, denominacion: "" },
  });
  const [categorias, setCategorias] = useState<CategoryInstrument[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const result = await axios.get<CategoryInstrument[]>(url + "categorias/all");
      setCategorias(result.data);
    };
    fetchCategorias();
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "categoriaId") {
      const numValue = parseInt(value);
      setInstrument(prev => ({
        ...prev,
        categoria: categorias.find(c => c.id === numValue) || prev.categoria
      }));
    } else {
      setInstrument(prev => ({
        ...prev,
        [name]: name === "precio" || name === "cantidadVendida" ? parseFloat(value) : value
      }));
    }
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(url + "instrumentos/create", {
        ...instrument,
        categoria: { id: instrument.categoria.id }
      });
      navigate("/listProducts");
    } catch (error) {
      console.error("Error al crear el instrumento:", error);
    }
  };

  return (
    <div className="container p-5" style={{ maxWidth: "800px" }}>
      <div className="row">
        <div className="col-md-12 border rounded p-4 mt-2 shadow text-center bg-light">
          <h2 className="text-center m-4">Añadir Instrumento</h2>
          <form onSubmit={enviar}>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label" style={{ fontWeight: "bold" }}>Imagen URL</label>
              <input 
                type="text" 
                className="form-control" 
                id="imagen" 
                placeholder="Imagen URL" 
                name="imagen" 
                value={instrument.imagen} 
                onChange={onInputChange} 
                style={{ borderColor: "#007bff", borderWidth: "2px" }}
              />
              {instrument.imagen && <img src={instrument.imagen} alt="Instrument Preview" className="img-fluid mt-3 rounded" />}
            </div>
            <div className="mb-3">
              <label htmlFor="instrumento" className="form-label" style={{ fontWeight: "bold" }}>Instrumento</label>
              <input 
                type="text" 
                className="form-control" 
                id="instrumento" 
                placeholder="Instrumento" 
                name="instrumento" 
                value={instrument.instrumento} 
                onChange={onInputChange} 
                style={{ borderColor: "#007bff", borderWidth: "2px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="marca" className="form-label" style={{ fontWeight: "bold" }}>Marca</label>
              <input 
                type="text" 
                className="form-control" 
                id="marca" 
                placeholder="Marca" 
                name="marca" 
                value={instrument.marca} 
                onChange={onInputChange} 
                style={{ borderColor: "#007bff", borderWidth: "2px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="modelo" className="form-label" style={{ fontWeight: "bold" }}>Modelo</label>
              <input 
                type="text" 
                className="form-control" 
                id="modelo" 
                placeholder="Modelo" 
                name="modelo" 
                value={instrument.modelo} 
                onChange={onInputChange} 
                style={{ borderColor: "#007bff", borderWidth: "2px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="precio" className="form-label" style={{ fontWeight: "bold" }}>Precio</label>
              <input 
                type="number" 
                className="form-control" 
                id="precio" 
                placeholder="Precio" 
                name="precio" 
                value={instrument.precio} 
                onChange={onInputChange} 
                style={{ borderColor: "#007bff", borderWidth: "2px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="costoEnvio" className="form-label" style={{ fontWeight: "bold" }}>Costo de Envío</label>
              <input 
                type="text" 
                className="form-control" 
                id="costoEnvio" 
                placeholder="Costo Envío" 
                name="costoEnvio" 
                value={instrument.costoEnvio} 
                onChange={onInputChange} 
                style={{ borderColor: "#007bff", borderWidth: "2px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cantidadVendida" className="form-label" style={{ fontWeight: "bold" }}>Cantidad Vendida</label>
              <input 
                type="number" 
                className="form-control" 
                id="cantidadVendida" 
                placeholder="Cantidad Vendida" 
                name="cantidadVendida" 
                value={instrument.cantidadVendida} 
                onChange={onInputChange} 
                style={{ borderColor: "#007bff", borderWidth: "2px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label" style={{ fontWeight: "bold" }}>Descripción</label>
              <textarea 
                className="form-control" 
                id="descripcion" 
                placeholder="Descripción" 
                name="descripcion" 
                value={instrument.descripcion} 
                onChange={onInputChange} 
                style={{ borderColor: "#007bff", borderWidth: "2px", minHeight: "100px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoriaId" className="form-label" style={{ fontWeight: "bold" }}>Categoría</label>
              <select 
                className="form-control" 
                id="categoriaId" 
                name="categoriaId" 
                value={instrument.categoria.id} 
                onChange={onInputChange} 
                style={{ borderColor: "#007bff", borderWidth: "2px" }}
              >
                <option value="0">Seleccione una categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-between">
              <Button type="submit" className="btn btn-primary" style={{ borderRadius: "30px", padding: "10px 20px" }}>Enviar</Button>
              <Link to="/" className="btn btn-danger" style={{ borderRadius: "30px", padding: "10px 20px" }}>Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
