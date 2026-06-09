class MinHeap {
    constructor() {
        this.heap = [];
    }

    obterIndicePai(indice) {
        return Math.floor((indice - 1) / 2);
    }

    obterIndiceFilhoEsquerda(indice) {
        return 2 * indice + 1;
    }

    obterIndiceFilhoDireita(indice) {
        return 2 * indice + 2;
    }

    trocar(indiceA, indiceB) {
        const temp = this.heap[indiceA];
        this.heap[indiceA] = this.heap[indiceB];
        this.heap[indiceB] = temp;
    }

    inserir(jogador) {
        this.heap.push(jogador);
        this.subir(this.heap.length - 1);

        if (this.heap.length > 10) {
            this.extrairMinimo();
        }
    }

    subir(indice) {
        let indiceAtual = indice;
        let indicePai = this.obterIndicePai(indiceAtual);

        while (indiceAtual > 0 && this.heap[indiceAtual].pontuacao < this.heap[indicePai].pontuacao) {
            this.trocar(indiceAtual, indicePai);
            indiceAtual = indicePai;
            indicePai = this.obterIndicePai(indiceAtual);
        }
    }

    extrairMinimo() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const minimo = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.descer(0);

        return minimo;
    }

    descer(indice) {
        let indiceAtual = indice;
        const tamanho = this.heap.length;

        while (this.obterIndiceFilhoEsquerda(indiceAtual) < tamanho) {
            let indiceMenorFilho = this.obterIndiceFilhoEsquerda(indiceAtual);
            let indiceDireita = this.obterIndiceFilhoDireita(indiceAtual);

            if (indiceDireita < tamanho && this.heap[indiceDireita].pontuacao < this.heap[indiceMenorFilho].pontuacao) {
                indiceMenorFilho = indiceDireita;
            }

            if (this.heap[indiceAtual].pontuacao <= this.heap[indiceMenorFilho].pontuacao) {
                break;
            }

            this.trocar(indiceAtual, indiceMenorFilho);
            indiceAtual = indiceMenorFilho;
        }
    }

    obterListaOrdenadaDecrescente() {
        const heapTemporaria = new MinHeap();
        
        for (let i = 0; i < this.heap.length; i++) {
            heapTemporaria.heap.push(this.heap[i]);
        }

        const tamanho = heapTemporaria.heap.length;
        const listaOrdenada = new Array(tamanho);

        for (let i = tamanho - 1; i >= 0; i--) {
            listaOrdenada[i] = heapTemporaria.extrairMinimo();
        }

        return listaOrdenada;
    }

    carregarEstado(dados) {
        this.heap = dados;
    }
}
