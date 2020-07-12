"use strict";
 

var AudioContext = window.AudioContext || window.webkitAudioContext; // обращаемся к глобальному аудио контексту

let audioCtx = new AudioContext();   

let oscList = [];



    //тест - кнопка
    // btn.onmousedown = function () {  //
    //   playTone (440);
    // }
    // btn.onmouseup = function () {
    //  osc.stop();
    // }








// создаём класс Нота, свойство - частота (Гц)

class Note {
    constructor(freq, name, keyCode) {
        this.freq = freq;
        this.name = name;
        this.keyCode = keyCode;
    }

  }

// создаём объекты - Ноты

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




// Создаём массив с частотами нот

let whiteNotesFrequencies = [C4.freq, D4.freq, E4.freq, F4.freq, G4.freq, A4.freq, B4.freq,
                             C5.freq, D5.freq, E5.freq, F5.freq, G5.freq, A5.freq, B5.freq,];

let blackNotesFrequencies = [Db4.freq, Eb4.freq, 0, Gb4.freq, Ab4.freq, Bb4.freq, 0,
                            Db5.freq, Eb5.freq, 0, Gb5.freq, Ab5.freq, Bb5.freq,];

let whiteNotesNames = [C4.name, D4.name, E4.name, F4.name, G4.name, A4.name, B4.name,
                       C5.name, D5.name, E5.name, F5.name, G5.name, A5.name, B5.name,];

let blackNotesNames = [Db4.name, Eb4.name, 0, Gb4.name, Ab4.name, Bb4.name, 0,
                       Db5.name, Eb5.name, 0, Gb5.name, Ab5.name, Bb5.name,];

let whiteNotesKeys = [C4.keyCode, D4.keyCode, E4.keyCode, F4.keyCode, G4.keyCode, A4.keyCode, B4.keyCode,
                      C5.keyCode, D5.keyCode, E5.keyCode, F5.keyCode, G5.keyCode, A5.keyCode, B5.keyCode,];

let blackNotesKeys = [Db4.keyCode, Eb4.keyCode, 0, Gb4.keyCode, Ab4.keyCode, Bb4.keyCode, 0,
                      Db5.keyCode, Eb5.keyCode, 0, Gb5.keyCode, Ab5.keyCode, Bb5.keyCode,];


//рисуем клавиши c помощью цикла

function draw() {                    
    let html = "";
    let box = document.querySelector('#box');
    for (let i = 0; i < whiteNotesFrequencies.length; i++) {
        
        let flag = true;
        let noteFreq = whiteNotesFrequencies[i];

        if (noteFreq == 329.63 || noteFreq == 493.88 || noteFreq == 659.26 || noteFreq == 987.77) 
        flag = false;
        // через dataset назначаем клавишам-нотам их частоты из массивов     
        html +=`<div  class = "whitenotes" data-freq='${whiteNotesFrequencies[i]}' data-key='${whiteNotesKeys[i]}'>`;                
        
        if (flag) {
        html +=`<div  class = "blacknotes" data-freq='${blackNotesFrequencies[i]}' data-key='${blackNotesKeys[i]}'></div>`;
    }

        html +='</div>';
    }
    
        box.innerHTML = html;
  
        document.querySelectorAll('.whitenotes, .blacknotes').forEach(function(element) {
        
          element.addEventListener('mousedown', notePressed, false);
          element.addEventListener('mouseup', noteReleased, false);
          element.addEventListener('mouseover', notePressed, false);
          element.addEventListener('mouseout', noteReleased, false);
          element.addEventListener('touchstart', notePressedByTouch, false);
          element.addEventListener('touchend', noteReleased, false);
          element.addEventListener('touchmove', notePressedByTouch, false);




        
          return element;   // ???

        }); 
            
  
}
 
draw(); 

function playTone(freq) {
  
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
 

function notePressed (event) { 
    
    if (event.buttons & 1) {                    //разобраться
      let dataset = event.target.dataset;
      event.target.classList.add('active');
    

     if (!dataset["pressed"]) {
       oscList[dataset["freq"]] = playTone(dataset["freq"]);
       dataset["pressed"] = "yes";
     } 
   }
}

function noteReleased (event) {
  let dataset = event.target.dataset;
  event.target.classList.remove('active');
  if (dataset && dataset["pressed"]) {
    oscList[dataset["freq"]].stop();
    delete dataset["pressed"];  
  } 
}
   

function notePressedByTouch (event) { 
    let dataset = event.target.dataset;
    event.target.classList.add('active');
  

   if (!dataset["pressed"]) {
     oscList[dataset["freq"]] = playTone(dataset["freq"]);
     dataset["pressed"] = "yes";
   } 
 
}





/*
       // ВЫДЕЛЕНИЕ ПРИ НАЖАТИИ КЛАВИШ 
       function activePress () {
        document.querySelector('#box .whitenotes[data-key ="'+event.code+'"], .blacknotes[data-key ="'+event.code+'"]').classList.add('active');
      }

      function removeActivePress () {
        document.querySelector('#box .whitenotes[data-key ="'+event.code+'"], .blacknotes[data-key ="'+event.code+'"]').classList.remove('active');
      }

 



      document.addEventListener('keydown', function(event){
        switch (event.code) {
          case C4.keyCode : playTone(C4.freq);
          activePress();
            break;
          case Db4.keyCode : playTone(Db4.freq);
          activePress();
            break;
          case D4.keyCode : playTone(D4.freq);
          activePress();
            break;
          case Eb4.keyCode : Play.play(Eb4.freq);
          activePress();
            break;
          case E4.keyCode : Play.play(E4.freq);
          activePress();
            break;
          case F4.keyCode : Play.play(F4.freq);
          activePress();
            break;
          case Gb4.keyCode : Play.play(Gb4.freq);
          activePress();
            break;
          case G4.keyCode : Play.play(G4.freq);
          activePress();
            break;
          case Ab4.keyCode : Play.play(Ab4.freq);
          activePress();
            break;
          case A4.keyCode : Play.play(A4.freq);
          activePress();
            break; 
          case B4.keyCode : Play.play(B4.freq);
          activePress();
            break;
          default : return;                          //поковырять
        }
  });
      document.addEventListener('keyup', function(event){
  
        switch (event.code) {
          case C4.keyCode : Play.stop();
          removeActivePress()
            break;
          case Db4.keyCode : Play.stop();
          removeActivePress()
            break;
          case D4.keyCode : Play.stop();
          removeActivePress()
            break;
          case Eb4.keyCode : Play.stop();
          removeActivePress()
            break;
          case E4.keyCode : Play.stop();
          removeActivePress()
            break;
          case F4.keyCode : Play.stop();
          removeActivePress()
            break;
          case Gb4.keyCode : Play.stop();
          removeActivePress()
            break;
          case G4.keyCode : Play.stop();
          removeActivePress()
            break;
          case Ab4.keyCode : Play.stop();
          removeActivePress()
            break;
          case A4.keyCode : Play.stop();
          removeActivePress()
            break; 
          case B4.keyCode : Play.stop();
          removeActivePress()
            break;
          default : return;                         
        }
  
  });


   
  */   


 




// function playNow(){


//     Play.play(this.dataset.note);   // берет частоту из dataset элемента
//     event.stopPropagation();        
//     //localStorage.setItem(`currentFreq`, `${this.dataset.note}`);
// }

// function stopNow(){

    
//     Play.stop();
    

// }



    





//function noteDown(elem){
 //   let currentNote = elem.dataset.note;
 //   alert(currentNote);
//}














