"use strict";
 

var AudioContext = window.AudioContext || window.webkitAudioContext; // обращаемся к глобальному аудио контексту

let audioCtx = new AudioContext();   

let osciStop = function () {
    audioCtx.oscillator.stop();
}

class Sound { 
                                  // Создаём класс , который каждый раз будет обращаться к глобальному контексту    
    
    constructor(audioCtx) {
        
        this.audioCtx = audioCtx;  
     
    }
    init() {                                          // создаём фунцию, которая будет каждое нажатие создавать цепь осцилятор-усилитель-выход      
        this.oscillator = audioCtx.createOscillator(); // создаём в контексте: узел осцилятора 
        this.gainNode = audioCtx.createGain();         // создаём в контексте: узел усилителя

        this.oscillator.connect(this.gainNode);          // втыкаем осцилятор в усилитель
        this.gainNode.connect(this.audioCtx.destination); // втыкаем усилитель в устройство вывода

        this.oscillator.type = 'sine';                   // задаём форму осцилятора (синус самый мягкий по звучанию)
        this.gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime); // задаём уровень громкости (50%) и время запуска (сразу)
    }
    play(freq) {                                        //создаём функцию, которая будет запускать осцилятор, два параметра - частота и время запуска
        this.init();                                    // создаёт цепь  "осцилятор-усилитель-выход" и форму осцилятора 
        this.oscillator.frequency.value = freq;           // присваивает свойству oscillator.frequency.freq значение переменной freq  
        this.oscillator.start();                          // запускаем
    }
    stop() {                                            // останавливаем 
        
        this.oscillator.stop ();
         
    }

}

// создаём класс Нота, свойство - частота (Гц)

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
        // через dataset назначаем клавишам-нотам их частоты из массивов     
        html +=`<div  class = "whitenotes" data-freq='${whiteNotesFrequencies[i]}' data-key='${whiteNotesKeys[i]}'>`;                
        
        if (flag) {
        html +=`<div  class = "blacknotes" data-freq='${blackNotesFrequencies[i]}' data-key='${blackNotesKeys[i]}'></div>`;
    }

        html +='</div>';
    }
    
    box.innerHTML = html;

    let btnPressed;
   

    document.querySelectorAll('.whitenotes, .blacknotes').forEach(function(element) {
    
        element.onmousedown = function (event) {
        element.classList.add('active');
        btnPressed = true;
       // if (audioCtx.state ==='stopped') 
        console.log(element.dataset.freq + " play");
        event.stopPropagation();   
        Play.play(this.dataset.freq);
       
    };

    element.onmouseup = function (event) {
        btnPressed = false;
        element.classList.remove('active');

        if(audioCtx.state ==='running') {
        event.stopPropagation();
        console.log(element.dataset.freq + " stop");
        Play.stop();
        } 
        // else if (audioCtx.state ==='stopped') {
        //   osciStop();
        // }
        //audioCtx.suspend();
    };

    element.onmouseout = function (event) {     
          
        if(btnPressed == true){
        //event.stopPropagation();
        element.classList.remove('active');  
        console.log(element.dataset.freq + " stop"); 
        Play.stop();
        }else if (btnPressed == false) {
            Play.stop();  
        }
      };
    

    element.onmouseover = function (event) {
        
        if(btnPressed == true) {
        element.classList.add('active');
        event.stopPropagation(); 
        Play.play(this.dataset.freq)
        console.log(element.dataset.freq + " play");
        } else if (btnPressed == false) {
            Play.stop();  
        }
    };


    // element.onmousemove = function () {
    //     if(btnPressed == false) 
    //      Play.stop(element.dataset.freq);
    //         //audioCtx.close();
    //     }
     
     
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
          case C4.keyCode : Play.play(C4.freq);
          activePress();
            break;
          case Db4.keyCode : Play.play(Db4.freq);
          activePress();
            break;
          case D4.keyCode : Play.play(D4.freq);
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
          default : Play.stop();
        }
  });
      document.addEventListener('keyup', function(event){1        
        removeActivePress();
        console.log(event.code)
        //if(audioCtx.state ==='running'){
        Play.stop();
      //}
  });


   
}     
 
draw(); 
      //попытка "поймать" ошибку
      // try {
      //   removeActivePress ();
      // } catch(err) {
      //   console.log(err);
      // }

  let Play = new Sound(audioCtx); // создаём объект


// function playNow(){


//     Play.play(this.dataset.note);   // берет частоту из dataset элемента
//     event.stopPropagation();        
//     //localStorage.setItem(`currentFreq`, `${this.dataset.note}`);
// }

// function stopNow(){

    
//     Play.stop();
    

// }


    //тест - кнопка
    btn.onmousedown = function () {  //
    Play.play(Gb4.freq);
    }
    btn.onmouseup = function () {
    Play.stop();
    }


    
function playDo() {
    
    let x = this.dataset.freq;
    
    console.log(x);
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













