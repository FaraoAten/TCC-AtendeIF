// Funções da tela de cadastrar atendimento dos usuários do tipo professor

var atendimento = {};

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false,
    focus: true
    });

window.onload = function(){
  document.getElementById('nome').innerHTML = sessionStorage.getItem('nome');
}

function cadastrarAtendimento(id_aluno, id_professor){

    var form = document.getElementById("cadastroAtendimento");
    if (form.checkValidity()) {
        function handleForm(event) { event.preventDefault();} 
        form.addEventListener('submit', handleForm);
    
        var dataCadastro = document.getElementById("dataCadastro");
        atendimento.data_atendimento = dataCadastro.value;
    
        var horaCadastro = document.getElementById("horaCadastro");
        atendimento.horario = horaCadastro.value;
        
        var localCadastro = document.getElementById("localCadastro");
        atendimento.local = localCadastro.value;

        var disciplinaCadastro = document.getElementById("disciplinaCadastro");
        atendimento.materia = disciplinaCadastro.value;

        atendimento.id_aluno = id_aluno;
        
        atendimento.id_professor = id_professor;
        
        AlterarModal('confirmacao',`Por favor confirme os dados.<br/><br/>Data: ${dataCadastro.value}<br/>Horário: ${horaCadastro.value}<br/>Local: ${localCadastro.value}<br/>Disciplina: ${disciplinaCadastro.value}`);
        AlterarModal('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>')
        myModal.show();
    }
  }

  function confirmar (confirm) {

    if(confirm){
        ajaxPost("atendimento", atendimento).then(function(result){

        AlterarModal('confirmacao','<button type="button" class="btn-close" data-bs-dismiss="modal"></button>');
        AlterarModal('msg','Atendimento cadastrado com sucesso.');
        myModal.show();

        limpar(["dataCadastro", "horaCadastro", "localCadastro", "disciplinaCadastro"], 'cadastroAtendimento');
        });
    }else{
        document.getElementById('cadastroAtendimento').classList.remove('was-validated');
    }
}

