// Funções da tela de cadastro de estudantes

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false,
  focus: true
});

var usuario = {};

function cadastrar(){

    var form = document.getElementById("cadastro");
    if (form.checkValidity()) {
    function handleForm(event) { event.preventDefault();} 
    form.addEventListener('submit', handleForm);    
  
    var nomeCadastro = document.getElementById("nomeCadastro");
    usuario.nome = nomeCadastro.value;

    usuario.tipo = 1;
  
    var matriculaCadastro = document.getElementById("matriculaCadastro");
    usuario.num_matricula = matriculaCadastro.value;
    
    var senhaCadastro = document.getElementById("senhaCadastro");
    usuario.password = senhaCadastro.value;

    usuario.primeiro_login = 0;

    AlterarModal('confirmacao',`Por favor confirme os dados.<br/><br/>Nome: ${nomeCadastro.value}<br/>Matrícula: ${matriculaCadastro.value}<br/>Senha: ${senhaCadastro.value}`);
    AlterarModal('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>')
    myModal.show();

  }
  }

  function confirmar (confirm) {

    if(confirm){
      cadastro("usuario", usuario).then(function(result){

        AlterarModal('confirmacao','<button type="button" class="btn-close" data-bs-dismiss="modal"></button>');
        AlterarModal('msg','Seu cadastro foi feito com sucesso.<br/><br/> Volte para a tela inicial para entrar no site.');
        myModal.show();

        limpar(["nomeCadastro", "matriculaCadastro", "cMatriculaCadastro", "senhaCadastro", "cSenhaCadastro"], 'cadastro');

      }).catch(function(p){

        if(p.status == 400){
          AlterarModal('confirmacao','<button type="button" class="btn-close" data-bs-dismiss="modal"></button>');
          AlterarModal('msg', 'Cadastro não efetuado.<br/><br/> Este usuário já existe.');
          myModal.show();

          document.getElementById('cadastro').classList.remove('was-validated');

        //prevenção de erro
        }else if(p == {}){
          AlterarModal('confirmacao','<button type="button" class="btn-close" data-bs-dismiss="modal"></button>');
          AlterarModal('msg','Seu cadastro foi feito com sucesso.<br/><br/> Volte para a tela inicial para entrar no site.');
          myModal.show();

          limpar(["nomeCadastro", "matriculaCadastro", "cMatriculaCadastro", "senhaCadastro", "cSenhaCadastro"], 'cadastro');
        }
      });
    }else{
      document.getElementById('cadastro').classList.remove('was-validated');
    }
}

function verificaIgualMatricula(elemento,confirmacao,local){

  verificaE = document.getElementById(elemento).value;
  verificaC = document.getElementById(confirmacao);
  erro = document.getElementById(local);

  if(verificaC.value == null || verificaC.value == ""){
    erro.innerHTML = 'Repita sua matrícula.'
  }else if(verificaE.toUpperCase() != verificaC.value.toUpperCase()){
    erro.innerHTML = 'As matrículas estão diferentes.'
    verificaC.setCustomValidity("As matrículas estão diferentes.");
  }else if(verificaE.toUpperCase() == verificaC.value.toUpperCase()){
    verificaC.setCustomValidity("");
  }

}

function verificaIgualSenha(elemento,confirmacao,local){

  verificaE = document.getElementById(elemento).value;
  verificaC = document.getElementById(confirmacao);
  erro = document.getElementById(local);

  if(verificaC.value == null || verificaC.value == ""){
    erro.innerHTML = 'Repita sua senha.'
  }else if(verificaE != verificaC.value){
    erro.innerHTML = 'As senhas estão diferentes.'
    verificaC.setCustomValidity("As senhas estão diferentes.");
  }else if(verificaE == verificaC.value){
    verificaC.setCustomValidity("");
  }

}

//AJAX
async function cadastro (theUrl, body){
  const myRequest = BASE_URL+theUrl;
  var ret = await jQuery.ajax({
      type: 'POST',
      encoding:"UTF-8",
      dataType: 'json',
      contentType: 'application/json',
      url: myRequest,
      data:JSON.stringify(body),
  });

  return ret;
}