# Projeto 7 — Ranking de Jogadores

Este repositório contém o código-fonte e a documentação referente ao Projeto 7, que consiste no desenvolvimento de um sistema de gerenciamento de ranking operando em tempo real. O foco principal desta aplicação é processar, organizar e exibir as pontuações de múltiplos usuários de maneira contínua, simulando um ambiente competitivo onde a performance do algoritmo é tão importante quanto o resultado que ele exibe.

---

## Visão Geral e Objetivo

A necessidade de manter tabelas de classificação (leaderboards) precisas e responsivas é um desafio comum em plataformas de jogos e sistemas de gamificação. O objetivo central deste projeto é construir um sistema de ranking em tempo real que seja capaz de lidar com um fluxo constante de novas pontuações. Em vez de reordenar toda a base de dados a cada nova entrada — o que geraria um custo computacional proibitivo em cenários de larga escala —, o sistema foi desenhado para atualizar as posições de forma imediata e otimizada, garantindo que a consulta aos melhores jogadores esteja sempre pronta e atualizada.

---

## Arquitetura e Estruturas de Dados

Para alcançar a eficiência necessária em um ambiente de tempo real, a arquitetura do projeto foi fundamentada na aplicação rigorosa de estruturas de dados avançadas. A escolha de cada estrutura foi baseada na sua complexidade temporal e adequação ao problema:

*   **Heap:** A estrutura de Heap (especificamente projetada para prioridades) foi implementada para atuar como o motor principal de ordenação do sistema. Sua natureza permite que a inserção de novas pontuações e a identificação do elemento de maior valor ocorram em complexidade de tempo logarítmica, $O(\log n)$. Isso previne os gargalos de processamento que ocorreriam ao realizar buscas ou ordenações lineares repetitivas em coleções de dados tradicionais.
*   **Lista Ordenada:** Atuando em conjunto com o Heap ou como estrutura de suporte para a apresentação de dados, a Lista Ordenada é utilizada para manter uma representação linear e estável dos dados de alta prioridade. Ela facilita a iteração sequencial e a renderização final das informações para o usuário, garantindo previsibilidade na formatação da saída do ranking.

---

## Funcionalidades Principais

O sistema foi modularizado para executar três operações fundamentais, descritas a seguir:

### Adição de Pontuações
O sistema oferece uma interface de entrada onde registros contendo a identificação do jogador e sua respectiva pontuação podem ser submetidos. Esta funcionalidade foi construída para aceitar inserções em massa ou inserções unitárias intermitentes. Ao receber um novo registro, o sistema imediatamente o aloca na estrutura de dados subjacente, preparando-o para o cálculo de posição sem interromper a disponibilidade de leitura do ranking.

### Atualização Dinâmica do Ranking
Esta é a funcionalidade central do motor lógico. A atualização não ocorre por meio de rotinas de varredura periódicas, mas sim de forma orientada a eventos. Assim que uma pontuação é adicionada, a estrutura de Heap reorganiza seus nós internos automaticamente. Isso significa que a hierarquia de liderança do sistema reflete o estado mais recente e absoluto dos dados em frações de segundo, proporcionando a verdadeira experiência de "tempo real".

### Exibição do Top 10
Para o usuário final, a extração de dados mais valiosa é o recorte dos melhores competidores. O sistema possui um módulo de consulta otimizado que extrai e formata os dez jogadores com as maiores pontuações absolutas. Devido ao design pré-ordenado das estruturas de dados utilizadas, esta requisição é executada com custo computacional mínimo, retornando a lista de forma imediata.

---

## Critérios de Avaliação e Conformidade Técnica

O desenvolvimento deste projeto foi pautado no cumprimento de requisitos técnicos estritos, assegurando a qualidade e a escalabilidade do código:

*   **Ordenação Dinâmica:** O sistema comprova a capacidade de assimilar novos valores aleatórios e reorganizar sua estrutura hierárquica sem a necessidade de intervenção manual ou scripts de reorganização externa.
*   **Atualização Eficiente:** O projeto atende ao requisito de performance ao evitar algoritmos de ordenação ineficientes para este contexto (como Bubble Sort ou Insertion Sort em arrays vastos). A gestão de estado através do Heap garante que o uso de CPU e memória permaneça estável mesmo com o crescimento da base de jogadores.
*   **Estrutura Correta:** O código-fonte demonstra uma separação clara de responsabilidades. A lógica de negócios, a implementação das estruturas de dados e a interface de apresentação estão isoladas e encapsuladas, facilitando manutenções futuras e demonstrando boas práticas de engenharia de software.
