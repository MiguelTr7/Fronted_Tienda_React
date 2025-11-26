import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/detalleproducto.css";

function DetalleProducto({ onAgregar }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://backend-tienda-react.onrender.com/api/productos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => setProducto(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <main>
        <section className="seccion-titulo">
          <h2>Error</h2>
          <p className="sub">{error}</p>
        </section>
      </main>
    );
  }

  if (!producto) {
    return <p className="cargando">Cargando...</p>;
  }

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

          <p className="descripcion">{producto.descripcion}</p>

          <div className="acciones">
            <button className="btn btn-primario" onClick={handleAddToCart}>
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
