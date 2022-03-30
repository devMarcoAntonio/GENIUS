let order=[];
let clickedOrder = [];
let score = 0;
let level = 1;
let lose = false;

// 0 = verde
// 1 = vermelho
// 2 = amarelo
// 3 = azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const nivel = document.getElementById('nivel');
const pontos = document.getElementById('pontos');

//cria ordem aleatória de cores
let shuffleOrder = () => {
    //variavel para guardar o numero à cada rodada
    let colorOrder = Math.floor(Math.random() * 4);
    //atribui o valor na próxima poxição do array order
    order[order.length] = colorOrder;
    //click continua vazio
    clickedOrder = [];

    //acende o numero sorteado
    for (let i in order) {
        let  elementColor = createColorElement(order[i]);
        lightColor(order[i], elementColor, Number(i) + 1);
    }
}

//acende a próxima cor
let lightColor = (color, element, number) => {
    number = number * 700;
    setTimeout(() => {
        element.classList.add('selected');
        soundColorPlay(color);
    }, number - 450);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//checa se os botões clicados são os mesmos gerados da ordem do jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            lose = true;
            gameOver();
            break;
        }
    }
    if(clickedOrder.lenght == order.leght && lose == false){
        score++;
        
        //alert (`Pontuação: ${score}\nVocê ganhou!iniciando proximo nivel!`);
        scoreTela(score);
        levelTela(score);
        setTimeout(() =>{
            nextLevel();
        }, 2000);
       
    }
}

//função para o click do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    soundColorPlay(color);

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 450);   
}

//função retorna a cor do elemento
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//função para próximo nível do jogo
let nextLevel = () =>{
    //score++;
    shuffleOrder();

}

//função para game over
let gameOver = () => {
    //soundErrorPlay()
    //alert ('Pontuação: $(score)\nVocê perdeu!iniciando novo jogo!');
    Swal.fire({
        type: 'error',
        title: 'Você perdeu o jogo!',
        text: 'Sua pontuação: ${score}!\n\nClique em jogar para iniciar o jogo!',
        onOpen: () => {
            soundErrorPlay();
        }
    });
    order = [];
    clickedOrder = [];

    //playGame();
}

//função de inicio do jogo
let playGame = () => {
    //se der problema mudar para minusculo o Event
    Event.preventDefault();

    score = 0;
    lose = false;

    scoreTela(score);
    levelTela(score);

    //alert('Bem vindo ao Genesis \n iniciando novo jogo');
    Swal.fire({
        //parei aqui

    });
    score = 0;

    nextLevel();    
}
//evento de clic para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();