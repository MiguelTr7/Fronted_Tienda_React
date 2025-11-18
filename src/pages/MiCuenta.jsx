import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MiCuenta() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    if (usuarioActivo) {
      setUsuario(JSON.parse(usuarioActivo));
    } else {
      // Si no hay usuario logueado, redirigir a login
      navigate("/iniciar-sesion");
    }
  }, [navigate]);

  if (!usuario) {
    return null; // Mientras redirige
  }

  return (
    <main>
      <section className="seccion-titulo">
        <h2>Mi Cuenta</h2>
        <p className="sub">Aquí puedes revisar tu información personal.</p>
      </section>

      <div className="profile-box">
        <h3>Datos de usuario</h3>
        <ul>
          <li><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</li>
          <li><strong>Correo:</strong> {usuario.email}</li>
          <li><strong>Dirección:</strong> {usuario.direccion}</li>
        </ul>
      </div>

      <div className="profile-box">
        <h3>Historial de compras</h3>
        <div className="tabla">
          <div className="t-row t-head">
            <span>Producto</span>
            <span>Fecha</span>
            <span>Total</span>
          </div>
          <div className="t-row">
            <span>Teclado Mecánico</span>
            <span>12/10/2025</span>
            <span>$34.990</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MiCuenta;