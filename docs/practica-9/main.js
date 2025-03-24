// 🛒 Lista de productos
const productos = [
    { nombre: "Amatista", precio: 300, stock: 5 },
    { nombre: "Ópalo", precio: 700, stock: 10 },
    { nombre: "Obsidiana", precio: 500, stock: 8 },
    { nombre: "Selenita", precio: 350, stock: 4 },
    { nombre: "Turmalina Verde", precio: 1200, stock: 5 },
    { nombre: "Piedra Luna", precio: 700, stock: 9 },
    { nombre: "Cuarzo Blanco", precio: 50, stock: 11 },
    { nombre: "Cuarzo Rosa", precio: 80, stock: 11 },
    { nombre: "Pirita (Oro de los tontos)", precio: 130, stock: 3 }
];

let carrito = [];

// 📌 Mostrar productos
function mostrarProductos() {
    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";

    productos.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <span>${producto.nombre} - $${producto.precio} (Stock: ${producto.stock})</span>
            <button onclick="agregarAlCarrito(${index})">+</button>
            <button onclick="quitarDelCarrito(${index})">-</button>
        `;
        contenedor.appendChild(div);
    });
}

// 📌 Actualizar carrito
function actualizarCarrito() {
    const contenedorCarrito = document.getElementById("carrito");
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>🛒 Carrito vacío</p>";
        return;
    }

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `<span>${item.nombre} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}</span>`;
        contenedorCarrito.appendChild(div);
    });

    let total = calcularTotal();
    let descuento = total > 100 ? total * 0.10 : 0;
    let totalConDescuento = total - descuento;

    let totalDiv = document.createElement("div");
    totalDiv.classList.add("carrito-item");
    totalDiv.innerHTML = `
        <strong>Total: $${total.toFixed(2)}</strong>
        ${descuento > 0 ? `<p>🎉 Descuento aplicado: -$${descuento.toFixed(2)}</p>
        <strong>Total con descuento: $${totalConDescuento.toFixed(2)}</strong>` : ""}
    `;
    contenedorCarrito.appendChild(totalDiv);
}

// 📌 Agregar producto
function agregarAlCarrito(index) {
    let producto = productos[index];

    if (producto.stock > 0) {
        let itemCarrito = carrito.find(item => item.nombre === producto.nombre);
        if (itemCarrito) {
            itemCarrito.cantidad++;
        } else {
            carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        }
        producto.stock--;
        actualizarCarrito();
        mostrarProductos();
    } else {
        alert("❌ Sin stock disponible");
    }
}

// 📌 Quitar producto
function quitarDelCarrito(index) {
    let producto = productos[index];
    let itemCarrito = carrito.find(item => item.nombre === producto.nombre);

    if (itemCarrito) {
        itemCarrito.cantidad--;
        producto.stock++;

        if (itemCarrito.cantidad === 0) {
            carrito = carrito.filter(item => item.nombre !== producto.nombre);
        }

        actualizarCarrito();
        mostrarProductos();
    }
}

// 📌 Calcular total
function calcularTotal() {
    return carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
}

// 📌 Procesar compra
function procesarCompra() {
    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío.");
        return;
    }

    let modalProceso = document.getElementById("modalProceso");
    modalProceso.style.display = "flex";

    setTimeout(() => {
        modalProceso.style.display = "none";
        carrito = [];
        mostrarProductos();
        actualizarCarrito();
    }, 5000);
}

// 📌 Validación del formulario
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmarPassword").value;

    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorCorreo").textContent = "";
    document.getElementById("errorPassword").textContent = "";
    document.getElementById("errorConfirmacion").textContent = "";
    document.getElementById("mensajeExito").textContent = "";

    let valido = true;

    if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) {
        document.getElementById("errorNombre").textContent = "❌ Solo letras y espacios permitidos.";
        valido = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        document.getElementById("errorCorreo").textContent = "❌ Correo inválido.";
        valido = false;
    }

    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!regexPass.test(password)) {
        document.getElementById("errorPassword").textContent = "❌ La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
        valido = false;
    }

    if (password !== confirmar) {
        document.getElementById("errorConfirmacion").textContent = "❌ Las contraseñas no coinciden.";
        valido = false;
    }

    if (valido) {
        const loader = document.getElementById("loader");
        loader.style.display = "flex";

        setTimeout(() => {
            loader.style.display = "none";
            document.getElementById("mensajeExito").textContent = "✅ Registro exitoso. ¡Bienvenido/a a la tienda!";
            document.getElementById("registroForm").reset();
        }, 5000);
    }
});

// 📌 Inicialización
document.getElementById("procesarCompra").addEventListener("click", procesarCompra);
mostrarProductos();
actualizarCarrito();
