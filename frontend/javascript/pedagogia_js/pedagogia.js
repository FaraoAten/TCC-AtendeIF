// Funções da tela de principal dos usuários do tipo pedagogia (Pesquisar estudante)

async function pesquisa(){

    var pesquisa = document.getElementById('pesqEstu').value;
    var adiciona = document.getElementById('adiciona');

    if(pesquisa != null && pesquisa != ""){

        await ajaxGet("usuario/"+pesquisa).then(function(result){

            adiciona.innerHTML = "";

            for (let i = 0; i < result.length; i++) {

                const nome = result[i].nome;
                const matricula = result[i].num_matricula;

                var divPai = document.createElement("div");
                var divMiniPai = document.createElement("div");
                var divNome = document.createElement("div");
                var divMat = document.createElement("div");
                var btn = document.createElement("button");

                var textoNome = document.createTextNode("Nome: "+nome);
                var textoMat = document.createTextNode("Matrícula: "+matricula);
                var textoBtn = document.createTextNode("Editar Perfil");

                divNome.appendChild(textoNome);
                divMat.appendChild(textoMat);
                btn.appendChild(textoBtn);
                divMiniPai.appendChild(divNome);
                divMiniPai.appendChild(divMat);
                divMiniPai.appendChild(btn);
                divPai.appendChild(divMiniPai);

                divPai.classList.add("row", "justify-content-center", "my-5");
                divMiniPai.classList.add("col-11", "col-md-5", "col-lg-4", "border", "border-dark", "arredondado", "p-2", "maior14");
                divNome.classList.add("maior16");
                divMat.classList.add("maior16");
                btn.classList.add("col-12", "btn", "btn-md", "arredondado", "border-dark", "sombra", "btn-success", "mt-2", "maior14");
                
                btn.innerHTML += '&nbsp;&nbsp;<i class="fas fa-pencil-alt"></i>';

                btn.onclick = function(){window.location.href = './editarPerfilEstu.html'; sessionStorage.setItem('id_usuario', result[i].id_usuario); sessionStorage.setItem('nome', result[i].nome); sessionStorage.setItem('num_matricula', result[i].num_matricula);};
                
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
