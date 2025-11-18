import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer-moderno">
      <div className="footer-contenedor">
        {/* Columna 1: Marca */}
        <div className="footer-columna">
          <div className="logo-footer">
            <span className="icono">🔩</span>
            <h3>Ferretería React</h3>
          </div>
          <p>
            Tu aliado en cada proyecto. Calidad, confianza y herramientas para
            construir tus ideas.
          </p>
          <div className="redes-sociales">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="YouTube">▶️</a>
          </div>
        </div>

        {/* Columna 2: Enlaces rápidos */}
        <div className="footer-columna">
          <h4>Enlaces rápidos</h4>
          <ul>
            <li><a href="/nosotros">Sobre nosotros</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/ofertas">Ofertas</a></li>
            <li><a href="/blogs">Blog</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div className="footer-columna">
          <h4>Contacto</h4>
          <ul className="contacto-info">
            <li>📍 Av. Siempre Viva 123, Santiago</li>
            <li>📞 +56 9 1234 5678</li>
            <li>✉️ hola@ferreteriareact.cl</li>
          </ul>
        </div>

        {/* Columna 4: Suscripción */}
        <div className="footer-columna">
          <h4>Suscríbete</h4>
          <p>Recibe ofertas exclusivas y novedades directamente en tu correo.</p>
          <form className="formulario-suscripcion">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              required 
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="footer-derechos">
        <p>© 2025 Ferretería React | Desarrollado por Miguel</p>
        <div className="politicas">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;