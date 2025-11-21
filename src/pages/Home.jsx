import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const API_URL = "https://backend-tienda-react.onrender.com";

function Home() {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        setCargando(true);
        setError("");

        const res = await fetch(`${API_URL}/api/productos`);
        if (!res.ok) {
          throw new Error("Error al cargar productos destacados");
        }

        const data = await res.json();
        // data: [{ id, nombre, precio, categoriaId, descripcion, imagen }]
        // Tomamos por ejemplo los 3 primeros como "destacados"
        const top3 = data.slice(0, 3);
        setProductosDestacados(top3);
      } catch (err) {
        console.error("Error cargando productos destacados:", err);
        setError("No se pudieron cargar los productos destacados.");
      } finally {
        setCargando(false);
      }
    };

    fetchDestacados();
  }, []);

  return (
    <main className="home">
      {/* HERO SECTION - FONDO AZUL COMPLETO */}
      <section className="hero-full">
        <div className="hero-content">
          <h1>Herramientas Profesionales para Cada Proyecto</h1>
          <p>Calidad, durabilidad y precisión en cada producto que ofrecemos.</p>
          <Link to="/productos" className="btn btn-hero">
            Explorar catálogo
          </Link>
        </div>
      </section>

      {/* SECCIÓN PRODUCTOS DESTACADOS */}
      <section className="seccion-destacados">
        <div className="contenedor_home">
          <div className="titulo-seccion">
            <h2>Productos destacados</h2>
            <div className="separador"></div>
          </div>

          {cargando && <p>Cargando productos destacados...</p>}
          {error && !cargando && <p className="error-texto">{error}</p>}

          {!cargando && !error && (
            <div className="grid-destacados">
              {productosDestacados.length === 0 ? (
                <p>No hay productos destacados por ahora.</p>
              ) : (
                productosDestacados.map((prod) => (
                  <article className="tarjeta-destacado" key={prod.id}>
                    <div className="imagen-destacado">
                      {prod.imagen ? (
                        <img src={prod.imagen} alt={prod.nombre} loading="lazy" />
                      ) : (
                        <div className="imagen-placeholder">🛠️</div>
                      )}
                    </div>
                    <div className="contenido-destacado">
                      <h3>{prod.nombre}</h3>
                      <p>
                        {prod.descripcion && prod.descripcion.trim() !== ""
                          ? prod.descripcion
                          : "Producto destacado de nuestra ferretería React."}
                      </p>
                      <Link
                        to={`/detalle/${prod.id}`}
                        className="btn btn-secundario"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
