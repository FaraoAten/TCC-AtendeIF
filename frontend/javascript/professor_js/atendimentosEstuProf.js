window.onload = async function (){
    var main = document.getElementById('main');
    var topo = document.getElementById('topo');
    var colTopo = document.createElement('div');
    var textoNome = document.createTextNode(sessionStorage.getItem('nome'));
    colTopo.appendChild(textoNome);
    topo.appendChild(colTopo);
    colTopo.classList.add("text-center", "fw-bold", "col-md-5", "col-lg-7", "col-12", "ms-lg-4", "maior28");
    await listaAtendimentoEstuProf('atendimento/professorEstudante').then(function(result){
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
                var strNome = document.createElement("strong");
                var strDisciplina = document.createElement("strong");
                var strLocal = document.createElement("strong");
                var strHora = document.createElement("strong");
                var textoNome = document.createTextNode("Professor: ");
                var textoDisciplina = document.createTextNode("Disciplina: ");
                var textoLocal = document.createTextNode("Onde: ");
                var textoHora = document.createTextNode("Horas: ");
                strNome.appendChild(textoNome);
                strDisciplina.appendChild(textoDisciplina);
                strLocal.appendChild(textoLocal);
                strHora.appendChild(textoHora);
                divNome.appendChild(strNome);
                divDisciplina.appendChild(strDisciplina);
                divLocal.appendChild(strLocal);
                divHora.appendChild(strHora);
                divCol.appendChild(divNome);
                divCol.appendChild(divDisciplina);
                divCol.appendChild(divLocal);
                divCol.appendChild(divHora);
                divLinha.appendChild(divCol);
                divCol.classList.add("col-11", "col-md-6", "col-lg-3", "border", "border-2", "border-dark", "arredondado", "p-2", "maior14", "mt-3", "mx-3");
                divNome.classList.add("maior16");
                divDisciplina.classList.add("maior16");
                divHora.classList.add("maior16");
                divLocal.classList.add("maior16");
                divNome.innerHTML+=elemento.nome;
                divDisciplina.innerHTML+=elemento.materia;
                divLocal.innerHTML+=elemento.local;
                divHora.innerHTML+=elemento.horario;
            }
            divLinha.classList.add("row", "justify-content-center", "mb-3", "maior28");
            divColuna.classList.add("border-2", "border-bottom", "border-dark", "col-11", "col-md-6", "col-lg-9", "text-center", "cinza");
            main.appendChild(divLinha);
        }
    }).catch(function(p){
        main.innerHTML = "";
        var div = document.createElement("div");
        var h1 = document.createElement ("h1");
        var textoH1 = document.createTextNode("Sem Atendimentos Marcados");
        h1.appendChild(textoH1);
        div.innerHTML = '<i class="fas fa-chalkboard-teacher fa-7x"></i>';
        div.classList.add("text-secondary", "row", "justify-content-center", "mt-5", "text-center");
        h1.classList.add("text-secondary", "row", "justify-content-center", "mt-3");
        main.appendChild(div);
        main.appendChild(h1);
  });
}

function listaAtendimentoEstuProf(theUrl){
    const myRequest = BASE_URL+theUrl;
    return new Promise((resolve,reject) => {
        $.ajax({
            url: myRequest,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('id_usuario', sessionStorage.getItem('id_usuario'));},
            success: function(result) {resolve(result)},
            error: function(erro) {reject(erro)}
         });
    });
}