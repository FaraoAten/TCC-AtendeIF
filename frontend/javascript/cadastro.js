//Pega as infos do cadastro
function cadastrar(){

    var form = document.getElementById("cadastro");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
  
    var usuario = {}
  
    var nomeCadastro = document.getElementById("nomeCadastro");
    usuario.nome = nomeCadastro.value;
  
    var tipoCadastro = document.getElementById("tipoCadastro");
    usuario.tipo = tipoCadastro.value;
  
    var matriculaCadastro = document.getElementById("matriculaCadastro");
    usuario.num_matricula = matriculaCadastro.value;
    
    var senhaCadastro = document.getElementById("senhaCadastro");
    usuario.senha = senhaCadastro.value;

    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
      keyboard: false,
      focus: true
    });
  
    cadastro("usuario", usuario).then(function(result){
      if(tipoCadastro.value == 1){
        showMod('msg','Seu cadastro foi feito com sucesso.<br/><br/> Volte para a tela inicial para entrar no site.');
        myModal.show();
        limpar(["nomeCadastro", "tipoCadastro", "matriculaCadastro", "cMatriculaCadastro", "senhaCadastro", "cSenhaCadastro"], 'cadastro');
      }else{
        showMod('msg','Seu cadastro foi feito com sucesso.<br/><br/> Você receberá um E-mail do Departamento de Ensino avisando que sua conta está ativa e pode ser utilizada, assim que ela for verificada.');
        myModal.show();
        limpar(["nomeCadastro", "tipoCadastro", "matriculaCadastro", "cMatriculaCadastro", "senhaCadastro", "cSenhaCadastro"], 'cadastro');
      }
      
    }).catch(function(p){
      if(p.status == 400){
        showMod('msg', 'Cadastro não efetuado.<br/><br/> Este usuário já existe.');
        myModal.show();
        document.getElementById('cadastro').classList.remove('was-validated');
      }else if(p == {}){
        if(tipoCadastro.value == 1){
          showMod('msg','Seu cadastro foi feito com sucesso.<br/><br/> Volte para a tela inicial para entrar no site.');
          myModal.show();
          limpar(["nomeCadastro", "tipoCadastro", "matriculaCadastro", "cMatriculaCadastro", "senhaCadastro", "cSenhaCadastro"], 'cadastro');
        }else{
          showMod('msg','Seu cadastro foi feito com sucesso.<br/><br/> Você receberá um E-mail do Departamento de Ensino avisando que sua conta está ativa e pode ser utilizada, assim que ela for verificada.');
          myModal.show();
          limpar(["nomeCadastro", "tipoCadastro", "matriculaCadastro", "cMatriculaCadastro", "senhaCadastro", "cSenhaCadastro"], 'cadastro');
        }
      }
    });
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