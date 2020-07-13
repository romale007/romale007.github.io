"use strict";
 
// ОБРАЩАЕМСЯ К ГЛОБАЛЬНОМУ АУДИО-КОНТЕКСТУ

var AudioContext = window.AudioContext || window.webkitAudioContext; 
let audioCtx = new AudioContext();   

//  МАССИВ В КОТОРЫЙ БУДЕТ ПОМЕЩАТЬСЯ ЧАСТОТА ИЗ dataset АКТИВНОГО ЭЛЕМЕНТА

let oscList = []; 


// СОЗДАЁМ КЛАСС НОТА СО СВОЙСТВАМИ: ЧАСТОТА, НАЗВАНИЕ КЛАВИШИ, КОД КЛАВИШИ

class Note {
  constructor(freq, keyName, keyCode) {
    
    this.freq = freq;
    this.keyName = keyName;
    this.keyCode = keyCode;
    }

}

// СОЗДАЁМ ОБЪЕКТЫ - НОТЫ

const C4 = new Note(261.63, "Q", "KeyQ");
const Db4 = new Note(277.18, "2", "Digit2");
const D4 = new Note(293.66, "W", "KeyW");
const Eb4 = new Note(311.13, "3", "Digit3");
const E4 = new Note(329.63, "E", "KeyE");
const F4 = new Note(349.23, "R", "KeyR");
const Gb4 = new Note(369.99, "5", "Digit5");
const G4 = new Note(392.00, "T", "KeyT");
const Ab4 = new Note(415.30, "6", "Digit6");
const A4 = new Note(440.00, "Y", "KeyY");
const Bb4 = new Note(466.16, "7", "Digit7");
const B4 = new Note(493.88, "U", "KeyU");

const C5 = new Note(523.25, "V", "KeyV");   
const Db5 = new Note(554.37, "G", "KeyG");
const D5 = new Note(587.33, "B", "KeyB");
const Eb5 = new Note(622.25, "H", "KeyH");
const E5 = new Note(659.26, "N", "KeyN");
const F5 = new Note(698.46, "M", "KeyM");
const Gb5 = new Note(739.99, "K", "KeyK");
const G5 = new Note(783.99 , "<", "Comma");
const Ab5 = new Note(830.61 , "L", "KeyL");
const A5 = new Note(880.00, ">", "Period");
const Bb5 = new Note(932.33, ";", "Semicolon");
const B5 = new Note(987.77, "/", "Slash");


// СОЗДАЁМ МАССИВЫ СО СВОЙСТВАМИ ОБЪЕКТОВ, ДЛЯ ПРИВЯЗКИ В dataset ЭЛЕМЕНТОВ

//ЧАСТОТЫ

let whiteNotesFrequencies = [C4.freq, D4.freq, E4.freq, F4.freq, G4.freq, A4.freq, B4.freq,
                             C5.freq, D5.freq, E5.freq, F5.freq, G5.freq, A5.freq, B5.freq,];

let blackNotesFrequencies = [Db4.freq, Eb4.freq, 0, Gb4.freq, Ab4.freq, Bb4.freq, 0,
                            Db5.freq, Eb5.freq, 0, Gb5.freq, Ab5.freq, Bb5.freq,];
//НАЗВАНИЯ КЛАВИШ
let whiteNotesKeyNames = [C4.keyName, D4.keyName, E4.keyName, F4.keyName, G4.keyName, A4.keyName, B4.keyName,
                       C5.keyName, D5.keyName, E5.keyName, F5.keyName, G5.keyName, A5.keyName, B5.keyName,];

let blackNotesKeyNames = [Db4.keyName, Eb4.keyName, 0, Gb4.keyName, Ab4.keyName, Bb4.keyName, 0,
                       Db5.keyName, Eb5.keyName, 0, Gb5.keyName, Ab5.keyName, Bb5.keyName,];
//event.code КЛАВИШ КОМПЬЮТЕРА
let whiteNotesKeys = [C4.keyCode, D4.keyCode, E4.keyCode, F4.keyCode, G4.keyCode, A4.keyCode, B4.keyCode,
                      C5.keyCode, D5.keyCode, E5.keyCode, F5.keyCode, G5.keyCode, A5.keyCode, B5.keyCode,];

let blackNotesKeys = [Db4.keyCode, Eb4.keyCode, 0, Gb4.keyCode, Ab4.keyCode, Bb4.keyCode, 0,
                      Db5.keyCode, Eb5.keyCode, 0, Gb5.keyCode, Ab5.keyCode, Bb5.keyCode,];


//РИСУЕМ КЛАВИШИ С ПОМОЩЬЮ ЦИКЛА

function draw() {     
                 
  let html = "";
  let box = document.querySelector('#box');
    
    for (let i = 0; i < whiteNotesFrequencies.length; i++) {   
      let flag = true;
      let noteFreq = whiteNotesFrequencies[i];

// ЧЕРНЫЕ КЛАВИШИ ДОЛЖНЫ ИДТИ НЕ ПОДРЯД, ПОСЛЕ НОТ "СИ" И "МИ" ДОБЛЕН БЫТЬ ПРОПУСК
// ДЛЯ ЭТОГО СОЗДАДИМ УСЛОВИЕ, ЕСЛИ ЧАСТОТА НОТЫ РАВНА ЧАСТОТАМ НОТ "СИ" И "МИ", ТО ЭЛЕМЕНТ НЕ БУДЕТ СОЗДАВАТЬСЯ (flag = false)

        if (noteFreq == 329.63 || noteFreq == 493.88 || noteFreq == 659.26 || noteFreq == 987.77) 
          flag = false;

// ЦИКЛОМ НАЗНАЧАЕМ ЭЛЕМЕНТАМ-НОТАМ ИХ ЧАСТОТЫ ИЗ МАССИВОВ, СООТВ. КЛАВИШИ КЛАВИАТУРЫ КОПМЬЮТЕРА

          html +=`<div  class = "whitenotes" data-freq='${whiteNotesFrequencies[i]}' data-key='${whiteNotesKeys[i]}'> ${whiteNotesKeyNames[i]}`;                
// ЕСЛИ  flag = true, ТО ДОБАВЛЯЕМ ЭЛЕМЕНТЫ ЧЕРНЫХ НОТ В DOM       
        if (flag) {
        html +=`<div  class = "blacknotes" data-freq='${blackNotesFrequencies[i]}' data-key='${blackNotesKeys[i]}'>${blackNotesKeyNames[i]}</div>`;
        }

        html +='</div>';
    }
    
        box.innerHTML = html; 
}

//ЗАПУСК ФУНКЦИИ draw() ДЛЯ ПРОРИСОВКИ КЛАВИШ
draw(); 

// СОЗДАЁМ СЛУШАТЕЛЕЙ СОБЫТИЙ МЫШКИ И КАСАНИЯ

  document.querySelectorAll('.whitenotes, .blacknotes').forEach(function(element) {
        
    element.addEventListener('mousedown', notePressed, false);                           
    element.addEventListener('mouseup', noteReleased, false);
    element.addEventListener('mouseover', notePressed, false);
    element.addEventListener('mouseout', noteReleased, false);
    element.addEventListener('touchstart', notePressedByTouch, false);
    element.addEventListener('touchend', noteReleased, false);
    element.addEventListener('touchmove', notePressedByTouch, false);
  }); 


// СОЗДАЁМ ФУНКЦИЮ, КОТОРАЯ БУДЕТ СОБИРАТЬ ЦЕПЬ osc => gainNode => destination ПРИ КАЖДОМ НАЖАТИИ НА ЭЛЕМЕНТ

function play(freq) {
  
  let osc = audioCtx.createOscillator();
  let gainNode = audioCtx.createGain();
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.frequency.value = freq;
  osc.type = 'sine';
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  osc.start();
  return osc;                                                   

}
 
// ФУНКЦИЯ, КОТОРАЯ ЗАПУСКАЕТ ОСЦИЛЯТОР ПРИ НАЖАТИИ НА ЭЛЕМЕНТ

function notePressed (event) { 
  //ФУНКЦИЯ ЗАПУСКАЕТСЯ ТОЛЬКО ПРИ НАЖАТИИ ПКМ   

  if (event.buttons & 1) {                                       
    //БЕРЕМ dataset АКТИВНОГО ЭЛЕМЕНТА                                 
    let dataset = event.target.dataset;
  
    //ЕСЛИ В dataset ЭЛЕМЕНТА НЕТ "pressed", ТО ДОБАВЛЯЕТСЯ КЛАСС .active, 
    //А В МАССИВ oscList ДОБАВЛЯЕТСЯ ЧАСТОТА ИЗ dataset ЭЛЕМЕНТА И ЗАПУСКАЕТСЯ ФУНКЦИЯ play 
      if (!dataset["pressed"]) {

        event.target.classList.add('active');
        oscList[dataset["freq"]] = play(dataset["freq"]);          
        dataset["pressed"] = "yes";
      } 
  } 

}
// ФУНКЦИЯ, КОТОРАЯ ОСТАНАВЛИВАЕТ ОСЦИЛЯТОР ПРИ ОТЖАТИИ КЛАВИШИ НА ЭЛЕМЕНТЕ
function noteReleased (event) {
  let dataset = event.target.dataset;
  if (dataset && dataset["pressed"]) {

    event.target.classList.remove('active');
    oscList[dataset["freq"]].stop();
    delete dataset["pressed"];  
    } 
  }
   
// ФУНКЦИЯ, КОТОРАЯ ЗАПУСКАЕТ ОСЦИЛЯТОР ПРИ КАСАНИИ НА ЭЛЕМЕНТЕ
function notePressedByTouch (event) { 
  let dataset = event.target.dataset;
  if (!dataset["pressed"]) {
    event.target.classList.add('active');
    oscList[dataset["freq"]] = play(dataset["freq"]);
    dataset["pressed"] = "yes";
  } 
}


// ВЫДЕЛЕНИЕ И ЗАПУСК ОСЦИЛАТОРА ПРИ НАЖАТИИ КЛАВИШ 

document.addEventListener('keydown', activePress);
document.addEventListener('keyup', removeActivePress);


function activePress () {

  //ЧТОБЫ НЕ БЫЛО ОШИБКИ ПРИ ВЫЗОВЕ СОБЫТИЙ, ФУНКЦИЯ НАЧНЕТ ВЫПОЛНЯТЬСЯ ТОЛЬКО ПРИ НАЖАТИИ КЛАВИШ, ЧЬИ КОДЫ ЕСТЬ В МАССИВАХ
  if (whiteNotesKeys.includes(event.code) || blackNotesKeys.includes(event.code)) {
    let pressedElement = document.querySelector(`#box .whitenotes[data-key ='${event.code}'], .blacknotes[data-key ='${event.code}']`);
        
    let dataset = pressedElement.dataset;
      if (!dataset["pressed"]) {
        pressedElement.classList.add('active');
        oscList[dataset["freq"]] = play(dataset["freq"]);
        dataset["pressed"] = "yes";
      }
  }    
}

//СНЯТИЕ ВЫДЕЛЕНИЕ И ОСТАНОВКА ОСЦИЛАТОРА ПРИ ОТЖАТИИ КЛАВИШ 
function removeActivePress () {
  if (whiteNotesKeys.includes(event.code) || blackNotesKeys.includes(event.code)) {
    let releasedElement = document.querySelector(`#box .whitenotes[data-key ='${event.code}'], .blacknotes[data-key ='${event.code}']`);
        
    let dataset = releasedElement.dataset;
      if (dataset["pressed"]) {
        releasedElement.classList.remove('active');
        oscList[dataset["freq"]].stop();
        delete dataset["pressed"];
      }
  }
}
