$(document).ready(function() {
    cargarCarrito();

    $('.add-to-cart').click(function() {
        var titulo = $(this).data('title');
        var descripcion = $(this).data('description');
        var precio = $(this).data('price');
        agregarAlCarrito(titulo, descripcion, precio);
    });

    $('#cartModalBody').on('click', '.increment', function() {
        var index = $(this).data('index');
        cambiarCantidad(index, 1);
    });

    $('#cartModalBody').on('click', '.decrement', function() {
        var index = $(this).data('index');
        cambiarCantidad(index, -1);
    });

    $('#cartModalBody').on('click', '.remove-from-cart', function() {
        var index = $(this).data('index');
        eliminarDelCarrito(index);
    });

    
    function cargarCarrito() {
        var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        actualizarModalCarrito(carrito);
    }

   
    function agregarAlCarrito(titulo, descripcion, precio) {
        var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        var productoIndex = carrito.findIndex(item => item.titulo === titulo);
        if (productoIndex !== -1) {
            if (carrito[productoIndex].cantidad < 10) {
                carrito[productoIndex].cantidad += 1;
            } else {
                alert('No se pueden agregar mas de 10 productos al carrito.');
                return;
            }
        } else {
            carrito.push({ titulo: titulo, descripcion: descripcion, precio: precio, cantidad: 1 });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarModalCarrito(carrito);
        alert('Producto agregado al carrito');
    }

    function cambiarCantidad(index, cantidad) {
        var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito[index]) {
            carrito[index].cantidad += cantidad;
            if (carrito[index].cantidad < 1) {
                carrito.splice(index, 1); 
            } else if (carrito[index].cantidad > 10) {
                carrito[index].cantidad = 10; 
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarModalCarrito(carrito);
        }
    }


    function eliminarDelCarrito(index) {
        var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito[index]) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarModalCarrito(carrito);
        }
    }

    function actualizarModalCarrito(carrito) {
        var cuerpoModalCarrito = $('#cartModalBody');
        cuerpoModalCarrito.empty();
        if (carrito.length === 0) {
            cuerpoModalCarrito.append('<p>Tu carrito esta vacio.</p>');
        } else {
            var precioTotal = 0;
            var listaCarrito = $('<ul class="list-group"></ul>');
            carrito.forEach(function(item, index) {
                precioTotal += item.precio * item.cantidad;
                listaCarrito.append('<li class="list-group-item">' +
                    item.titulo + ': ' + item.descripcion + ' - $' + item.precio +
                    ' <button class="btn btn-sm btn-primary increment" data-index="' + index + '">+</button>' +
                    ' Cantidad: ' + item.cantidad +
                    ' <button class="btn btn-sm btn-primary decrement" data-index="' + index + '">-</button>' +
                    ' <button class="btn btn-sm btn-danger remove-from-cart" data-index="' + index + '">Eliminar</button>' +
                    '</li>');
            });
            cuerpoModalCarrito.append(listaCarrito);
            cuerpoModalCarrito.append('<p class="mt-3">Total: $' + precioTotal + '</p>');
        }
    }

    mostrarIndicadores();

    function mostrarIndicadores() {
        $.ajax({
            url: 'https://mindicador.cl/api',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var uf = data.uf.valor;
                var usd = data.dolar.valor;
                var eur = data.euro.valor;

                $('#valor-uf').text('$' + uf);
                $('#valor-usd').text('$' + usd);
                $('#valor-eur').text('$' + eur);
            },
            error: function(error) {
                console.log('Error al obtener los indicadores economicos:', error);
            }
        });
    }
});
