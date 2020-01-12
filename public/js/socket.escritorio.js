//comando para establecer la conexion
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

//.has: para preguntar si existe el escritorio
//verificamos que exista el escritorio, sino salimos de la pantalla y mandamos un err
if (searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

//Mostramos en pantalla el escritorio que lo va a atender.
$('h1').text('Escritorio' + escritorio);

//evento click del boton, para cambiar el small por el ticket que me regrese el servidor
$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket' + resp.numero);

    });

});