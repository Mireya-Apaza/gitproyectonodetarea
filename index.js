const express = require('express');
const app = express();
app.use(express.json());

// PRODUCTOS
let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// CLIENTES
let clientes = [
    { id: 1, nombre: 'Cliente 1', edad: 10 },
    { id: 2, nombre: 'Cliente 2', edad: 20 },
    { id: 3, nombre: 'Cliente 3', edad: 30 }
];

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la página de inicio! Aquí puedes explorar las siguientes rutas: /clientes y /productos');
});

// Ruta para obtener los productos
app.get('/productos', (req, res) => {
    const primerosProductos = productos.slice(0, 3);
    res.json(primerosProductos);
});

// Ruta para obtener los clientes
app.get('/clientes', (req, res) => {
    const primerosClientes = clientes.slice(0, 3);
    res.json(primerosClientes);
});

// Ruta para agregar un nuevo producto (POST)
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Ruta para agregar un nuevo cliente (POST)
app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body;
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Ruta para actualizar un producto existente (PUT)
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    const producto = productos.find(p => p.id === parseInt(id));
    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }

    producto.nombre = nombre;
    producto.precio = precio;
    res.json(producto);
});

// Ruta para actualizar un cliente existente (PUT)
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;

    const cliente = clientes.find(p => p.id === parseInt(id));
    if (!cliente) {
        return res.status(404).send('Cliente no encontrado');
    }

    cliente.nombre = nombre;
    cliente.edad = edad;
    res.json(cliente);
});

// Ruta para eliminar un producto existente (DELETE)
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    productos = productos.filter(p => p.id !== parseInt(id));
    res.status(204).send();
});

// Ruta para eliminar un cliente existente (DELETE)
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    clientes = clientes.filter(p => p.id !== parseInt(id));
    res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});