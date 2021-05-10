var usuario = {};

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false,
  focus: true
});

function mudarSenha(header){

    var form = document.getElementById("mudarSenha");
    if (form.checkValidity()) {
        function handleForm(event) { event.preventDefault();} 
        form.addEventListener('submit', handleForm);

        usuario.id_usuario = header;
        
        usuario.nome = null;

        usuario.tipo = null;
    
        usuario.num_matricula = null;

        var senhaMudarSenha = document.getElementById("senhaMudarSenha");
        usuario.password = senhaMudarSenha.value;

        showMod('confirmacao',`Por favor confirme sua senha, se não digitou nada a senha padrão não será mudada.<br/><br/>Senha: ${senhaMudarSenha.value}`);
        showMod('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>')
        myModal.show();
    }
  }

  function confirmar (confirm) {
    if(confirm){
      mudaSenha("usuario", usuario).then(function(result){
          showMod('confirmacao','<button type="button" class="btn-close" onclick="location.href = `./estudanteBase.html`" data-bs-dismiss="modal"></button>')
          showMod('msg', 'Senha mudada com sucesso.');
          myModal.show();
        });
    }else{
        document.getElementById('mudarSenha').classList.remove('was-validated');
    }
}

async function mudaSenha (theUrl, body){
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

function voltarConfirmacao(){
    showMod('confirmacao', 'Você quer realmente voltar?<br/>Se você fizer isso não vai poder mudar sua senha depois.');
    showMod('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="voltar()">Sim</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" data-bs-dismiss="modal">Não</button>')
    myModal.show();
}