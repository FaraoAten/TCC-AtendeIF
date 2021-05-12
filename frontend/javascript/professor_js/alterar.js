var atendimento = {};

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false,
  focus: true
});
var dataAlterar = document.getElementById("dataAlterar");
var horaAlterar = document.getElementById("horaAlterar");
var localAlterar = document.getElementById("localAlterar");

window.onload = function(){
  document.getElementById('nome').innerHTML = sessionStorage.getItem('nome');
  dataAlterar.value = sessionStorage.getItem('data');
  horaAlterar.value = sessionStorage.getItem('horario');
  localAlterar.value = sessionStorage.getItem('local');
}

function alterarAtendimento(header){

    var form = document.getElementById("alterarAtendimento");
    if (form.checkValidity()) {
        function handleForm(event) { event.preventDefault();} 
        form.addEventListener('submit', handleForm);

        atendimento.id_atendimento = header;
        
        atendimento.data_atendimento = dataAlterar.value;
        
        atendimento.horario = horaAlterar.value;
        
        atendimento.local = localAlterar.value;

        showMod('confirmacao',`Por favor confirme os dados, dados em branco não irão gerar alterações.<br/><br/>Data: ${dataAlterar.value}<br/>Horário: ${horaAlterar.value}<br/>Local: ${localAlterar.value}`);
        showMod('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>')
        myModal.show();
    }
  }

  function confirmar (confirm) {
    if(confirm){
        adiaAtendimento("atendimento", atendimento).then(function(result){
          showMod('confirmacao','<button type="button" class="btn-close" onclick="voltar()" data-bs-dismiss="modal"></button>')
          showMod('msg', 'Atendimento alterado com sucesso.');
          myModal.show();
        });
    }else{
        document.getElementById('alterarAtendimento').classList.remove('was-validated');
    }
}

async function adiaAtendimento (theUrl, body){
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