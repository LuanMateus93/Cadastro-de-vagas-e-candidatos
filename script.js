/*Escreva um programa em javascript que simule um sistema de vagas de emprego, onde é possível gerenciar as
vagas e adicionar candidatos às vagas. Ele deve atender aos seguintes requisitos:

- Ter um um menu onde é possível escolher entre as diferentes funcionalidades do sistema
    - Listar vagas disponíveis
    - Criar um nova vaga
    - Visualizar uma vaga
    - Inscrever um candidato em uma vaga
    - Excluir uma vaga
    - Sair
- A opção de listar as vagas deve mostrar o índice, o nome e a quantidade de candidatos inscritos de todas as vagas.
- A opção de criar uma nova vaga deve pedir um nome para a vaga, uma descrição e uma data limite, e também
deve pedir que o usuário confirme as informações antes de salvá-las.
- A opção de visualizar uma vaga deve pedir o índice da vaga e mostrar todas as informações dela: índice, nome,
descrição, data limite, quantidade de candidatos e o nome dos candidatos.
- A opção de inscrever um candidato em uma vaga de pedir o nome do candidato, o índice da vaga e então uma
confirmação exibindo as informações da vaga antes de salvar o candidato na vaga.
- A opção de excluir uma vaga deve pedir o índice da vaga, mostrar suas informações e pedir que o usuário confirme
a exclusão da vaga antes de realmente exclui-la.

Este é o exercício de revisão do módulo, então aproveite para utilizar todos os recursos vistos até agora sempre que
possível, como os objetos, arrays e funções.*/

let listaVagas = [];
let opcao = prompt('Escolha a opção desejada:\n1- Listar vagas disponíveis\n2- Criar uma nova vaga\n3- Visualizar uma vaga\n4- Inscrever um candidato em uma vaga\n5- Excluir uma vaga\n6- Sair');

if (opcao === '6') {
    alert('Fechando programa!!!')
}

while (opcao !== '6') {
    if (opcao === '1') {
        listarVagas();
    } else if (opcao === '2') {
        criarVaga();
    } else if (opcao === '3') {
        visualizarVaga();
    } else if (opcao === '4') {
        inscreverCandidato();
    } else if (opcao === '5') {
        excluirVaga();
    } else {
        alert('Opção inválida. Escolha uma opção válida.');
    }

    opcao = prompt('Escolha o que deseja fazer agora:\n1- Listar vagas disponíveis\n2- Criar uma nova vaga\n3- Visualizar uma vaga\n4- Inscrever um candidato em uma vaga\n5- Excluir uma vaga\n6- Sair');
}

function listarVagas() {
    if (listaVagas.length > 0) {
        let vagasInfo = 'Lista de Vagas Disponíveis:\n';
        listaVagas.forEach((vaga, indice) => {
            vagasInfo += `${indice} - ${vaga.nome} (${vaga.candidatos.length} candidatos)\n`;
        });
        alert(vagasInfo);
    } else {
        alert('Nenhuma vaga cadastrada.');
    }
}

function criarVaga() {
    let nome = prompt('Digite o nome da vaga:');
    let descricao = prompt('Digite a descrição da vaga:');
    let dataLimite = prompt('Digite a data limite da vaga (DD/MM/AAAA):');
    
    if (!isDateValidAndInRange(dataLimite)) {
        alert('Data limite inválida. A vaga não foi criada.');
        return;
    }

    let confirmacao = confirm('Confirme as informações:\nNome: ' + nome + '\nDescrição: ' + descricao + '\nData Limite: ' + dataLimite);

    if (confirmacao) {
        listaVagas.push({
            nome: nome,
            descricao: descricao,
            dataLimite: dataLimite,
            candidatos: []
        });
        alert('Vaga criada com sucesso!');
    } else {
        alert('Vaga não foi criada.');
    }
}

function visualizarVaga() {
    let indice = prompt('Digite o índice da vaga que deseja visualizar:');
    indice = parseInt(indice);

    if (isNaN(indice) || indice < 0 || indice >= listaVagas.length) {
        alert('Índice de vaga inválido.');
        return;
    }

    let vaga = listaVagas[indice];
    let candidatosInfo = vaga.candidatos.join('\n');

    let vagaInfo = `Vaga: ${vaga.nome}\nDescrição: ${vaga.descricao}\nData Limite: ${vaga.dataLimite}\nCandidatos:\n${candidatosInfo}`;
    alert(vagaInfo);
}

function inscreverCandidato() {
    let vagaIndice = prompt('Digite o índice da vaga em que deseja se candidatar:');
    vagaIndice = parseInt(vagaIndice);

    if (isNaN(vagaIndice) || vagaIndice < 0 || vagaIndice >= listaVagas.length) {
        alert('Índice de vaga inválido.');
        return;
    }

    let vaga = listaVagas[vagaIndice];
    let nomeCandidato = prompt('Digite o nome do candidato:');

    let confirmacao = confirm(`Confirme as informações:\nVaga: ${vaga.nome}\nCandidato: ${nomeCandidato}`);

    if (confirmacao) {
        vaga.candidatos.push(nomeCandidato);
        alert('Candidato inscrito com sucesso!');
    } else {
        alert('Candidato não foi inscrito.');
    }
}

function excluirVaga() {
    let indice = prompt('Digite o índice da vaga que deseja excluir:');
    indice = parseInt(indice);

    if (isNaN(indice) || indice < 0 || indice >= listaVagas.length) {
        alert('Índice de vaga inválido.');
        return;
    }

    let vaga = listaVagas[indice];

    let confirmacao = confirm(`Confirme a exclusão da vaga:\nNome: ${vaga.nome}\nDescrição: ${vaga.descricao}\nData Limite: ${vaga.dataLimite}\nCandidatos: ${vaga.candidatos.length}`);

    if (confirmacao) {
        listaVagas.splice(indice, 1);
        alert('Vaga excluída com sucesso!');
    } else {
        alert('Vaga não foi excluída.');
    }
}

function isDateValidAndInRange(dateString) {
    let regex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!regex.test(dateString)) {
        return false; // Data no formato incorreto
    }

    let parts = dateString.split('/');
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);

    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();
    let mesAtual = dataAtual.getMonth() + 1;
    let diaAtual = dataAtual.getDate();

    if (day < 1 || day > 31 || month < 1 || month > 12) {
        return false; // Data fora do intervalo válido
    }

    if (year < anoAtual || (year === anoAtual && month < mesAtual) || (year === anoAtual && month === mesAtual && day < diaAtual)) {
        return false; // Data no passado em relação à data atual
    }

    return true;
}
