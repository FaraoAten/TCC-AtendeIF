// Funções da tela de notificações dos usuários do tipo professor

window.onload = async function(){

    var main = document.getElementById('main');

    await ajaxGetHeaderAuthorization('mensagem').then(function(result){

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
            divTitulo.classList.add("mb-md-2", "mb-3", "fw-bold", "maior20", "border-bottom", "border-secundary", "border-2");
            
            main.appendChild(divPai);
        }
    }).catch(function(p){
        main.innerHTML = "";

        var div = document.createElement("div");
        var h1 = document.createElement ("h1");

        var textoH1 = document.createTextNode("Sem Notificações");

        h1.appendChild(textoH1);

        div.innerHTML = '<i class="fas fa-bell fa-7x"></i>';

        div.classList.add("text-secondary", "row", "justify-content-center", "mt-5", "text-center");
        h1.classList.add("text-secondary", "row", "justify-content-center", "mt-3");
        
        main.appendChild(div);
        main.appendChild(h1);
  });
}

