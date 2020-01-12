var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

//Los metemos en un arreglo para que sea mas facil apuntar a cada posicion 
var lblTickets = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('estadoActual', function(data) {
    //console.log(data);
    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', function(data) {
    //console.log(data);

    //Reproducimos un audio cada vez que se actualice
    //Es probable que solo funcione en chrome o algunos navegadores nuevos!
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(data.ultimos4);
});


function actualizaHTML(ultimos4) {

    //Esto es para barrerlo
    for (var i = 0; i <= ultimos4.length - 1; i++) {

        //Renderizacion de estos elementos
        lblTickets[i].text('Ticket' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio' + ultimos4[i].escritorio);

    }

}