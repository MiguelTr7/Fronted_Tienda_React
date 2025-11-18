/* ---------------------------------
   TechNova - App JS (limpio)
   - Persistencia con localStorage
   - Carrito: añadir, listar, +/- , eliminar, vaciar, comprar
   - Autenticación: registro, login, sesión (header visible)
   - Admin: productos, usuarios, pedidos (con guard de rol)
   - Mi cuenta: perfil + historial
----------------------------------*/

/* ===== Claves de storage ===== */
const KEYS = { CART:'cart', USERS:'users', PRODUCTS:'products', ORDERS:'orders', SESSION:'session' };

/* ===== Utils JSON/localStorage ===== */
function readJSON(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : (fallback ?? null);
  }catch(e){ return fallback ?? null; }
}
function writeJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

/* ===== Sesión ===== */
function getSession(){ return readJSON(KEYS.SESSION, null); }
function setSession(email){ writeJSON(KEYS.SESSION, { email }); }
function clearSession(){ localStorage.removeItem(KEYS.SESSION); }
function currentUser(){
  const s = getSession();
  if(!s) return null;
  const users = readJSON(KEYS.USERS, []);
  return users.find(u => u.email.toLowerCase() === s.email.toLowerCase()) || null;
}

/* ===== Semillas (primera vez) ===== */
function seedProducts(){
  const exists = readJSON(KEYS.PRODUCTS);
  if(exists && Array.isArray(exists) && exists.length) return;
  writeJSON(KEYS.PRODUCTS, [
    { id:'P001', name:'Mouse Gamer RGB',       price:15990,  stock:25, img:'images/mouse.png' },
    { id:'P002', name:'Teclado Mecánico',      price:34990,  stock:12, img:'images/teclado-mecanico.png' },
    { id:'P003', name:'Audífonos Bluetooth',   price:22500,  stock:30, img:'images/audifonos.png' },
    { id:'P004', name:'Smartwatch FitNova',    price:29990,  stock:18, img:'images/smartwatch.png' },
    { id:'P005', name:'Notebook Ultraliviano', price:399990, stock:7,  img:'images/laptop.png' },
    { id:'P006', name:'Silla Gamer Ergonómica',price:149990, stock:10, img:'images/silla.png' },
  ]);
}
function seedUsers(){
  const exists = readJSON(KEYS.USERS);
  if(exists) return;
  writeJSON(KEYS.USERS, [
    { run:'19011022K', nombre:'Admin', apellidos:'TechNova', email:'admin@duoc.cl', pass:'admin', tipo:'Administrador', direccion:'Sede Central' }
  ]);
}

/* ===== Carrito ===== */
function getCart(){ return readJSON(KEYS.CART, []); }
function saveCart(cart){ writeJSON(KEYS.CART, cart); }

function updateCartCounter(){
  const span = document.querySelector('.carrito span');
  if(!span) return;
  const total = getCart().reduce((acc, it) => acc + it.qty, 0);
  span.textContent = `Cart (${total})`;
}

function addToCart({ id, name, price }){
  const cart = getCart();
  const found = cart.find(p => p.id === id);
  if(found){ found.qty += 1; } else { cart.push({ id, name, price, qty:1 }); }
  saveCart(cart);
  updateCartCounter();
  alert(`${name} añadido al carrito ✅`);
}

function changeQty(id, delta){
  const cart = getCart();
  const it = cart.find(p => p.id === id);
  if(!it) return;
  it.qty += delta;
  if(it.qty <= 0){
    const idx = cart.findIndex(p => p.id === id);
    cart.splice(idx, 1);
  }
  saveCart(cart);
  updateCartCounter();
  renderCart(); // si estoy en carrito.html
}

function removeFromCart(id){
  saveCart(getCart().filter(p => p.id !== id));
  updateCartCounter();
  renderCart();
}

function clearCart(){
  saveCart([]);
  updateCartCounter();
  renderCart();
}

/* ===== Formato CLP ===== */
function formatCLP(n){
  try{
    return new Intl.NumberFormat('es-CL', { style:'currency', currency:'CLP', maximumFractionDigits:0 }).format(n);
  }catch(_){
    return '$' + (Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
  }
}
function cartTotal(cart){ return cart.reduce((acc, it) => acc + it.price * it.qty, 0); }

/* ===== Compra / Orden ===== */
function createOrder(){
  const session = getSession();
  if(!session){
    alert('Debes iniciar sesión para comprar.');
    window.location.href = 'iniciarSesion.html';
    return null;
  }
  const user = currentUser();
  const cart = getCart();
  if(!cart.length){ alert('Tu carrito está vacío.'); return null; }

  // validar stock
  const products = readJSON(KEYS.PRODUCTS, []);
  for(const it of cart){
    const p = products.find(x => x.id === it.id);
    if(!p || p.stock < it.qty){
      alert(`Sin stock suficiente de: ${it?.name || it?.id}`);
      return null;
    }
  }
  // descontar
  for(const it of cart){
    const p = products.find(x => x.id === it.id);
    p.stock -= it.qty;
  }
  writeJSON(KEYS.PRODUCTS, products);

  // crear orden
  const order = {
    id: 'ORD-' + Date.now(),
    date: new Date().toLocaleString('es-CL'),
    userEmail: session.email,
    userName: user ? (user.nombre + ' ' + user.apellidos) : session.email,
    items: cart,
    total: cartTotal(cart)
  };
  const orders = readJSON(KEYS.ORDERS, []);
  orders.push(order);
  writeJSON(KEYS.ORDERS, orders);

  // vaciar carrito
  saveCart([]);
  updateCartCounter();
  return order;
}

/* ===== Carrito: render (solo en carrito.html) ===== */
function renderCart(){
  const body = document.getElementById('cart-body');
  const empty = document.getElementById('cart-empty');
  const table = document.getElementById('cart-table');
  const totalEl = document.getElementById('cart-total');
  const receipt = document.getElementById('receipt');
  if(!body || !empty || !table || !totalEl) return;

  if(receipt) receipt.style.display = 'none';

  const cart = getCart();
  if(!cart.length){
    empty.style.display = 'block';
    table.style.display = 'none';
    totalEl.textContent = '$0';
    return;
  }
  empty.style.display = 'none';
  table.style.display = 'block';

  body.innerHTML = cart.map(it => `
    <div class="t-row">
      <span>${it.name}</span>
      <span>${formatCLP(it.price)}</span>
      <span class="cart-qty">
        <button class="btn btn-secundario btn-sm" data-action="minus" data-id="${it.id}">-</button>
        <strong>${it.qty}</strong>
        <button class="btn btn-secundario btn-sm" data-action="plus" data-id="${it.id}">+</button>
      </span>
      <span>${formatCLP(it.price * it.qty)}</span>
      <span class="cart-actions">
        <button class="btn btn-negro btn-sm" data-action="remove" data-id="${it.id}">Eliminar</button>
      </span>
    </div>
  `).join('');

  totalEl.textContent = formatCLP(cartTotal(cart));

  body.querySelectorAll('button[data-action]').forEach(btn=>{
    const id = btn.dataset.id, act = btn.dataset.action;
    btn.addEventListener('click', ()=>{
      if(act==='plus') changeQty(id, +1);
      if(act==='minus') changeQty(id, -1);
      if(act==='remove') removeFromCart(id);
    });
  });

  const clearBtn = document.getElementById('cart-clear');
  const checkoutBtn = document.getElementById('cart-checkout');
  if(clearBtn) clearBtn.onclick = clearCart;
  if(checkoutBtn) checkoutBtn.onclick = ()=>{
    const ord = createOrder();
    if(ord) renderReceipt(ord);
  };
}

/* ===== Comprobante ===== */
function renderReceipt(order){
  const receipt = document.getElementById('receipt');
  if(!receipt) return;
  receipt.style.display = 'block';
  const rows = order.items.map(it =>
    `<tr><td>${it.name}</td><td>${it.qty}</td><td>${formatCLP(it.price)}</td><td>${formatCLP(it.price*it.qty)}</td></tr>`
  ).join('');
  receipt.innerHTML = `
    <div class="recibo">
      <h3>Comprobante de compra</h3>
      <p><strong>N° Orden:</strong> ${order.id}</p>
      <p><strong>Fecha:</strong> ${order.date}</p>
      <p><strong>Cliente:</strong> ${order.userName} (${order.userEmail})</p>
      <table class="recibo-tabla">
        <thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><td colspan="3">Total</td><td><strong>${formatCLP(order.total)}</strong></td></tr></tfoot>
      </table>
      <div class="recibo-acciones">
        <button class="btn btn-secundario" onclick="window.print()">Imprimir</button>
        <button class="btn btn-primario" id="btn-descarga">Descargar</button>
      </div>
    </div>
  `;
  const btn = document.getElementById('btn-descarga');
  if(btn){
    btn.onclick = ()=>{
      const text = [
        `Orden: ${order.id}`,
        `Fecha: ${order.date}`,
        `Cliente: ${order.userName} (${order.userEmail})`,
        `Items:`,
        ...order.items.map(it => ` - ${it.qty}x ${it.name} @ ${formatCLP(it.price)} = ${formatCLP(it.price*it.qty)}`),
        `Total: ${formatCLP(order.total)}`
      ].join('\n');
      const blob = new Blob([text], {type:'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${order.id}.txt`; a.click();
      URL.revokeObjectURL(url);
    };
  }
  renderCart(); // refresca tabla (queda vacía tras comprar)
}

/* ===== Botones .btn-add ===== */
function setupAddButtons(){
  document.querySelectorAll('.btn-add').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id, name = btn.dataset.name, price = Number(btn.dataset.price || 0);
      if(!id || !name){ return alert('Producto inválido'); }
      addToCart({ id, name, price });
    });
  });
}

/* ===== Validaciones (reutilizadas) ===== */
function byId(id){ return document.getElementById(id); }
function clearErrors(form){
  form.querySelectorAll('.error-msg').forEach(e => e.remove());
  form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
}
function showError(inputEl, msg){
  inputEl.classList.add('invalid');
  const p = document.createElement('p');
  p.className = 'error-msg';
  p.textContent = msg;
  inputEl.insertAdjacentElement('afterend', p);
}
function isEmpty(v){ return !v || v.trim() === ''; }
function isAllowedEmail(email){ return /^[\w.-]+@(gmail\.com|duoc\.cl)$/i.test(email.trim()); }
function isValidPass(pass){ return typeof pass === 'string' && pass.length>=4 && pass.length<=10; }
function isValidRUNSimple(run){
  if(!run) return false;
  const v = run.trim().toUpperCase();
  if(!/^[0-9K]+$/.test(v)) return false;
  return v.length>=7 && v.length<=9;
}
function getFormByInputId(inputId){
  const el = byId(inputId);
  return el ? el.closest('form') : null;
}

/* ===== Contacto ===== */
(function setupContacto(){
  const f = getFormByInputId('c-nombre') || getFormByInputId('c-correo') || getFormByInputId('c-comentario');
  if(!f) return;
  f.addEventListener('submit', (e)=>{
    clearErrors(f); let ok=true;
    const nombre=byId('c-nombre'), correo=byId('c-correo'), comentario=byId('c-comentario');
    if(!nombre || isEmpty(nombre.value)){ ok=false; showError(nombre||f,'El nombre es obligatorio.'); }
    if(!correo || !isAllowedEmail(correo.value)){ ok=false; showError(correo||f,'Usa correo @gmail.com o @duoc.cl'); }
    if(!comentario || isEmpty(comentario.value)){ ok=false; showError(comentario||f,'El comentario es obligatorio.'); }
    else if(comentario.value.length>500){ ok=false; showError(comentario,'Máximo 500 caracteres.'); }
    if(!ok) e.preventDefault(); else alert('Contacto enviado ✅ (demo)');
  });
})();

/* ===== Login ===== */
(function setupLogin(){
  const f = getFormByInputId('l-correo') || getFormByInputId('l-pass');
  if(!f) return;
  f.addEventListener('submit', (e)=>{
    clearErrors(f); let ok=true;
    const correo=byId('l-correo'), pass=byId('l-pass');
    if(!correo || !isAllowedEmail(correo.value)){ ok=false; showError(correo||f,'Correo @gmail.com o @duoc.cl'); }
    if(!pass || !isValidPass(pass.value)){ ok=false; showError(pass||f,'Contraseña 4 a 10.'); }
    if(!ok){ e.preventDefault(); return; }
    const users = readJSON(KEYS.USERS, []);
    const found = users.find(u => u.email.toLowerCase()===correo.value.toLowerCase() && u.pass===pass.value);
    if(!found){ e.preventDefault(); return alert('Credenciales inválidas'); }
    setSession(found.email);
    alert('Inicio de sesión ok ✅');
    window.location.href = 'index.html';
  });
})();

/* ===== Registro ===== */
(function setupRegistro(){
  const f = getFormByInputId('r-run') || getFormByInputId('r-correo');
  if(!f) return;
  f.addEventListener('submit', (e)=>{
    clearErrors(f); let ok=true;
    const run=byId('r-run'), nombre=byId('r-nombre'), apellidos=byId('r-apellidos'),
          correo=byId('r-correo'), pass=byId('r-pass'), direccion=byId('r-direccion');
    if(!run || !isValidRUNSimple(run.value)){ ok=false; showError(run||f,'RUN sin puntos/guion, 7-9 (ej: 19011022K)'); }
    if(!nombre || isEmpty(nombre.value)){ ok=false; showError(nombre||f,'Nombre obligatorio.'); }
    if(!apellidos || isEmpty(apellidos.value)){ ok=false; showError(apellidos||f,'Apellidos obligatorios.'); }
    if(!correo || !isAllowedEmail(correo.value)){ ok=false; showError(correo||f,'Correo @gmail.com o @duoc.cl'); }
    if(!pass || !isValidPass(pass.value)){ ok=false; showError(pass||f,'Contraseña 4 a 10.'); }
    if(!direccion || isEmpty(direccion.value)){ ok=false; showError(direccion||f,'Dirección obligatoria.'); }
    if(!ok){ e.preventDefault(); return; }

    const users = readJSON(KEYS.USERS, []);
    if(users.find(u => u.email.toLowerCase()===correo.value.toLowerCase())){
      e.preventDefault(); return alert('Correo ya registrado.');
    }
    users.push({
      run: run.value.trim().toUpperCase(),
      nombre: nombre.value.trim(),
      apellidos: apellidos.value.trim(),
      email: correo.value.trim().toLowerCase(),
      pass: pass.value,
      tipo: 'Cliente',
      direccion: direccion.value.trim()
    });
    writeJSON(KEYS.USERS, users);
    setSession(correo.value.trim().toLowerCase());
    alert('Cuenta creada ✅');
    window.location.href = 'index.html';
  });
})();

/* ===== Admin: render ===== */
function renderAdmin(){
  const usersEl = document.getElementById('admin-users');
  const prodsEl = document.getElementById('admin-products');
  const ordsEl  = document.getElementById('admin-orders');
  if(!usersEl && !prodsEl && !ordsEl) return;

  // Usuarios
  if(usersEl){
    const users = readJSON(KEYS.USERS, []);
    usersEl.innerHTML = `
      <div class="t-row t-head"><span>RUN</span><span>Nombre</span><span>Correo</span><span>Tipo</span></div>
      ${users.map(u => `
        <div class="t-row"><span>${u.run}</span><span>${u.nombre} ${u.apellidos}</span><span>${u.email}</span><span>${u.tipo}</span></div>
      `).join('')}
    `;
  }
  // Productos
  if(prodsEl){
    const prods = readJSON(KEYS.PRODUCTS, []);
    prodsEl.innerHTML = `
      <div class="t-row t-head"><span>Código</span><span>Nombre</span><span>Precio</span><span>Stock</span></div>
      ${prods.map(p => `
        <div class="t-row"><span>${p.id}</span><span>${p.name}</span><span>${formatCLP(p.price)}</span><span>${p.stock}</span></div>
      `).join('')}
    `;
  }
  // Órdenes
  if(ordsEl){
    const ords = readJSON(KEYS.ORDERS, []);
    ordsEl.innerHTML = `
      <div class="t-row t-head"><span>Orden</span><span>Fecha</span><span>Cliente</span><span>Total</span></div>
      ${ords.map(o => `
        <div class="t-row"><span>${o.id}</span><span>${o.date}</span><span>${o.userEmail}</span><span>${formatCLP(o.total)}</span></div>
      `).join('')}
    `;
  }
}

/* ===== Admin: formularios ===== */
function setupAdminForms(){
  const fp = document.getElementById('form-producto');
  if(fp){
    fp.addEventListener('submit', (e)=>{
      e.preventDefault();
      const id=byId('p-codigo'), nombre=byId('p-nombre'), precio=byId('p-precio'), stock=byId('p-stock'), cat=byId('p-categoria');
      clearErrors(fp);
      if(!id.value.trim()) return showError(id,'Código requerido');
      if(!nombre.value.trim()) return showError(nombre,'Nombre requerido');
      const pr = Number(precio.value), st= Number(stock.value);
      if(isNaN(pr) || pr<=0) return showError(precio,'Precio > 0');
      if(isNaN(st) || st<0)  return showError(stock,'Stock >= 0');
      const prods = readJSON(KEYS.PRODUCTS, []);
      const idx = prods.findIndex(p=>p.id===id.value.trim());
      const data = { id:id.value.trim(), name:nombre.value.trim(), price:pr, stock:st, img:'images/placeholder.png', categoria:cat.value };
      if(idx>=0) prods[idx]=data; else prods.push(data);
      writeJSON(KEYS.PRODUCTS, prods);
      alert('Producto guardado ✅');
      renderAdmin();
      fp.reset();
    });
  }

  const fu = document.getElementById('form-usuario');
  if(fu){
    fu.addEventListener('submit', (e)=>{
      e.preventDefault();
      const run=byId('u-run'), nombre=byId('u-nombre'), ape=byId('u-apellidos'),
            correo=byId('u-correo'), tipo=byId('u-tipo');
      clearErrors(fu);
      if(!isValidRUNSimple(run.value)) return showError(run,'RUN inválido');
      if(!nombre.value.trim())       return showError(nombre,'Nombre requerido');
      if(!ape.value.trim())          return showError(ape,'Apellidos requeridos');
      if(!isAllowedEmail(correo.value)) return showError(correo,'Correo @gmail.com o @duoc.cl');
      const users = readJSON(KEYS.USERS, []);
      if(users.find(u=>u.email.toLowerCase()===correo.value.trim().toLowerCase())) return showError(correo,'Correo ya existe');
      users.push({ run:run.value.trim().toUpperCase(), nombre:nombre.value.trim(), apellidos:ape.value.trim(), email:correo.value.trim().toLowerCase(), pass:'1234', tipo:tipo.value, direccion:'' });
      writeJSON(KEYS.USERS, users);
      alert('Usuario guardado ✅ (pass inicial 1234)');
      renderAdmin();
      fu.reset();
    });
  }
}

/* ===== Mi cuenta: render ===== */
function renderAccountPage(){
  const prof = document.getElementById('account-profile');
  const out  = document.getElementById('account-orders');
  if(!prof || !out) return;

  const user = currentUser();
  if(!user){
    alert('Debes iniciar sesión.');
    window.location.href = 'iniciarSesion.html';
    return;
  }

  prof.innerHTML = `
    <h3>Perfil</h3>
    <p><strong>Nombre:</strong> ${user.nombre || '-'} ${user.apellidos || ''}</p>
    <p><strong>Correo:</strong> ${user.email}</p>
    <p><strong>Dirección:</strong> ${user.direccion || '-'}</p>
    <p><strong>Rol:</strong> ${user.tipo}</p>
  `;

  const ords = readJSON(KEYS.ORDERS, []).filter(o => o.userEmail.toLowerCase() === user.email.toLowerCase());
  if(!ords.length){
    out.innerHTML = `<p class="sub">No tienes pedidos aún.</p>`;
    return;
  }
  out.innerHTML = `
    <div class="t-row t-head"><span>Orden</span><span>Fecha</span><span>Total</span><span>Acción</span></div>
    ${ords.map(o => `
      <div class="t-row">
        <span>${o.id}</span>
        <span>${o.date}</span>
        <span>${formatCLP(o.total)}</span>
        <span><a class="btn btn-secundario" href="carrito.html#${o.id}">Ver detalle</a></span>
      </div>
    `).join('')}
  `;
}

/* ===== Header: sesión visible (hola nombre, mi cuenta, logout, admin si rol) ===== */
function renderSessionUI(){
  const box = document.getElementById('cuenta');
  const menu = document.querySelector('nav ul.menu');
  if(!box || !menu) return;

  const user = currentUser();

  // limpia posible Admin duplicado
  const existingAdmin = menu.querySelector('a[href="admin.html"]');
  if(existingAdmin) existingAdmin.parentElement.remove();

  if(!user){
    box.innerHTML = `
      <div class="acciones">
        <a class="btn-link" href="iniciarSesion.html">Iniciar sesión</a>
        <a class="btn-link" href="registrarUsuario.html">Registrarse</a>
      </div>
    `;
    return;
  }

  const nombreCorto = user.nombre ? user.nombre.split(' ')[0] : '';
  box.innerHTML = `
    <div class="user">
      <img src="images/user.png" alt="Cuenta">
      <span class="email">Hola, <strong>${nombreCorto || user.email}</strong></span>
    </div>
    <div class="acciones">
      <a class="btn-link" href="mi-cuenta.html">Mi cuenta</a>
      <button id="btn-logout" class="btn-link" type="button">Cerrar sesión</button>
    </div>
  `;

  if(user.tipo === 'Administrador' || user.tipo === 'Vendedor'){
    const li = document.createElement('li');
    li.innerHTML = `<a href="admin.html">Admin</a>`;
    menu.appendChild(li);
  }

  const btnLogout = document.getElementById('btn-logout');
  if(btnLogout){
    btnLogout.onclick = ()=>{
      clearSession();
      alert('Sesión cerrada');
      renderSessionUI();
      if(location.pathname.endsWith('mi-cuenta.html') || location.pathname.endsWith('admin.html')){
        location.href = 'iniciarSesion.html';
      }
    };
  }
}

/* ===== Guard de admin ===== */
function enforceAdminGuard(){
  const isAdminPage = /(^|\/)admin\.html(\?|#|$)/i.test(window.location.pathname) || window.location.href.endsWith('admin.html');
  if(!isAdminPage) return;
  const user = currentUser();
  if(!user || !(user.tipo === 'Administrador' || user.tipo === 'Vendedor')){
    alert('Acceso restringido al panel de administración.');
    window.location.href = 'iniciarSesion.html';
  }
}

/* ===== DOM Ready ===== */
document.addEventListener('DOMContentLoaded', ()=>{
  seedProducts();
  seedUsers();
  updateCartCounter();
  setupAddButtons();
  renderCart();
  renderAdmin();
  setupAdminForms();

  renderSessionUI();
  enforceAdminGuard();
  renderAccountPage();

  const cartBadge = document.querySelector('.carrito');
  if(cartBadge && !cartBadge.closest('a')){
    cartBadge.style.cursor = 'pointer';
    cartBadge.addEventListener('click', ()=>{ window.location.href = 'carrito.html'; });
  }
});
