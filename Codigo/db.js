function leGanhos () {
    let strGanhos = localStorage.getItem('ganhosSalvos');
    let objGanhos = {};

    if (strGanhos) {
        objGanhos = JSON.parse (strGanhos);
    }
    else {
        objGanhos = { ganhos: [ 
                        {id_ganho: "iniciarlocalstorage", valor: "0"}, 
                    ]};
    }

    return objGanhos;
}

function salvaGanhos (ganhos) {
    localStorage.setItem ('ganhosSalvos', JSON.stringify(ganhos));
}

function incluirGanho() {
    // Ler os dados do localStorage
    let objGanhos = leGanhos();

    // Incluir um novo contato
    let strIdGanho = document.getElementById ('inputId').value;
    let strValor = document.getElementById ('inputValor').value;

    if (strIdGanho != '' && strValor != '') {
        let novoGasto = {
            id_ganho: strIdGanho,
            valor: strValor
        };
        objGanhos.ganhos.push (novoGasto);
    
        // Salvar os dados no localStorage novamente
        salvaGanhos(objGanhos);
    
        // Atualiza os dados da tela
        imprimeGanhos();
    }

}

function imprimeGanhos() {
    let tabela = document.getElementById('imprimeGanhosBody');
    let strHtml = '';
    let objGanhos = leGanhos();

    for (i = 0; i < objGanhos.ganhos.length; i++) {
        if(objGanhos.ganhos[i].id_ganho != 'iniciarlocalstorage') {
            strHtml += `<tr><td>${objGanhos.ganhos[i].id_ganho}</td> 
                            <td>${objGanhos.ganhos[i].valor}</td>
                        </tr>`
        }
    }
    tabela.innerHTML = strHtml;
}

function removeGanho() {
    // Ler os dados do localStorage
    let objGanhos = leGanhos();
    let ganhoRemovido = { ganhos: [ 
        {id_ganho: "iniciarlocalstorage", valor: "0"}, 
    ]};

    if(document.getElementById ('inputId').value != "iniciarlocalstorage") {
        for (i = 1; i < objGanhos.ganhos.length; i++) {
            if(objGanhos.ganhos[i].id_ganho != document.getElementById ('inputId').value ) {   
                ganhoRemovido.ganhos.push (objGanhos.ganhos[i]);
            }
        }

        // Salvar os dados no localStorage novamente
        salvaGanhos(ganhoRemovido);
    }


    // Atualiza os dados da tela
    imprimeGanhos();
}

function alteraGanho() {
    // Ler os dados do localStorage
    let objGanhos = leGanhos();
    let achou = 0;

    if(document.getElementById ('inputId').value != 'iniciarlocalstorage') {
        for (i = 1; i < objGanhos.ganhos.length && achou != 1; i++) {
            if(objGanhos.ganhos[i].id_ganho == document.getElementById ('inputId').value ) {   
                objGanhos.ganhos[i].valor = document.getElementById ('inputValor').value;
                achou = 1;
            }
        }

        // Salvar os dados no localStorage novamente
        salvaGanhos(objGanhos);
    }

    // Atualiza os dados da tela
    imprimeGanhos();
}

// Configura os botões
document.getElementById ('btnInsert').addEventListener ('click', incluirGanho);
document.getElementById ('btnUpdate').addEventListener ('click', alteraGanho);
document.getElementById ('btnDelete').addEventListener ('click', removeGanho);



