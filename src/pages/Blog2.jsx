import React from "react";
import { Link } from "react-router-dom";
import "../styles/blog2.css";
import ImagenElectrica from "../assets/img/Electrica1.jpg";

function Blog2() {
  return (
    <main className="blog2-detalle">
      {/* 🔹 Hero principal */}
      <div className="blog2-hero">
        <img src={ImagenElectrica} alt="Seguridad con herramientas eléctricas" />
        <div className="blog2-overlay">
          <h1>Consejos de seguridad con herramientas eléctricas ⚡</h1>
          <p>
            La seguridad es tu mejor herramienta. Aprende cómo prevenir accidentes y 
            protegerte mientras trabajas con electricidad.
          </p>
        </div>
      </div>

      {/* 🔹 Contenido principal */}
      <section className="blog2-contenido">
        {/* Introducción */}
        <div className="blog2-intro">
          <p>
            Las herramientas eléctricas hacen nuestro trabajo más fácil, pero un uso descuidado 
            puede generar riesgos graves. En este artículo descubrirás prácticas simples para 
            mantenerte protegido y evitar accidentes en tu jornada laboral.
          </p>
        </div>

        {/* Bloques con íconos y secciones */}
        <article className="blog2-section">
          <h2>🧤 1. Usa equipo de protección personal</h2>
          <p>
            Antes de encender cualquier herramienta eléctrica, asegúrate de usar guantes aislantes, 
            gafas protectoras y calzado antideslizante. Estos elementos son tu primera línea de defensa.
          </p>
        </article>

        <article className="blog2-section">
          <h2>🏗️ 2. Revisa tu entorno de trabajo</h2>
          <p>
            Mantén el área libre de líquidos, cables sueltos y materiales inflamables. 
            Trabajar en un entorno limpio y ordenado reduce el riesgo de tropiezos y cortocircuitos.
          </p>
        </article>

        <article className="blog2-section">
          <h2>☢ 3. Inspecciona tus herramientas</h2>
          <p>
            Antes de usar un taladro, una sierra o cualquier equipo eléctrico, revisa el cableado, 
            la carcasa y las conexiones. Si notas chispas, ruido inusual o mal olor, 
            desconéctala inmediatamente.
          </p>
        </article>

        {/* Bloque de advertencia */}
        <div className="blog2-warning">
          ⚠️ <strong>Consejo:</strong> Nunca uses herramientas eléctricas bajo la lluvia 
          ni en superficies húmedas. La humedad es uno de los principales factores de electrocución.
        </div>

        <article className="blog2-section">
          <h2>🔌 4. Desconecta cuando no uses</h2>
          <p>
            Cuando termines de trabajar, desconecta la herramienta de la corriente. 
            Esto evita sobrecalentamientos, descargas eléctricas innecesarias y 
            prolonga la vida útil de tus equipos.
          </p>
        </article>

        {/* Conclusión */}
        <div className="blog2-final">
          <p>
            Aplicar estas medidas de seguridad te permitirá trabajar de forma más eficiente, 
            profesional y segura. Recuerda: <strong>una herramienta puede reemplazarse, tú no.</strong>
          </p>

          <div className="volver-blog">
            <Link to="/blogs" className="btn btn-primario">
              ← Volver a Blogs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog2;
