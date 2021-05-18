window.onload = function () {
    telaDocumentos();
}

async function telaDocumentos(){
    var main = document.getElementById('main');
    await listaDocumentos('urls').then(function(result){
        main.innerHTML = "";
        for (let i = 0; i < result.length; i++) {
            const nomeDocumento = result[i].nome_arquivo;
            var divColuna = document.createElement("div");
            var divDoc = document.createElement("div");
            var aDoc = document.createElement("a");
            var textoDoc = document.createTextNode(nomeDocumento);
            aDoc.appendChild(textoDoc);
            divDoc.appendChild(aDoc);
            divColuna.appendChild(divDoc);
            divColuna.classList.add("col-11", "col-md-5", "col-lg-3", "border", "border-dark", "arredondado", "p-2", "maior14", "mx-3", "mb-3", "mb-md-4", "documeto");
            aDoc.classList.add("text-dark")
            divDoc.classList.add("col-12", "maior14", "pt-1", "pt-md-2", "pt-lg-1");
            aDoc.href=result[i].url;
            main.appendChild(divColuna);
        }
    }).catch(function(p){
        main.innerHTML = "";
        var div = document.createElement("div");
        var h1 = document.createElement ("h1");
        var textoH1 = document.createTextNode("Sem Documentos Publicados");
        h1.appendChild(textoH1);
        div.innerHTML = '<i class="far fa-file-alt fa-7x"></i>';
        div.classList.add("text-secondary", "row", "justify-content-center", "mt-5", "text-center");
        h1.classList.add("text-secondary", "row", "justify-content-center", "mt-3");
        main.appendChild(div);
        main.appendChild(h1);
    });
}

function listaDocumentos(theUrl){
    const myRequest = BASE_URL+theUrl;
    return new Promise((resolve,reject) => {
        $.ajax({
            url: myRequest,
            type: "GET",
            success: function(result) {resolve(result)},
            error: function(erro) {reject(erro)}
         });
    });
}






