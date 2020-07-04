"use strict";
 
let audioCtx;

let on = document.querySelector('#onBtn');

on.onclick = function () {
  oscillator.start(0);
  on.setAttribute('disabled', 'disabled');
}  

AudioContext = window.AudioContext || window.webkitAudioContext; // обращаемся к глобальному аудио контексту

audioCtx = new AudioContext();

const oscillator = audioCtx.createOscillator(); // создаём в контексте: узел осцилятора 
const gainNode = audioCtx.createGain();         // создаём в контексте: узел усилителя

oscillator.connect(gainNode);          // втыкаем осцилятор в усилитель
gainNode.connect(audioCtx.destination); // втыкаем усилитель в устройство вывода

oscillator.type = 'sine';                   // задаём форму осцилятора (синус самый мягкий по звучанию)
oscillator.frequency.value = 0;           // присваивает свойству oscillator.frequency.freq значение переменной freq  
//oscillator.start(0);                          // запускаем

gainNode.gain.value = 0.1; // задаём уровень громкости (10%)  


class Note {
    constructor(freq, name) {
        this.freq = freq;
        this.name = name;
    }
}
// создаём объекты - Ноты


const C4 = new Note(261.63, "C4");
const Db4 = new Note(277.18, "C#4");
const D4 = new Note(293.66, "D4");
const Eb4 = new Note(311.13, "D#4");
const E4 = new Note(329.63, "E4");
const F4 = new Note(349.23, "F4");
const Gb4 = new Note(369.99, "F#4");
const G4 = new Note(392.00, "G4");
const Ab4 = new Note(415.30, "G#4");
const A4 = new Note(440.00, "A4");
const Bb4 = new Note(466.16, "A#4");
const B4 = new Note(493.88, "B4");



// let now = context.currentTime; - пока не буду использовать временные метки, всё вопроизводится сразу (по умолчанию)

// Создаём массив с частотами нот

let whiteNotesFrequencies = [C4.freq, D4.freq, E4.freq, F4.freq, G4.freq, A4.freq, B4.freq];

let blackNotesFrequencies = [Db4.freq, Eb4.freq, 0, Gb4.freq, Ab4.freq, Bb4.freq];

let whiteNotesNames = [C4.name, D4.name, E4.name, F4.name, G4.name, A4.name, B4.name];

let blackNotesNames = [Db4.name, Eb4.name, 0, Gb4.name, Ab4.name, Bb4.name];


//рисуем клавиши c помощью цикла

function draw() {
    
  let html = "";
  let box = document.querySelector('#box');

    for (let i = 0; i < whiteNotesFrequencies.length; i++) {
        
      let flag = true;
      let note = whiteNotesFrequencies[i];

        if (note == 329.63 || note == 493.88) 
        flag = false;
        // через dataset назначаем клавишам-нотам их частоты из массивов     
          html +=`<div  class = "whitenotes" data-note='${whiteNotesFrequencies[i]}'>`;                
        
        if (flag) {
          html +=`<div  class = "blacknotes" data-note='${blackNotesFrequencies[i]}'></div>`;
      }

        html +='</div>';
    }
    
    box.innerHTML = html;


    document.querySelectorAll('.whitenotes').forEach(function(element) {  
        element.onmouseup = function () {
            if(audioCtx.state ==='running') {
                  audioCtx.suspend().then(function(){
                  console.log("suspend") ; 
                });
          };
      }       
        element.onmousedown = function(){
                
            if (audioCtx.state ==='suspended') {
                  audioCtx.resume();
                  oscillator.frequency.value = this.dataset.note;
                  event.stopPropagation(); 
        }
      }   
      element.onmouseleave = function () {
        if(audioCtx.state ==='running') {
              audioCtx.suspend().then(function(){
              console.log("suspend") ; 
            });
      };
  }            
  });

       document.querySelectorAll('.blacknotes').forEach(function(element) {
        element.onmouseup = function () {
            if(audioCtx.state ==='running') {
                  audioCtx.suspend().then(function(){
                  console.log("suspend") ; 
                });
        };
    }       
        element.onmousedown = function(){
            if (audioCtx.state ==='suspended') {
                 audioCtx.resume();
                 oscillator.frequency.value = this.dataset.note;
                 event.stopPropagation(); 
        }
    }   
        element.onmouseleave = function () {
            if(audioCtx.state ==='running') {
                audioCtx.suspend().then(function(){
                console.log("suspend") ; 
              });
      };
  }        
  });
}   



draw();





btn.onmousedown = function () {  //
    oscillator.frequency.value = 440;
    audioCtx.resume();
}

btn.onmouseup = function () {
    if(audioCtx.state ==='running') {
        audioCtx.suspend();
    } 
}

stopBtn.onclick = function () {
    audioCtx.close().then(function (){
        stopBtn.setAttribute('disabled', 'disabled')
    })
}


//function noteDown(elem){
 //   let currentNote = elem.dataset.note;
 //   alert(currentNote);
//}


//здесь пока всё играет



    /*
    let doNota = document.querySelector(`.whitenotes[data="${C4.freq}"]`);

    

      document.addEventListener('keypress', function(event){
       
        if (event.code == 'KeyQ')
        console.log(1);
        
     });
      document.addEventListener('keyup', function(event){
        Play.stop();
      });
*/













