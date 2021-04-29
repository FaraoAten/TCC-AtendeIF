var usuario = {};

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false,
  focus: true
});

window.onload = function(){
  document.getElementById('nomeEditEstu').value = localStorage.getItem('nome');
  document.getElementById('matriculaEditEstu').value = localStorage.getItem('num_matricula');
  document.getElementById('cMatriculaEditEstu').value = localStorage.getItem('num_matricula');
}

function editarEstu(header){

    var form = document.getElementById("editarPerfilEstu");
    if (form.checkValidity()) {
        function handleForm(event) { event.preventDefault();} 
        form.addEventListener('submit', handleForm);

        usuario.id_usuario = header;

        var nomeEditEstu = document.getElementById("nomeEditEstu");
        usuario.nome = nomeEditEstu.value;

        usuario.tipo = 1;
    
        var matriculaEditEstu = document.getElementById("matriculaEditEstu");
        usuario.num_matricula = matriculaEditEstu.value;
        
        var senhaEditEstu = document.getElementById("senhaEditEstu");
        usuario.password = senhaEditEstu.value;

        showMod('confirmacao',`Por favor confirme os dados, dados em branco não irão gerar alterações.<br/><br/>Nome: ${nomeEditEstu.value}<br/>Matrícula: ${matriculaEditEstu.value}<br/>Senha: ${senhaEditEstu.value}`);
        showMod('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>')
        myModal.show();
    }
  }

  function confirmar (confirm) {
    if(confirm){
      editaEstu("usuario", usuario).then(function(result){
          showMod('confirmacao','<button type="button" class="btn-close" onclick="location.href = `./pedagogiaBase.html`" data-bs-dismiss="modal"></button>')
          showMod('msg', 'Edição efetuada com sucesso.');
          myModal.show();
        }).catch(function(p){
          if(p.status == 400){
          showMod('confirmacao','<button type="button" class="btn-close" data-bs-dismiss="modal"></button>');
          showMod('msg', 'Edição não efetuada.<br/><br/> Esta matrícula já está em uso.');
          myModal.show();
          document.getElementById('editarPerfilEstu').classList.remove('was-validated');
        }
      });
    }else{
        document.getElementById('editarPerfilEstu').classList.remove('was-validated');
    }
}

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

