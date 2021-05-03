var atendimento = {};

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false,
  focus: true
});
var dataAdiar = document.getElementById("dataAdiar");
var horaAdiar = document.getElementById("horaAdiar");
var localAdiar = document.getElementById("localAdiar");

window.onload = function(){
  document.getElementById('nome').innerHTML = localStorage.getItem('nome');
  dataAdiar.value = localStorage.getItem('data');
  horaAdiar.value = localStorage.getItem('horario');
  localAdiar.value = localStorage.getItem('local');
}

function adiarAtendimento(header){

    var form = document.getElementById("adiarAtendimento");
    if (form.checkValidity()) {
        function handleForm(event) { event.preventDefault();} 
        form.addEventListener('submit', handleForm);

        atendimento.id_atendimento = header;
        
        atendimento.data_atendimento = dataAdiar.value;
        
        atendimento.horario = horaAdiar.value;
        
        atendimento.local = localAdiar.value;

        showMod('confirmacao',`Por favor confirme os dados, dados em branco não irão gerar alterações.<br/><br/>Data: ${dataAdiar.value}<br/>Horário: ${horaAdiar.value}<br/>Local: ${localAdiar.value}`);
        showMod('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>')
        myModal.show();
    }
  }

  function confirmar (confirm) {
    if(confirm){
        adiaAtendimento("atendimento", atendimento).then(function(result){
          showMod('confirmacao','<button type="button" class="btn-close" onclick="location.href = `./professorBase.html`" data-bs-dismiss="modal"></button>')
          showMod('msg', 'Atendimento adiado com sucesso.');
          myModal.show();
        });
    }else{
        document.getElementById('adiarAtendimento').classList.remove('was-validated');
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