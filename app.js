let rankingOrdenado = [];
const rankingHeap = new MinHeap();

// --- MAPEAMENTO DE TELAS ---
const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const telaRanking = document.getElementById('tela-ranking');

// --- ELEMENTOS TELA INÍCIO ---
const formInicio = document.getElementById('form-inicio');
const inputNome = document.getElementById('nome-jogador');
const btnVerRankingInicio = document.getElementById('btn-ver-ranking-inicio');

// --- ELEMENTOS TELA JOGO ---
const displayNome = document.getElementById('display-nome');
const displayTempo = document.getElementById('tempo-restante');
const displayPontos = document.getElementById('pontos-atuais');
const arena = document.getElementById('arena');
const alvo = document.getElementById('alvo');

// --- ELEMENTOS TELA RANKING ---
const corpoTabela = document.getElementById('corpo-tabela');
const btnJogarNovamente = document.getElementById('btn-jogar-novamente');
const btnTrocarJogador = document.getElementById('btn-trocar-jogador');

// --- ESTADO DO SISTEMA ---
let jogadorAtual = "";
let pontuacaoAtual = 0;
let tempoRestante = 10;
let temporizador;

// --- FUNÇÕES DE NAVEGAÇÃO SPA ---
function mostrarTela(tela) {
    telaInicio.classList.remove('ativa');
    telaJogo.classList.remove('ativa');
    telaRanking.classList.remove('ativa');
    
    tela.classList.add('ativa');
}

// --- INICIALIZAÇÃO E PERSISTÊNCIA ---
function inicializarSistema() {
    const dadosSalvos = localStorage.getItem('rankingDadosAim');

    if (dadosSalvos) {
        rankingHeap.carregarEstado(JSON.parse(dadosSalvos));
    }

    atualizarRankingOrdenado();
}

function salvarEstado() {
    localStorage.setItem('rankingDadosAim', JSON.stringify(rankingHeap.heap));
}

// --- LÓGICA DA TELA DE INÍCIO ---
formInicio.addEventListener('submit', function(e) {
    e.preventDefault();
    jogadorAtual = inputNome.value.trim();
    iniciarJogo();
});

btnVerRankingInicio.addEventListener('click', function() {
    atualizarRankingOrdenado();
    atualizarTabelaVisual();
    mostrarTela(telaRanking);
});

// --- LÓGICA DO JOGO ---
function iniciarJogo() {

    if (!jogadorAtual || jogadorAtual.trim() === "") {
        mostrarTela(telaInicio);
        return;
    }

    mostrarTela(telaJogo);
    
    // Reseta estado
    pontuacaoAtual = 0;
    tempoRestante = 10;
    displayNome.innerText = jogadorAtual;
    displayPontos.innerText = pontuacaoAtual;
    displayTempo.innerText = tempoRestante + "s";
    
    moverAlvo();

    temporizador = setInterval(() => {
        tempoRestante--;
        displayTempo.innerText = tempoRestante + "s";

        if (tempoRestante <= 0) {
            finalizarJogo();
        }
    }, 1000);
}

alvo.addEventListener('click', function() {
    // Adiciona pontos baseados em precisão rápida
    pontuacaoAtual += Math.floor(Math.random() * 41) + 80; 
    displayPontos.innerText = pontuacaoAtual;
    moverAlvo();
});

function moverAlvo() {
    // Garante que o alvo não saia da arena de jogo
    const maxX = arena.clientWidth - alvo.clientWidth;
    const maxY = arena.clientHeight - alvo.clientHeight;

    // Adicionado um pequeno padding para não colar na borda
    const novaPosX = Math.max(10, Math.floor(Math.random() * maxX) - 10);
    const novaPosY = Math.max(10, Math.floor(Math.random() * maxY) - 10);

    alvo.style.left = `${novaPosX}px`;
    alvo.style.top = `${novaPosY}px`;
}

function atualizarRankingOrdenado() {
    rankingOrdenado = rankingHeap.obterListaOrdenadaDecrescente();
}

function finalizarJogo() {
    clearInterval(temporizador);

    const jogadorExistente = rankingHeap.heap.find(
        jogador => jogador.nome.toLowerCase() === jogadorAtual.toLowerCase()
    );

    if (jogadorExistente) {

        if (pontuacaoAtual > jogadorExistente.pontuacao) {
            jogadorExistente.pontuacao = pontuacaoAtual;

            rankingHeap.heap.sort((a, b) => a.pontuacao - b.pontuacao);
        }

    } else {

        rankingHeap.inserir({
            nome: jogadorAtual,
            pontuacao: pontuacaoAtual
        });

    }

    atualizarRankingOrdenado();
    salvarEstado();
    atualizarTabelaVisual();
    mostrarTela(telaRanking);
}

// --- LÓGICA DO RANKING ---
function atualizarTabelaVisual() {
    corpoTabela.innerHTML = '';
    const listaTop10 = rankingOrdenado;

    if (listaTop10.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--cor-texto-mutado);">Ainda não há registros. Seja o primeiro!</td></tr>';
        return;
    }

    for (let i = 0; i < listaTop10.length; i++) {
        const jogador = listaTop10[i];
        const linha = document.createElement('tr');
        
        let classePosicao = '';
        if (i === 0) classePosicao = 'pos-1';
        else if (i === 1) classePosicao = 'pos-2';
        else if (i === 2) classePosicao = 'pos-3';

        linha.innerHTML = `
            <td class="${classePosicao}">${i + 1}º</td>
            <td>${jogador.nome}</td>
            <td style="font-family: monospace; color: var(--cor-primaria);">${jogador.pontuacao}</td>
        `;
        corpoTabela.appendChild(linha);
    }
}

// Botoes da Tela de Ranking
btnJogarNovamente.addEventListener('click', function() {

    if (!jogadorAtual || jogadorAtual.trim() === "") {
        mostrarTela(telaInicio);
        return;
    }

    iniciarJogo();
});

btnTrocarJogador.addEventListener('click', function() {
    jogadorAtual = "";
    inputNome.value = "";
    mostrarTela(telaInicio);
});

// Start
document.addEventListener('DOMContentLoaded', inicializarSistema);