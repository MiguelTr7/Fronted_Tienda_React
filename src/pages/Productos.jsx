import React from "react";
import { Link } from "react-router-dom";
import productos from "../data/productos";
import "../styles/productos.css";

function Productos({ onAgregar }) {
  const handleAddToCart = (producto) => {
    onAgregar({ ...producto, cantidad: 1 });
  };

  return (
    <main className="productos-main">
      {/* Título principal */}
      <section className="seccion-titulo-productos">
        <h2>Productos en venta</h2>
        <p className="sub">
          Selecciona una herramienta para ver su detalle o añadir al carrito.
        </p>
      </section>

      {/* Listado de productos */}
      <section className="productos-grid" aria-label="Listado de productos">
        {productos.map((item) => (
          <article className="tarjeta-producto" key={item.id}>
            <div className="imagen-contenedor">
              <img src={item.imagen} alt={item.nombre} loading="lazy" />
            </div>
            <div className="contenido-producto">
              <h3>{item.nombre}</h3>
              <p className="precio">${item.precio.toLocaleString("es-CL")}</p>
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
        ))}
      </section>
    </main>
  );
}

export default Productos;