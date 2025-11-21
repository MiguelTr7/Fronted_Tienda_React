import React, { useState, useEffect } from "react";
import "../styles/ofertas.css";

const API_URL = "https://backend-tienda-react.onrender.com";

function Ofertas({ onAgregar }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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
        console.error("Error cargando productos en ofertas:", err);
        setError("No se pudieron cargar las ofertas. Intenta más tarde.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  // Aplicamos descuento del 20% a todos los productos cargados
  const productosConDescuento = productos.map((p) => ({
    ...p,
    precioOriginal: p.precio,
    precioOferta: Math.round(p.precio * 0.8),
    descuento: "20% OFF",
  }));

  const handleAddToCart = (producto) => {
    const productoDescuento = {
      ...producto,
      precio: producto.precioOferta,
      cantidad: 1,
    };
    onAgregar(productoDescuento);
  };

  return (
    <main className="ofertas-main">
      {/* Título */}
      <section className="seccion-titulo-ofertas">
        <h2>🔥 Ofertas Especiales</h2>
        <p className="sub">
          Aprovecha descuentos limitados en nuestras herramientas destacadas.
        </p>
      </section>

      {/* Estados de carga / error */}
      {cargando && (
        <section className="ofertas-grid">
          <p>Cargando ofertas...</p>
        </section>
      )}

      {error && !cargando && (
        <section className="ofertas-grid">
          <p className="error-texto">{error}</p>
        </section>
      )}

      {/* Grid de ofertas */}
      {!cargando && !error && (
        <section className="ofertas-grid">
          {productosConDescuento.length === 0 ? (
            <p>No hay productos en oferta por ahora.</p>
          ) : (
            productosConDescuento.map((item) => (
              <article key={item.id} className="tarjeta-oferta">
                <div className="etiqueta-descuento">{item.descuento}</div>
                <div className="imagen-oferta">
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} loading="lazy" />
                  ) : (
                    <div className="imagen-placeholder">🛠️</div>
                  )}
                </div>
                <div className="contenido-oferta">
                  <h3>{item.nombre}</h3>
                  <div className="precios">
                    <span className="precio-oferta">
                      ${item.precioOferta.toLocaleString("es-CL")}
                    </span>
                    <span className="precio-original">
                      ${item.precioOriginal.toLocaleString("es-CL")}
                    </span>
                  </div>
                  <button
                    className="btn btn-agregar"
                    onClick={() => handleAddToCart(item)}
                    aria-label={`Añadir ${item.nombre} al carrito`}
                  >
                    🛒 Añadir al carrito
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      )}
    </main>
  );
}

export default Ofertas;
