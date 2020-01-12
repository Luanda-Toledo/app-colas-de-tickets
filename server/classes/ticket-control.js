const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();

        }

    }

    //incrementa en uno el ultimo ticket, y luego lo grabamos en el archivo de texto(data.json)
    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        //Nos regresa el ultimo ticket 
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        //Regresa los ultimos 4 tickets
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        //verificamos que hayan tickets pendientes de atender
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        //extraemos el numero para romper la relacion que tiene js con que todos los numero son pasados por referencia, esto es para evitar problemas con este aspecto particular de js
        let numeroTicket = this.tickets[0].numero;

        //eliminamos la primera posicion del arreglo
        this.tickets.shift();

        //creamos un nuevo ticket, que este es el que vamos a atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //Agregamos el ticket al inicio del arreglo, no al final.
        this.ultimos4.unshift(atenderTicket);

        //Luego verificamos que solo existan cuatro tickets en el arreglo
        //La idea es que las personas se vayan despachanddo una por una.
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //Borra el ultimo elemento, en este caso el ultimo ticket
        }

        //Hacemos una impresion de los ultimos 4 para ver como esta trabajando
        console.log('ultimos 4');
        console.log(this.ultimos4);

        //Grabamos
        this.grabarArchivo();

        //Por ultimo, regresamos cual es el ticket que quiero atender. 
        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    //Guarda los cambios en el archivo data.json
    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}


module.exports = {
    TicketControl
}