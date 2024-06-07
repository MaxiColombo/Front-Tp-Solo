import { useDispatch } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../../redux/slices/cartSlice";
import { useAppSelector } from "../../../hooks/redux";
import { Instrument } from "../../../types/Instrument";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const usuarioActivo = localStorage.getItem("usuario");
interface ProductListProps {
  instrumentos: Instrument[];
}

export const ProductoInstrumento: React.FC<ProductListProps> = ({ instrumentos }) => {
  const dispatch = useDispatch();
  const { productsList } = useAppSelector((state) => state.cart);

  const handleAddOrRemoveProduct = (product: Instrument) => {
    if (productsList.find((pdt) => pdt.id === product.id)) {
      dispatch(removeProductFromCart(product.id));
    } else {
      dispatch(addProductToCart(product));
    }
  };

  return (
    <>
     {(usuarioActivo === "Admin" || usuarioActivo === "Operador") && (
  <Link
    to="/addInstrument"
    className="btn btn-outline-light rounded-pill"
    style={{
      borderRadius: '30px',
      border: '2px solid blue',
      transition: 'background-color 0.3s, color 0.3s',
      marginRight: '10px',
      padding: '10px 20px',
      color: 'blue',
      textDecoration: 'none',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = 'blue';
      e.currentTarget.style.color = 'white';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = 'white';
      e.currentTarget.style.color = 'blue';
    }}
  >
    Añadir Instrumento
  </Link>
)}


      <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#007bff' }}>Instrumentos</h2>
      <div className="row" style={{ margin: '0 10px'}}>
        {instrumentos.map((inst) => {
          const isInCart = productsList.some((pdt) => pdt.id === inst.id);
          return (
            
            <div
              key={inst.id}
              className="col-3 mt-3"
              style={{
                border:"1px solid", 
                borderRadius: '8px',
                padding: '15px',
                margin: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h4 style={{ color: '#333', fontWeight: 'bold' }}>Nombre: {inst.instrumento}</h4>
              <p>
                <b>Precio:</b> ${inst.precio.toFixed(2)}
              </p>
              <p>
                <b>Categoría:</b> {inst.categoria.denominacion}
              </p>
              <button
                className={`btn ${isInCart ? "btn-danger" : "btn-success"}`}
                style={{
                  borderRadius: '20px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s, transform 0.3s'
                }}
                onClick={() => handleAddOrRemoveProduct(inst)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isInCart ? "Remove" : "Add"} to Cart
              </button>
              
            </div>
          );
        })}
      </div>
    </>
  );
};
