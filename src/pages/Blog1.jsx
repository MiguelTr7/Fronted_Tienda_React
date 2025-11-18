import React from "react";
import { Link } from "react-router-dom";
import "../styles/blog1.css";
import Herramientas from "../assets/img/herramientas-manuales.jpg";

function Blog1() {
  return (
    <main className="blog1-main">
      {/* Hero con imagen y título */}
      <header className="blog1-hero">
        <img src={Herramientas} alt="Guía básica de herramientas" loading="lazy" />
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="categoria">Guía para principiantes</span>
            <h1>Guía básica de herramientas para principiantes 🧰</h1>
            <p className="subtitulo">
              Todo lo que necesitas para comenzar tus proyectos en casa con seguridad, 
              confianza y eficiencia.
            </p>
            <div className="meta">
              <span>Por Ferretería React</span>
              <span>•</span>
              <time>23 de octubre de 2025</time>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido del artículo */}
      <article className="blog1-contenido">
        <div className="contenedor_blog1">
          <section className="intro">
            <p>
              Si estás comenzando en el mundo del bricolaje o las reparaciones domésticas,
              esta guía es para ti. Aquí aprenderás cuáles son las herramientas esenciales
              que te ayudarán a construir, reparar y mejorar tu hogar.
            </p>
          </section>

          <section className="seccion">
            <h2>🔧 Herramientas esenciales que no pueden faltar</h2>
            <p>
              Toda caja de herramientas debe tener los básicos que te permitirán resolver
              la mayoría de los trabajos caseros con facilidad:
            </p>
            <ul className="lista-herramientas">
              <li><strong>Martillo:</strong> indispensable para clavar o retirar clavos.</li>
              <li><strong>Destornilladores:</strong> ten siempre uno plano y uno en cruz.</li>
              <li><strong>Cinta métrica:</strong> mide con precisión antes de cortar o instalar.</li>
              <li><strong>Alicates:</strong> útiles para doblar, cortar o ajustar piezas pequeñas.</li>
              <li><strong>Llaves ajustables:</strong> perfectas para plomería y tuercas.</li>
            </ul>
          </section>

          <section className="seccion">
            <h2>🧽 Consejos para mantener tus herramientas en buen estado</h2>
            <p>
              No basta con tener las herramientas correctas: también debes cuidarlas.
              Guarda todo en un lugar seco, limpia los restos de polvo o grasa tras cada uso
              y lubrica las partes metálicas con aceite para evitar el óxido.
            </p>
          </section>

          <blockquote className="cita-destacada1">
            <p>“El secreto de un buen trabajo no está solo en el talento, 
            sino también en las herramientas que usas.”</p>
          </blockquote>

          <section className="conclusion">
            <p>
              Con estas herramientas básicas y un poco de práctica, podrás realizar desde
              pequeñas reparaciones hasta proyectos más avanzados. 
              <strong> ¡Empieza hoy y conviértete en tu propio maestro de obras!</strong>
            </p>
          </section>

          <div className="acciones-blog">
            <Link to="/blogs" className="btn-volver">
              ← Volver a Blogs
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

export default Blog1;