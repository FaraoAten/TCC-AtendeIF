var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false,
    focus: true
  });

window.onload = function () {
    if(localStorage.getItem('primeiroLogin')==0){

          myModal.show();

          localStorage.setItem('primeiroLogin', 1);
          
          primeiroLogin('usuario/primeiroLogin');
    }else{
        telaAtendimentoEstu();
    }
}

async function telaAtendimentoEstu(){
    var main = document.getElementById('main');
    await listaAtendimentoEstu('atendimento/estudante').then(function(result){
        main.innerHTML = "";
        var chaves = Object.keys(result);
        for (let i = 0; i < chaves.length; i++) {
            const chave = chaves[i];
            var divLinha = document.createElement("div");
            var divColuna = document.createElement("div");
            var str = document.createElement("strong");
            var textoChave = document.createTextNode(chave);
            str.appendChild(textoChave);
            divColuna.appendChild(str);
            divLinha.appendChild(divColuna);
            for (let j = 0; j < result[chave].length; j++) {
                const elemento = result[chave][j];
                var divCol = document.createElement("div");
                var divNome = document.createElement("div");
                var divDisciplina = document.createElement("div");
                var divLocal = document.createElement("div");
                var divHora = document.createElement("div");
                var btnPCancela = document.createElement("button");
                var strNome = document.createElement("strong");
                var strDisciplina = document.createElement("strong");
                var strLocal = document.createElement("strong");
                var strHora = document.createElement("strong");
                var textoNome = document.createTextNode("Professor: ");
                var textoDisciplina = document.createTextNode("Disciplina: ");
                var textoLocal = document.createTextNode("Onde: ");
                var textoHora = document.createTextNode("Horas: ");
                var textoBtnPC = document.createTextNode("Pedir Cancelamento");
                strNome.appendChild(textoNome);
                strDisciplina.appendChild(textoDisciplina);
                strLocal.appendChild(textoLocal);
                strHora.appendChild(textoHora);
                divNome.appendChild(strNome);
                divDisciplina.appendChild(strDisciplina);
                divLocal.appendChild(strLocal);
                divHora.appendChild(strHora);
                btnPCancela.appendChild(textoBtnPC);
                divCol.appendChild(divNome);
                divCol.appendChild(divDisciplina);
                divCol.appendChild(divLocal);
                divCol.appendChild(divHora);
                divCol.appendChild(btnPCancela);
                divLinha.appendChild(divCol);
                divCol.classList.add("col-12", "col-md-6", "col-lg-4", "border", "border-2", "border-dark", "arredondado", "p-2", "maior14", "mt-3", "mx-3");
                if(elemento.status==2){
                    btnPCancela.classList.add("col-md", "col", "btn", "btn-md", "arredondado", "border-dark", "sombra", "azul", "text-white", "mt-2", "ms-1", "maior14", "disabled");
                }else{
                    btnPCancela.classList.add("col-md", "col", "btn", "btn-md", "arredondado", "border-dark", "sombra", "azul", "text-white", "mt-2", "ms-1", "maior14");
                }
                divNome.innerHTML+=elemento.nome;
                divDisciplina.innerHTML+=elemento.materia;
                divLocal.innerHTML+=elemento.local;
                divHora.innerHTML+=elemento.horario;
                btnPCancela.innerHTML+='&nbsp;&nbsp;<i class="fas fa-ban fa-lg"></i>';
                btnPCancela.onclick = function(){
                    localStorage.setItem('id_atendimento', elemento.id);
                    localStorage.setItem('id_usuario', elemento.id_usuario); 
                    showMod('confirmacao','Por favor confirme o pedido de cancelamento.');
                    showMod('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)" data-bs-dismiss="modal">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>');
                    myModal.show();
                };
            }
            divLinha.classList.add("row", "justify-content-center", "mb-3", "maior28");
            divColuna.classList.add("border-2", "border-bottom", "border-dark", "col-12", "col-md-6", "col-lg-9", "text-center");
            main.appendChild(divLinha);
        }
    }).catch(function(p){
        main.innerHTML = "";
        var h1 = document.createElement ("h1");
        var textoH1 = document.createTextNode("Sem Atendimentos Marcados");
        h1.appendChild(textoH1);
        h1.classList.add("text-secondary", "row", "justify-content-center", "mt-5");
        main.appendChild(h1);
  });
}

function listaAtendimentoEstu(theUrl){
    const myRequest = BASE_URL+theUrl;
    return new Promise((resolve,reject) => {
        $.ajax({
            url: myRequest,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('authorization', localStorage.getItem('authorization'));},
            success: function(result) {resolve(result)},
            error: function(erro) {reject(erro)}
         });
    });
}

function confirmar (confirm) {
    if(confirm){ 
        montaPCancelar();
    }
}

async function montaPCancelar(){
    await montarMsg("atendimento/mensagem").then(async function(result){
        atendimento = {};
        atendimento.id_atendimento = localStorage.getItem('id_atendimento');
        atendimento.status_cancelamento = 2;
        await cancelar('atendimento/cancelar', atendimento);

        var mensagem = {};
        mensagem.titulo = 'Solicitação de cancelamento de atendimento';
        mensagem.corpo = `Foi solicitado o cancelamento do atendimento do dia ${result.dataMsg} com o(a) estudante ${result.nomeMsg}, matrícula: ${result.matriculaMsg}.`;
        mensagem.id_remetente = localStorage.getItem('authorization');
        mensagem.id_destinatario = localStorage.getItem('id_usuario');
        mensagem.id_atendimento = localStorage.getItem('id_atendimento');
        await enviaMensagem('mensagem', mensagem);

        await telaAtendimentoEstu();
    });
}

function montarMsg(theUrl){
    const myRequest = BASE_URL+theUrl;
    return new Promise((resolve,reject) => {
        $.ajax({
            url: myRequest,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('id_atendimento', localStorage.getItem('id_atendimento'));},
            success: function(result) {resolve(result)},
            error: function(erro) {reject(erro)}
         });
    });
}

async function cancelar (theUrl, body){
    const myRequest = BASE_URL+theUrl;
    await jQuery.ajax({
        type: 'PUT',
        encoding:"UTF-8",
        dataType: 'json',
        contentType: 'application/json',
        url: myRequest,
        data:JSON.stringify(body),
    });
  }

  async function enviaMensagem (theUrl, body){
    const myRequest = BASE_URL+theUrl;
    await jQuery.ajax({
        type: 'POST',
        encoding:"UTF-8",
        dataType: 'json',
        contentType: 'application/json',
        url: myRequest,
        data:JSON.stringify(body),
    });
  }

  async function primeiroLogin (theUrl){
    const myRequest = BASE_URL+theUrl;
    await jQuery.ajax({
        type: 'PUT',
        encoding:"UTF-8",
        dataType: 'json',
        contentType: 'application/json',
        url: myRequest,
        data:JSON.stringify({id_usuario:localStorage.getItem('authorization'),primeiro_login:1}),
    });
  }
