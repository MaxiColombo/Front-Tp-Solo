import axios from "axios";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CategoryInstrument } from "../../../types/CategoryInstrument";
import { useEffect, useState } from "react";

const url = "http://localhost:8080/api/";

export const EditInstrument = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  const [instrument, setInstrument] = useState({
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: 0,
    costoEnvio: "",
    cantidadVendida: 0,
    descripcion: "",
    categoria: { id: 0, denominacion: "" },
  });
  const [categorias, setCategorias] = useState<CategoryInstrument[]>([]);

  //Traemos las categorias
  const fetchCategorias = async () => {
    const result = await axios.get<CategoryInstrument[]>(
      url + "categorias/all"
    );
    setCategorias(result.data);
  };

  //Traemos el instrumento por id
  const cargarInstrumento = async () => {
    const result = await axios.get(`${url}instrumentos/get/${id}`);
    setInstrument(result.data);
  };

  //Usamos useEffect para cargar el instrumento y las categorias en la vista edit
  useEffect(() => {
    fetchCategorias();
    cargarInstrumento();
  }, []);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "categoriaId") {
      const numValue = parseInt(value);
      const foundCategory = categorias.find((c) => c.id === numValue);
      setInstrument((prev) => ({
        ...prev,
        categoria: foundCategory ?? { id: 0, denominacion: "Categoría Predeterminada" }, // Proporciona un objeto por defecto si no se encuentra ninguna categoría
      }));
    } else {
      setInstrument((prev) => ({
        ...prev,
        [name]: name === "precio" || name === "cantidadVendida" ? parseFloat(value) : value,
      }));
    }
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Entrando en enviar...");
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/instrumentos/update/${id}`, instrument);
    navigate("/listProducts");
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow text-center text-bg-light">
          <h2 className="text-center m-4">Editar Instrumento</h2>
          <form onSubmit={enviar}>
            <div className="mb-3">
              <label htmlFor="instrumento" className="form-label">
                Instrumento
              </label>
              <input
                type="text"
                className="form-control"
                id="instrumento"
                placeholder="Instrumento"
                name="instrumento"
                value={instrument.instrumento}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="marca" className="form-label">
                Marca
              </label>
              <input
                type="text"
                className="form-control"
                id="marca"
                placeholder="Marca"
                name="marca"
                value={instrument.marca}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="modelo" className="form-label">
                Modelo
              </label>
              <input
                type="text"
                className="form-control"
                id="modelo"
                placeholder="Modelo"
                name="modelo"
                value={instrument.modelo}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                Imagen URL
              </label>
              <input
                type="text"
                className="form-control"
                id="imagen"
                placeholder="Imagen URL"
                name="imagen"
                value={instrument.imagen}
                onChange={onInputChange}
              />
              {instrument.imagen && (
                <img
                  src={instrument.imagen}
                  alt="Instrument Preview"
                  className="img-fluid mt-3"
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                id="precio"
                placeholder="Precio"
                name="precio"
                value={instrument.precio}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="costoEnvio" className="form-label">
                Costo de Envío
              </label>
              <input
                type="text"
                className="form-control"
                id="costoEnvio"
                placeholder="Costo Envío"
                name="costoEnvio"
                value={instrument.costoEnvio}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cantidadVendida" className="form-label">
                Cantidad Vendida
              </label>
              <input
                type="number"
                className="form-control"
                id="cantidadVendida"
                placeholder="Cantidad Vendida"
                name="cantidadVendida"
                value={instrument.cantidadVendida}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                placeholder="Descripción"
                name="descripcion"
                value={instrument.descripcion}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoriaId" className="form-label">
                Categoría
              </label>
              <select
                className="form-control"
                id="categoriaId"
                name="categoriaId"
                value={instrument.categoria.id}
                onChange={onInputChange}
              >
                <option value="0">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.denominacion}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="btn btn-primary">
              Guardar
            </Button>
            <Link to="/" className="btn btn-danger mx-2">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
