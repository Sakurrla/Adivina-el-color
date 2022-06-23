"use strict";

/** SELECCIONAMOS DIFICULTAD*/

const botonDificil = document.querySelector("#botonDificil");
const botonFacil = document.querySelector("#botonFacil");

botonFacil.addEventListener("click", () => {
  document.location.reload();
});

function dificil() {
  console.log("Difícil");
  const newCuadrado = document.querySelector("#colors");

  //Añadimos los nuevos DIV

  // Div1
  const newDiv = document.createElement("div");
  newDiv.className = "cuadrado";
  newDiv.textContent = "4";
  newCuadrado.append(newDiv);

  // Div2
  const newDiv2 = document.createElement("div");
  newDiv2.className = "cuadrado";
  newDiv2.textContent = "5";
  newCuadrado.append(newDiv2);

  // Div3
  const newDiv3 = document.createElement("div");
  newDiv3.className = "cuadrado";
  newDiv3.textContent = "6";
  newCuadrado.append(newDiv3);
}

botonDificil.addEventListener("click", dificil);

/** POR QUÉ NO ME PINTA LOS COLORES NUEVOS? */

/* botonDificil.addEventListener("click", () => {
  console.log("Difícil");
  const newCuadrado = document.querySelector("#colors");

  //Añadimos los nuevos DIV

  // Div1
  const newDiv = document.createElement("div");
  newDiv.className = "cuadrado";
  newDiv.textContent = "Soy cuadrado4";
  newCuadrado.append(newDiv);

  // Div2
  const newDiv2 = document.createElement("div");
  newDiv2.className = "cuadrado";
  newDiv2.textContent = "Soy cuadrado5";
  newCuadrado.append(newDiv2);

  // Div3
  const newDiv3 = document.createElement("div");
  newDiv3.className = "cuadrado";
  newDiv3.textContent = "Soy cuadrado6";
  newCuadrado.append(newDiv3);
}); */

/**Prueba para los fragmentos */
/* const ul = document.querySelector("#colors");
const colores = ["blanco", "azul", "verde"];
colores.className = "cuadrado";

const frag = document.createDocumentFragment();
frag.className = "cuadrado";

// Recorremos el array de colores y en cada vuelta creamos un li nuevo
// con el texto del color y lo añadimos al fragmento
for (const color of colores) {
  const liColor = document.createElement("div");

  liColor.textContent = color;

  frag.append(liColor);
}

frag.className = "cuadrado";

console.log(frag);

// Añadimos el fragmento con todos los li a la lista
ul.append(frag); */

/**CREAMOS LA FUNCIÓN PARA EL NÚMERO ALEATORIO */

/** Con esta función creo un array donde voy a pushear los números RGB y un número aleatorio entre 0 y 2 para añadir id*/
function getRandom(cuadradoColores) {
  const rgbArray = [];

  for (let i = 0; i < 3; i++) {
    const aleatoryNum = Math.round(Math.random() * 255);
    rgbArray.push(aleatoryNum);
  }

  //añadimos un último número aleatorio (id) para cada div
  const id = Math.floor(Math.random() * cuadradoColores.length);

  rgbArray.push(id);

  console.log(rgbArray);
  return rgbArray;
}
/** Seleccionamos los cuadrados */
const cuadradoColores = document.querySelectorAll("#colors .cuadrado");
//Recuperamos el array de getRandom()
const rgbOriginal = getRandom(cuadradoColores);

/**FUNCIÓN PRINCIPAL */
function main() {
  //Función que varía el RGB original

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

  rgbFalse(rgbOriginal);

  /** CREAMOS LOS CUADRADOS DE COLOR */

  //Recorremos los div .cuadrado

  for (const cuadrado of cuadradoColores) {
    //Le damos un estilo aleatorio a todos los div
    const arrRGBFalse = rgbFalse(rgbOriginal);

    //ASignamos el background colorfalso
    cuadrado.style.backgroundColor = `rgb(${arrRGBFalse[0]}, ${arrRGBFalse[1]}, ${arrRGBFalse[2]} )`;

    //Comprobamos si el ID del div se corresponde con el id creado en el array de rgbOriginal[3]
    if (rgbOriginal[3] === parseInt(cuadrado.id)) {
      //Cambiamos el background color de todos los cuadrados por un color aleatorio

      //Si el cuadrado que recorremos es el original le damos el color de fondo original
      console.log(rgbOriginal[3]); //Por qué no aparece este log en consola?
      cuadrado.style.backgroundColor = `rgb(${rgbOriginal[0]}, ${rgbOriginal[1]}, ${rgbOriginal[2]})`;
    }
  }

  /**CREAMOS LOS CUADRADOS RGB */
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

const startButton = document.querySelector("button");
startButton.addEventListener("click", () => {
  let totalTime = 10;

  const startInterval = setInterval(() => {
    startButton.innerHTML = totalTime;

    //cuando el contador esté a 0, limpiamos el intervalo
    if (totalTime === 0) {
      clearInterval(startInterval);
      startButton.innerHTML = "RETRY";
    }
    totalTime--;
  }, 1000);

  //Llamamos a la función main para que pinte todo
  main();
});

/** CREAMOS CONTADOR Y FUNCIÓN DE FALLOS Y ACIERTOS */
const aciertos = document.querySelector("#aciertos");
const fallos = document.querySelector("#fallos");

function acierta() {
  for (let i = 0; i <= 3; i++) {
    console.log(i);

    aciertos.textContent = i;
  }
}

acierta();

let contador = 0;

const handleClickAddButton = () => {
  if (contador <= 3) {
    const div = document.createElement("div");
    div.textContent = `😞`;
    fallos.append(li);
  }
};

/** ME FALTA:
 * 1- QUE LOS CUADRADOS CREADOS EN EL DOM TENGA BACKGROUND COLOR
 * 2- QUE SUME EN EL CONTADOR DE ACIERTOS O FALLOS CUANDO MARQUE LA OPCIÓN CORRECTA
 * 3- QUE EL CONTADOR ME VAYA SUMANDO Y NO APAREZCA DE GOLPE EL Nº FINAL
 */
