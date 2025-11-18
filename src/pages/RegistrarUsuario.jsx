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

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
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

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const emailExiste = usuarios.some(user => user.email === formData.email);
    if (emailExiste) {
      setError("Este correo ya está registrado");
      return;
    }

    usuarios.push(formData);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    navigate("/iniciar-sesion");
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
          <p className="sub">
            Crea tu cuenta para acceder a tus compras y promociones exclusivas.
          </p>

          {error && (
            <div className="alerta-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre</label>
              <input 
                id="nombre"
                type="text" 
                name="nombre"
                placeholder="Tu nombre" 
                value={formData.nombre}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="apellido">Apellido</label>
              <input 
                id="apellido"
                type="text" 
                name="apellido"
                placeholder="Tu apellido" 
                value={formData.apellido}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input 
                id="email"
                type="email" 
                name="email"
                placeholder="correo@ejemplo.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                id="direccion"
                type="text"
                name="direccion"
                placeholder="Calle, número, comuna..."
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-registrar">
              Crear cuenta
            </button>
          </form>

          <div className="login-link">
            ¿Ya tienes cuenta?{" "}
            <a href="/iniciar-sesion">Inicia sesión aquí</a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegistrarUsuario;