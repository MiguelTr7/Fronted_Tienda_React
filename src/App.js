import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraNavegacion from "./components/Navbar";
import Footer from "./components/Footer";
import productos from "./data/productos";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

// Importar las páginas
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import IniciarSesion from "./pages/IniciarSesion";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import MiCuenta from "./pages/MiCuenta";
import Admin from "./pages/Admin";
import Blogs from "./pages/Blogs";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Ofertas from "./pages/Ofertas"; 
import Categorias from "./pages/Categorias"; // Importar la página de categorías

function App() {
  // 🛒 Estado del carrito
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  // 🔄 Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // ➕ Agregar producto (evita duplicados)
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existente = prevCarrito.find((p) => p.id === producto.id);
      if (existente) {
        // si ya existe, aumenta la cantidad
        return prevCarrito.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        // si no existe, agrégalo con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // 💰 Calcular total
  const total = carrito.reduce(
    (sum, prod) => sum + prod.precio * (prod.cantidad || 1),
    0
  );

  return (
    <Router>
      {/* Navbar global con datos del carrito */}
      <BarraNavegacion cantidad={carrito.length} total={total} />

      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Productos */}
        <Route
          path="/productos"
          element={<Productos onAgregar={agregarAlCarrito} />}
        />

        {/* Detalle de producto */}
        <Route
          path="/detalle/:id"
          element={<DetalleProducto onAgregar={agregarAlCarrito} />}
        />

        {/* 🛒 Carrito */}
        <Route
          path="/carrito"
          element={<Carrito carrito={carrito} setCarrito={setCarrito} />}
        />
        <Route
  path="/ofertas"
  element={<Ofertas onAgregar={agregarAlCarrito} />}
/>


        {/* Otras páginas */}
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
        <Route path="/mi-cuenta" element={<MiCuenta />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-1" element={<Blog1 />} />
        <Route path="/blog-2" element={<Blog2 />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/categorias" element={<Categorias />} /> // Nueva ruta

        
      </Routes>

      {/* Footer global */}
      <Footer />
    </Router>
  );
}

export default App;
