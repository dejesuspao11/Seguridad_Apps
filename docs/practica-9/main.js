// 🛒 Lista de productos completa
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

// 📌 Función para mostrar productos en la interfaz
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

// 📌 Función para actualizar el carrito en la interfaz
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

    // Calcular el total y aplicar descuento si es necesario
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

// 📌 Función para agregar productos al carrito
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

// 📌 Función para quitar productos del carrito
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

// 📌 Función para calcular el total del carrito con descuento si es necesario
function calcularTotal() {
    return carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
}

// 📌 Función para procesar la compra
function procesarCompra() {
    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío.");
        return;
    }

    // Mostrar ventana de "Compra en proceso"
    let modalProceso = document.getElementById("modalProceso");
    modalProceso.style.display = "flex";

    setTimeout(() => {
        // Ocultar la ventana de "Compra en proceso" después de 5 segundos
        modalProceso.style.display = "none";

        // Vaciar el carrito después de la compra
        carrito = [];
        mostrarProductos();
        actualizarCarrito();
    }, 5000);
}

// 📌 Inicializar la tienda
document.getElementById("procesarCompra").addEventListener("click", procesarCompra);
mostrarProductos();
actualizarCarrito();

//
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmarPassword").value;

    // Limpiar mensajes
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorCorreo").textContent = "";
    document.getElementById("errorPassword").textContent = "";
    document.getElementById("errorConfirmacion").textContent = "";
    document.getElementById("mensajeExito").textContent = "";

    let valido = true;

    // Validar nombre (solo letras y espacios)
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) {
        document.getElementById("errorNombre").textContent = "❌ Solo letras y espacios permitidos.";
        valido = false;
    }

    // Validar correo (formato válido)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        document.getElementById("errorCorreo").textContent = "❌ Correo inválido.";
        valido = false;
    }

    // Validar contraseña (8+ caracteres, número, mayúscula, minúscula y especial)
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!regexPass.test(password)) {
        document.getElementById("errorPassword").textContent = "❌ La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
        valido = false;
    }

    // Confirmar contraseña
    if (password !== confirmar) {
        document.getElementById("errorConfirmacion").textContent = "❌ Las contraseñas no coinciden.";
        valido = false;
    }

    if (valido) {
        // Mostrar loader
        const loader = document.getElementById("loader");
        loader.style.display = "flex";

        setTimeout(() => {
            loader.style.display = "none";
            document.getElementById("mensajeExito").textContent = "✅ Registro exitoso. ¡Bienvenido/a a la tienda!";
            document.getElementById("registroForm").reset();
        }, 5000);
    }
});
