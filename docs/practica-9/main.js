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

function calcularTotal() {
    return carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
}

// ✅ Mostrar formulario al dar clic en "comprar"
function procesarCompra() {
    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío.");
        return;
    }

    document.getElementById("modalFormulario").style.display = "flex";
}

// 📥 Validación del formulario
document.getElementById("formularioCompra").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const confirmacion = document.getElementById("confirmacion").value;
    const mensajeError = document.getElementById("mensajeError");

    if (!nombre) {
        mensajeError.textContent = "❌ El nombre no puede estar vacío.";
        return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        mensajeError.textContent = "❌ El correo no es válido.";
        return;
    }

    if (password.length < 8) {
        mensajeError.textContent = "❌ La contraseña debe tener al menos 8 caracteres.";
        return;
    }

    if (password !== confirmacion) {
        mensajeError.textContent = "❌ Las contraseñas no coinciden.";
        return;
    }

    mensajeError.textContent = "";
    document.getElementById("modalFormulario").style.display = "none";
    document.getElementById("modalProceso").style.display = "flex";

    setTimeout(() => {
        document.getElementById("modalProceso").style.display = "none";
        alert("✅ ¡Gracias por tu compra, " + nombre + "!");

        carrito = [];
        mostrarProductos();
        actualizarCarrito();
        document.getElementById("formularioCompra").reset();
    }, 3000);
});

document.getElementById("procesarCompra").addEventListener("click", procesarCompra);
mostrarProductos();
actualizarCarrito();
