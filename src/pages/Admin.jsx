import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import "../styles/admin.css";

const categorias = [
  { id: 1, nombre: "Herramientas Manuales" },
  { id: 2, nombre: "Herramientas Eléctricas" },
  { id: 3, nombre: "Accesorios de Construcción" },
  { id: 4, nombre: "Seguridad y Protección" },
  { id: 5, nombre: "Iluminación" }
];

// URL base de tu backend en Render
const API_URL = "https://backend-tienda-react.onrender.com";

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
    descripcion: "",
    imagen: ""
  });

  useEffect(() => {
    const admin = localStorage.getItem("adminActivo");
    if (admin) {
      setAdminActivo(JSON.parse(admin));
    } else {
      navigate("/iniciar-sesion");
      return;
    }

    // Cargar productos desde el backend
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/productos`);
        if (!res.ok) {
          throw new Error("Error al cargar productos");
        }
        const data = await res.json();
        // data debe ser un array de {id, nombre, precio, categoriaId, descripcion, imagen}
        setProductos(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };

    fetchProductos();
  }, [navigate]);

  // Funciones para productos
  const handleFormProductoChange = (e) => {
    setFormProducto({
      ...formProducto,
      [e.target.name]: e.target.value
    });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("TOKEN EN GUARDAR PRODUCTO:", token); // DEBUG

    if (!token) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      navigate("/iniciar-sesion");
      return;
    }

    const payload = {
      nombre: formProducto.nombre,
      precio: Number(formProducto.precio),
      categoriaId: Number(formProducto.categoriaId),
      descripcion: formProducto.descripcion,
      imagen: formProducto.imagen || null
    };

    const url = productoEditando
      ? `${API_URL}/api/productos/${productoEditando.id}`
      : `${API_URL}/api/productos`;

    const method = productoEditando ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      console.log("STATUS GUARDAR PRODUCTO:", res.status); // DEBUG

      if (!res.ok) {
        throw new Error("Error al guardar producto");
      }

      const productoGuardado = await res.json();

      let nuevosProductos;
      if (productoEditando) {
        // Reemplazar el producto editado en la lista
        nuevosProductos = productos.map((p) =>
          p.id === productoGuardado.id ? productoGuardado : p
        );
      } else {
        // Agregar nuevo producto
        nuevosProductos = [...productos, productoGuardado];
      }

      setProductos(nuevosProductos);

      // Resetear formulario
      setFormProducto({ nombre: "", precio: "", categoriaId: 1, descripcion: "", imagen: "" });
      setProductoEditando(null);
      setMostrarFormProducto(false);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar el producto");
    }
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto);
    setFormProducto({
      nombre: producto.nombre,
      precio: producto.precio,
      categoriaId: producto.categoriaId,
      descripcion: producto.descripcion || "",
      imagen: producto.imagen || ""
    });
    setMostrarFormProducto(true);
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) {
      return;
    }

    const token = localStorage.getItem("token");
    console.log("TOKEN EN ELIMINAR PRODUCTO:", token); // DEBUG

    if (!token) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      navigate("/iniciar-sesion");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/productos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("STATUS ELIMINAR PRODUCTO:", res.status); // DEBUG

      // 204 es lo normal en DELETE sin contenido
      if (!res.ok && res.status !== 204) {
        throw new Error("Error al eliminar producto");
      }

      const nuevosProductos = productos.filter((p) => p.id !== id);
      setProductos(nuevosProductos);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar el producto");
    }
  };

  const cancelarFormProducto = () => {
    setFormProducto({ nombre: "", precio: "", categoriaId: 1, descripcion: "", imagen: "" });
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
              <p className="sub">Vista general del sistema (en construcción).</p>
            </div>

            {/* Módulos del Dashboard solo como navegación, sin datos ficticios */}
            <div className="admin-modules-grid">
              <div onClick={() => setSeccionActiva("dashboard")} className="admin-module-card">
                <div className="admin-module-icon blue">📊</div>
                <h4>Dashboard</h4>
                <p className="sub">Visor general de las secciones del sistema</p>
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
                <p className="sub">Módulo de reportes en construcción</p>
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

                  <div className="campo">
                    <label>URL de imagen (opcional)</label>
                    <input
                      type="text"
                      name="imagen"
                      value={formProducto.imagen}
                      onChange={handleFormProductoChange}
                      placeholder="https://ejemplo.com/imagen.jpg"
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
                    <span>
                      ${
                        typeof producto.precio === "number"
                          ? producto.precio.toLocaleString()
                          : producto.precio
                      }
                    </span>
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
          </>
        );

      case "reportes":
        return (
          <>
            <div className="admin-header">
              <h2>Reportes de Ventas</h2>
              <p className="sub">Módulo de reportes en construcción.</p>
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
