"use strict";
 
let audioCtx;

// Запуск осцилятора кнопкой (чтобы не выходило предупреждение)

let on = document.querySelector('#onBtn');

on.onclick = function () {
  oscillator.start(0);
  on.setAttribute('disabled', 'disabled');
}  


audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const oscillator = audioCtx.createOscillator(); // создаём в контексте: узел осцилятора 
const gainNode = audioCtx.createGain();         // создаём в контексте: узел усилителя

oscillator.connect(gainNode);          // втыкаем осцилятор в усилитель
gainNode.connect(audioCtx.destination); // втыкаем усилитель в устройство вывода

oscillator.type = 'sine';                   // задаём форму осцилятора (синус самый мягкий по звучанию)
oscillator.frequency.value = 0;           // присваивает свойству oscillator.frequency.freq значение переменной freq  
//oscillator.start(0);                          // запускаем

gainNode.gain.value = 0.1; // задаём уровень громкости (10%)  


class Note {
    constructor(freq, name, keyCode) {
        this.freq = freq;
        this.name = name;
        this.keyCode = keyCode;
    }

        // пока не знаю зачем добавил функцию в класс
        play() {
          audioCtx.resume();
          oscillator.frequency.value = this.freq;
        }
    }

// создаём объекты - Ноты


const C4 = new Note(261.63, "C4", "KeyQ");
const Db4 = new Note(277.18, "C#4", "Digit2");
const D4 = new Note(293.66, "D4", "KeyW");
const Eb4 = new Note(311.13, "D#4", "Digit3");
const E4 = new Note(329.63, "E4", "KeyE");
const F4 = new Note(349.23, "F4", "KeyR");
const Gb4 = new Note(369.99, "F#4", "Digit5");
const G4 = new Note(392.00, "G4", "KeyT");
const Ab4 = new Note(415.30, "G#4", "Digit6");
const A4 = new Note(440.00, "A4", "KeyY");
const Bb4 = new Note(466.16, "A#4", "Digit7");
const B4 = new Note(493.88, "B4", "KeyU");



// let now = context.currentTime; - пока не буду использовать временные метки, всё вопроизводится сразу (по умолчанию)

// Создаём массив с частотами нот

let whiteNotesFrequencies = [C4.freq, D4.freq, E4.freq, F4.freq, G4.freq, A4.freq, B4.freq];

let blackNotesFrequencies = [Db4.freq, Eb4.freq, 0, Gb4.freq, Ab4.freq, Bb4.freq];

let whiteNotesNames = [C4.name, D4.name, E4.name, F4.name, G4.name, A4.name, B4.name];

let blackNotesNames = [Db4.name, Eb4.name, 0, Gb4.name, Ab4.name, Bb4.name];

let whiteNotesKeys = [C4.keyCode, D4.keyCode, E4.keyCode, F4.keyCode, G4.keyCode, A4.keyCode, B4.keyCode];

let blackNotesKeys = [Db4.keyCode, Eb4.keyCode, 0, Gb4.keyCode, Ab4.keyCode, Bb4.keyCode];



//рисуем клавиши c помощью цикла

function draw() {
    
  let html = "";
  let box = document.querySelector('#box');

    for (let i = 0; i < whiteNotesFrequencies.length; i++) {
        
      let flag = true;
      let note = whiteNotesFrequencies[i];

        if (note == 329.63 || note == 493.88) 
        flag = false;
        // через dataset назначаем клавишам-нотам их частоты и keyCode из массивов     
          html +=`<div  class = "whitenotes" data-freq='${whiteNotesFrequencies[i]}' data-key='${whiteNotesKeys[i]}'>`;                
        
        if (flag) {
          html +=`<div  class = "blacknotes" data-freq='${blackNotesFrequencies[i]}' data-key='${blackNotesKeys[i]}'></div>`;
      }

        html +='</div>';
    }
    
    box.innerHTML = html;
    // связываем элементы с событиями
    document.querySelectorAll('.whitenotes, .blacknotes').forEach(function(element) {  
        
        let btnPressed;  // позже задействую


        element.onmousedown = function () {
          btnPressed = true;
          event.stopPropagation();
            audioCtx.resume();
            oscillator.frequency.value = this.dataset.freq; 
        };
        element.onmouseup = function () {
          btnPressed = false;
          if(audioCtx.state ==='running') {
            audioCtx.suspend().then(function(){
            console.log("suspend") ; 
           });
          }
        };
      
        element.onmouseout = function () {
          if(audioCtx.state ==='running') {
            audioCtx.suspend().then(function(){
            console.log("suspend") ; 
            });
          }
        };

       /* element.ontouch = function () {
          //event.stopPropagation(); 
          if (audioCtx.state ==='suspended') {
            audioCtx.resume();
            oscillator.frequency.value = this.dataset.freq;
          }  
        };
        
        element.ontouchend = function () {
          btnPressed = true;
          if(audioCtx.state ==='running') {
            audioCtx.suspend().then(function(){
            console.log("suspend") ; 
           });
          } 
        };*/
     
  });
  
        // ВЫДЕЛЕНИЕ ПРИ НАЖАТИИ КЛАВИШ qwerty
        function activePress () {
        document.querySelector('#box .whitenotes[data-key ="'+event.code+'"], .blacknotes[data-key ="'+event.code+'"]').classList.add('active');
      }

      function removeActivePress () {
        document.querySelector('#box .whitenotes[data-key ="'+event.code+'"], .blacknotes[data-key ="'+event.code+'"]').classList.remove('active');
      }


      document.addEventListener('keydown', function(event){
        switch (event.code) {
          case C4.keyCode : audioCtx.resume(); oscillator.frequency.value = C4.freq;
          activePress();
            break;
          case Db4.keyCode : audioCtx.resume(); oscillator.frequency.value = Db4.freq;
          activePress();
            break;
          case D4.keyCode : audioCtx.resume(); oscillator.frequency.value = D4.freq;
          activePress();
            break;
          case Eb4.keyCode : audioCtx.resume(); oscillator.frequency.value = Eb4.freq;
          activePress();
            break;
          case E4.keyCode : audioCtx.resume(); oscillator.frequency.value = E4.freq;
          activePress();
            break;
          case F4.keyCode : audioCtx.resume(); oscillator.frequency.value = F4.freq;
          activePress();
            break;
          case Gb4.keyCode : audioCtx.resume(); oscillator.frequency.value = Gb4.freq;
          activePress();
            break;
          case G4.keyCode : audioCtx.resume(); oscillator.frequency.value = G4.freq;
          activePress();
            break;
          case Ab4.keyCode : audioCtx.resume(); oscillator.frequency.value = Ab4.freq;
          activePress();
            break;
          case A4.keyCode : audioCtx.resume(); oscillator.frequency.value = A4.freq;
          activePress();
            break; 
          case B4.keyCode : audioCtx.resume(); oscillator.frequency.value = B4.freq;
          activePress();
            break;
          default : audioCtx.suspend();
        }
  });
      document.addEventListener('keyup', function(event){
        removeActivePress();
        
        if(audioCtx.state ==='running'){
        audioCtx.suspend();
      }
  });


} 

draw();


btn.onmousedown = function () {  //
    D4.play();
};

btn.onmouseup = function () {
    if(audioCtx.state ==='running') {
        audioCtx.suspend();
    } 
};

stopBtn.onclick = function () {
    audioCtx.close().then(function (){
        stopBtn.setAttribute('disabled', 'disabled')
    })
};

