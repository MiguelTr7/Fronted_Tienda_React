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

const API_URL = "https://backend-tienda-react.onrender.com";

function Admin() {
  const navigate = useNavigate();
  const [adminActivo, setAdminActivo] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState("dashboard");

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

  // 🔹 NUEVO: estado de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  const [errorUsuarios, setErrorUsuarios] = useState("");

  useEffect(() => {
    const admin = localStorage.getItem("adminActivo");
    if (!admin) {
      navigate("/iniciar-sesion");
      return;
    }
    setAdminActivo(JSON.parse(admin));

    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/productos`);
        if (!res.ok) throw new Error("No se pudieron cargar los productos.");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };

    // 🔹 NUEVO: cargar usuarios desde el backend
    const fetchUsuarios = async () => {
      try {
        setCargandoUsuarios(true);
        setErrorUsuarios("");

        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No hay token, no se pueden cargar usuarios.");
          return;
        }

        const res = await fetch(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("No se pudieron cargar los usuarios.");
        }

        const data = await res.json();
        // data: [{id, nombre, apellido, email, direccion, ...}]
        setUsuarios(data);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setErrorUsuarios("No se pudieron cargar los usuarios.");
      } finally {
        setCargandoUsuarios(false);
      }
    };

    fetchProductos();
    fetchUsuarios();
  }, [navigate]);

  const handleFormProductoChange = (e) => {
    setFormProducto({ ...formProducto, [e.target.name]: e.target.value });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
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
      if (!res.ok) throw new Error("No se pudo guardar el producto.");

      const productoGuardado = await res.json();
      const nuevosProductos = productoEditando
        ? productos.map((p) => (p.id === productoGuardado.id ? productoGuardado : p))
        : [...productos, productoGuardado];

      setProductos(nuevosProductos);
      setFormProducto({ nombre: "", precio: "", categoriaId: 1, descripcion: "", imagen: "" });
      setProductoEditando(null);
      setMostrarFormProducto(false);
    } catch (err) {
      alert(err.message);
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
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
      navigate("/iniciar-sesion");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/productos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok && res.status !== 204) throw new Error("No se pudo eliminar el producto.");
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelarFormProducto = () => {
    setFormProducto({ nombre: "", precio: "", categoriaId: 1, descripcion: "", imagen: "" });
    setProductoEditando(null);
    setMostrarFormProducto(false);
  };

  if (!adminActivo) return null;

  const renderContenido = () => {
    switch (seccionActiva) {
      case "dashboard":
        return (
          <>
            <div className="admin-header">
              <h2>Panel de Control</h2>
              <p className="sub">Gestiona tu tienda desde un solo lugar.</p>
            </div>
            <div className="admin-modules-grid">
              {[
                { id: "dashboard", icon: "📊", title: "Dashboard", desc: "Resumen de la tienda" },
                { id: "productos", icon: "🛍️", title: "Productos", desc: "Inventario y gestión" },
                { id: "categorias", icon: "📑", title: "Categorías", desc: "Clasificación de productos" },
                { id: "usuarios", icon: "👥", title: "Usuarios", desc: "Cuentas registradas" },
                { id: "reportes", icon: "📈", title: "Reportes", desc: "Estadísticas y ventas" },
                { id: "perfil", icon: "👤", title: "Perfil", desc: "Información de cuenta" }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSeccionActiva(item.id)}
                  className={`admin-module-card ${seccionActiva === item.id ? "active" : ""}`}
                >
                  <div className="admin-module-icon blue">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p className="sub">{item.desc}</p>
                </div>
              ))}
            </div>
          </>
        );

      case "productos":
        return (
          <>
            <div className="admin-header-flex">
              <div>
                <h2>Gestión de Productos</h2>
                <p className="sub">Administra tu inventario de productos</p>
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
                      placeholder="Ej: Taladro eléctrico"
                    />
                  </div>
                  <div className="campo">
                    <label>Precio ($)</label>
                    <input
                      type="number"
                      name="precio"
                      min="0"
                      step="0.01"
                      value={formProducto.precio}
                      onChange={handleFormProductoChange}
                      required
                      placeholder="15990"
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
                      placeholder="Detalles del producto"
                      rows="3"
                    />
                  </div>
                  <div className="campo">
                    <label>URL de Imagen (opcional)</label>
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
                {productos.length === 0 ? (
                  <div className="admin-empty-message">No hay productos registrados</div>
                ) : (
                  productos.map(producto => (
                    <div key={producto.id} className="t-row">
                      <span>{producto.id}</span>
                      <span>{producto.nombre}</span>
                      <span>${Number(producto.precio).toLocaleString("es-CL")}</span>
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
                  ))
                )}
              </div>
            </div>
          </>
        );

      case "categorias":
        return (
          <>
            <div className="admin-header">
              <h2>Categorías</h2>
              <p className="sub">Organiza tus productos en categorías</p>
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
        return (
          <>
            <div className="admin-header">
              <h2>Usuarios Registrados</h2>
              <p className="sub">Listado de cuentas de usuario almacenadas en la base de datos.</p>
            </div>
            <div className="admin-white-box">
              <div className="tabla">
                <div className="t-row t-head">
                  <span>ID</span>
                  <span>Nombre</span>
                  <span>Apellido</span>
                  <span>Email</span>
                  <span>Dirección</span>
                </div>

                {cargandoUsuarios && (
                  <div className="admin-empty-message">Cargando usuarios...</div>
                )}

                {errorUsuarios && !cargandoUsuarios && (
                  <div className="admin-empty-message">{errorUsuarios}</div>
                )}

                {!cargandoUsuarios && !errorUsuarios && usuarios.length === 0 && (
                  <div className="admin-empty-message">No hay usuarios registrados</div>
                )}

                {!cargandoUsuarios && !errorUsuarios && usuarios.length > 0 && (
                  usuarios.map((usuario) => (
                    <div key={usuario.id} className="t-row">
                      <span>{usuario.id}</span>
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
          <div className="admin-header">
            <h2>Reportes</h2>
            <p className="sub">Este módulo está en desarrollo.</p>
          </div>
        );

      case "perfil":
        return (
          <div className="admin-white-box">
            <div className="admin-profile-header">
              <div className="admin-profile-icon">👤</div>
              <h3>{adminActivo.nombre}</h3>
              <p className="sub">{adminActivo.email}</p>
              <span className="admin-badge">Administrador</span>
            </div>
            <div className="admin-profile-content">
              <h4>Detalles de la Cuenta</h4>
              <ul>
                <li><strong>Rol:</strong> Administrador</li>
                <li><strong>Email:</strong> {adminActivo.email}</li>
                <li><strong>Acceso:</strong> Completo</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Panel de Administrador</h3>
        </div>
        <nav>
          {[
            { id: "dashboard", name: "Dashboard", icon: "📊" },
            { id: "productos", name: "Productos", icon: "🛍️" },
            { id: "categorias", name: "Categorías", icon: "📑" },
            { id: "usuarios", name: "Usuarios", icon: "👥" },
            { id: "reportes", name: "Reportes", icon: "📈" },
            { id: "perfil", name: "Perfil", icon: "👤" }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setSeccionActiva(item.id)}
              className={`admin-sidebar-item ${seccionActiva === item.id ? "active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-top-bar">
          <div className="user-info">
            <span className="greeting">Hola, {adminActivo.email}</span>
          </div>
          <div className="actions">
            <button
              className="btn btn-logout"
              onClick={() => {
                localStorage.removeItem("adminActivo");
                localStorage.removeItem("token");
                navigate("/iniciar-sesion");
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <div className="admin-content">
          {renderContenido()}
        </div>
      </main>
    </div>
  );
}

export default Admin;
