import React from "react";
import "../styles/ofertas.css";
import productos from "../data/productos";

function Ofertas({ onAgregar }) {
  // Simulamos descuentos del 20%
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
    // 👇 Opcional: usa un toast en lugar de alert en el futuro
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

      {/* Grid de ofertas */}
      <section className="ofertas-grid">
        {productosConDescuento.map((item) => (
          <article key={item.id} className="tarjeta-oferta">
            <div className="etiqueta-descuento">{item.descuento}</div>
            <div className="imagen-oferta">
              <img src={item.imagen} alt={item.nombre} loading="lazy" />
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
        ))}
      </section>
    </main>
  );
}

export default Ofertas;