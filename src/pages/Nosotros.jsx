import React from "react";
import "../styles/nosotros.css";
import equipoImg from "../assets/img/Equipo.jpg";
import tallerImg from "../assets/img/Ferreteria.jpg";

function Nosotros() {
  return (
    <main className="nosotros-main">
      {/* 🔹 Hero Section */}
      <section className="hero-nosotros">
        <div className="hero-content">
          <span className="subtitulo">Construyendo juntos desde 2020</span>
          <h1>Ferretería React 🔩</h1>
          <p className="lead">
            Más que una ferretería, somos un equipo comprometido con tus ideas, 
            tus proyectos y tus logros.
          </p>
        </div>
      </section>

      {/* 🔹 Historia y Misión */}
      <section className="seccion-contenido">
        <div className="contenedor">
          <div className="grid-dos-columnas">
            <div className="contenido-texto">
              <div className="etiqueta">Nuestra historia</div>
              <h2>De un taller familiar a tu ferretería de confianza</h2>
              <p>
                Comenzamos como un pequeño emprendimiento familiar con la pasión de
                ayudar a construir sueños. Hoy, Ferretería React es un referente de
                innovación, calidad y cercanía con nuestros clientes.
              </p>

              <div className="etiqueta">Nuestra misión</div>
              <h3>Impulsar cada proyecto con las mejores herramientas</h3>
              <p>
                Brindar soluciones que impulsen la productividad de profesionales 
                y aficionados, con un servicio basado en confianza, conocimiento y tecnología.
              </p>
            </div>
            <div className="contenido-imagen">
              <img src={tallerImg} alt="Nuestro taller moderno" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Valores */}
      <section className="seccion-valores">
        <div className="contenedor">
          <div className="titulo-centrado">
            <div className="etiqueta">Lo que nos guía</div>
            <h2>Valores que construyen confianza</h2>
          </div>
          <div className="valores-grid">
            <div className="valor-card">
              <div className="icono">🔧</div>
              <h3>Compromiso con la calidad</h3>
              <p>Solo trabajamos con marcas y productos que respaldan tu trabajo.</p>
            </div>
            <div className="valor-card">
              <div className="icono">🤝</div>
              <h3>Atención personalizada</h3>
              <p>Porque cada proyecto es único, y merece asesoría experta.</p>
            </div>
            <div className="valor-card">
              <div className="icono">🌱</div>
              <h3>Respeto por el medio ambiente</h3>
              <p>Promovemos prácticas sostenibles en cada etapa de nuestro trabajo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Equipo */}
      <section className="seccion-equipo">
        <div className="contenedor">
          <div className="titulo-centrado">
            <div className="etiqueta">Conoce a quienes te ayudan</div>
            <h2>Nuestro equipo</h2>
            <p className="subtitulo-equipo">
              Personas apasionadas por ayudarte a concretar tus proyectos con las
              mejores herramientas y asesoría.
            </p>
          </div>
          <div className="equipo-grid">
            {[
              { nombre: "Juan Pérez", rol: "Gerente General", img: equipoImg },
              { nombre: "María Soto", rol: "Encargada de Ventas", img: equipoImg },
              { nombre: "Miguel", rol: "Desarrollador Frontend", img: equipoImg },
            ].map((miembro, i) => (
              <div className="miembro-card" key={i}>
                <div className="miembro-imagen">
                  <img src={miembro.img} alt={miembro.nombre} />
                </div>
                <h3>{miembro.nombre}</h3>
                <p className="rol">{miembro.rol}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 CTA Final */}
      <section className="seccion-cta">
        <div className="contenedor">
          <h2>¿Listo para comenzar tu próximo proyecto?</h2>
          <p>
            Estamos aquí para ayudarte con las mejores herramientas, asesoría experta 
            y el compromiso de siempre.
          </p>
          <button className="btn-cta">Contáctanos hoy</button>
        </div>
      </section>
    </main>
  );
}

export default Nosotros;