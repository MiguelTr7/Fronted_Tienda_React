import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Admin() {
  const navigate = useNavigate();
  const [adminActivo, setAdminActivo] = useState(null);

  useEffect(() => {
    const admin = localStorage.getItem("adminActivo");
    if (admin) {
      setAdminActivo(JSON.parse(admin));
    } else {
      navigate("/iniciar-sesion");
    }
  }, [navigate]);

  if (!adminActivo) {
    return null;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        width: "250px",
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "2rem 1rem",
        position: "fixed",
        height: "100vh",
        overflowY: "auto"
      }}>
        <h3 style={{ marginBottom: "2rem", color: "#f39c12" }}>Panel Admin</h3>
        
        <nav>
          <div style={{
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
            backgroundColor: "#e74c3c",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            📊 Dashboard
          </div>
          <div style={{
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
            backgroundColor: "#34495e",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            📦 Órdenes
          </div>
          <div style={{
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
            backgroundColor: "#34495e",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            🛍️ Productos
          </div>
          <div style={{
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
            backgroundColor: "#34495e",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            📑 Categorías
          </div>
          <div style={{
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
            backgroundColor: "#34495e",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            👥 Usuarios
          </div>
          <div style={{
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
            backgroundColor: "#34495e",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            📈 Reportes
          </div>
          <div style={{
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
            backgroundColor: "#34495e",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            👤 Perfil
          </div>
          <div style={{
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
            backgroundColor: "#34495e",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            ✅ Tareas
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: "250px", flex: 1, padding: "2rem", backgroundColor: "#ecf0f1" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h2>Dashboard</h2>
          <p className="sub">Resumen de las actividades diarias</p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {/* Tarjeta Compras */}
          <div style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🛒</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>1,234</div>
            <div style={{ marginTop: "0.5rem" }}>Transabilidad de compras: 78%</div>
          </div>

          {/* Tarjeta Productos */}
          <div style={{
            backgroundColor: "#27ae60",
            color: "white",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📦</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>400</div>
            <div style={{ marginTop: "0.5rem" }}>Inventario actual: 500</div>
          </div>

          {/* Tarjeta ROI */}
          <div style={{
            backgroundColor: "#f39c12",
            color: "white",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💰</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>890</div>
            <div style={{ marginTop: "0.5rem" }}>Retorno de inversión diario</div>
          </div>
        </div>

        {/* Módulos del Dashboard */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {/* Dashboard */}
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#3498db" }}>📊</div>
            <h4>Dashboard</h4>
            <p className="sub">Visor general de todas las métricas y estadísticas más importantes del sistema</p>
          </div>

          {/* Órdenes */}
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#3498db" }}>📋</div>
            <h4>Órdenes</h4>
            <p className="sub">Gestión y seguimiento de todas las órdenes realizadas por los usuarios</p>
          </div>

          {/* Productos */}
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#9b59b6" }}>🛍️</div>
            <h4>Productos</h4>
            <p className="sub">Administrar inventario y detalles de los productos disponibles</p>
          </div>

          {/* Categorías */}
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#f39c12" }}>📑</div>
            <h4>Categorías</h4>
            <p className="sub">Organizar productos en categorías para facilitar su navegación</p>
          </div>

          {/* Usuarios */}
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#3498db" }}>👥</div>
            <h4>Usuarios</h4>
            <p className="sub">Gestión de cuentas de usuario y sus roles dentro del sistema</p>
          </div>

          {/* Reportes */}
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#27ae60" }}>📈</div>
            <h4>Reportes</h4>
            <p className="sub">Generación de informes detallados sobre las actividades del negocio</p>
          </div>

          {/* Perfil */}
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#e74c3c" }}>👤</div>
            <h4>Perfil</h4>
            <p className="sub">Administración de la información personal y configuración de la cuenta</p>
          </div>

          {/* Tareas */}
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#34495e" }}>✅</div>
            <h4>Tareas</h4>
            <p className="sub">Visualiza, organiza y realiza un seguimiento efectivo de todas tus tareas</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;