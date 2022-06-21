"use strict";

/**CREAMOS LA FUNCIÓN PARA EL NÚMERO ALEATORIO */

function getRandom() {
  const aleatoryNum = Math.round(Math.random() * 255);

  return aleatoryNum;
}



/**CREAMOS UN ARRAY PARA LOS 3 CUADRADOS Y LO ORDENAMOS DE FORMA ALEATORIA*/

const arrCuadrados = [
  document.querySelector("#color1"),
  document.querySelector("#color2"),
  document.querySelector("#color3"),
];

console.log(arrCuadrados);

arrCuadrados.sort(() => Math.random() - 0.5);
console.log(arrCuadrados);

/** CREAMOS LAS VARIABLES PARA EL COLOR VERDADERO*/
let numR = getRandom();
let numG = getRandom();
let numB = getRandom();

/**CREAMOS VARIABLES PARA LOS COLORES FALSOS */
let numRFalse1 = numR + Math.round(Math.random() * 80);
let numGFalse1 = numG - Math.round(Math.random() * 80);
let numBFalse1 = numB + Math.round(Math.random() * 80);

let numRFalse2 = numR - Math.round(Math.random() * 80);
let numGFalse2 = numG + Math.round(Math.random() * 80);
let numBFalse2 = numB + Math.round(Math.random() * 80);

/**CREAMOS LOS CUADRADOS RGB */

document.querySelector("#cuadradoR");
cuadradoR.textContent = numR;

document.querySelector("#cuadradoG");
cuadradoG.textContent = numG;

document.querySelector("#cuadradoB");
cuadradoB.textContent = numB;

/** CREAMOS LOS CUADRADOS DE COLOR */

color1.style.backgroundColor = `rgb(${numR}, ${numG}, ${numB})`;
color2.style.backgroundColor = `rgb(${numRFalse1}, ${numGFalse1}, ${numBFalse1})`;
color3.style.backgroundColor = `rgb(${numRFalse2}, ${numGFalse2}, ${numBFalse2})`;

/** POR QUÉ NO ME "BARAJA" EL DOM? */

/** INTENTO CREAR EL CONTADOR REGRESIVO PERO NO LO CONSIGO */

/* window.onload = updateClock;

let totalTime = 10;
function updateClock() {
  document.querySelector("button").innerHTML = totalTime;
  if (totalTime == 0) {
    /**CÓDIGO DE ANOTAR UN FALLO 
  } else {
    totalTime -= 1;
    setTimeout("updateClock()", 1000);
  }
}

const boton = document.querySelector("button");
boton.addEventListener("click", updateClock());
 */
