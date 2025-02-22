/*VERSIONCUATRO 29-11: esta versión tiene el movimiento fluido (+ comentarios), el fondo-skatepark-test.png (TEST), ajustes de la música y los 4 treats. Se puede pausar con "P" y resetear con "R" */

//PODRIA limitar los valores a los de prueba-minima.js
//HAYQUE limitar el movimiento de goofy dentro del canvas (sobrepasa el límite izquierdo del canvas al retroceder), ubicar el texto "skate" por encima de las demás capas, hacer los arrays de treats y obstáculos y sortearlos, agregarle el fondo de recorte de papel a los treats y obstáculos

//canvas
let canvas;
let ctx;

//font
let fuente = new FontFace('Flood', "url(fonts/Flood.otf) format('opentype')");
document.fonts.add(fuente);
fuente.load().then(tft);

//juego
let vidas = 5;
let puntos = 0;
let score = 0;
let x = 0;
let y = 0;
let gravedad = 1;
let velocidad = 4;
let saltando = false;
let carrilesY = [100, 200];
let carrilesX = [1300, 1000, 800];
let carrilObstaculo = [1300, 800];
let dificultad = 1000 / 60;
let inicio = false;
let fin = false;
let pausado = false;
let placaInicio = false;
let controles = false;
let instruccionesGoofy = false;
let instruccionesObstaculos = false;
let instruccionesSkatepark = false;
let ganaste;

//variables iniciales del personaje
let altoGoofy = 150;
let anchoGoofy = 147 / 2;
let posXGoofy = 200;
let posYGoofy = 400;

//incremento de velocidad
let factorVelocidad = 1;

//capas del fondo
let posicionFaroles = 0;
let posicionFondo1 = 0;
let posicionFondo2 = 0;
let posicionFondo3 = 0;
let posicionFondo4 = 0;

//imagenes
let imgGoofy = new Image();
let imgEnergizante = new Image();
let imgRemera = new Image();
let imgAerosol = new Image();
let imgZapatillas = new Image();
let imgCono = new Image();
let imgTacho = new Image();
let imgBotonInicio = new Image();
imgBotonInicio.src = "img/boton-jugar.png"
let imgBotonInicio2 = new Image();
imgBotonInicio2.src = "img/boton-jugar-2.png"
let imgBotonFlecha = new Image();
imgBotonFlecha.src = "img/boton-flecha.png"
let imgBotonFlecha2 = new Image();
imgBotonFlecha2.src = "img/boton-flecha-2.png"
let imgPlacaInicio = new Image();
imgPlacaInicio.src = "img/placa-inicio.png"
let imgFinalGanador = new Image();
imgFinalGanador.src = "img/final-ganador.png"
let imgFinalPerdedor = new Image();
imgFinalPerdedor.src = "img/final-perdedor.png"
let imgBotonNuevo = new Image();
imgBotonNuevo.src = "img/boton-jugar-de-nuevo-3.png"
let imgBotonNuevo2 = new Image();
imgBotonNuevo2.src = "img/boton-jugar-de-nuevo-2.png"
let imgControles = new Image();
imgControles.src = "img/placa-controles.png"
let imgInstruccionesGoofy = new Image();
imgInstruccionesGoofy.src = "img/placa-juego-goofy.png"
let imgInstruccionesObstaculos = new Image();
imgInstruccionesObstaculos.src = "img/placa-obstaculos.png"
let imgInstruccionesSkatepark = new Image();
imgInstruccionesSkatepark.src = "img/placa-skatepark.png"
let imgFaroles = new Image();

//goofy, treats, obstaculos y faroles
let goofy = new Personaje(imgGoofy, posXGoofy, posYGoofy, anchoGoofy, altoGoofy);
let energizante = new Elemento(imgEnergizante, 820, 200, 30, 50, "energizante");
let aerosol = new Elemento(imgAerosol, 820, 200, 30, 60, "aerosol");
let zapatillas = new Elemento(imgZapatillas, 820, 200, 60, 60, "zapatillas");
let remera = new Elemento(imgRemera, 820, 200, 60, 70, "remera");
let cono = new Elemento(imgCono, 500, 330, 60, 100, "obstaculo");
let tacho = new Elemento(imgTacho, 700, 330, 70, 110, "obstaculo");
let faroles = new Capa(imgFaroles, posicionFaroles, 10, 24000, 450) //h=450

//audio
audioGolpe = new Audio();
audioGolpe.src = "audios/golpe.mp3";
audioEnergizante = new Audio();
audioEnergizante.src = "audios/energizante.mp3";
audioRemera = new Audio();
audioRemera.src = "audios/remera.mp3";
audioAerosol = new Audio();
audioAerosol.src = "audios/aerosol.mp3";
audioZapatillas = new Audio();
audioZapatillas.src = "audios/zapatillas.mp3";
audioSalto = new Audio();
audioSalto.src = "audios/salto.mp3";
audioPatina = new Audio();
audioPatina.src = "audios/patina.mp3";
audioMusica = new Audio();
audioMusica.src = "audios/musica.mp3";
audioGanaste = new Audio();
audioGanaste.src = "audios/ganaste.mp3";
audioCaida = new Audio();
audioCaida.src = "audios/caida.mp3";
audioPerdedor = new Audio();
audioPerdedor.src = "audios/perdedor.mp3";
audioInstrucciones = new Audio();
audioInstrucciones.src = "audios/instrucciones.mp3";
audioClick = new Audio();
audioClick.src = "audios/click.mp3";
audioGolpe.volume = 0.3;
audioEnergizante.volume = 0.3;
audioRemera.volume = 0.7;
audioAerosol.volume = 0.5;
audioZapatillas.volume = 1;
audioSalto.volume = 0.5;
audioPatina.volume = 0.2;
audioMusica.volume = 0.2;
audioGanaste.volume = 0.2;
audioCaida.volume = 0.2;
audioPerdedor.volume = 0.3;
audioInstrucciones.volume = 0.2;
audioClick.volume = 0.5;

function tft() {
    canvas = document.getElementById("canvas");
    canvas.style.backgroundImage = "url(img/fondo-skatepark-test.png),url(img/fondo-02.png),url(img/fondo-03.png),url(img/fondo-04.png)";
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = "left";
    ctx = canvas.getContext("2d");
    dibujarInicio();
    audioSalto.pause();
    /*controles = false;*/
};

//dibujar placa del inicio
function dibujarInicio() {
    borrar();
    ctx.drawImage(imgPlacaInicio, 0, 0);
    ctx.drawImage(imgBotonInicio, 350, 275, 100, 60);
    placaInicio = true;
};

//dibujar placa de intrucciones goofy
function dibujarInstruccionesGoofy() {
    borrar();
    ctx.drawImage(imgInstruccionesGoofy, 0, 0);
    ctx.drawImage(imgBotonFlecha, 740, 385, 40, 50);
    instruccionesGoofy = true;
    placaInicio = false;
};

//dibujar placa de intrucciones obstaculos
function dibujarInstruccionesObstaculos() {
    borrar();
    ctx.drawImage(imgInstruccionesObstaculos, 0, 0);
    ctx.drawImage(imgBotonFlecha, 740, 385, 40, 50);
    instruccionesObstaculos = true;
    instruccionesGoofy = false;
};

//dibujar placa de intrucciones skatepark
function dibujarInstruccionesSkatepark() {
    borrar();
    ctx.drawImage(imgInstruccionesSkatepark, 0, 0);
    ctx.drawImage(imgBotonFlecha, 740, 385, 40, 50);
    instruccionesSkatepark = true;
    instruccionesObstaculos = false;
};

//dibujar placa de controles
function dibujarControles() {
    borrar();
    ctx.drawImage(imgControles, 0, 0);
    ctx.drawImage(imgBotonInicio, 570, 100, 100, 60);
    controles = true;
    instruccionesSkatepark = false;
};

function juego() {

    inicio = true;
    placaInicio = false;
    controles = false;
    audioInstrucciones.pause();
    borrar();
    requestAnimationFrame(juego);

    canvas = document.getElementById("canvas");
    canvas.style.backgroundImage = "url(img/fondo-skatepark-test.png),url(img/fondo-02.png),url(img/fondo-03.png),url(img/fondo-04.png)";
    canvas.style.backgroundSize = "cover";
    /*canvas.style.position = "absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto";*/
    ctx = canvas.getContext("2d");

    //dibujar
    imgFaroles.src = "img/faroles-largo.png";
    imgFaroles.onload = function () {
        faroles.dibujar();
    };

    imgGoofy.src = "img/sprite.png";
    imgGoofy.onload = function () {
        goofy.dibujar();
    };

    imgEnergizante.src = "img/energizante.png";
    imgEnergizante.onload = function () {
        energizante.dibujar();
    };

    imgRemera.src = "img/remera.png";
    imgRemera.onload = function () {
        remera.dibujar();
    };

    imgAerosol.src = "img/aerosol.png";
    imgAerosol.onload = function () {
        aerosol.dibujar();
    };

    imgZapatillas.src = "img/zapatillas.png";
    imgZapatillas.onload = function () {
        zapatillas.dibujar();
    };

    imgCono.src = "img/cono.png";
    imgCono.onload = function () {
        cono.dibujar();
    };

    imgTacho.src = "img/tacho.png";
    imgTacho.onload = function () {
        tacho.dibujar();
    };

    if (pausado == false) {
        if (inicio == true) {

            //incrementa la velocidad
            factorVelocidad += 0.0015;

            //mover las capas del fondo y los faroles
            posicionFaroles -= 6 * factorVelocidad;
            posicionFondo1 -= 5 * factorVelocidad;
            posicionFondo2 -= 3 * factorVelocidad;
            posicionFondo3 -= 2 * factorVelocidad;
            posicionFondo4 -= 1 * factorVelocidad;

            canvas.style.backgroundPosition = posicionFondo1 + "px 0px," + posicionFondo2 + "px 0px," + posicionFondo3 + "px 0px," + posicionFondo4 + "px 0px";

            //musica
            audioMusica.play();

            //mover los treats y los obstáculos de derecha a izquierda
            energizante.mover();
            remera.mover();
            aerosol.mover();
            zapatillas.mover();
            cono.mover();
            tacho.mover();

            //mover el personaje siempre en y
            goofy.velocidad += gravedad;
            goofy.y += goofy.velocidad;

            //En lugar de tocar la posicion en x dentro de avanzar o retroceder lo hago aca, de acuerdo a una velocidad. Si es cero queda igual, si es positivo avanza y si es negativo retrocede.
            goofy.x += goofy.vx

            //logica para devolver a goofy al suelo
            if (goofy.y > 400 - goofy.alto) {//470 es el suelo
                if (goofy.saltando) { //salto caída solo cuando está en el suelo
                    audioCaida.play();
                };
                goofy.velocidad = 0; //que no tenga más impulso
                goofy.y = 400 - goofy.alto; //reubico al personaje en y
                goofy.saltando = false;
                audioPatina.play();
            } else {
                audioPatina.pause();
            };

            //chequear si los Elementos colisionan con goofy
            energizante.colisionar();
            remera.colisionar();
            aerosol.colisionar();
            zapatillas.colisionar();
            cono.colisionar();
            tacho.colisionar();

            //borrar todo lo que está dentro del canvas
            borrar();

            //redibujar todo
            dibujarTexto();
            goofy.dibujar();
            energizante.dibujar();
            remera.dibujar();
            aerosol.dibujar();
            zapatillas.dibujar();
            cono.dibujar();
            tacho.dibujar();
            faroles.dibujar();

            //PERDISTE
        } if (vidas < 1) {
            audioPerdedor.play();
            fin = true;
            pausado = true;
            ganaste = false;
            //GANASTE
        } if (posicionFondo1 <= -15400) {
            audioGanaste.play();
            fin = true;
            pausado = true;
            ganaste = true;
        };

    } else if (fin == true) {
        //cuando el juego llegó a su fin se pausa y se dibuja el final
        dibujarFinal();
    } else {
        //cuando el juego no llegó todavía a su fin solamente se pausa
        pausar();
    };
};

//sortear treats y obstáculos
energizante.sortear();
remera.sortear();
aerosol.sortear();
zapatillas.sortear();
cono.sortear();
tacho.sortear();

//dibujar puntaje y "skate" durante el juego
function dibujarTexto() {
    ctx.font = "30px Flood";
    ctx.fillStyle = "#3bb22e";
    ctx.fillText("Treats: " + puntos, 330, 40);
    ctx.font = "30px Flood";
    ctx.fillStyle = "#fff";
    ctx.fillText("Treats: " + puntos, 332, 42);
    if (vidas < 1) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("Skate", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("Skate", 252, 252);
    } else if (vidas == 1) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("Skat", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("Skat", 252, 252);
    } else if (vidas == 2) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("Ska", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("Ska", 252, 252);
    } else if (vidas == 3) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("Sk", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("Sk", 252, 252);
    } else if (vidas == 4) {
        ctx.font = "100px Flood";
        ctx.fillStyle = "#eb5396";
        ctx.fillText("S", 250, 250);
        ctx.fillStyle = "#000";
        ctx.fillText("S", 252, 252);
    };
};

//dibujar placa según ganaste o perdiste
function dibujarFinal() {
    if (vidas < 1) {
        //PERDISTE
        borrar();
        ctx.drawImage(imgFinalPerdedor, 0, 0);
        ctx.drawImage(imgBotonNuevo, 320, 300, 150, 80);
        ctx.font = "20px Flood";
        ctx.fillStyle = "#FFF";
        ctx.fillText("puntos: " + puntos, 340, 150);

        /*audioMusica.pause();*/
        audioPatina.pause();
        audioSalto.pause();
    } else {
        //GANASTE
        borrar();

        ctx.drawImage(imgFinalGanador, 0, 0);
        ctx.drawImage(imgBotonNuevo, 320, 300, 150, 80);
        ctx.font = "20px Flood";
        ctx.fillStyle = "#FFF";
        ctx.fillText("puntos: " + puntos, 340, 145);

        audioMusica.pause();
        audioPatina.pause();
        audioSalto.pause();
    };
};

//borrar
function borrar() {
    ctx.clearRect(x, y, canvas.width, canvas.height);
};

//pausar
function pausar() {
    borrar();
    pausado = true;

    canvas.style.opacity = 0.7;
    ctx.font = "40px Flood";
    ctx.fillStyle = "#fff";
    ctx.fillText("Pausa", 325, 250);
    ctx.font = "40px Flood";
    ctx.fillStyle = "#000";
    ctx.fillText("Pausa", 327, 252);

    audioMusica.pause();
    audioEnergizante.pause();
    audioRemera.pause();
    audioAerosol.pause();
    audioZapatillas.pause();
    audioGolpe.pause();
    audioSalto.pause();
    audioCaida.pause();
    audioPatina.pause();
};

//reanudar
function reanudar() {
    borrar();
    pausado = false;
    canvas.style.opacity = 1;
};

//reset
function reset() {
    borrar();
    reanudar();
    audioGanaste.pause();
    posicionFaroles = 0;
    posicionFondo1 = 0;
    posicionFondo2 = 0;
    posicionFondo3 = 0;
    posicionFondo4 = 0;
    vidas = 5;
    puntos = 0;
    x = 0;
    y = 0;
    gravedad = 1;
    velocidad = 4;
    saltando = false;
    goofy.x = 200;
    goofy.y = 400;
    factorVelocidad = 1;
    fin = false;
    energizante.sortear();
    remera.sortear();
    aerosol.sortear();
    zapatillas.sortear();
    cono.sortear();
    tacho.sortear();
};

//faroles
function Capa(img, x, y, ancho, alto) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;

    this.dibujar = function () {
        ctx.drawImage(imgFaroles, posicionFaroles, this.y, this.ancho, this.alto);
    }
}

//funciones de goofy
function Personaje(img, x, y, ancho, alto) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.velocidad = 0;
    this.posicion = 0;
    this.saltando = false;//arranca quieto, sin saltar
    this.anchoRecorte = ancho;
    this.altoRecorte = alto;
    //Lo que necesitan es una variable para la velocidad que se va a ir pisando. Puede ser un atributo de goofy, o una variable global.
    this.vx = 0;
    /*TEST fluidez (intenté hacerlo con this. a pesar de que en 01_movimientos están dentro de la function juego() porque los consideré atributos específicos del Personaje y no como variables generales del juego)
    this.vxl = -10; (l es de left, para que no compartan la misma variable en x y evitar que se atasquen)
    this.vxr = 10; (lo mismo pero con r de right)
    this.x += this.vxl;
    this.x += this.vxy;*/

    //métodos

    //dibujar a goofy
    this.dibujar = function () {
        ctx.drawImage(
            imgGoofy,
            this.posicion * this.ancho, //donde empieza el recorte en x
            0, //donde empieza el recorte en y
            this.anchoRecorte, //ancho del recorte
            this.altoRecorte,//alto del recorte
            this.x,//ubicacion del personaje en x
            this.y,//ubicacion del personaje en y
            this.ancho,//ancho de la imagen
            this.alto //alto de la imagen
        );
    };
    //avanzar (ir hacia la derecha)
    this.avanzar = function () {
        this.posicion = 0;
        if (this.x < 720) {
            //antes: this.x += 5;
            //si avanzo aplico una velocidad en positivo
            this.vx = 5;
            //prefiero que no mueva al fondo
            /*posicionFondo1 -= 2;
            posicionFondo2 -= 3;
            posicionFondo3 -= 4;
            posicionFondo4 -= 5;*/
        } else {
            this.vx = 0;
        };
    };
    //retroceder (ir hacia la izquierda)
    this.retroceder = function () {
        this.posicion = 1;
        if (this.x > 0) {
            //antes: this.x -= 5;
            //si retrocedo aplico la velocidad en negativo
            this.vx = -10
            //prefiero que no mueva al fondo
            /*posicionFondo1 += 2;
            posicionFondo2 += 3;
            posicionFondo3 += 4;
            posicionFondo4 += 5;*/
        } else {
            this.vx = 0;
        };
    };
    //bajar
    this.bajar = function () {
        this.alto = 150;
        this.y = 400;
    };
    //saltar
    this.saltar = function () {
        //si no está saltando, entonces salta y la velocidad aminora
        if (this.saltando == false) {
            this.saltando = true;
            this.velocidad -= velocidad * 5;
            audioSalto.play();
            //si está sobre el piso, entonces no salta y la velocidad se mantiene en 0
        } else if (this.y == 340) { //340 es el piso
            this.saltando = false;
            this.velocidad = 0;
        };
    };
};

//funciones de los treats y obstaculos
function Elemento(img, x, y, ancho, alto, tipo) {
    //atributos
    this.img = img;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.tipo = tipo;

    //métodos

    //dibujar
    this.dibujar = function () {
        ctx.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
    };

    //sumar de a 5 px la ubicacion en x hasta que sea = -100
    this.mover = function () {
        if (this.x > -100) {
            this.x -= 5 * factorVelocidad;
            //si la x de los Elementos es menor a -100, entonces se sortea su valor
        } else {
            this.sortear();
        };
    };

    //sortear los valores de x e y de los Elementos
    this.sortear = function () {
        if (this.tipo == "obstaculo") {
            //fórmula: Math.floor(Math.random() * (max - min + 1))+ min;
            this.x = carrilObstaculo[Math.floor(Math.random() * 2)];
            //uno de los 2 valores posibles del array de carriles, porque quiero que aparezcan unicamente en 2 posibles alturas: alta y media
        } else {
            this.x = carrilesX[Math.floor(Math.random() * 3)];
            this.y = carrilesY[Math.floor(Math.random() * 2)];
        };
    };

    //colisionar
    this.colisionar = function () {
        //aca vamos a evaluar, si colisiona y por tipo de elemento, sumar puntos o restar vidas
        if (
            (this.x > goofy.x - this.ancho)
            && (this.x < goofy.x + goofy.ancho)
            && (this.y > goofy.y - this.alto)
            && (this.y < goofy.y + goofy.alto)
        ) {
            //si es un treat, entonces sumar 10 puntos más a lo acumulado y reproducir audio de puntaje. como cada uno tiene su audio van separados. si es un obstáculo restar una vida y reproducir audio de golpe
            if (this.tipo == "energizante") {
                puntos += 10;
                audioEnergizante.play();
            } else if (this.tipo == "remera") {
                puntos += 10;
                audioRemera.play();
            } else if (this.tipo == "aerosol") {
                puntos += 10;
                audioAerosol.play();
            } else if (this.tipo == "zapatillas") {
                puntos += 10;
                audioZapatillas.play();
            } else if (this.tipo == "obstaculo") {
                vidas--;
                audioGolpe.play();
            }
            //volver a sortear los elementos con los que goofy colisiona, para que se borren del canvas y reaparezcan en una nueva posición
            this.sortear();
        };
    };
};

//listener para teclas apretadas
document.addEventListener("keydown", function (e) {
    if (e.key == "ArrowUp") {
        goofy.saltar();
    };
    if (e.key == "ArrowDown") {
        goofy.bajar();
    };
    if (e.key == "ArrowLeft") {
        goofy.retroceder();
    };
    if (e.key == "ArrowRight") {
        goofy.avanzar();
    };
    //salto con barra espaciadora
    if (e.key == " " && inicio == true) {
        goofy.saltar();
    };
});

//listener para teclas levantadas
//agrego que al soltar las teclas de movimiento la velocidad en x vuelva a cero, asi se detiene el movimiento.
document.addEventListener("keyup", function (e) {
    if (e.key == "ArrowDown") {//goofy desciende del salto
        goofy.alto = altoGoofy;
        goofy.y = posYGoofy;
    };
    // volver a cero
    if (e.key == "ArrowLeft") {
        goofy.vx = 0;
    };
    if (e.key == "ArrowRight") {
        goofy.vx = 0;
    };
    //botón de pausa
    if (e.key == "p" && pausado == true && inicio == true && fin == false) {
        reanudar();
    } else if (e.key == "p" && pausado == false && inicio == true && fin == false) {
        pausar();
    } else if (e.key == "p" && (inicio == false || fin == true)) {
        console.log("No puedes pausar en las placas :)")
    };
    //boton de reset
    if (e.key == "r" && inicio == true) {
        reset();
    };
    //avanzar por las placas y presionar botones con tecla Enter o barra espaciadora
    if (e.key == "Enter" || e.key == " ") {
        if (placaInicio == true) { //de placa inicio a instrucciones goofy
            dibujarInstruccionesGoofy();
            audioInstrucciones.play();
        } else if (instruccionesGoofy == true) { //de instrucciones goofy a instrucciones obstaculos
            dibujarInstruccionesObstaculos();
        } else if (instruccionesObstaculos == true) { //de instrucciones obstaculos a instrucciones skatepark
            dibujarInstruccionesSkatepark();
        } else if (instruccionesSkatepark == true) { //de instrucciones skatepark a  instrucciones controles
            dibujarControles();
        } else if (controles == true) { //de controles al juego
            tft();
            juego();
        } else if (fin == true) { //al llegar al fin, reiniciar
            reset();
        }
    };
});

//listener para click
document.addEventListener('click', function (e) {
    console.log("X:" + e.x + "Y:" + e.y);
    //de placa inicio a instrucciones goofy
    if (placaInicio == true && (e.x > 715 && e.x < 815 && e.y > 355 && e.y < 415)) {
        dibujarInstruccionesGoofy();
        audioInstrucciones.play();
    } else if (instruccionesGoofy == true && (e.x > 1110 && e.x < 1145 && e.y > 465 && e.y < 515)) { //de instrucciones goofy a instrucciones obstaculos
        dibujarInstruccionesObstaculos();
    } else if (instruccionesObstaculos == true && (e.x > 1110 && e.x < 1145 && e.y > 465 && e.y < 515)) { //de instrucciones obstaculos a instrucciones skatepark
        dibujarInstruccionesSkatepark();
    } else if (instruccionesSkatepark == true && (e.x > 1110 && e.x < 1145 && e.y > 465 && e.y < 515)) { //de instrucciones skatepark a instrucciones controles
        dibujarControles();
    } else if (controles == true && (e.x > 940 && e.x < 1035 && e.y > 175 && e.y < 240)) { //de controles al juego
        tft();
        juego();
    } else if (fin == true && ganaste == false && (e.x > 685 && e.x < 840 && e.y > 380 && e.y < 465)) { //al perder o ganar, reiniciar
        reset();
    } else if (fin == true && ganaste == true && (e.x > 685 && e.x < 840 && e.y > 380 && e.y < 465)) { //al perder o ganar, reiniciar
        reset();
        audioMusica.currentTime = 0;
    } else if (inicio == true){
        goofy.saltar();
    };
});

//listener para hover
document.addEventListener('mousemove', function (e) {
    //de placa inicio a instrucciones goofy
    if (placaInicio == true) {
        if (e.x > 715 && e.x < 815 && e.y > 355 && e.y < 415) {
            canvas.style.cursor = "pointer";
            ctx.drawImage(imgBotonInicio2, 350, 275, 100, 60);
        } else {
            canvas.style.cursor = "default";
            borrar();
            ctx.drawImage(imgPlacaInicio, 0, 0);
            ctx.drawImage(imgBotonInicio, 350, 275, 100, 60);
        };
    } else if (instruccionesGoofy == true || instruccionesObstaculos == true || instruccionesSkatepark == true) {
        if (e.x > 1110 && e.x < 1145 && e.y > 465 && e.y < 515) { //entre placas de instrucciones
            canvas.style.cursor = "pointer";
            ctx.drawImage(imgBotonFlecha2, 740, 385, 40, 50);
        } else {
            canvas.style.cursor = "default";
            ctx.drawImage(imgBotonFlecha, 740, 385, 40, 50);
        };
    } else if (controles == true) {
        if (e.x > 940 && e.x < 1035 && e.y > 175 && e.y < 240) {//de placa de controles al juego
            canvas.style.cursor = "pointer";
            ctx.drawImage(imgBotonInicio2, 570, 100, 100, 60);
        } else {
            canvas.style.cursor = "default";
            ctx.drawImage(imgBotonInicio, 570, 100, 100, 60);
        };
    } else if (fin == true) { //al perder o ganar
        if (e.x > 685 && e.x < 840 && e.y > 380 && e.y < 465) {
            canvas.style.cursor = "pointer";
            /*ctx.drawImage(imgFinalPerdedor, 30, 20);*/
            borrar();
            ctx.drawImage(imgBotonNuevo2, 320, 300, 150, 80);
        } else {
            console.log("Hola!");
            canvas.style.cursor = "default";
            borrar();
            /*ctx.drawImage(imgFinalPerdedor, 30, 20);*/
            ctx.drawImage(imgBotonNuevo2, 320, 300, 150, 80);
        };
    } else if (inicio == true) { //durante el juego
        canvas.style.cursor = "default";
    };
});

document.addEventListener("mouseup", function (e) {
    if (placaInicio == true && (e.x > 715 && e.x < 815 && e.y > 355 && e.y < 415)) {
        audioClick.play();
    } else if (instruccionesGoofy == true && (e.x > 1110 && e.x < 1145 && e.y > 465 && e.y < 515)) {
        audioClick.play();
    } else if (instruccionesObstaculos == true && (e.x > 1110 && e.x < 1145 && e.y > 465 && e.y < 515)) {
        audioClick.play();
    } else if (instruccionesSkatepark == true && (e.x > 1110 && e.x < 1145 && e.y > 465 && e.y < 515)) {
        audioClick.play();
    } else if (controles == true && (e.x > 940 && e.x < 1035 && e.y > 175 && e.y < 240)) {
        audioClick.play();
    } else if (fin == true && (e.x > 685 && e.x < 840 && e.y > 380 && e.y < 465)) {
        audioClick.play();
    };
    /*
    ctx.drawImage
    /*if (e.x>385 && e.x<415 && e.y>465 && e.y< 515){
    }
}*/
});

//local storage

/*if (localStorage){
    localStorage.setItem("currentScore", puntos);
};

if (localStorage){
    let score = localStorage.getItem("currentScore")
}*/