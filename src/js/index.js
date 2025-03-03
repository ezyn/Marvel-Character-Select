/* 
OBJETIVO 1 - quando passar o mouse em cima do personagem temos que:
    
    - coloca a classe selecionado no personagem que passamos o mouse em cima para adicionar a animação nele

    - retirar a classe selecionado do personagem que estava selecionado.

OBJETIVO 2 - quando passar o mouse em cima do personagem, trocar a imagem e nome do personagem grande:

    - alterar a imagem do jogador 1
    - alterar o nome do jogador 1

OBJETIVO 3 - quando o jogador 1 der o click no personagem selecionado, aparecer a palavra SELECIONADO abaixo do nome do personagem e depois o jogador 2 fazer a seleção do personagem:

    - inserir a palavra SELECIONADO abaixo do nome do personagem
    - a seleção do jogador 1 ficar travada no personagem que clicou
    - apõs o jogador 1 clicar, automaticamente o jogador 2 pode selecionar o seu personagem e o processo ser o mesmo do objetivo 1 e 2
*/


const personagens = document.querySelectorAll('.personagem');
let jogador1Selecionado = false;
let jogador2Selecionado = false;
let personagemSelecionadoJogador1Id = null; // armazena o id do personagem selecionado pelo jogador 1

personagens.forEach((personagem) => {
    personagem.addEventListener('mouseenter', () => {

        const tagDoPersonagem = personagem.querySelector('.tag');
        const idSelecionado = personagem.attributes.id.value;

        if (!jogador1Selecionado) {

            //não deixar o jogador 1 escolher o mesmo personagem
            if (idSelecionado === 'ultron') return;

            // Adicionar 1P se o jogador 1 não selecionou um personagem
            tagDoPersonagem.innerText = '1P';
            tagDoPersonagem.classList.add("tag-ativa");

        } else if (jogador1Selecionado && !jogador2Selecionado) {

            //não deixar o jogador 2 escolher o mesmo personagem
            if (personagemSelecionadoJogador1Id === idSelecionado) return;

            // Adicionar 2P se o jogador 1 já selecionou um personagem e o jogador 2 ainda não
            tagDoPersonagem.innerText = '2P';
            tagDoPersonagem.classList.add("tag-ativa");

            // OBJETIVO 2 para jogador 2
            const imagemJogador2 = document.getElementById('personagem-jogador-2');
            imagemJogador2.src = `./src/imagens/${idSelecionado}.png`;

            const nomeJogador2 = document.querySelector('.personagem-jogador-2 .nome h2');
            nomeJogador2.innerText = personagem.getAttribute('data-name');

            //retirar a seleção do jogador 2 atual
            const personagemSelecionadoJogador2 = document.querySelector('.jogador-2-selecionado');
            if (personagemSelecionadoJogador2) {
                personagemSelecionadoJogador2.classList.remove('jogador-2-selecionado');
                personagemSelecionadoJogador2.querySelector(".tag").classList.remove('tag-ativa');
                personagemSelecionadoJogador2.querySelector(".tag").innerText = "";
            }

            //colocar a seleção no novo personagem do jogador 2
            personagem.classList.add('jogador-2-selecionado');
            return;
        }

        if (jogador1Selecionado && jogador2Selecionado) return;

        const personagemSelecionado = document.querySelector('.selecionado');
        if (personagemSelecionado) {
            personagemSelecionado.classList.remove('selecionado');
            personagemSelecionado.querySelector(".tag").classList.remove('tag-ativa');
            personagemSelecionado.querySelector(".tag").innerText = "";
        }

        personagem.classList.add('selecionado');

        // OBJETIVO 2 para jogador 1
        const imagemJogador1 = document.getElementById('personagem-jogador-1');
        imagemJogador1.src = `./src/imagens/${idSelecionado}.png`;

        const nomeJogador1 = document.getElementById('nome-jogador-1');
        nomeJogador1.innerHTML = personagem.getAttribute('data-name');
    });

    personagem.addEventListener('mouseleave', () => {
        const tagDoPersonagem = personagem.querySelector('.tag');
        if (!personagem.classList.contains('selecionado') && !personagem.classList.contains("jogador-2-selecionado")) {
            tagDoPersonagem.classList.remove('tag-ativa');
            tagDoPersonagem.innerText = "";
        }
    })

    personagem.addEventListener('click', () => {

        if (jogador1Selecionado && !jogador2Selecionado) {

            //bloquear o clique do personagem 2
            jogador2Selecionado = true;
            personagem.classList.add('selecionado');

            //OBETIVO 3 - criar uma tag "p" para colocar o "selecionado"
            const tagSelecionadoJogador2 = document.createElement('p');
            tagSelecionadoJogador2.innerText = '2P Selected';
            tagSelecionadoJogador2.classList.add('selecionado-tag');

            //colocar a tag abaixo do nome do personagem
            const nomeDoPersonagemJogador2 = personagem.querySelector("img").parentNode
            nomeDoPersonagemJogador2.appendChild(tagSelecionadoJogador2);

            personagem.querySelector(".tag").innerText = "2P";
            personagem.querySelector(".tag").classList.add("tag-ativa");

            return;
        }

        if (jogador1Selecionado) return;

        //bloquear o clique do personagem 1
        jogador1Selecionado = true;
        personagem.classList.add('selecionado');
        personagemSelecionadoJogador1Id = personagem.id; // salva o id do personagem selecionado pelo jogador 1

        //OBETIVO 3 - criar uma tag "p" para colocar o "selecionado"
        const tagSelecionado = document.createElement('p');
        tagSelecionado.innerText = '1P Selected';
        tagSelecionado.classList.add('selecionado-tag');

        //colocar a tag abaixo do nome do personagem
        const nomeDoPersonagem = personagem.querySelector("img").parentNode
        nomeDoPersonagem.appendChild(tagSelecionado);

        personagem.querySelector(".tag").innerText = "1P";
        personagem.querySelector(".tag").classList.add("tag-ativa");
    })
});