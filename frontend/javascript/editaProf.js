var usuario = {};

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false,
  focus: true
});

function editarProf(header){

    var form = document.getElementById("editarPerfilProf");
    if (form.checkValidity()) {
        function handleForm(event) { event.preventDefault();} 
        form.addEventListener('submit', handleForm);

        usuario.id_usuario = header;

        var nomeEditProf = document.getElementById("nomeEditProf");
        usuario.nome = nomeEditProf.value;

        var tipoEditProf = document.getElementById("tipoEditProf");
        usuario.tipo = tipoEditProf.value;
    
        var matriculaEditProf = document.getElementById("matriculaEditProf");
        usuario.num_matricula = matriculaEditProf.value;
        
        var senhaEditProf = document.getElementById("senhaEditProf");
        usuario.password = senhaEditProf.value;

        var tipoTxt;
        switch (tipoEditProf.value){
          case "2": 
            tipoTxt = "Professor";
            break;
          case "3":
            tipoTxt = "Professor e Pedagogia";
            break;
          default:
            tipoTxt = "";
        }

        showMod('confirmacao',`Por favor confirme os dados, dados em branco não irão gerar alterações.<br/><br/>Nome: ${nomeEditProf.value}<br/>Tipo: ${tipoTxt}<br/>SIAPE: ${matriculaEditProf.value}<br/>Senha: ${senhaEditProf.value}`);
        showMod('msg', '<button type="button" class="btn btn-danger btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button><button type="button" class="btn btn-success btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(true)">Confirmar</button>')
        myModal.show();
    }
  }

  function confirmar (confirm) {
    if(confirm){
      editaProf("usuario", usuario).then(function(result){
          showMod('confirmacao','<button type="button" class="btn-close" data-bs-dismiss="modal"></button>');
          showMod('msg', 'Edição efetuada com sucesso.');
          myModal.show();
          limpar(["nomeEditProf", "tipoEditProf", "matriculaEditProf", "cMatriculaEditProf", "senhaEditProf", "cSenhaEditProf"], 'editarPerfilProf');
      }).catch(function(p){
      if(p.status == 400){
          showMod('confirmacao','<button type="button" class="btn-close" data-bs-dismiss="modal"></button>');
          showMod('msg', 'Edição não efetuada.<br/><br/> Esta matrícula já está em uso.');
          myModal.show();
          document.getElementById('editarPerfilProf').classList.remove('was-validated');
      }
    });
    }else{
        document.getElementById('editarPerfilProf').classList.remove('was-validated');
    }
}

async function editaProf (theUrl, body){
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