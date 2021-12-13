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
        textoSaldo = `<h5 id="h5saldo">Seu saldo final é: ${saldo}</h5>`;
        saldoBody.innerHTML = textoSaldo;

        if (saldo < 0) {
            textoRecomend1 = '<p>Seu saldo está negativo. ';
            console.log(naoBasicos.gastos);
            if (naoBasicos.gastos.length > 1) {
                textoRecomend1 += 'É recomendado que você abra mão de alguns dos gastos não essenciais até que seu saldo fique positivo.';
                textoRecomend2 += `<h5>Gastos não essenciais: </h5><table class="table">
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
                textoRecomend1 += 'Você não tem gastos não essenciais, então aqui vão algumas recomendações: </p>';
                textoRecomend2 += '<ul><li>Tente economizar água e luz, visando a diminuição dessas contas</li>';
                textoRecomend2 += '<li>Caso tenha um plano de celular, tente achar um que se adeque à sua situação financeira e que também atenda às suas necessidade</li>';
                textoRecomend2 += '<li>Caso tenha carro próprio, considere substituir seu uso pelo uso do transporte público</li>';
                textoRecomend2 += '<li>Evite usar o cartão de crédito</li>';
                textoRecomend2 += '<li>Procure ajuda de um profissional da psicologia. A sua situação financeira pode ter como causa um fator psicológico e, mesmo que não seja esse o caso, essa é uma situação que pode gerar muito estresse, logo, o apoio psicológico é fundamental</li></ul>';
                recomendBody.innerHTML = textoRecomend1;
                recomend2Body.innerHTML = textoRecomend2;
            }
        } else {
            if (saldo > 0) {
                textoRecomend1 += '<p>Seu saldo está positivo. </p>';
                textoRecomend2 += '<p>É recomendado que, se possível, você guarde uma parte do dinheiro que sobrou para uma eventual situação de emergência.</p>';
                recomendBody.innerHTML = textoRecomend1;
                recomend2Body.innerHTML = textoRecomend2;
            }
        }
    } else {
        textoSaldo = '<h5>Para que seja gerado o seu saldo final, você deve adicionar pelo menos um ganho e um gasto</h5>';
        saldoBody.innerHTML = textoSaldo;
    }
}