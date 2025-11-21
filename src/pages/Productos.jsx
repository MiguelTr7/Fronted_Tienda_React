import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// ❌ Ya no usamos el archivo local
// import productos from "../data/productos";
import "../styles/productos.css";

const API_URL = "https://backend-tienda-react.onrender.com";

function Productos({ onAgregar }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const handleAddToCart = (producto) => {
    onAgregar({ ...producto, cantidad: 1 });
  };

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
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("No se pudieron cargar los productos. Intenta nuevamente más tarde.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <main className="productos-main">
      {/* Título principal */}
      <section className="seccion-titulo-productos">
        <h2>Productos en venta</h2>
        <p className="sub">
          Selecciona una herramienta para ver su detalle o añadir al carrito.
        </p>
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

      {/* Listado de productos */}
      {!cargando && !error && (
        <section className="productos-grid" aria-label="Listado de productos">
          {productos.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            productos.map((item) => {
              const precioFormateado =
                typeof item.precio === "number"
                  ? item.precio.toLocaleString("es-CL")
                  : item.precio;

              return (
                <article className="tarjeta-producto" key={item.id}>
                  <div className="imagen-contenedor">
                    {/* Si no tienes imagen todavía en BD, esto puede quedar null y no pasa nada */}
                    {item.imagen ? (
                      <img src={item.imagen} alt={item.nombre} loading="lazy" />
                    ) : (
                      <div className="imagen-placeholder">
                        🛠️
                      </div>
                    )}
                  </div>
                  <div className="contenido-producto">
                    <h3>{item.nombre}</h3>
                    <p className="precio">${precioFormateado}</p>
                    <div className="acciones-producto">
                      <Link className="btn btn-detalle" to={`/detalle/${item.id}`}>
                        Ver detalle
                      </Link>
                      <button
                        className="btn btn-agregar_producto"
                        onClick={() => handleAddToCart(item)}
                        aria-label={`Añadir ${item.nombre} al carrito`}
                      >
                        🛒 Añadir al carrito
                      </button>
                    </div>
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

export default Productos;
