import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/registro.css";

function RegistrarUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    direccion: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarEmail(formData.email)) {
      setError("Por favor ingresa un correo electrónico válido");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const response = await fetch("https://backend-tienda-react.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al registrar el usuario");
        return;
      }

      alert("¡Cuenta creada con éxito!");
      navigate("/iniciar-sesion");

    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error("Error en registro:", err);
    }
  };

  return (
    <main className="registro-main">
      <div className="registro-wrapper">
        <div className="registro-card">
          <div className="logo">
            <span className="icon">🧰</span>
            <h1>Ferretería React</h1>
          </div>

          <h2>Crear cuenta</h2>
          <p className="sub">Crea tu cuenta para acceder a tus compras y promociones exclusivas.</p>

          {error && (
            <div className="alerta-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="apellido">Apellido</label>
              <input type="text" name="apellido" required value={formData.apellido} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" name="direccion" required value={formData.direccion} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-registrar">Crear cuenta</button>
          </form>

          <div className="login-link">
            ¿Ya tienes cuenta? <a href="/iniciar-sesion">Inicia sesión aquí</a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegistrarUsuario;
