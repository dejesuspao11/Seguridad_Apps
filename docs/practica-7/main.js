// 1. Crear un Arreglo de Productos
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

// Carrito de compras
let carrito = [];

// 2. Agregar Productos al Carrito
function agregarAlCarrito(nombreProducto, cantidad) {
    let producto = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());

    if (producto) {
        if (producto.stock >= cantidad) {
            carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad: cantidad });
            producto.stock -= cantidad;
            console.log(`✅ ${cantidad} ${producto.nombre}(s) agregado(s) al carrito.`);
        } else {
            console.log(`❌ ${producto.nombre} fuera de stock.`);
        }
    } else {
        console.log(`❌ Producto no encontrado.`);
    }
}

// 🔹 1. Función para Eliminar Productos del Carrito
function eliminarDelCarrito(nombreProducto) {
    let index = carrito.findIndex(item => item.nombre.toLowerCase() === nombreProducto.toLowerCase());

    if (index !== -1) {
        let producto = carrito[index];
        let productoOriginal = productos.find(p => p.nombre === producto.nombre);
        productoOriginal.stock += producto.cantidad; // Devolver stock al inventario
        carrito.splice(index, 1); // Eliminar del carrito
        console.log(`🗑️ ${producto.nombre} eliminado del carrito.`);
    } else {
        console.log(`❌ El producto no está en tu carrito.`);
    }
}

// 3. Calcular el Total del Carrito
function calcularTotal() {
    let total = carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
    return total;
}

// 4. Aplicar Descuentos
function aplicarDescuento(total) {
    if (total > 100) {
        let descuento = total * 0.10;
        console.log(`🎉 Se aplicó un descuento de $${descuento.toFixed(2)}`);
        return total - descuento;
    }
    return total;
}

// 🔹 2. Contador antes de Confirmar la Compra
function contadorCompra(callback) {
    let tiempo = 3;
    let intervalo = setInterval(() => {
        console.log(`⏳ Estará listo en...${tiempo}`);
        tiempo--;

        if (tiempo < 0) {
            clearInterval(intervalo);
            callback(); // Llamar a la función de confirmación de compra
        }
    }, 1000);
}

// 5. Simular el Proceso de Compra
function procesarCompra() {
    if (carrito.length === 0) {
        console.log("🛒 Tu carrito está vacío. ¡Agrega productos!.");
        return;
    }

    console.log("⏳ Estamos procesando tu compra...");
    contadorCompra(() => {
        let total = calcularTotal();
        total = aplicarDescuento(total);
        console.log(`💰 Total a pagar: $${total.toFixed(2)}`);
        console.log("✅ Transacción confirmada. ¡Muchas gracias por tu compra!");
    });
}

// 6. Ejecutar el Código
agregarAlCarrito("Cuarzo Blanco", 20);
agregarAlCarrito("Pirita (Oro de los tontos)", 2);
agregarAlCarrito("Ópalo", 1);
agregarAlCarrito("Obsidiana", 1);

console.log("🛒 Mi Carrito:", carrito);
eliminarDelCarrito("Pirita (Oro de los tontos)"); // Prueba eliminar un producto
procesarCompra();
