import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productosData from "../data/productos";
import "../styles/styles.css";
import "../styles/admin.css";

const categorias = [
  { id: 1, nombre: "Herramientas Manuales" },
  { id: 2, nombre: "Herramientas Eléctricas" },
  { id: 3, nombre: "Accesorios de Construcción" },
  { id: 4, nombre: "Seguridad y Protección" },
  { id: 5, nombre: "Iluminación" }
];

function Admin() {
  const navigate = useNavigate();
  const [adminActivo, setAdminActivo] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState("dashboard");
  
  // Estados para productos
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormProducto, setMostrarFormProducto] = useState(false);
  const [formProducto, setFormProducto] = useState({
    nombre: "",
    precio: "",
    categoriaId: 1,
    descripcion: ""
  });

  useEffect(() => {
    const admin = localStorage.getItem("adminActivo");
    if (admin) {
      setAdminActivo(JSON.parse(admin));
    } else {
      navigate("/iniciar-sesion");
    }

    // Cargar productos desde localStorage o desde el archivo
    const productosGuardados = localStorage.getItem("productosAdmin");
    if (productosGuardados) {
      setProductos(JSON.parse(productosGuardados));
    } else {
      setProductos(productosData);
      localStorage.setItem("productosAdmin", JSON.stringify(productosData));
    }
  }, [navigate]);

  // Funciones para productos
  const handleFormProductoChange = (e) => {
    setFormProducto({
      ...formProducto,
      [e.target.name]: e.target.value
    });
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    
    let nuevosProductos;
    if (productoEditando) {
      // Editar producto existente
      nuevosProductos = productos.map(p => 
        p.id === productoEditando.id 
          ? { ...p, ...formProducto, precio: Number(formProducto.precio), categoriaId: Number(formProducto.categoriaId) }
          : p
      );
    } else {
      // Crear nuevo producto
      const nuevoProducto = {
        id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
        nombre: formProducto.nombre,
        precio: Number(formProducto.precio),
        categoriaId: Number(formProducto.categoriaId),
        descripcion: formProducto.descripcion,
        imagen: null
      };
      nuevosProductos = [...productos, nuevoProducto];
    }

    setProductos(nuevosProductos);
    localStorage.setItem("productosAdmin", JSON.stringify(nuevosProductos));
    
    // Resetear formulario
    setFormProducto({ nombre: "", precio: "", categoriaId: 1, descripcion: "" });
    setProductoEditando(null);
    setMostrarFormProducto(false);
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto);
    setFormProducto({
      nombre: producto.nombre,
      precio: producto.precio,
      categoriaId: producto.categoriaId,
      descripcion: producto.descripcion || ""
    });
    setMostrarFormProducto(true);
  };

  const eliminarProducto = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      const nuevosProductos = productos.filter(p => p.id !== id);
      setProductos(nuevosProductos);
      localStorage.setItem("productosAdmin", JSON.stringify(nuevosProductos));
    }
  };

  const cancelarFormProducto = () => {
    setFormProducto({ nombre: "", precio: "", categoriaId: 1, descripcion: "" });
    setProductoEditando(null);
    setMostrarFormProducto(false);
  };

  if (!adminActivo) {
    return null;
  }

  // Renderizado de secciones
  const renderContenido = () => {
    switch(seccionActiva) {
      case "dashboard":
        return (
          <>
            <div className="admin-header">
              <h2>Dashboard</h2>
              <p className="sub">Resumen de las actividades diarias</p>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card blue">
                <div className="admin-stat-icon">🛒</div>
                <div className="admin-stat-number">1,234</div>
                <div className="admin-stat-text">Transabilidad de compras: 78%</div>
              </div>

              <div className="admin-stat-card green">
                <div className="admin-stat-icon">📦</div>
                <div className="admin-stat-number">400</div>
                <div className="admin-stat-text">Inventario actual: 500</div>
              </div>

              <div className="admin-stat-card orange">
                <div className="admin-stat-icon">💰</div>
                <div className="admin-stat-number">890</div>
                <div className="admin-stat-text">Retorno de inversión diario</div>
              </div>
            </div>

            {/* Módulos del Dashboard */}
            <div className="admin-modules-grid">
              <div onClick={() => setSeccionActiva("dashboard")} className="admin-module-card">
                <div className="admin-module-icon blue">📊</div>
                <h4>Dashboard</h4>
                <p className="sub">Visor general de todas las métricas y estadísticas</p>
              </div>

              <div onClick={() => setSeccionActiva("productos")} className="admin-module-card">
                <div className="admin-module-icon purple">🛍️</div>
                <h4>Productos</h4>
                <p className="sub">Administrar inventario y detalles de productos</p>
              </div>

              <div onClick={() => setSeccionActiva("categorias")} className="admin-module-card">
                <div className="admin-module-icon orange">📑</div>
                <h4>Categorías</h4>
                <p className="sub">Organizar productos en categorías</p>
              </div>

              <div onClick={() => setSeccionActiva("usuarios")} className="admin-module-card">
                <div className="admin-module-icon blue">👥</div>
                <h4>Usuarios</h4>
                <p className="sub">Gestión de cuentas de usuario</p>
              </div>

              <div onClick={() => setSeccionActiva("reportes")} className="admin-module-card">
                <div className="admin-module-icon green">📈</div>
                <h4>Reportes</h4>
                <p className="sub">Generación de informes detallados</p>
              </div>

              <div onClick={() => setSeccionActiva("perfil")} className="admin-module-card">
                <div className="admin-module-icon red">👤</div>
                <h4>Perfil</h4>
                <p className="sub">Administración de información personal</p>
              </div>
            </div>
          </>
        );

      case "productos":
        return (
          <>
            <div className="admin-header-flex">
              <div>
                <h2>Gestión de Productos</h2>
                <p className="sub">Administra el inventario de productos</p>
              </div>
              {!mostrarFormProducto && (
                <button className="btn btn-primario" onClick={() => setMostrarFormProducto(true)}>
                  + Nuevo Producto
                </button>
              )}
            </div>

            {mostrarFormProducto && (
              <div className="admin-white-box">
                <h3>{productoEditando ? "Editar Producto" : "Nuevo Producto"}</h3>
                <form onSubmit={guardarProducto} className="form">
                  <div className="campo">
                    <label>Nombre del Producto</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formProducto.nombre}
                      onChange={handleFormProductoChange}
                      required
                      placeholder="Ej: Martillo de acero"
                    />
                  </div>

                  <div className="campo">
                    <label>Precio</label>
                    <input
                      type="number"
                      name="precio"
                      value={formProducto.precio}
                      onChange={handleFormProductoChange}
                      required
                      placeholder="8990"
                      min="0"
                    />
                  </div>

                  <div className="campo">
                    <label>Categoría</label>
                    <select
                      name="categoriaId"
                      value={formProducto.categoriaId}
                      onChange={handleFormProductoChange}
                      required
                    >
                      {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="campo">
                    <label>Descripción (opcional)</label>
                    <textarea
                      name="descripcion"
                      value={formProducto.descripcion}
                      onChange={handleFormProductoChange}
                      placeholder="Descripción del producto"
                      rows="3"
                    />
                  </div>

                  <div className="admin-form-actions">
                    <button type="submit" className="btn btn-primario">
                      {productoEditando ? "Actualizar" : "Guardar"}
                    </button>
                    <button type="button" className="btn btn-cancel" onClick={cancelarFormProducto}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="admin-white-box">
              <div className="tabla">
                <div className="t-row t-head">
                  <span>ID</span>
                  <span>Nombre</span>
                  <span>Precio</span>
                  <span>Categoría</span>
                  <span>Acciones</span>
                </div>
                {productos.map(producto => (
                  <div key={producto.id} className="t-row">
                    <span>{producto.id}</span>
                    <span>{producto.nombre}</span>
                    <span>${producto.precio.toLocaleString()}</span>
                    <span>{categorias.find(c => c.id === producto.categoriaId)?.nombre}</span>
                    <span className="admin-table-actions">
                      <button className="btn btn-small" onClick={() => editarProducto(producto)}>
                        ✏️ Editar
                      </button>
                      <button className="btn btn-small btn-danger" onClick={() => eliminarProducto(producto.id)}>
                        🗑️ Eliminar
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "categorias":
        return (
          <>
            <div className="admin-header">
              <h2>Categorías</h2>
              <p className="sub">Listado de categorías de productos</p>
            </div>

            <div className="admin-white-box">
              <div className="tabla">
                <div className="t-row t-head">
                  <span>ID</span>
                  <span>Nombre</span>
                  <span>Productos</span>
                </div>
                {categorias.map(cat => (
                  <div key={cat.id} className="t-row">
                    <span>{cat.id}</span>
                    <span>{cat.nombre}</span>
                    <span>{productos.filter(p => p.categoriaId === cat.id).length} productos</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "usuarios":
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        return (
          <>
            <div className="admin-header">
              <h2>Gestión de Usuarios</h2>
              <p className="sub">Listado de usuarios registrados</p>
            </div>

            <div className="admin-white-box">
              <div className="tabla">
                <div className="t-row t-head">
                  <span>Nombre</span>
                  <span>Apellido</span>
                  <span>Email</span>
                  <span>Dirección</span>
                </div>
                {usuarios.length === 0 ? (
                  <div className="admin-empty-message">
                    No hay usuarios registrados
                  </div>
                ) : (
                  usuarios.map((usuario, index) => (
                    <div key={index} className="t-row">
                      <span>{usuario.nombre}</span>
                      <span>{usuario.apellido}</span>
                      <span>{usuario.email}</span>
                      <span>{usuario.direccion}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="admin-white-box">
              <h3>Historial de Compras (Ejemplo)</h3>
              <div className="tabla">
                <div className="t-row t-head">
                  <span>Usuario</span>
                  <span>Producto</span>
                  <span>Fecha</span>
                  <span>Total</span>
                </div>
                <div className="t-row">
                  <span>Juan Pérez</span>
                  <span>Teclado Mecánico</span>
                  <span>12/10/2025</span>
                  <span>$34.990</span>
                </div>
                <div className="t-row">
                  <span>María González</span>
                  <span>Martillo de Acero</span>
                  <span>15/10/2025</span>
                  <span>$8.990</span>
                </div>
              </div>
            </div>
          </>
        );

      case "reportes":
        return (
          <>
            <div className="admin-header">
              <h2>Reportes de Ventas</h2>
              <p className="sub">Estadísticas y métricas del negocio</p>
            </div>

            <div className="admin-stats-grid">
              <div className="admin-stat-card blue">
                <h3>Ventas del Mes</h3>
                <div className="admin-stat-number">$2,450,000</div>
                <p className="admin-stat-text">+15% respecto al mes anterior</p>
              </div>

              <div className="admin-stat-card green">
                <h3>Productos Vendidos</h3>
                <div className="admin-stat-number">387</div>
                <p className="admin-stat-text">Unidades este mes</p>
              </div>

              <div className="admin-stat-card orange">
                <h3>Clientes Activos</h3>
                <div className="admin-stat-number">156</div>
                <p className="admin-stat-text">Usuarios registrados</p>
              </div>
            </div>

            <div className="admin-white-box">
              <h3>Top 5 Productos Más Vendidos</h3>
              <div className="tabla admin-report-table">
                <div className="t-row t-head">
                  <span>Producto</span>
                  <span>Ventas</span>
                  <span>Ingresos</span>
                </div>
                <div className="t-row">
                  <span>Taladro Eléctrico</span>
                  <span>45 unidades</span>
                  <span>$675,000</span>
                </div>
                <div className="t-row">
                  <span>Martillo de Acero</span>
                  <span>38 unidades</span>
                  <span>$341,620</span>
                </div>
                <div className="t-row">
                  <span>Casco de Seguridad</span>
                  <span>32 unidades</span>
                  <span>$448,000</span>
                </div>
                <div className="t-row">
                  <span>Destornillador Set</span>
                  <span>28 unidades</span>
                  <span>$196,000</span>
                </div>
                <div className="t-row">
                  <span>Linterna LED</span>
                  <span>25 unidades</span>
                  <span>$175,000</span>
                </div>
              </div>
            </div>
          </>
        );

      case "perfil":
        return (
          <>
            <div className="admin-header">
              <h2>Perfil de Administrador</h2>
              <p className="sub">Información de la cuenta</p>
            </div>

            <div className="admin-white-box">
              <div className="admin-profile-header">
                <div className="admin-profile-icon">👤</div>
                <h3>{adminActivo.nombre}</h3>
                <p className="sub">{adminActivo.email}</p>
                <span className="admin-badge">Administrador</span>
              </div>

              <div className="admin-profile-content">
                <h4>Información de la Cuenta</h4>
                <ul>
                  <li className="admin-profile-item">
                    <strong>Rol:</strong> Administrador del Sistema
                  </li>
                  <li className="admin-profile-item">
                    <strong>Correo:</strong> {adminActivo.email}
                  </li>
                  <li className="admin-profile-item">
                    <strong>Acceso:</strong> Completo
                  </li>
                  <li className="admin-profile-item">
                    <strong>Última sesión:</strong> Activa
                  </li>
                </ul>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h3>Panel Admin</h3>
        
        <nav>
          <div 
            onClick={() => setSeccionActiva("dashboard")}
            className={`admin-sidebar-item ${seccionActiva === "dashboard" ? "active" : ""}`}
          >
            📊 Dashboard
          </div>
          <div 
            onClick={() => setSeccionActiva("productos")}
            className={`admin-sidebar-item ${seccionActiva === "productos" ? "active" : ""}`}
          >
            🛍️ Productos
          </div>
          <div 
            onClick={() => setSeccionActiva("categorias")}
            className={`admin-sidebar-item ${seccionActiva === "categorias" ? "active" : ""}`}
          >
            📑 Categorías
          </div>
          <div 
            onClick={() => setSeccionActiva("usuarios")}
            className={`admin-sidebar-item ${seccionActiva === "usuarios" ? "active" : ""}`}
          >
            👥 Usuarios
          </div>
          <div 
            onClick={() => setSeccionActiva("reportes")}
            className={`admin-sidebar-item ${seccionActiva === "reportes" ? "active" : ""}`}
          >
            📈 Reportes
          </div>
          <div 
            onClick={() => setSeccionActiva("perfil")}
            className={`admin-sidebar-item ${seccionActiva === "perfil" ? "active" : ""}`}
          >
            👤 Perfil
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {renderContenido()}
      </main>
    </div>
  );
}

export default Admin;