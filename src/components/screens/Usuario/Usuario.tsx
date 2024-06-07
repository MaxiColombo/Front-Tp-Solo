import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";

interface Usuario {
  id: number;
  nombreUsuario: string;
  clave: string;
  rol: string;
}

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/usuarios");
        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioValido = usuarios.find(
      (u) => u.nombreUsuario === usuario && u.clave === clave
    );

    if (usuarioValido) {
      setError("");
      console.log("Usuario válido:", usuarioValido);
      localStorage.setItem("usuario", usuarioValido.rol);
      localStorage.setItem("isLoggedIn", "true");
      
      // Utiliza una función de callback para asegurarte de que el estado se actualice
      setTimeout(() => {
        navigate("/homeHendrix");
        window.location.reload()
      }, 0);
    } else {
      setError("Usuario y/o contraseña incorrectos");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};
