import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Instrument } from "../../../types/Instrument";
import { CategoryInstrument } from "../../../types/CategoryInstrument";
import "./Home.module.css"
const url = "http://localhost:8080/api/instrumentos/";

export const Home = () => {
  const [instrumentos, setInstrumentos] = useState<Instrument[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<CategoryInstrument[]>([]);
  const navigate = useNavigate();
  const cargarInstrumentos = async () => {
    try {
      let urlCompleta = url + "all";
      if (filtroCategoria) {
        urlCompleta += `/filter?categoriaId=${filtroCategoria}`;
      }
      const resultado = await axios.get(urlCompleta);
      setInstrumentos(resultado.data);
    } catch (error) {
      console.error("Error al cargar los instrumentos:", error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const resultado = await axios.get(
        "http://localhost:8080/api/categorias/all"
      );
      setCategorias(resultado.data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  const eliminarInstrumento = async (id: number) => {
    try {
      await axios.delete(url + `delete/${id}`);
      cargarInstrumentos();
    } catch (error) {
      console.error("Error al eliminar el instrumento:", error);
    }
  };
  /* {usuarioActivo === "Admin" || usuarioActivo === "Operador" ? ( ) : ( )} */
  const pdfInstrumento = async (id: number) => {
    try {
      console.log(id);
      window.open(`http://localhost:8080/api/instrumentos/${id}/pdf`, '_blank');
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  useEffect(() => {
    cargarInstrumentos();
    cargarCategorias();
  }, [filtroCategoria]);

  const usuarioActivo = localStorage.getItem("usuario");

  return (
    <div className="custom-container" style={{ padding: '20px' }}>
      <div className="custom-filter-section" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end',margin: '20px' }}>

          <select
            className="custom-filter-select"
            value={filtroCategoria || ""}
            onChange={(e) => setFiltroCategoria(Number(e.target.value) || null)}
            style={{
              padding: '4px 8px',
              borderRadius: '20px',
              border: '1px solid #0dcaf0',
              outline: 'none',
              backgroundColor: '#fff',
              transition: 'border-color 0.3s',
            }}
          >
            <option value="">Todas las Categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.denominacion}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="custom-table-section" style={{ overflowX: 'auto' }}>
        <Table striped bordered hover style={{ borderRadius: '10px', overflow: 'hidden' }}>
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              
              <th>Instrumento</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th>Costo Envío</th>
              <th>Cantidad Vendida</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instrumentos.map((instrumento, index) => (
              <tr key={index} style={{ textAlign: 'center' }}>
                
                <td>{instrumento.instrumento}</td>
                <td>{instrumento.marca}</td>
                <td>{instrumento.modelo}</td>
                <td>${instrumento.precio}</td>
                <td>${instrumento.costoEnvio}</td>
                <td>{instrumento.cantidadVendida}</td>
                <td>{instrumento.descripcion}</td>
                <td>{instrumento.categoria?.denominacion}</td>
                <td>
                  <img
                    src={instrumento.imagen}
                    className="custom-image"
                    alt="Instrumento"
                    style={{ width: '100px', borderRadius: '10px' }}
                  />
                </td>
                <td>
                  {usuarioActivo === "Admin" || usuarioActivo === "Operador" ? (
                    <>
                      <Link
                        className="custom-edit-button"
                        to={`/editInstrument/${instrumento.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '5px 10px',
                          margin: '5px',
                          borderRadius: '20px',
                          border: 'none',
                          backgroundColor: '#0dcaf0',
                          color: '#fff',
                          textDecoration: 'none',
                          transition: 'background-color 0.3s',
                        }}
                      >
                        Editar
                      </Link>
                      <button
                        className="custom-delete-button"
                        onClick={() => eliminarInstrumento(instrumento.id)}
                        style={{
                          display: 'inline-block',
                          padding: '5px 10px',
                          margin: '5px',
                          borderRadius: '20px',
                          border: 'none',
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s',
                        }}
                      >
                        Eliminar
                      </button>
                      <button
                        className="custom-pdf-button"
                        onClick={() => pdfInstrumento(instrumento.id)}
                        style={{
                          display: 'inline-block',
                          padding: '5px 15px',
                          margin: '5px',
                          borderRadius: '20px',
                          border: 'none',
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s',
                        }}
                      >
                        Pdf
                      </button>
                    </>
                  ) : (
                    <span>No es operador ni administrador</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
      </div>
    </div>
  );
}
