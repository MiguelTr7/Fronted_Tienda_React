import React, { useState } from "react";
import "../styles/carrito.css";

function Carrito({ carrito, setCarrito }) {
  // 🗑️ Eliminar producto del carrito
  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((prod) => prod.id !== id);
    setCarrito(nuevoCarrito);
  };

  // ➕ Aumentar cantidad
  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((prod) =>
      prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
    );
    setCarrito(nuevoCarrito);
  };

  // ➖ Disminuir cantidad
  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((prod) =>
        prod.id === id && prod.cantidad > 1
          ? { ...prod, cantidad: prod.cantidad - 1 }
          : prod
      )
      .filter((prod) => prod.cantidad > 0);
    setCarrito(nuevoCarrito);
  };

  // 💰 Calcular total
  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * (prod.cantidad || 1),
    0
  );

  // 📝 Información del cliente
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [calle, setCalle] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [compraFinalizada, setCompraFinalizada] = useState(null);

  const validarFormulario = () => {
    return nombre && apellido && correo && calle && region && comuna;
  };

  const finalizarCompra = () => {
    if (validarFormulario()) {
      const numeroOrden = `ORD-${Date.now().toString().slice(-6)}`;
      const compraData = {
        numeroOrden,
        nombre,
        apellido,
        correo,
        calle,
        region,
        comuna,
        productos: [...carrito],
        total,
        fecha: new Date().toLocaleString("es-CL"),
      };
      setCompraFinalizada(compraData);
      setCarrito([]);
      setCompraExitosa(true);
    } else {
      setCompraExitosa(false);
    }
  };

  return (
    <main className="carrito-main">
      <section className="seccion-titulo">
        <h2>🛒 Tu carrito de compras</h2>
        <p className="sub">Revisa tus productos antes de finalizar la compra.</p>
      </section>

      {compraFinalizada ? (
        /* ===== PANTALLA DE CONFIRMACIÓN ===== */
        <div className="confirmacion-compra">
          <div className="header-confirmacion">
            <span className="check-icon">✅</span>
            <div>
              <h2>¡Compra realizada con éxito!</h2>
              <p className="codigo-orden">N° orden: {compraFinalizada.numeroOrden}</p>
            </div>
          </div>

          <div className="resumen-compra">
            <h3>Resumen de tu compra</h3>
            <div className="tabla-productos">
              <div className="t-row t-head_2">
                <span>Producto</span>
                <span>Cantidad</span>
                <span>Subtotal</span>
              </div>
              {compraFinalizada.productos.map((prod, index) => (
                <div className="t-row" key={`${prod.id}-${index}`}>
                  <span>{prod.nombre}</span>
                  <span>{prod.cantidad || 1}</span>
                  <span>${(prod.precio * (prod.cantidad || 1)).toLocaleString("es-CL")}</span>
                </div>
              ))}
            </div>
            <div className="total-final">
              <strong>Total pagado:</strong> ${compraFinalizada.total.toLocaleString("es-CL")}
            </div>
          </div>

          <div className="datos-entrega">
            <h3>Información de entrega</h3>
            <p><strong>Cliente:</strong> {compraFinalizada.nombre} {compraFinalizada.apellido}</p>
            <p><strong>Correo:</strong> {compraFinalizada.correo}</p>
            <p><strong>Dirección:</strong> {compraFinalizada.calle}, {compraFinalizada.comuna}, {compraFinalizada.region}</p>
          </div>

          <div className="acciones-boleta">
            <button className="btn btn-pdf">📄 Imprimir boleta</button>
            <button className="btn btn-email">✉️ Enviar por email</button>
          </div>
        </div>
      ) : carrito.length === 0 ? (
        /* ===== CARRITO VACÍO ===== */
        <div className="carrito-vacio">
          <p>🛒 Tu carrito está vacío.</p>
          <a href="/" className="btn btn-secundario">Seguir comprando</a>
        </div>
      ) : (
        /* ===== CARRITO CON PRODUCTOS ===== */
        <div className="contenedor-carrito">
          <div className="tabla-productos-carrito">
            <div className="t-row t-head_1">
              <span>Producto</span>
              <span>Precio</span>
              <span>Cantidad</span>
              <span>Subtotal</span>
              <span>Acciones</span>
            </div>

            {carrito.map((prod, index) => (
              <div className="t-row" key={`${prod.id}-${index}`}>
                <div className="col-producto">
                  <span>{prod.nombre}</span>
                  <span className="subtotal-mobile">${(prod.precio * (prod.cantidad || 1)).toLocaleString("es-CL")}</span>
                </div>
                <div className="col-precio">
                  <span>${prod.precio.toLocaleString("es-CL")}</span>
                </div>
                <div className="col-cantidad">
                  <div className="cantidad-controles">
                    <button
                      className="btn-cant"
                      onClick={() => disminuirCantidad(prod.id)}
                    >
                      −
                    </button>
                    <span className="cantidad-numero">{prod.cantidad || 1}</span>
                    <button
                      className="btn-cant"
                      onClick={() => aumentarCantidad(prod.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-subtotal">
                  <span>${(prod.precio * (prod.cantidad || 1)).toLocaleString("es-CL")}</span>
                </div>
                <div className="col-acciones">
                  <button
                    className="btn btn-eliminar"
                    onClick={() => eliminarProducto(prod.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <div className="resumen-total">
              <h3>Total: <strong>${total.toLocaleString("es-CL")}</strong></h3>
            </div>

            <section className="informacion-cliente">
              <h3>👤 Información del cliente</h3>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Apellidos"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </section>

            <section className="direccion-entrega">
              <h3>📍 Dirección de entrega</h3>
              <input
                type="text"
                placeholder="Calle y número"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
              />
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Comuna"
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                />
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                <option value="">Selecciona una región</option>
                  <option value="Región de Arica y Parinacota">Arica y Parinacota</option>
                  <option value="Región de Tarapacá">Tarapacá</option>
                  <option value="Región de Antofagasta">Antofagasta</option>
                  <option value="Región de Atacama">Atacama</option>
                  <option value="Región de Valparaíso">Valparaíso</option>
                  <option value="Región de Los Ríos">Los Ríos</option>
                  <option value="Región de Los Lagos">Los Lagos</option>
                  <option value="Región de Aysén ">Aysén</option>
                  <option value="Región de Magallanes y de la Antártica Chilena">Magallanes</option>
                </select>
              </div>
            </section>

            <button
              className="btn btn-pagar"
              onClick={finalizarCompra}
              disabled={!validarFormulario()}
            >
              ✅ Finalizar compra
            </button>

            {compraExitosa === false && (
              <div className="mensaje-error">
                <p>⚠️ Por favor, completa todos los campos.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Carrito;