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
      const response = await fetch(
        "https://backend-tienda-react.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json().catch(() => null);

      console.log("STATUS LOGIN:", response.status);
      console.log("DATA LOGIN:", data);

      if (!response.ok) {
        setError((data && data.message) || "Correo o contraseña incorrectos");
        return;
      }

      // Intentar obtener el rol desde varias posibles propiedades
      const rolRaw =
        data?.rol ??
        data?.role ??
        data?.usuario?.rol ??
        data?.user?.rol ??
        data?.userRole ??
        null;

      if (!rolRaw) {
        setError("El servidor no está enviando el rol del usuario. Revisa el backend.");
        console.warn("Respuesta de login sin rol:", data);
        return;
      }

      const rolNormalizado = String(rolRaw).toUpperCase();   // ADMIN, CLIENTE, etc.
      const rolLower = rolNormalizado.toLowerCase();         // admin, cliente, etc.

      const userData = {
        email: data.email ?? data.username ?? "",
        nombre: data.nombre ?? data.name ?? "",
        rol: rolLower
      };

      if (rolNormalizado === "ADMIN" || rolNormalizado === "ROLE_ADMIN") {
        localStorage.setItem("adminActivo", JSON.stringify(userData));
        navigate("/admin");
      } else {
        localStorage.setItem("usuarioActivo", JSON.stringify(userData));
        navigate("/productos");
      }

      // Guardar token si viene
      if (data.token || data.jwt) {
        localStorage.setItem("token", data.token ?? data.jwt);
      } else {
        console.warn("Login sin token en la respuesta:", data);
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
          <p className="sub">
            Accede a tu cuenta para realizar compras y ver tus pedidos.
          </p>

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
            ¿No tienes cuenta? <a href="/registrar-usuario">Regístrate aquí</a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default IniciarSesion;
