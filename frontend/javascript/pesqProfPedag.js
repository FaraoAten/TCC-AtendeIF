async function pesquisa(){
    var pesquisa = document.getElementById('pesqEstu').value;
    var adiciona = document.getElementById('adiciona');
    if(pesquisa != null && pesquisa != ""){
        await pesquisaEstudante("usuario/"+pesquisa).then(function(result){
            adiciona.innerHTML = "";
            for (let i = 0; i < result.length; i++) {
                const nome = result[i].nome;
                const matricula = result[i].num_matricula;
                var divPai = document.createElement("div");
                var divMiniPai = document.createElement("div");
                var divNome = document.createElement("div");
                var divMat = document.createElement("div");
                var btn = document.createElement("button");
                var btnC = document.createElement("button");
                var btnE = document.createElement("button");
                var spn = document.createElement("span");
                var spnC = document.createElement("span");
                var spnE = document.createElement("span");
                var textoNome = document.createTextNode("Nome: "+nome);
                var textoMat = document.createTextNode("Matrícula: "+matricula);
                var textoBtn = document.createTextNode("Atendimentos do Estudante");
                var textoBtnC = document.createTextNode("Cadastrar Atendimento");
                var textoBtnE = document.createTextNode("Editar Perfil");
                divNome.appendChild(textoNome);
                divMat.appendChild(textoMat);
                spn.appendChild(textoBtn);
                spnC.appendChild(textoBtnC);
                spnE.appendChild(textoBtnE);
                btn.appendChild(spn);
                btnC.appendChild(spnC);
                btnE.appendChild(spnE);
                divMiniPai.appendChild(divNome);
                divMiniPai.appendChild(divMat);
                divMiniPai.appendChild(btn);
                divMiniPai.appendChild(btnC);
                divMiniPai.appendChild(btnE);
                divPai.appendChild(divMiniPai);
                divPai.classList.add("row", "justify-content-center", "my-5");
                divMiniPai.classList.add("col-11", "col-md-5", "col-lg-4", "border", "border-dark", "arredondado", "p-2", "maior14");
                divNome.classList.add("maior16", "text-center");
                divMat.classList.add("maior16", "text-center");
                btn.classList.add("col-12", "btn", "btn-md", "arredondado", "border-dark", "sombra", "azul", "text-white", "mt-2", "maior14");
                btnC.classList.add("col-12", "btn", "btn-md", "arredondado", "border-dark", "sombra", "azul", "text-white", "mt-2", "maior14");
                btnE.classList.add("col-12", "btn", "btn-md", "arredondado", "border-dark", "sombra", "btn-success", "mt-2", "maior14");
                spn.classList.add("some");
                spnC.classList.add("some");
                spnE.classList.add("some");
                spn.innerHTML += '&nbsp;&nbsp;';
                spnC.innerHTML += '&nbsp;&nbsp;';
                spnE.innerHTML += '&nbsp;&nbsp;';
                btn.innerHTML += '<i class="far fa-address-book fa-lg"></i></i>';
                btnC.innerHTML += '<i class="far fa-calendar-check fa-lg"></i>';
                btnE.innerHTML += '<i class="fas fa-pencil-alt"></i>';
                btn.onclick = function () {window.location.href = './atendimentosEstuProfPedag.html'; localStorage.setItem('id_usuario', result[i].id_usuario); localStorage.setItem('nome', nome);}
                btnC.onclick = function(){window.location.href = './cadastroAtendimentoPP.html'; localStorage.setItem('id_usuario', result[i].id_usuario); localStorage.setItem('nome', nome);};
                btnE.onclick = function(){window.location.href = './editarPerfilEstuPP.html'; localStorage.setItem('id_usuario', result[i].id_usuario); localStorage.setItem('nome', nome); localStorage.setItem('num_matricula', matricula);};
                adiciona.appendChild(divPai);
            }
          }).catch(function(p){
                adiciona.innerHTML = "";
                var h1 = document.createElement ("h1");
                var textoH1 = document.createTextNode("Sem Resultados");
                h1.appendChild(textoH1);
                h1.classList.add("text-secondary", "row", "justify-content-center", "mt-5");
                adiciona.appendChild(h1);
          });
    }else{
        adiciona.innerHTML = "";
        var h1 = document.createElement ("h1");
        var textoH1 = document.createTextNode("Sem Resultados");
        h1.appendChild(textoH1);
        h1.classList.add("text-secondary", "row", "justify-content-center", "mt-5");
        adiciona.appendChild(h1);
    }
}

function pesquisaEstudante(theUrl){
    const myRequest = BASE_URL+theUrl;
    return new Promise((resolve,reject) => {
            $.getJSON(myRequest,  function(data){
                resolve(data);
            }).fail(function(jqXMLHttpRequest,textStatus,errorThrown) { reject() });
    });
}