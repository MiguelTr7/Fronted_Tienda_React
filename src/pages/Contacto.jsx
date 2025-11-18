import React from "react";
import "../styles/contacto.css";

function Contacto() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
    e.target.reset();
  };

  return (
    <main className="contacto-main">
      {/* Hero Section */}
      <section className="hero-contacto">
        <div className="hero-content">
          <h1>Contáctanos</h1>
          <p className="sub">¿Tienes dudas, sugerencias o necesitas asesoría? Estamos aquí para ayudarte.</p>
        </div>
      </section>

      {/* Formulario */}
      <section className="seccion-formulario">
        <div className="contenedor">
          <div className="formulario-contenedor">
            <form className="formulario-contacto" onSubmit={handleSubmit}>
              <div className="grupo-campos">
                <div className="campo">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    required
                  />
                </div>

                <div className="campo">
                  <label htmlFor="correo">Correo electrónico</label>
                  <input
                    id="correo"
                    type="email"
                    placeholder="tu@correo.cl"
                    required
                  />
                </div>
              </div>

              <div className="campo campo-textarea">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  rows="6"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-enviar">
                ✉️ Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* BANDA DE CONTACTO - Justo arriba del footer */}
    
    </main>
  );
}

export default Contacto;