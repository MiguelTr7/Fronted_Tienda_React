import React from "react";
import { useParams } from "react-router-dom";
import productos from "../data/productos";
import "../styles/detalleproducto.css";

function DetalleProducto({ onAgregar }) {
  const { id } = useParams(); // obtiene el ID desde la URL
  const producto = productos.find((item) => item.id === parseInt(id));

  // Si no se encuentra el producto
  if (!producto) {
    return (
      <main>
        <section className="seccion-titulo">
          <h2>Producto no encontrado</h2>
          <p className="sub">El artículo que buscas no está disponible.</p>
        </section>
      </main>
    );
  }

  // Función para agregar al carrito
  const handleAddToCart = () => {
    onAgregar({ ...producto, cantidad: 1 });
  };

  return (
    <main>
      <section className="seccion-titulo">
        <h2>Detalle del producto</h2>
        <p className="sub">Conoce más sobre este artículo antes de comprarlo.</p>
      </section>

      <section className="detalle-producto">
        <div className="detalle-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <h3>{producto.nombre}</h3>
          <p className="precio-detalle">${producto.precio.toLocaleString("es-CL")}</p>

          <p className="descripcion">
            Este producto está fabricado con materiales de alta calidad, ideal
            para profesionales y entusiastas del bricolaje. Garantía de 1 año
            por defectos de fábrica.
          </p>

          <div className="acciones">
            {/* Botón de añadir al carrito */}
            <button
              className="btn btn-primario"
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
            <a href="/productos" className="btn btn-secundario_detalle">
              Volver a productos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DetalleProducto;
