window.onload = async function(){
    var main = document.getElementById('main');
    await listaNotificacoes('mensagem').then(function(result){
        main.innerHTML = "";
        for (let i = 0; i < result.length; i++) {
            const titulo = result[i].titulo;
            const corpo = result[i].corpo;
            var divPai = document.createElement("div");
            var divMiniPai = document.createElement("div");
            var divTitulo = document.createElement("div");
            var divCorpo = document.createElement("div");
            var textoTitulo = document.createTextNode(titulo);
            var textoCorpo = document.createTextNode(corpo);
            divTitulo.appendChild(textoTitulo);
            divCorpo.appendChild(textoCorpo);
            divMiniPai.appendChild(divTitulo);
            divMiniPai.appendChild(divCorpo);
            divPai.appendChild(divMiniPai);
            divPai.classList.add("row", "justify-content-center");
            divMiniPai.classList.add("col-12", "col-md-10", "border", "border-dark", "arredondado", "p-3", "maior14", "mb-3", "mb-md-4");
            divTitulo.classList.add("mb-md-2", "mb-3","fw-bold", "maior20");
            main.appendChild(divPai);
        }
    }).catch(function(p){
        main.innerHTML = "";
        var h1 = document.createElement ("h1");
        var textoH1 = document.createTextNode("Sem Notificações");
        h1.appendChild(textoH1);
        h1.classList.add("text-secondary", "row", "justify-content-center", "mt-5");
        main.appendChild(h1);
  });
}

function listaNotificacoes(theUrl){
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