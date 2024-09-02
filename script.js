const modalidades = ["Ginástica", "Judô", "Surfe", "Vôlei","Futebol"];
//Com base na constante modalidade, 
const escolha = 4;
//número que represente o esporte do seu grupo (0,1,2,3,4)
document.querySelector('body').style.backgroundImage = "url('img/"+modalidades[escolha]+".png')";  // imagem de fundo
document.querySelector('title').textContent = "Missão Olímpica | "+modalidades[escolha]; //Título da página html
document.querySelector('h1').innerHTML = "Missão Olímpica <br> "+modalidades[escolha]; // título do texto
//elementos base existentes na tela para serem alterados.

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
//captura dos elementos que sofrerão alteração ao tempo todo.

let atual = 0; //item perguntas
let perguntaAtual;  // numero da pergunta
let historiaFinal = "";  // enredo a ser formado
let pontos = 0;  //pontuação para medalhas
//criação e inicialização das variáveis que receberão informações

function mostraPergunta(){  // apresentação das perguntas
    if(atual >= perguntas[escolha].length){ // verificação da qtd de perguntas existentes bate com a escolha e o valor atual
        mostraResultado();  //apresenta a pergunta
        return; // faz retorno a quem chamou
    }
    perguntaAtual = perguntas[escolha][atual]; //verifica a pergunta direcionando conforme o esporte escolhido
    caixaPerguntas.textContent = perguntaAtual.enunciado; //pega o enunciado da pergunta
    caixaAlternativas.textContent = ""; //esvazia o texto da caixa de alternativas
    mostraAlternativas();  //apresenta as novas alternativas
}

function mostraAlternativas(){  // verifica e apresenta as alternativas
    for(const alternativa of perguntaAtual.alternativas){ // repetição
        const botaoAlternativas = document.createElement("button");
        //crie o elemento botão e direciona a variavel
        botaoAlternativas.textContent = alternativa.texto;
        //altera o conteúdo textual do botão
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa)); //função anonima para validar chamar e executando outra função enviando a escolha 
        caixaAlternativas.appendChild(botaoAlternativas)
        //adiciona o botao na tela
    }
}

function respostaSelecionada(opcaoSelecionada){ //executa a alteração 
    const afirmacao = opcaoSelecionada.afirmacao; //redireciona para a variável o contexto
    historiaFinal += afirmacao + " ";  //aciona o texto para criar o enredo final, acumulando-o
    atual++; //adiona o valor a variável para passar para próxima
    pontos += opcaoSelecionada.pontos;  //adiciona pontos caso haja
    mostraPergunta();  //cahama a função para mostrar nova pergunta
}

function mostraResultado(){ //função para apresentar os resultados
    textoResultado.textContent = historiaFinal;  //adicona o enredo total formado com as escolhas do usuário
    caixaPerguntas.textContent = "Resultado"; //altera o título do contexto para Resultado
    caixaAlternativas.textContent = "";  //limpa o texto do elemento
    podiumMedalhas(); // chma a função podiumMedalhas

}

function podiumMedalhas(){  //executa e apresenta o resultado
    alert(pontos) // apresenta o total de pontos adquirido
    if (pontos == 3){  //verifica a pontuação adquirida
        body.style.backgroundColor = "white";  //muda o fundo para branco
        caixaPrincipal.style.backgroundImage = "url('img/bronze.png')";
        //altera a imagem para bronze
        caixaPerguntas.textContent = "Resultado da competição: 3 pontos é BRONZE!" //altera o texto do elemento
    }
    if (pontos == 4){  //idem a condição anterior
        caixaPrincipal.style.backgroundImage = "url('img/prata.png')";;
        caixaPerguntas.textContent = "Resultado da competição: 4 pontos é PRATA!"
    }
    if (pontos == 5){ //idem a condição anterior
        caixaPrincipal.style.backgroundImage = "url('img/ouro.png')";
        caixaPerguntas.textContent = "Resultado da competição: 5 pontos é OURO!"
    }
    if (pontos < 3){ //idem a condição anterior
        caixaPrincipal.style.backgroundImage = "url('img/perdeu.png')";;
        caixaPerguntas.textContent = "Resultado da competição: PERDEU!"
    }
}

mostraPergunta(); 
//chama e inicia a chamada das perguntas.