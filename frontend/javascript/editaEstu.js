//Pega as infos do cadastro
function editarEstu(header){

    var form = document.getElementById("editarPerfilEstu");
    if (form.checkValidity()) {
        function handleForm(event) { event.preventDefault();} 
        form.addEventListener('submit', handleForm);

        var usuario = {}

        usuario.id_usuario = header;

        var nomeEditEstu = document.getElementById("nomeEditEstu");
        usuario.nome = nomeEditEstu.value;

        usuario.tipo = 1;
    
        var matriculaEditEstu = document.getElementById("matriculaEditEstu");
        usuario.num_matricula = matriculaEditEstu.value;
        
        var senhaEditEstu = document.getElementById("senhaEditEstu");
        usuario.password = senhaEditEstu.value;

        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false,
            focus: true
          });
    
        editaEstu("usuario", usuario).then(function(result){
            window.location.href = './pedagogiaBase.html';
        }).catch(function(p){
        if(p.status == 400){
            showMod('msg', 'Edição não efetuada.<br/><br/> Esta matrícula já está em uso.');
            myModal.show();
            document.getElementById('editarPerfilEstu').classList.remove('was-validated');
        }
        });
    }
  }

  //executa os posts
async function editaEstu (theUrl, body){
  const myRequest = BASE_URL+theUrl;
  var ret = await jQuery.ajax({
      type: 'PUT',
      encoding:"UTF-8",
      dataType: 'json',
      contentType: 'application/json',
      url: myRequest,
      data:JSON.stringify(body),
  });

  return ret;
}

//Valida se as matriculas são iguais, muda o texto de erro e seta o input como inválido(se os campos não forem iguais) ou válido(se os campos forem iguais)
function verificaIgualMatEdit(elemento,confirmacao,local){
    verificaE = document.getElementById(elemento).value;
    verificaC = document.getElementById(confirmacao);
    erro = document.getElementById(local);
    if(verificaE.toUpperCase() != verificaC.value.toUpperCase()){
      erro.innerHTML = 'As matrículas estão diferentes.'
      verificaC.setCustomValidity("As matrículas estão diferentes.");
    }else if(verificaE.toUpperCase() == verificaC.value.toUpperCase()){
      verificaC.setCustomValidity("");
    }
  }
  
  //Valida se as senhas são iguais, muda o texto de erro e seta o input como inválido(se os campos não forem iguais) ou válido(se os campos forem iguais)
  function verificaIgualSenEdit(elemento,confirmacao,local){
    verificaE = document.getElementById(elemento).value;
    verificaC = document.getElementById(confirmacao);
    erro = document.getElementById(local);
    if(verificaE != verificaC.value){
      erro.innerHTML = 'As senhas estão diferentes.'
      verificaC.setCustomValidity("As senhas estão diferentes.");
    }else if(verificaE == verificaC.value){
      verificaC.setCustomValidity("");
    }
  }