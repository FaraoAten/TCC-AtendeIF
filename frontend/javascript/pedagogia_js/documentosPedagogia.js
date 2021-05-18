var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false,
    focus: true
  });

window.onload = function () {
    telaDocumentos();
}

async function telaDocumentos(){
    var adiciona = document.getElementById('adiciona');
    await listaDocumentos('urls').then(function(result){
        adiciona.innerHTML = "";
        for (let i = 0; i < result.length; i++) {
            const nomeDocumento = result[i].nome_arquivo;
            var divColuna = document.createElement("div");
            var divDoc = document.createElement("div");
            var aDoc = document.createElement("a");
            var divBtn = document.createElement("div");
            var divLinhaInterna = document.createElement("div");
            var btn = document.createElement("button");
            var textoDoc = document.createTextNode(nomeDocumento);
            aDoc.appendChild(textoDoc);
            divDoc.appendChild(aDoc);
            divBtn.appendChild(btn);
            divLinhaInterna.appendChild(divBtn);
            divLinhaInterna.appendChild(divDoc);
            divColuna.appendChild(divLinhaInterna);
            divColuna.classList.add("col-11", "col-md-5", "col-lg-3", "border", "border-dark", "arredondado", "p-2", "maior14", "mx-3", "mb-3", "mb-md-4", "documeto");
            btn.classList.add("btn", "btn-sm", "maior14", "ms-1", "ms-md-2", "ms-lg-0", "ms-xl-2");
            divLinhaInterna.classList.add("row");
            divBtn.classList.add("col-2");
            aDoc.classList.add("text-dark")
            divDoc.classList.add("col-10", "maior14", "pt-1", "pt-md-2", "pt-lg-1");
            btn.innerHTML = '<i class="far fa-trash-alt"></i>';
            aDoc.href=result[i].url;
            btn.onclick = function(){sessionStorage.setItem('id_urls', result[i].id_urls); deletarDocumento();};
            adiciona.appendChild(divColuna);
        }
    }).catch(function(p){
        adiciona.innerHTML = "";
        var div = document.createElement("div");
        var h1 = document.createElement ("h1");
        var textoH1 = document.createTextNode("Sem Documentos Publicados");
        h1.appendChild(textoH1);
        div.innerHTML = '<i class="far fa-file-alt fa-7x"></i>';
        div.classList.add("text-secondary", "row", "justify-content-center", "mt-5", "text-center");
        h1.classList.add("text-secondary", "row", "justify-content-center", "mt-3");
        adiciona.appendChild(div);
        adiciona.appendChild(h1);
    });
}

function cadastrarDocumento(){
    showMod('confirmacao',`Por favor confirme se o documento a ser publicado está correto.<br/><br/>Documento: ${insereDocumento.value}`);
    showMod('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)" data-bs-dismiss="modal">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>')
    myModal.show();
}

function deletarDocumento(){
    showMod('confirmacao',`Tem certeza de que quer deletar esse documento?`);
    showMod('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmarDelete(true)" data-bs-dismiss="modal">Sim</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmarDelete(false)" data-bs-dismiss="modal">Não</button>')
    myModal.show();
}

async function confirmar (confirm) {
    if(confirm){
        await insereDoc("urls").then(function(result){
            limpar(["insereDocumento"], 'documentos');
            window.location.reload();
          });
    }else{
        limpar(["insereDocumento"], 'documentos');
    }
}

async function confirmarDelete (confirm) {
    if(confirm){
        var id = {};
        id.id_urls = sessionStorage.getItem('id_urls');
        await deletaDoc("urls",id).then(function(result){
            telaDocumentos();
          });
    }
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

async function insereDoc (theUrl){
    const myRequest = BASE_URL+theUrl;
    var formData = new FormData();
    formData.append('URL', $('#insereDocumento')[0].files[0]);
    formData.append('tipo', 2);

    $.ajax({
          url : myRequest,
          type : 'POST',
          data : formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false,  // tell jQuery not to set contentType
    });
  }

async function deletaDoc (theUrl, body){
    const myRequest = BASE_URL+theUrl;
    var ret = await jQuery.ajax({
        type: 'DELETE',
        encoding:"UTF-8",
        dataType: 'json',
        contentType: 'application/json',
        url: myRequest,
        data:JSON.stringify(body),
    });

    return ret;
}



