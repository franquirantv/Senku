
var modo = 1;
var seleccionada; // La ficha esta seleccionada
var arrastrando; // La ficha está siendo arrastrada
var tFichas; // Todos los elementos con class='ficha'
var tHuecos; // Todos los elementos con class="hueco"
var huecosProximos; // Los huecos próximos de las fichas que estan seleccionadas o arrastrandose
var tHuecosProximos; // Los huecos próximos de todas las fichas
var hueco; 
var tiempo = 0;
var acaba = false;
var tabla;
var entrar = true;
var seleccion;
var seleccionActual = "cruz";
var posicion = 1;

function actualizarTiempo() {
    document.getElementById('tiempo').innerHTML = tiempo+ "s";
    if (acaba) {
        
    } else 
        tiempo++;

    setTimeout("actualizarTiempo()",1000);
}

function modoEle(y) {
    modo = y;
}

function lanzaderaIndex(){
    sessionStorage['modo'] = null;
    ordenar();
}

document.addEventListener("click", function (event) {
    //Para saber que eleccion esta marcada
    seleccion = document.getElementsByName("ele");
    for (var i=0; i<seleccion.length; i++) {

        if (seleccion[i].checked == true) {
            seleccionActual = seleccion[i].id;
        }
    }
}, false);


function lanzaderaJuego() {

    if(sessionStorage['modo'] != 1 && sessionStorage['modo'] != 2 && sessionStorage['modo'] != 3){
        window.location.href = "index.html";
    }

    if (sessionStorage['modo'] == 1) {
        createBoardCruz();
        ponerTitulo();
    } else if(sessionStorage['modo'] == 2 ) {
        createBoardRombo();
        ponerTitulo();

    } else if(sessionStorage['modo'] == 3) {
        createBoardTradicional();
        ponerTitulo();
    }
    document.getElementById('fichasRestantes').innerHTML = "Fichas: " + tFichas.length;

}

function jugar(){

    sessionStorage['modo'] = modo;
    window.location.href = "juego.html";

}

function createBoardCruz() {

    var fila = Math.floor((Math.random() * 7) + 1);
    var columna = Math.floor((Math.random() * 7) + 1);
    while(
        (fila == 1 && columna == 1) || (fila == 1 && columna == 2) || (fila == 1 && columna == 6) || (fila == 1 && columna == 7) ||
        (fila == 2 && columna == 1) || (fila == 2 && columna == 2) || (fila == 2 && columna == 6) || (fila == 2 && columna == 7) ||
        (fila == 6 && columna == 1) || (fila == 6 && columna == 2) || (fila == 6 && columna == 6) || (fila == 6 && columna == 7) ||
        (fila == 7 && columna == 1) || (fila == 7 && columna == 2) || (fila == 7 && columna == 6) || (fila == 7 && columna == 7)
    ){
        var fila = Math.floor((Math.random() * 7) + 1);
        var columna = Math.floor((Math.random() * 7) + 1);
    }
    hueco = "pos-" + fila + "-" + columna;

    var board = document.getElementById('board');
    var html = "";
    var id = "";

    for (var fila = 1; fila <= 7; fila++) {
        html += "<ul class='fila'>"
        for (var columna = 1; columna <= 7; columna++) {
            id = "pos-" + fila + "-" + columna;

            if ((fila == 1 || fila == 2 || fila == 6 || fila == 7) && (columna == 1 || columna == 2 || columna == 6 || columna == 7))
                html += "<li id=" + id + " class='celda'></li>";
            else
                html += "<li id=" + id + " class='celda ficha' draggable='true' onclick='mostrarMovimientosPosibles(this);'></li>";

        }
        html += "</ul>";
    }
    
    sessionStorage.setItem("tablero", html);
    board.innerHTML = html;
    document.getElementById(hueco).className = 'celda hueco';
    tFichas = document.getElementsByClassName('ficha');
    tHuecos  = document.getElementsByClassName('hueco');

}

function ponerTitulo(){

    var titulo = document.getElementById('titulo1');
    html = "Has elegido el modelo ";
    if (sessionStorage['modo'] == 1)
        html += "Cruz";
    else if(sessionStorage['modo'] == 2 )
        html += "Rombo";
    else if(sessionStorage['modo'] == 3)
        html += "Tradicional";
    
    titulo.innerHTML = html;
}

function createBoardTradicional() {

    var fila = Math.floor((Math.random() * 7) + 1);
    var columna = Math.floor((Math.random() * 7) + 1);
    while (
        (fila == 1 && columna == 1) || (fila == 1 && columna == 2) || (fila == 1 && columna == 6) || (fila == 1 && columna == 7) ||
        (fila == 2 && columna == 1) || (fila == 2 && columna == 7) ||
        (fila == 6 && columna == 1) || (fila == 6 && columna == 7) ||
        (fila == 7 && columna == 1) || (fila == 7 && columna == 2) || (fila == 7 && columna == 3) || (fila == 7 && columna == 5) || (fila == 7 && columna == 6) || (fila == 7 && columna == 7)
    ) {
        var fila = Math.floor((Math.random() * 7) + 1);
        var columna = Math.floor((Math.random() * 7) + 1);
    }
    hueco = "pos-" + fila + "-" + columna;

    var board = document.getElementById('board');
    var html = "";
    var id = "";

    for (var fila = 1; fila <= 7; fila++) {
        html += "<ul class='fila'>"
        for (var columna = 1; columna <= 7; columna++) {
            id = "pos-" + fila + "-" + columna;

            if (((fila == 1 || fila == 7) && (columna == 1 || columna == 2 || columna == 6 || columna == 7)))
                html += "<li id=" + id + " class='celda'></li>";
            else if(((fila == 2 || fila == 6) && (columna == 1 || columna == 7)))
                html += "<li id=" + id + " class='celda'></li>";
            else 
                html += "<li id=" + id + " class='celda ficha' draggable='true' onclick='mostrarMovimientosPosibles(this);'></li>";

        }
        html += "</ul>";
    }

    board.innerHTML = html;
    document.getElementById(hueco).className = 'celda hueco';
    tFichas = document.getElementsByClassName('ficha');
    tHuecos = document.getElementsByClassName('hueco');

}

function createBoardRombo() {

    var fila = Math.floor((Math.random() * 7) + 1);
    var columna = Math.floor((Math.random() * 7) + 1);
    while (
        (fila == 1 && columna == 1) || (fila == 1 && columna == 2) || (fila == 1 && columna == 3) || (fila == 1 && columna == 5) || (fila == 1 && columna == 6) || (fila == 1 && columna == 7) ||
        (fila == 2 && columna == 1) || (fila == 2 && columna == 2) || (fila == 2 && columna == 6) || (fila == 2 && columna == 7) ||
        (fila == 3 && columna == 1) || (fila == 3 && columna == 7) ||
        (fila == 5 && columna == 1) || (fila == 5 && columna == 7) ||
        (fila == 6 && columna == 1) || (fila == 6 && columna == 2) || (fila == 6 && columna == 6) || (fila == 6 && columna == 7) ||
        (fila == 7 && columna == 1) || (fila == 7 && columna == 2) || (fila == 7 && columna == 3) || (fila == 7 && columna == 5) || (fila == 7 && columna == 6) || (fila == 7 && columna == 7)
    ) {
        var fila = Math.floor((Math.random() * 7) + 1);
        var columna = Math.floor((Math.random() * 7) + 1);
    }
    hueco = "pos-" + fila + "-" + columna;


    var board = document.getElementById('board');
    var html = "";
    var id = "";

    for (var fila = 1; fila <= 7; fila++) {
        html += "<ul class='fila'>"
        for (var columna = 1; columna <= 7; columna++) {
            id = "pos-" + fila + "-" + columna;

            if (((fila == 1 || fila == 7) && (columna == 1 || columna == 2 || columna == 3 || columna == 5 || columna == 6 || columna == 7)))
                html += "<li id=" + id + " class='celda'></li>";
            else if(((fila == 2 || fila == 6) && (columna == 1 || columna == 2 || columna == 6 || columna == 7)))
                html += "<li id=" + id + " class='celda'></li>";
            else if(((fila == 3 || fila == 5) && (columna == 1 || columna == 7)))
                html += "<li id=" + id + " class='celda'></li>";
            else
                html += "<li id=" + id + " class='celda ficha' draggable='true' onclick='mostrarMovimientosPosibles(this);'></li>";

        }
        html += "</ul>";
    }

    board.innerHTML = html;
    document.getElementById(hueco).className = 'celda hueco';
    tFichas = document.getElementsByClassName('ficha');
    tHuecos = document.getElementsByClassName('hueco');

}

function movimientosPosibles(celda) {

    var fila = parseInt(celda.id.slice(4, 5)); // Fila de la celda
    var columna = parseInt(celda.id.slice(6, 7)); // Columna de la celda 

    var arribaFicha = "pos-" + parseInt(fila - 1) + "-" + columna;
    var abajoFicha = "pos-" + parseInt(fila + 1) + "-" + columna;
    var derFicha = "pos-" + fila + "-" + parseInt(columna + 1);
    var izqFicha = "pos-" + fila + "-" + parseInt(columna - 1);

    var arribaHueco = "pos-" + parseInt(fila - 2) + "-" + columna;
    var abajoHueco = "pos-" + parseInt(fila + 2) + "-" + columna;
    var derHueco = "pos-" + fila + "-" + parseInt(columna + 2);
    var izqHueco = "pos-" + fila + "-" + parseInt(columna - 2);

    for(var i = 0; i < tFichas.length; i++) {
        for(var j = 0; j < tHuecos.length; j++) {
            if(arribaFicha == tFichas[i].id && arribaHueco == tHuecos[j].id) {
                huecosProximos.push(arribaHueco);
            } else if(abajoFicha == tFichas[i].id && abajoHueco == tHuecos[j].id) {
                huecosProximos.push(abajoHueco);
            } else if(derFicha == tFichas[i].id && derHueco == tHuecos[j].id) {
                huecosProximos.push(derHueco);
            } else if(izqFicha == tFichas[i].id && izqHueco == tHuecos[j].id) {
                huecosProximos.push(izqHueco);
            }
        }
    }
}

function todosMovimientosPosibles() {
    for(var i = 0; i < tFichas.length; i++) {
        var fila = parseInt(tFichas[i].id.slice(4, 5)); // Fila de la celda
        var columna = parseInt(tFichas[i].id.slice(6, 7)); // Columna de la celda 

        var arribaFicha = "pos-" + parseInt(fila - 1) + "-" + columna;
        var abajoFicha = "pos-" + parseInt(fila + 1) + "-" + columna;
        var derFicha = "pos-" + fila + "-" + parseInt(columna + 1);
        var izqFicha = "pos-" + fila + "-" + parseInt(columna - 1);
    
        var arribaHueco = "pos-" + parseInt(fila - 2) + "-" + columna;
        var abajoHueco = "pos-" + parseInt(fila + 2) + "-" + columna;
        var derHueco = "pos-" + fila + "-" + parseInt(columna + 2);
        var izqHueco = "pos-" + fila + "-" + parseInt(columna - 2);

        for(var i2 = 0; i2 < tFichas.length; i2++) {
            for(var j = 0; j < tHuecos.length; j++) {
                if(arribaFicha == tFichas[i2].id && arribaHueco == tHuecos[j].id) {
                    tHuecosProximos.push(arribaHueco);
                } else if(abajoFicha == tFichas[i2].id && abajoHueco == tHuecos[j].id) {
                    tHuecosProximos.push(abajoHueco);
                } else if(derFicha == tFichas[i2].id && derHueco == tHuecos[j].id) {
                    tHuecosProximos.push(derHueco);
                } else if(izqFicha == tFichas[i2].id && izqHueco == tHuecos[j].id) {
                    tHuecosProximos.push(izqHueco);
                }
            }
        }
    }

}

function derrota(){

    if (tHuecosProximos.length == 0 || tFichas.length == 1) {
        abrirModal2();
    }
}

function mostrarMovimientosPosibles(celda) {

    if(celda.className == 'celda ficha') {

        if(huecosProximos != undefined && seleccionada != undefined) {
            for(var i = 0; i < huecosProximos.length; i++) {
                if( document.getElementById(huecosProximos[i]).className == 'celda hueco') {
                    document.getElementById(huecosProximos[i]).style.border = '5px solid #292826';
                } else {
                    document.getElementById(huecosProximos[i]).style.border = 0;
                }
            }
            var seleccionada2 = seleccionada.pop();
            if(seleccionada2.className == 'celda hueco') {
                seleccionada2.style.border = '5px solid #292826';
            } else if(seleccionada2.className == 'celda ficha') {
                seleccionada2.style.border = 0;
            } else if(document.getElementById(arrastrando).className == 'celda ficha') {
                document.getElementById(arrastrando).style.border = 0;
            }
        }

        huecosProximos = [];
        tHuecosProximos = [];
        seleccionada = [];
        seleccionada.push(celda);

        movimientosPosibles(celda);
        todosMovimientosPosibles();

        for(var i = 0; i < huecosProximos.length; i++) {
            if(document.getElementById(huecosProximos[i]).className == 'celda hueco') {
                document.getElementById(huecosProximos[i]).style.border = '5px solid #07f04d';
            }
        }

        if(celda.className != 'celda hueco' ) {
            celda.style.border = '5px solid gray';
        }
    }
}

document.addEventListener("drag", function (event) {
}, false);

document.addEventListener("dragstart", function (event) {
    if(event.target.className != 'celda hueco') {
        arrastrando = event.target.id;
        huecosProximos = [];
        tHuecosProximos = [];
        movimientosPosibles(event.target);
        todosMovimientosPosibles();
        event.target.style.border = 0;
    }
    event.dataTransfer.setData('Text', this.id);
;}, false);

document.addEventListener("dragend", function (event) {
    document.getElementById('fichasRestantes').innerHTML = "Fichas Restantes: " + tFichas.length;

}, false);

document.addEventListener("dragover", function (event) {
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function (event) {
}, false);

document.addEventListener("dragleave", function (event) {
}, false);

document.addEventListener("drop", function (event) {

    if(event.preventDefault) { event.preventDefault(); }
    if(event.stopPropagation) { event.stopPropagation(); }

    var dropRow = parseInt(event.target.id.slice(4, 5));
    var dropColumn = parseInt(event.target.id.slice(6, 7));

    var dragRow = parseInt(arrastrando.slice(4, 5));
    var dragColumn = parseInt(arrastrando.slice(6, 7));

    var fila = dropRow - dragRow;
    var columna = dropColumn - dragColumn
    var id;
    for(var i = 0; i < huecosProximos.length; i++) {
        if(event.target.id == huecosProximos[i]) {
            // El hueco se convierte en ficha
            event.target.className = 'celda ficha';
            event.target.style.border = 0;
            event.target.style.background = "url('images/ball.png') center";
            event.target.style.backgroundSize = '6vh';
            event.target.style.backgroundRepeat = 'no-repeat';
            document.getElementById(huecosProximos[i]).setAttribute('draggable', true);
            event.target.addEventListener('click', function(){ mostrarMovimientosPosibles(this) });

            // La ficha que está siendo arrastrada se convierte en hueco
            document.getElementById(arrastrando).className = 'celda hueco';
            document.getElementById(arrastrando).style.border = '5px solid #292826';
            document.getElementById(arrastrando).style.background = '#b9b8b5';
            document.getElementById(arrastrando).style.backgroundSize = 0;
            document.getElementById(arrastrando).style.backgroundRepeat = 0;
            document.getElementById(arrastrando).removeEventListener('click', mostrarMovimientosPosibles);

            // La ficha del medio se elimina
            switch(true) {
                case fila == -2 && columna == 0:
                    id = "pos-" + parseInt(dragRow - 1) + "-" + parseInt(dragColumn);
                    document.getElementById(id).className = 'celda hueco';
                    document.getElementById(id).style.border = '5px solid #292826';
                    document.getElementById(id).style.background = '#b9b8b5';
                    document.getElementById(id).removeEventListener('click', mostrarMovimientosPosibles);
                break;
                case fila = 2 && columna == 0:
                    id = "pos-" + parseInt(dragRow + 1) + "-" + parseInt(dragColumn);
                    document.getElementById(id).className = 'celda hueco';
                    document.getElementById(id).style.border = '5px solid #292826';
                    document.getElementById(id).style.background = '#b9b8b5';
                    document.getElementById(id).removeEventListener('click', mostrarMovimientosPosibles);
                break;
                case fila == 0 && columna == -2:
                    id = "pos-" + parseInt(dragRow) + "-" + parseInt(dragColumn - 1);
                    document.getElementById(id).className = 'celda hueco';
                    document.getElementById(id).style.border = '5px solid #292826';
                    document.getElementById(id).style.background = '#b9b8b5';
                    document.getElementById(id).removeEventListener('click', mostrarMovimientosPosibles);
                break;
                case fila == 0 && columna == 2:
                    id = "pos-" + parseInt(dragRow) + "-" + parseInt(dragColumn + 1);
                    document.getElementById(id).className = 'celda hueco';
                    document.getElementById(id).style.border = '5px solid #292826';
                    document.getElementById(id).style.background = '#b9b8b5';
                    document.getElementById(id).removeEventListener('click', mostrarMovimientosPosibles);
                break;
            }
        }
    }

    if(seleccionada != undefined ) {
        document.getElementById(seleccionada[0].id).style.border = 0;
        document.getElementById(arrastrando).style.border = '5px solid #292826';

        for(var i = 0; i < tHuecos.length; i++) {
            document.getElementById(tHuecos[i].id).style.border = '5px solid #292826';
        }
        derrota();
    }

}, false);

function abrirModal() {

    document.getElementById('msjModal2').style.display = "block";
}

function cerrarModal() {
    document.getElementById('msjModal2').style.display = "none";
}

function mensajeModal(){
        
    if (sessionStorage.getItem("partida") != null) {
        posicion = 0;

        let datosObjArr = JSON.parse(sessionStorage.getItem("partida"));
        
        datosObjArr.forEach(
            function(arrayElement) {
                tabla = rellenarPuntuacion(arrayElement);
            }
        ) 
        entrar = true;

        let div = document.createElement('div');
        div.id = 'msj-modal';

        html = 
        ` <article><div id="tabla1" class="modal-content">
                <h4>Puntuaciones</h4>`+ tabla.outerHTML +`</div>
                <footer>
                    <button  onclick="document.querySelector('#msj-modal').remove();">Cerrar</button>
                </footer>
                </article>`;

        div.innerHTML = html;

        document.body.appendChild(div);

        document.getElementById("tablaPunt").innerHTML = '';
    } else {
        entrar = true;
        tabla = primeraFila();
        let div = document.createElement('div');
        div.id = 'msj-modal';

        html = 
        ` <article><div id="tabla1" class="modal-content">
                <h4>Puntuaciones</h4>`+ tabla.outerHTML +`</div>
                <footer>
                    <button  onclick="document.querySelector('#msj-modal').remove();">Cerrar</button>
                </footer>
                </article>`;

        div.innerHTML = html;

        document.body.appendChild(div);

        document.getElementById("tablaPunt").innerHTML = '';
    }

}

function abrirModal2() {
    let div = document.createElement('div');
    div.id = 'msj-modal';

    html = 
    ` <article><h1>Juego Terminado</h1>
        <span onclick="window.location.href = 'index.html'" class="close1">&times;</span>
        <h3> Fichas Restantes: `+tFichas.length +` </h3>
        <h3> Tiempo empleado: `+tiempo +`s </h3>
        <form id="datos">
            <div class="nombre">
                <label for="nombre">Nombre: </label>
                <input type="text" name="nombre" id="nombre">
            </div>
        
        <footer class="guardar">
            <input value="Guardar" type="submit"></input>
        </footer>
        </form>
    </article>`;

    div.innerHTML = html;

    document.body.appendChild(div);

    acaba = true;

    const form = document.getElementById("datos");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let datosFormData = new FormData(form);
        let datosObj = convertirDatos(datosFormData);
        console.log(datosObj)
        guardarDatos(datosObj);

    })
}

function convertirDatos(datosFormData) {
    let nombre = datosFormData.get("nombre");

    return {
        "nombre": nombre, "fichas": tFichas.length, "tiempo":tiempo, "modo": sessionStorage["modo"]
    }
}

function convertirModo(seleccionActual1){
    if (seleccionActual1 == "cruz") {
        return 1;
    } else if (seleccionActual1 == "rombo") {
        return 2;
    } else if (seleccionActual1 == "tradicional"){
        return 3;
    }
}
function primeraFila(){

    let tablaPuntuacion = document.getElementById("tablaPunt");

    if (entrar) {
        let filaUno = tablaPuntuacion.insertRow(0);

        let celda0 =  filaUno.insertCell(0);
        celda0.textContent = "Posicion";
        let celda1 =  filaUno.insertCell(1);
        celda1.textContent = "Nombre";
        let celda2 =  filaUno.insertCell(2);
        celda2.textContent = "Fichas Restantes";
        let celda3 =  filaUno.insertCell(3);
        celda3.textContent = "Tiempo";
        entrar = false;
    }
    return tablaPuntuacion;
}

function rellenarPuntuacion(datosObj){
    
    let tablaPuntuacion = document.getElementById("tablaPunt");
    primeraFila();

    if (datosObj["modo"] == convertirModo(seleccionActual)) { 
        posicion++;
        let newFila = tablaPuntuacion.insertRow(-1);

        let celda =  newFila.insertCell(0);
        celda.textContent = posicion + "º";

        celda =  newFila.insertCell(1);
        celda.textContent = datosObj["nombre"];

        celda =  newFila.insertCell(2);
        celda.textContent = datosObj["fichas"];

        celda =  newFila.insertCell(3);
        celda.textContent = datosObj["tiempo"] + "s";
    }

    return tablaPuntuacion;
}

function guardarDatos(datosObj){ 

    let misDatosArray = JSON.parse(sessionStorage.getItem("partida")) || [];
    misDatosArray.push(datosObj);
    let datosArrayJSON = JSON.stringify(misDatosArray);
    sessionStorage.setItem("partida",datosArrayJSON);
    window.location.href = "index.html";
}

function ordenar(){
    if (sessionStorage.getItem("partida") != null) {
        let datos = JSON.parse(sessionStorage.getItem("partida"));
        datos.sort((o1, o2) => {
            if (o1.fichas > o2.fichas) {
                return 1;
            }
            if (o1.fichas < o2.fichas) {
                return -1;
            }
            if (o1.tiempo > o2.tiempo) {
                return 1;
            }
            if (o1.tiempo < o2.tiempo) {
                return -1;
            }
            return 0;
        });
        let datosArray = JSON.stringify(datos);
        sessionStorage.setItem("partida", datosArray);
    }
}