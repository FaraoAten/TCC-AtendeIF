// Funções da tela de pesquisa de estudante dos usuários do tipo professor-pedagogia

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
                var btnE = document.createElement("button");
                var spn = document.createElement("span");
                var spnE = document.createElement("span");

                var textoNome = document.createTextNode("Nome: "+nome);
                var textoMat = document.createTextNode("Matrícula: "+matricula);
                var textoBtn = document.createTextNode("Marcar Atendimento");
                var textoBtnE = document.createTextNode("Editar Perfil");

                divNome.appendChild(textoNome);
                divMat.appendChild(textoMat);
                spn.appendChild(textoBtn);
                spnE.appendChild(textoBtnE);
                btn.appendChild(spn);
                btnE.appendChild(spnE);
                divMiniPai.appendChild(divNome);
                divMiniPai.appendChild(divMat);
                divMiniPai.appendChild(btn);
                divMiniPai.appendChild(btnE);
                divPai.appendChild(divMiniPai);

                divPai.classList.add("row", "justify-content-center", "my-5");
                divMiniPai.classList.add("col-11", "col-md-5", "col-lg-4", "border", "border-dark", "arredondado", "p-2", "maior14");
                divNome.classList.add("maior16");
                divMat.classList.add("maior16");
                btn.classList.add("col-12","btn", "btn-md", "arredondado", "border-dark", "sombra", "azul", "text-white", "mt-2", "maior14");
                btnE.classList.add("col-12", "btn", "btn-md", "arredondado", "border-dark", "sombra", "btn-success", "mt-2", "maior14");
                spn.classList.add("some");
                spnE.classList.add("some");

                spn.innerHTML += '&nbsp;&nbsp;';
                spnE.innerHTML += '&nbsp;&nbsp;';
                btn.innerHTML += '<i class="far fa-plus-square fa-lg"></i>';
                btnE.innerHTML += '<i class="fas fa-pencil-alt"></i>';

                btn.onclick = function () {
                    window.location.href = './atendimentosEstuProfPedag.html'; 
                    
                    sessionStorage.setItem('id_usuario', result[i].id_usuario); 
                    sessionStorage.setItem('nome', nome);
                };

                btnE.onclick = function(){
                    window.location.href = './editarPerfilEstuPP.html'; 

                    sessionStorage.setItem('id_usuario', result[i].id_usuario); 
                    sessionStorage.setItem('nome', nome); 
                    sessionStorage.setItem('num_matricula', matricula);
                };
                
                adiciona.appendChild(divPai);
            }
          }).catch(function(p){

            adiciona.innerHTML = "";

            var div = document.createElement("div");
            var h1 = document.createElement ("h1");

            var textoH1 = document.createTextNode("Sem Resultados");

            h1.appendChild(textoH1);

            div.innerHTML = '<i class="fas fa-search fa-7x"></i>';

            div.classList.add("text-secondary", "row", "justify-content-center", "mt-5", "text-center");
            h1.classList.add("text-secondary", "row", "justify-content-center", "mt-3");

            adiciona.appendChild(div);
            adiciona.appendChild(h1);
          });
    }else{
        adiciona.innerHTML = "";

        var div = document.createElement("div");
        var h1 = document.createElement ("h1");

        var textoH1 = document.createTextNode("Sem Resultados");

        h1.appendChild(textoH1);

        div.innerHTML = '<i class="fas fa-search fa-7x"></i>';
        div.classList.add("text-secondary", "row", "justify-content-center", "mt-5", "text-center");
        h1.classList.add("text-secondary", "row", "justify-content-center", "mt-3");
        
        adiciona.appendChild(div);
        adiciona.appendChild(h1);
    }
}

