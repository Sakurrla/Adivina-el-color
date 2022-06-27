"use strict";

/** HACEMOS TODA LA SELECCIÓN DE ELEMENTOS*/
const colores = document.querySelector("#colors");
const startButton = document.querySelector("button");
const aciertos = document.querySelector("#aciertos");
const fallos = document.querySelector("#fallos");
const contador = document.querySelector("#contador");
const cuadradoColores = document.querySelectorAll("#colors .cuadrado");
const aJugar = document.querySelector("#dificultad");

/** DECLARAMOS LAS VARIABLES CON LAS QUE TRABAJAREMOS */
let contadorAciertos = 0;
let contadorFallos = 0;

let startInterval;
let totalTime = 10;

//Recuperamos el array de getRandom(), para poder seleccionar color R, color G, color B y la id.
const rgbOriginal = getRandom(cuadradoColores);
const rgbVerdadero = `rgb(${rgbOriginal[0]}, ${rgbOriginal[1]}, ${rgbOriginal[2]})`;

botonFacil.addEventListener("click", () => {
  aJugar.textContent = "¡PREPÁRATE Y DALE A START!";
});

function dificil() {
  for (let i = 3; i <= 5; i++) {
    const falso = rgbFalse(rgbOriginal);
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", i);
    newDiv.className = "cuadrado";
    colores.append(newDiv);
    aJugar.textContent =
      "¿ACEPTAS EL DESAFÍO? ¡DALE A START Y DEMUESTRA LO QUE VALES!";
  }
}

botonDificil.addEventListener("click", () => {
  const falso = rgbFalse(rgbOriginal);
  dificil(rgbOriginal, falso);
});

/**Creamos función para número aleatorio */
function getRandom(cuadradoColores) {
  // Con esta función creamos un array donde vamos a pushear los números RGB y un número aleatorio entre 0 y 2 para añadir id
  const rgbArray = [];

  for (let i = 0; i < 3; i++) {
    const aleatoryNum = Math.round(Math.random() * 255);
    rgbArray.push(aleatoryNum);
  }

  //Añadimos un último número aleatorio (id) para cada div
  const id = Math.floor(Math.random() * cuadradoColores.length);
  rgbArray.push(id);
  return rgbArray;
}

/** Creamos la función donde sumaremos o restaremos números diferentes para los colores falsos */
function rgbFalse(rgbOriginal) {
  const rgbFalse = [];
  for (let i = 0; i < rgbOriginal.length - 1; i++) {
    const numero = Math.round(Math.random() * 50);
    const esSuma = Math.round(Math.random());

    if (esSuma === 0 && rgbOriginal[i] > 55) {
      //si suma es 0 interpretamos que va a restar
      rgbFalse.push(rgbOriginal[i] - numero);
    } else if (esSuma === 1 && rgbOriginal[i] <= 205) {
      //si suma es 1 se lo sumamos al valor original
      rgbFalse.push(rgbOriginal[i] + numero);
    } else if (esSuma === 0) {
      //como no podía restarlo antes porque podíamos tener un número negativo, lo sumamos
      rgbFalse.push(rgbOriginal[i] + numero);
    } else {
      //Si no se ha podido sumar el número antes, lo restamos
      rgbFalse.push(rgbOriginal[i] - numero);
    }
  }
  return rgbFalse;
}

/** Creamos la función de la cuenta regresiva */
function cuentaAtras() {
  totalTime = 10;
  startInterval = setInterval(() => {
    startButton.innerHTML = totalTime;
    //cuando el contador esté a 0, limpiamos el intervalo
    if (totalTime === 0) {
      clearInterval(startInterval);
      startButton.textContent = "RETRY";
      contadorFallos++;
      fallos.textContent = contadorFallos;
    }
    totalTime--;
  }, 1000);

  if (contadorFallos === 3) {
    contador.textContent = `PRUEBA OTRA VEZ...`;
    clearInterval(startInterval);
    setInterval(() => {
      document.location.reload();
    }, 1500);
  }
}

/**Creamos la función principal con la que "pintaremos" el juego */
function main() {
  //Selecciono los div con propiedad cuadrado, en este caso son los cuadrado de colores
  const cuadradoColores = document.querySelectorAll("#colors .cuadrado");
  //Recuperamos el array de getRandom(), para poder seleccionar color R, color G, color B y la id.
  const rgbOriginal = getRandom(cuadradoColores);

  /** Por qué no funciona si no declaro las líneas 89 y 91 en ámbito local??? */

  //Recorremos los div .cuadrado
  for (const cuadrado of cuadradoColores) {
    //Le damos un estilo aleatorio a todos los div
    const arrRGBFalse = rgbFalse(rgbOriginal);

    //Cambiamos el background color de todos los cuadrados por un color falso aleatorio
    cuadrado.style.backgroundColor = `rgb(${arrRGBFalse[0]}, ${arrRGBFalse[1]}, ${arrRGBFalse[2]} )`;

    //Comprobamos si el ID del div se corresponde con el id creado en el array de rgbOriginal[3]
    if (rgbOriginal[3] === parseInt(cuadrado.id)) {
      //Si el cuadrado que recorremos es el original le damos el color de fondo verdadero
      console.log(rgbOriginal[3]);
      cuadrado.style.backgroundColor = rgbVerdadero;
    }
  }

  /**CREAMOS LOS CUADRADOS RGB y los seleccionamos */
  let numR = rgbOriginal[0];
  let numG = rgbOriginal[1];
  let numB = rgbOriginal[2];

  document.querySelector("#cuadradoR");
  cuadradoR.textContent = numR;

  document.querySelector("#cuadradoG");
  cuadradoG.textContent = numG;

  document.querySelector("#cuadradoB");
  cuadradoB.textContent = numB;
}

/**Creamos función para empezar la partida */
startButton.addEventListener("click", () => {
  cuentaAtras();
  main();
  aJugar.textContent = "¡ADELANTE!";
});

/**Creamos el evento de click para seleccionar un cuadrado */
colores.addEventListener("click", (event) => {
  // Si hago click sobre un elemento con la propiedad cuadrado, limpio el intervalo que es la cuenta regresiva (funciona bien)
  if (event.target.matches(".cuadrado")) {
    clearInterval(startInterval);
    startButton.textContent = "RETRY";
    const rgbTarget = event.target.style.backgroundColor;
    const rgbOrigi = rgbVerdadero;

    if (rgbTarget === rgbOrigi) {
      contadorAciertos++;
      aciertos.textContent = contadorAciertos;
    } else {
      contadorFallos++;
      fallos.textContent = contadorFallos;
    }
    
    if (contadorAciertos === 3) {
      contador.textContent = `¡HAS GANADO!`;
      clearInterval(startInterval);
      setInterval(() => {
        document.location.reload();
      }, 1500);
    } else if (contadorFallos === 3) {
      contador.textContent = `PRUEBA OTRA VEZ...`;
      clearInterval(startInterval);
      setInterval(() => {
        document.location.reload();
      }, 1500);
    }
  }
});