
const one = document.getElementById('one')
const two = document.getElementById('two')
const three = document.getElementById('three')
const four = document.getElementById('four')
const five = document.getElementById('five')
const six = document.getElementById('six')
const seven = document.getElementById('seven')
const eight = document.getElementById('eight')
const nine = document.getElementById('nine')
const zero = document.getElementById('zero')
const btnEmpezar = document.getElementById('btnEmpezar')
const screen = document.getElementById('screen')
const difficultEasy = document.getElementById('easy')
const difficultMedium = document.getElementById('medium')
const difficultHigh = document.getElementById('high')

let ultimoNivel

difficultEasy.addEventListener('click', level)
difficultMedium.addEventListener('click', level)
difficultHigh.addEventListener('click', level)

function level (data) {
    const levelButtom = data.target.dataset.level
    ultimoNivel = getNumberLevel(levelButtom)
}

function getNumberLevel (level){
        switch(level){
            case 'easy':
                difficultEasy.classList.toggle('light')
                return 5
            case 'medium':
                difficultMedium.classList.toggle('light')
                return 10
            case 'high':
                difficultHigh.classList.toggle('light')
                return 15
        }
}

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar() {
        if(!ultimoNivel){
            swal("Atención", "Debes elegir un nivel", "warning")
        }else{
        this.elegirNumero = this.elegirNumero.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.transformarStringANumber = this.transformarStringANumber.bind(this)
        this.toggleBtn()
        this.nivel = 1
        this.numbers = {
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            zero
        }
    }
    }
    toggleBtn(){
        btnEmpezar.classList.toggle('hide')
    }
    generarSecuencia() {
        this.secuencia = new Array(ultimoNivel)
        .fill(0)
        .map(n => Math.floor(Math.random()*10))
        console.log(this.secuencia)
    }
    siguienteNivel() {
        this.subNivel=0 
        this.iniciarSecuencia()
        this.agregarEventosClick()
    }
    transformarStringANumber (nameNumber){
        switch(nameNumber){
            case 'one':
                return 1
            case 'two':
                return 2
            case 'three':
                return 3
            case 'four':
                return 4
            case 'five':
                return 5
            case 'six':
                return 6
            case 'seven':
                return 7
            case 'eight':
                return 8
            case 'nine':
                return 9
            case 'zero':
                return 0          
        }
    }
    transformarNumberAString (numero){
        switch(numero){
            case 1:
                return 'one'
            case 2:
                return 'two'
            case 3:
                return 'three'
            case 4:
                return 'four'
            case 5:
                return 'five'
            case 6:
                return 'six'
            case 7:
                return 'seven'
            case 8:
                return 'eight'
            case 9:
                return 'nine'
            case 0:
                return 'zero' 
        }
    }
    iniciarSecuencia(){
        for(let i =0; i< this.nivel; i++){
            const numero = this.transformarNumberAString(this.secuencia[i])
            setTimeout(() => this.iluminarNumero(numero), 1200*i)
        }
    }
    iluminarNumero(number){
        this.numbers[number].classList.add('light')
        setTimeout(() => this.apagarNumero(number), 350)
    }
    apagarNumero(number){
        this.numbers[number].classList.remove('light')
    }
    agregarEventosClick(){
        this.numbers.one.addEventListener('click', this.elegirNumero)
        this.numbers.two.addEventListener('click', this.elegirNumero)
        this.numbers.three.addEventListener('click', this.elegirNumero)
        this.numbers.four.addEventListener('click', this.elegirNumero)
        this.numbers.five.addEventListener('click', this.elegirNumero)
        this.numbers.six.addEventListener('click', this.elegirNumero)
        this.numbers.seven.addEventListener('click', this.elegirNumero)
        this.numbers.eight.addEventListener('click', this.elegirNumero)
        this.numbers.nine.addEventListener('click', this.elegirNumero)
        this.numbers.zero.addEventListener('click', this.elegirNumero)
    }
    eliminarEventosClick(){
        this.numbers.one.removeEventListener('click', this.elegirNumero)
        this.numbers.two.removeEventListener('click', this.elegirNumero)
        this.numbers.three.removeEventListener('click', this.elegirNumero)
        this.numbers.four.removeEventListener('click', this.elegirNumero)
        this.numbers.five.removeEventListener('click', this.elegirNumero)
        this.numbers.six.removeEventListener('click', this.elegirNumero)
        this.numbers.seven.removeEventListener('click', this.elegirNumero)
        this.numbers.eight.removeEventListener('click', this.elegirNumero)
        this.numbers.nine.removeEventListener('click', this.elegirNumero)
        this.numbers.zero.removeEventListener('click', this.elegirNumero)
    }
    elegirNumero(ev){
        const nameNumber = ev.target.dataset.element
        const digitNumber = this.transformarStringANumber(nameNumber)
        this.iluminarNumero(nameNumber)
        this.mostrarNumero (digitNumber)
        if(digitNumber === this.secuencia[this.subNivel]){
            this.subNivel++
            if(this.subNivel === this.nivel) {
                this.nivel++
                setTimeout (() => this.eliminarDatosPantalla(), 1000)
                this.eliminarEventosClick()
                if(this.nivel === (ultimoNivel + 1)){
                this.eliminarDatosPantalla()
                this.ganoElJuego()
                    
                }else{
                    setTimeout (() => this.eliminarDatosPantalla(), 1000)
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        }else {
            this.eliminarDatosPantalla()
            this.eliminarEventosClick
            this.perdioElJuego()
        }
    }

    mostrarNumero(digitNumber) {
        screen.innerHTML+= digitNumber
    }

    eliminarDatosPantalla(){
        screen.innerHTML = null
    }

    ganoElJuego () { 
        swal("Ganaste", "Juega de nuevo", "success")
        .then(() => {
            location.reload();
        }) 
    }
    perdioElJuego () { 
        swal("Perdiste", "Vuelve a intentarlo", "error")
            .then(() => {  
                location.reload();
            })
    }
}

function iniciarJuego() {
    window.juego = new Juego()
}