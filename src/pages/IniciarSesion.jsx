import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function IniciarSesion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Usamos la URL del backend configurada en .env
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Correo o contraseña incorrectos");
        return;
      }

      // ⚠️ Asegúrate que el backend devuelva estos campos (token, roles, etc.)
      const userData = {
        email: formData.email,
        token: data.token,
        roles: data.roles
      };

      localStorage.setItem("usuarioActivo", JSON.stringify(userData));
      localStorage.setItem("token", data.token);

      // Redirige según el rol
      if (data.roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/productos");
      }

    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error("Error en login:", err);
    }
  };

  return (
    <main className="login-main">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="logo">
            <span className="icon">🔒</span>
            <h1>Ferretería React</h1>
          </div>

          <h2>Iniciar sesión</h2>
          <p className="sub">Accede a tu cuenta para realizar compras y ver tus pedidos.</p>

          {error && (
            <div className="alerta-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                id="correo"
                type="email"
                name="email"
                placeholder="tu@duoc.cl"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="pass">Contraseña</label>
              <input
                id="pass"
                type="password"
                name="password"
                minLength="4"
                maxLength="10"
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-ingresar">
              Ingresar
            </button>
          </form>

          <div className="registro-link">
            ¿No tienes cuenta?{" "}
            <a href="/registrar-usuario">Regístrate aquí</a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default IniciarSesion;
