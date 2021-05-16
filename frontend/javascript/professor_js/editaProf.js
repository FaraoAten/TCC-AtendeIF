var foto = {};
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

        showMod('confirmacao',`Por favor confirme os dados, dados em branco não irão gerar alterações.<br/><br/>Foto: ${fotoEditProf.value}<br/>Nome: ${nomeEditProf.value}<br/>Tipo: ${tipoTxt}<br/>SIAPE: ${matriculaEditProf.value}<br/>Senha: ${senhaEditProf.value}`);
        showMod('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>')
        myModal.show();
    }
  }

  async function confirmar (confirm) {
    if(confirm){
      await editaProf("usuario", usuario).then(async function(result){
        
        await fotoCadastrada("urls/foto").then(async function(result){
          await deletaFoto("urls",result[0]);
          await insereFoto("urls", foto).then(function(result){
            limpar(["fotoEditProf"], 'editarPerfilProf');
          });
        }).catch(function(p){
          if(p.status == 404){
              insereFoto("urls").then(function(result){
              limpar(["fotoEditProf"], 'editarPerfilProf');
            });
          }
        });

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

function fotoCadastrada(theUrl){
  const myRequest = BASE_URL+theUrl;
  return new Promise((resolve,reject) => {
      $.ajax({
          url: myRequest,
          type: "GET",
          beforeSend: function(xhr){xhr.setRequestHeader('authorization', sessionStorage.getItem('authorization'));},
          success: function(result) {resolve(result)},
          error: function(erro) {reject(erro)}
       });
  });
}

async function deletaFoto (theUrl, body){
  const myRequest = BASE_URL+theUrl;
  var ret = await jQuery.ajax({
      type: 'DELETE',
      encoding:"UTF-8",
      dataType: 'json',
      contentType: 'application/json',
      url: myRequest,
      data:JSON.stringify(body),
  });

  return ret;
}

async function insereFoto (theUrl){
  const myRequest = BASE_URL+theUrl;
  var formData = new FormData();
  formData.append('URL', $('#fotoEditProf')[0].files[0]);
  formData.append('tipo', 1);
  formData.append('id_usuario', sessionStorage.getItem('authorization'));

  $.ajax({
        url : myRequest,
        type : 'POST',
        data : formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
  });
}