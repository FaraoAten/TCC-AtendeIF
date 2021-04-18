//Pega as infos do cadastro
function cadastrar(){

    var form = document.getElementById("cadastro");
    if (form.checkValidity()) {
    function handleForm(event) { event.preventDefault();} 
    form.addEventListener('submit', handleForm);
  
    var usuario = {}
  
    var nomeCadastro = document.getElementById("nomeCadastro");
    usuario.nome = nomeCadastro.value;

    usuario.tipo = 1;
  
    var matriculaCadastro = document.getElementById("matriculaCadastro");
    usuario.num_matricula = matriculaCadastro.value;
    
    var senhaCadastro = document.getElementById("senhaCadastro");
    usuario.password = senhaCadastro.value;

    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
      keyboard: false,
      focus: true
    });
  
    cadastro("usuario", usuario).then(function(result){
      showMod('msg','Seu cadastro foi feito com sucesso.<br/><br/> Volte para a tela inicial para entrar no site.');
      myModal.show();
      limpar(["nomeCadastro", "matriculaCadastro", "cMatriculaCadastro", "senhaCadastro", "cSenhaCadastro"], 'cadastro');
    }).catch(function(p){
      if(p.status == 400){
        showMod('msg', 'Cadastro não efetuado.<br/><br/> Este usuário já existe.');
        myModal.show();
        document.getElementById('cadastro').classList.remove('was-validated');
      }else if(p == {}){
        showMod('msg','Seu cadastro foi feito com sucesso.<br/><br/> Volte para a tela inicial para entrar no site.');
        myModal.show();
        limpar(["nomeCadastro", "matriculaCadastro", "cMatriculaCadastro", "senhaCadastro", "cSenhaCadastro"], 'cadastro');
      }
    });
  }
  }

  //executa os posts
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