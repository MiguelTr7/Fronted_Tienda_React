import React from "react";
import { Link } from "react-router-dom";
import "../styles/blogs.css"; // tendrás los estilos aparte
import Herramientas from "../assets/img/herramientas-manuales.jpg";
import ImgenElectrica from "../assets/img/Electrica.jpg";

function Blogs() {
  return (
    <main className="blogs-page">
      <section className="seccion-titulo">
        <h2>Blog de Ferretería React 🧰</h2>
        <p className="sub">
          Consejos, guías y novedades del mundo de la construcción y el bricolaje.
        </p>
      </section>

      <section className="lista-blogs">
        {/* Blog 1 */}
        <article className="blog-card">
          <img
            src={Herramientas}
            alt="Consejos de herramientas"
          />
          <div className="contenido">
            <h3>Guía básica de herramientas para principiantes</h3>
            <p>
              Aprende cuáles son las herramientas esenciales que todo hogar debe tener
              y cómo mantenerlas en buen estado.
            </p>
            <Link to="/blog-1" className="btn btn-primario">
              Leer más
            </Link>
          </div>
        </article>

        {/* Blog 2 */}
        <article className="blog-card">
          <img src={ImgenElectrica} alt="Seguridad en el taller" />
          <div className="contenido">
            <h3>Consejos de seguridad para el uso de herramientas eléctricas</h3>
            <p>
              Evita accidentes y trabaja con confianza siguiendo estas recomendaciones
              de seguridad al usar taladros, sierras y más.
            </p>
            <Link to="/blog-2" className="btn btn-primario">
              Leer más
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Blogs;
