function leGanhosEGastos () {
    let strGanhos = localStorage.getItem('ganhosSalvos');
    let strGastos = localStorage.getItem('gastosSalvos');
    let objGanhos = {};
    let objGastos = {};
    let ganhos = 0;
    let gastos = 0;
    let resultado = 0;


    if (strGanhos && strGastos) {
        objGanhos = JSON.parse (strGanhos);
        objGastos = JSON.parse (strGastos);

        if (objGastos.gastos.length > 1 && objGanhos.ganhos.length > 1) {
            for (i = 1; i < objGastos.gastos.length; i++) {
                gastos += parseFloat(objGastos.gastos[i].valor);
            }
            for (i = 1; i < objGanhos.ganhos.length; i++) {
                ganhos += parseFloat(objGanhos.ganhos[i].valor);
            }
        }
        
    } 

    resultado = ganhos - gastos;

    console.log(`Gastos: ${gastos}, ganhos: ${ganhos}, resultado: ${resultado}`);

    return resultado;
}

function verificaNaoBasicos() {
    let strGastos = localStorage.getItem('gastosSalvos');
    let objGastos = {};
    let naoBasicos = { gastos: [ 
                    { id: '0',
                      id_gasto: '0', 
                      valor:'0'}, 
                    ]};
    let gasto = {};

    if (strGastos) {
        objGastos = JSON.parse (strGastos);

        if (objGastos.gastos.length > 1) {
            for (i = 1; i < objGastos.gastos.length; i++) {
                if (objGastos.gastos[i].id_gasto >= 11) {
                    gasto = { id: objGastos.gastos[i].id,
                              id_gasto: objGastos.gastos[i].id_gasto, 
                              valor: objGastos.gastos[i].valor };
                    naoBasicos.gastos.push(gasto);
                }
            }
        }
    }

    return naoBasicos;
}

function mostraSaldoERecomend() {
    let strGanhos = localStorage.getItem('ganhosSalvos');
    let strGastos = localStorage.getItem('gastosSalvos');
    let objGastos = JSON.parse (strGastos);
    let objGanhos = JSON.parse (strGanhos);
    let saldoBody = document.getElementById('saldoBody');
    let recomendBody = document.getElementById('recomendacoes');
    let recomend2Body = document.getElementById('recomendacoes2');
    let textoSaldo = '';
    let textoRecomend1 = '';
    let textoRecomend2 = '';
    let saldo = leGanhosEGastos();
    let naoBasicos = verificaNaoBasicos();

    if (strGanhos && strGastos && objGastos.gastos.length > 1 && objGanhos.ganhos.length > 1) {
        textoSaldo = `<h5 id="h5saldo">Seu saldo final ??: ${saldo}</h5>`;
        saldoBody.innerHTML = textoSaldo;

        if (saldo < 0) {
            textoRecomend1 = '<p>Seu saldo est?? negativo. ';
            console.log(naoBasicos.gastos);
            if (naoBasicos.gastos.length > 1) {
                textoRecomend1 += '?? recomendado que voc?? abra m??o de alguns dos gastos n??o essenciais at?? que seu saldo fique positivo.';
                textoRecomend2 += `<h5>Gastos n??o essenciais: </h5><table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                        <th scope="col">Id do Gasto</th>
                                        <th scope="col">Valor</th>
                                        </tr>
                                        </thead>
                                        <tbody>`;
                for (i = 1; i < naoBasicos.gastos.length; i++) {
                    textoRecomend2 += `<tr><td>${naoBasicos.gastos[i].id}</td>
                                        <td>${naoBasicos.gastos[i].valor}</td>
                                       </tr>`;
                }
                textoRecomend2 += `</tbody>
                                    </table>`;
                recomendBody.innerHTML = textoRecomend1;
                recomend2Body.innerHTML = textoRecomend2;

            } else {
                textoRecomend1 += 'Voc?? n??o tem gastos n??o essenciais, ent??o aqui v??o algumas recomenda????es: </p>';
                textoRecomend2 += '<ul><li>Tente economizar ??gua e luz, visando a diminui????o dessas contas</li>';
                textoRecomend2 += '<li>Caso tenha um plano de celular, tente achar um que se adeque ?? sua situa????o financeira e que tamb??m atenda ??s suas necessidade</li>';
                textoRecomend2 += '<li>Caso tenha carro pr??prio, considere substituir seu uso pelo uso do transporte p??blico</li>';
                textoRecomend2 += '<li>Evite usar o cart??o de cr??dito</li>';
                textoRecomend2 += '<li>Procure ajuda de um profissional da psicologia. A sua situa????o financeira pode ter como causa um fator psicol??gico e, mesmo que n??o seja esse o caso, essa ?? uma situa????o que pode gerar muito estresse, logo, o apoio psicol??gico ?? fundamental</li></ul>';
                recomendBody.innerHTML = textoRecomend1;
                recomend2Body.innerHTML = textoRecomend2;
            }
        } else {
            if (saldo > 0) {
                textoRecomend1 += '<p>Seu saldo est?? positivo. </p>';
                textoRecomend2 += '<p>?? recomendado que, se poss??vel, voc?? guarde uma parte do dinheiro que sobrou para uma eventual situa????o de emerg??ncia.</p>';
                recomendBody.innerHTML = textoRecomend1;
                recomend2Body.innerHTML = textoRecomend2;
            }
        }
    } else {
        textoSaldo = '<h5>Para que seja gerado o seu saldo final, voc?? deve adicionar pelo menos um ganho e um gasto</h5>';
        saldoBody.innerHTML = textoSaldo;
    }
}