const html = document.querySelector('html')
const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const comecarPausarBotao = document.querySelector('#start-pause')
const musicaInput = document.querySelector('#alternar-musica')
const startPauseBotao = document.querySelector('#start-pause span')
const imagemBotaoSP = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaFinalizado = new Audio('/sons/beep.mp3')
const musicaPause = new Audio('/sons/pause.mp3')
const musicaPlay = new Audio('/sons/play.wav')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true
musica.currentTime = 10

var som = parseFloat(prompt("Qual volume você quer ? "))



musica.volume = som;


musicaInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBotao.classList.add('active')
}); 

curtoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBotao.classList.add('active')
});

longoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBotao.classList.add('active')
});

function alterarContexto(contexto) {
    mostrarTempoNaTela()
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = ` Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong"> Faça uma pausa curta!</strong>`
            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <=0 ){
        musicaFinalizado.play()
       
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempoNaTela()
}

comecarPausarBotao.addEventListener('click', iniciarOuPausar )

function iniciarOuPausar() {
    if(intervaloId) {
        zerar()
        musicaPause.play()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBotao.textContent = 'Pausar'
    imagemBotaoSP.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    startPauseBotao.textContent = 'Começar'
    imagemBotaoSP.setAttribute('src', '/imagens/play_arrow.png')
}

function mostrarTempoNaTela() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempoNaTela()
