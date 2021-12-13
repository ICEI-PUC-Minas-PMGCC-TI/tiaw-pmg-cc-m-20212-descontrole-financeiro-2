var categorias_gastos = {
    "categorias": [
        {
            "id": 1,
            "nome": "Conta de luz",
            "tipo": "básico"
        }, {
            "id": 2,
            "nome": "Conta de água e esgoto",
            "tipo": "básico"
        }, {
            "id": 3,
            "nome": "Conta de internet",
            "tipo": "básico"
        }, {
            "id": 4,
            "nome": "Conta de telefone/celular",
            "tipo": "básico"
        }, {
            "id": 5,
            "nome": "Moradia", // Inclui aluguel (caso tenha), condominio (caso tenha) e IPTU
            "tipo": "básico"
        }, {
            "id": 6,
            "nome": "Locomoção", // Inclui gastos com ônibus e carro (como gasolina, seguro, mecânico, IPVA etc)
            "tipo": "básico"
        }, {
            "id": 7,
            "nome": "Supermercado",
            "tipo": "básico"
        }, {
            "id": 8,
            "nome": "Alimentação",
            "tipo": "básico"
        }, {
            "id": 9,
            "nome": "Saúde",
            "tipo": "básico"
        }, {
            "id": 10,
            "nome": "Outros (essenciais)",
            "tipo": "básico"
        }, {
            "id": 11,
            "nome": "Lazer",
            "tipo": "não básico"
        }, {
            "id": 12,
            "nome": "Outros (não essenciais)",
            "tipo": "não básico"
        },
    ]
};

function leGastos () {
    let strGastos = localStorage.getItem('gastosSalvos');
    let objGastos = {};

    if (strGastos) {
        objGastos = JSON.parse (strGastos);
    }
    else {
        objGastos = { gastos: [ 
                        {id: 0, id_gasto: "0", valor: "0"}, 
                    ]};
    }

    return objGastos;
}

function salvaGastos (gastos) {
    localStorage.setItem ('gastosSalvos', JSON.stringify(gastos));
}

function incluirGasto() {
    // Ler os dados do localStorage
    let objGastos = leGastos();

    // Incluir um novo contato
    let strIdGasto = document.getElementById ('selectId').value;
    let strValor = document.getElementById ('inputValor').value;
    let novoGasto = {
        id: objGastos.gastos[objGastos.gastos.length-1].id + 1,
        id_gasto: strIdGasto,
        valor: strValor
    };
    objGastos.gastos.push (novoGasto);

    // Salvar os dados no localStorage novamente
    salvaGastos(objGastos);

    // Atualiza os dados da tela
    imprimeGastos();
}

function imprimeGastos() {
    let tabela = document.getElementById('imprimeGastosBody');
    let strHtml = '';
    let objGastos = leGastos();

    for (i = 0; i < objGastos.gastos.length; i++) {
        let nome = '';
        for (j = 0; j < categorias_gastos.categorias.length; j++) {
            if(objGastos.gastos[i].id_gasto == categorias_gastos.categorias[j].id) {
                nome = categorias_gastos.categorias[j].nome;
            }
        }
        if(objGastos.gastos[i].id_gasto != 0) {
            strHtml += `<tr><td>${objGastos.gastos[i].id}</td>
                            <td>${nome}</td>  
                            <td>${objGastos.gastos[i].valor}</td>
                        </tr>`
        }
    }
    tabela.innerHTML = strHtml;
}

function removeGasto() {
    // Ler os dados do localStorage
    let objGastos = leGastos();
    let gastoRemovido = { gastos: [ 
        {id: 0, id_gasto: "0", valor: "0"}, 
    ]};

    if(document.getElementById ('inputId').value != 0) {
        for (i = 1; i < objGastos.gastos.length; i++) {
            if(objGastos.gastos[i].id != document.getElementById ('inputId').value ) {   
                gastoRemovido.gastos.push (objGastos.gastos[i]);
            }
        }

        // Salvar os dados no localStorage novamente
        salvaGastos(gastoRemovido);
    }


    // Atualiza os dados da tela
    imprimeGastos();
}

function alteraGasto() {
    // Ler os dados do localStorage
    let objGastos = leGastos();
    let achou = 0;

    if(document.getElementById ('inputId').value != 0) {
        for (i = 1; i < objGastos.gastos.length && achou != 1; i++) {
            if(objGastos.gastos[i].id == document.getElementById ('inputId').value ) {   
                objGastos.gastos[i].id_gasto = document.getElementById ('selectId').value;
                objGastos.gastos[i].valor = document.getElementById ('inputValor').value;
                achou = 1;
            }
        }

        // Salvar os dados no localStorage novamente
        salvaGastos(objGastos);
    }

    // Atualiza os dados da tela
    imprimeGastos();
}

// Configura os botões
document.getElementById ('btnInsert').addEventListener ('click', incluirGasto);
document.getElementById ('btnUpdate').addEventListener ('click', alteraGasto);
document.getElementById ('btnDelete').addEventListener ('click', removeGasto);



