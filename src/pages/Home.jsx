import React from "react";
import { Link } from "react-router-dom";
import martilloImg from "../assets/img/martillo.jpg";
import Taladro from "../assets/img/Taladro.jpg";
import Llaves from "../assets/img/Llaves.jpg";
import "../styles/home.css";
function Home() {
  const productosDestacados = [
    {
      id: 1,
      nombre: "Martillo de acero",
      descripcion: "Resistente y duradero, ideal para uso profesional.",
      imagen: martilloImg,
    },
    {
      id: 2,
      nombre: "Taladro inalámbrico",
      descripcion: "Batería recargable y múltiples velocidades.",
      imagen: Taladro,
    },
    {
      id: 3,
      nombre: "Juego de llaves",
      descripcion: "Incluye medidas estándar y métricas de alta precisión.",
      imagen: Llaves,
    },
  ];

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

          <div className="grid-destacados">
            {productosDestacados.map((prod) => (
              <article className="tarjeta-destacado" key={prod.id}>
                <div className="imagen-destacado">
                  <img src={prod.imagen} alt={prod.nombre} loading="lazy" />
                </div>
                <div className="contenido-destacado">
                  <h3>{prod.nombre}</h3>
                  <p>{prod.descripcion}</p>
                  <Link to={`/detalle/${prod.id}`} className="btn btn-secundario">
                    Ver detalle
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;