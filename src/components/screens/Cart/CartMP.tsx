import { useDispatch } from "react-redux";
import { removeProductFromCart, resetCart } from "../../../redux/slices/cartSlice";
import { useAppSelector } from "../../../hooks/redux";
import axios from "axios";
import { useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

export const CartMP = () => {
  const dispatch = useDispatch();
  const { productsList } = useAppSelector(state => state.cart);
  const [productQuantities, setProductQuantities] = useState<{ [id: number]: number }>({});
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  // Inicializa la SDK de Mercado Pago
  initMercadoPago('TEST-a409f23e-8cc5-4ef6-a8b5-78efae4c16ed', {
    locale: 'es-AR'
  });

  const handleRemoveInstrument = (instrumentId: number) => {
    dispatch(removeProductFromCart(instrumentId));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setProductQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max(newQuantity, 1),
    }));
  };

  const handleIncrementQuantity = (id: number) => {
    handleQuantityChange(id, productQuantities[id] + 1 || 1);
  };

  const handleDecrementQuantity = (id: number) => {
    handleQuantityChange(id, productQuantities[id] - 1 || 1);
  };

  const handleSaveCart = async () => {
    const detalles = productsList.map(instrumento => ({
      cantidad: productQuantities[instrumento.id] || 1,
      instrumento: {
        id: instrumento.id,
      },
    }));
  

    
    try {
      const pedidoResponse = await axios.post('http://localhost:8080/api/pedidos/pedidos', detalles);
      alert(`El pedido se guardó correctamente - ID: ${pedidoResponse.data.id} `);
      dispatch(resetCart());
      const items = productsList.map(instrumento => ({
        id: instrumento.id.toString(),
        title: instrumento.instrumento,
        description: instrumento.descripcion,
        pictureUrl: instrumento.imagen,
        categoryId: instrumento.categoria.denominacion,
        quantity: productQuantities[instrumento.id] || 1,
        currencyId: "ARS",
        unitPrice: instrumento.precio,
      }));
  
      const preferenceResponse = await axios.post('http://localhost:8080/api/mercadopago/create-preference', { items });
      setPreferenceId(preferenceResponse.data.id);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar el carrito.');
    }
  };
  const usuarioActivo = localStorage.getItem("usuario");
  return (
    <>
    
    <div className="container my-5">
      <h2 className="text-center mb-4">Carrito</h2>
      <button
  className="btn btn-primary mb-3"
  onClick={handleSaveCart}
  style={{
    borderRadius: '30px',
    border: '2px solid blue',
    transition: 'background-color 0.3s, color 0.3s',
    marginRight: '10px',
    padding: '10px 20px',
    color: 'blue',
    backgroundColor: 'white',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer', 
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
  Guardar Carrito
</button>
{usuarioActivo === "Admin" || usuarioActivo === "Operador" ? ( 

<button
onClick={() => window.location.href = "http://localhost:8080/api/pedidos/exportAll"}
style={{
  borderRadius: '30px',
  border: '2px solid blue',
  transition: 'background-color 0.3s, color 0.3s',
  marginRight: '10px',
  padding: '10px 20px',
  color: 'blue',
  backgroundColor: 'white',
  textDecoration: 'none',
  display: 'inline-block',
  cursor: 'pointer',
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
Exportar Pedidos
</button>
) : (<span>Para exportar un Excel de los pedidos debe ser administrador o operador</span> )}



      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Categoría</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productsList.map(instrumento => {
            const quantity = productQuantities[instrumento.id] || 1;

            return (
              <tr key={instrumento.id}>
                <td>{instrumento.instrumento}</td>
                <td>${instrumento.precio.toFixed(2)}</td>
                <td>{instrumento.categoria.denominacion}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-primary me-2" 
                    onClick={() => handleDecrementQuantity(instrumento.id)}>
                    -
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button 
                    className="btn btn-sm btn-outline-primary me-2" 
                    onClick={() => handleIncrementQuantity(instrumento.id)}>
                    +
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger" 
                    onClick={() => handleRemoveInstrument(instrumento.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {preferenceId && (
  <div
    className="my-4"
    style={{
      width: '40%',
      border:'1px solid black',
      borderRadius:'25px'
    }}
  >
    <Wallet initialization={{ preferenceId }} />
  </div>
)}
    </div>
    </>
  );
};
