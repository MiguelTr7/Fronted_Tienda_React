import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/categorias.css";
// ❌ ya no usamos productos estáticos
// import productos from "../data/productos";
import categorias from "../data/categorias";

const API_URL = "https://backend-tienda-react.onrender.com";

function Categorias() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Al cargar, traer productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setCargando(true);
        setError("");

        const res = await fetch(`${API_URL}/api/productos`);
        if (!res.ok) {
          throw new Error("Error al cargar productos");
        }

        const data = await res.json();
        // data: [{ id, nombre, precio, categoriaId, descripcion, imagen }]
        setProductos(data);
        setProductosFiltrados(data);
      } catch (err) {
        console.error("Error cargando productos por categoría:", err);
        setError("No se pudieron cargar los productos. Intenta más tarde.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  const filtrarPorCategoria = (id) => {
    setCategoriaActiva(id);

    if (id === "todos") {
      setProductosFiltrados(productos);
    } else {
      const filtrados = productos.filter((p) => p.categoriaId === id);
      setProductosFiltrados(filtrados);
    }
  };

  return (
    <main className="categorias">
      {/* Hero / Título */}
      <section className="hero-categorias">
        <div className="hero-content">
          <h1>Explora nuestras categorías</h1>
          <p className="sub">Encuentra herramientas y productos según tu proyecto.</p>
        </div>
      </section>

      {/* Navegación de categorías estilo "pills" */}
      <section className="navegacion-categorias">
        <div className="contenedor-categorias">
          <button
            className={`pill ${categoriaActiva === "todos" ? "activa" : ""}`}
            onClick={() => filtrarPorCategoria("todos")}
          >
            Todos los productos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              className={`pill ${categoriaActiva === cat.id ? "activa" : ""}`}
              onClick={() => filtrarPorCategoria(cat.id)}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </section>

      {/* Estados de carga / error */}
      {cargando && (
        <section className="productos-grid">
          <p>Cargando productos...</p>
        </section>
      )}

      {error && !cargando && (
        <section className="productos-grid">
          <p className="error-texto">{error}</p>
        </section>
      )}

      {/* Productos */}
      {!cargando && !error && (
        <section className="productos-grid">
          {productosFiltrados.length === 0 ? (
            <div className="vacio">
              <p>No hay productos en esta categoría.</p>
            </div>
          ) : (
            productosFiltrados.map((producto) => {
              const precioFormateado =
                typeof producto.precio === "number"
                  ? producto.precio.toLocaleString("es-CL")
                  : producto.precio;

              return (
                <article key={producto.id} className="tarjeta-producto">
                  <div className="imagen-contenedor">
                    {producto.imagen ? (
                      <img src={producto.imagen} alt={producto.nombre} />
                    ) : (
                      <div className="imagen-placeholder">🛠️</div>
                    )}
                    <div className="overlay">
                      <Link to={`/detalle/${producto.id}`} className="btn-ver">
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                  <div className="info-producto">
                    <h3>{producto.nombre}</h3>
                    <p className="precio">${precioFormateado}</p>
                  </div>
                </article>
              );
            })
          )}
        </section>
      )}
    </main>
  );
}

export default Categorias;
