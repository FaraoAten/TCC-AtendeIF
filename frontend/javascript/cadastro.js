//Pega as infos do cadastro
function cadastrar(){
    var usuario = {}
  
    var nomeCadastro = document.getElementById("nomeCadastro");
    usuario.nome = nomeCadastro.value;
  
    var tipoCadastro = document.getElementById("tipoCadastro");
    usuario.tipo = tipoCadastro.value;
  
    var matriculaCadastro = document.getElementById("matriculaCadastro");
    usuario.num_matricula = matriculaCadastro.value;
    
    var senhaCadastro = document.getElementById("senhaCadastro");
    usuario.senha = senhaCadastro.value;
  
    httpPost("usuario", usuario);
  }