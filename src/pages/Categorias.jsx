import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/categorias.css";
import productos from "../data/productos";
import categorias from "../data/categorias";

function Categorias() {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  // Al cargar, mostrar todos los productos
  useEffect(() => {
    setProductosFiltrados(productos);
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

      {/* Productos */}
      <section className="productos-grid">
        {productosFiltrados.length === 0 ? (
          <div className="vacio">
            <p>No hay productos en esta categoría.</p>
          </div>
        ) : (
          productosFiltrados.map((producto) => (
            <article key={producto.id} className="tarjeta-producto">
              <div className="imagen-contenedor">
                <img src={producto.imagen} alt={producto.nombre} />
                <div className="overlay">
                  <Link to={`/detalle/${producto.id}`} className="btn-ver">
                    Ver detalle
                  </Link>
                </div>
              </div>
              <div className="info-producto">
                <h3>{producto.nombre}</h3>
                <p className="precio">${producto.precio.toLocaleString("es-CL")}</p>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Categorias;