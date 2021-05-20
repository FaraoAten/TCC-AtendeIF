// Funções da tela de edição de atendimento dos usuários do tipo professor-pedagogia

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

        AlterarModal('confirmacao',`Por favor confirme os dados, dados em branco não irão gerar alterações.<br/><br/>Data: ${dataAlterar.value}<br/>Horário: ${horaAlterar.value}<br/>Local: ${localAlterar.value}`);
        AlterarModal('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>')
        myModal.show();
    }
  }

  function confirmar (confirm) {

    if(confirm){
      alterarAtendimento("atendimento", atendimento).then(function(result){

        msgAlterar(); 

        AlterarModal('confirmacao','<button type="button" class="btn-close" onclick="window.location.replace(`./profPedagBase.html`);" data-bs-dismiss="modal"></button>')
        AlterarModal('msg', 'Atendimento alterado com sucesso.');
        myModal.show();
      });
    }else{
        document.getElementById('alterarAtendimento').classList.remove('was-validated');
    }
}

async function msgAlterar(){

  var dataComparacao = new Date();
  dataComparacao.setDate(dataComparacao.getDate()+6);
  dataComparacaoFormatada = "";

  if((dataComparacao.getMonth() + 1) < 10){
    dataComparacaoFormatada = dataComparacao.getFullYear()+ "-0" + ((dataComparacao.getMonth() + 1));
  }else{
    dataComparacaoFormatada = dataComparacao.getFullYear()+ "-" + ((dataComparacao.getMonth() + 1));
  }

  if(((dataComparacao.getDate() ))<10){
    dataComparacaoFormatada += "-0" + ((dataComparacao.getDate() ));
  }else{
    dataComparacaoFormatada += "-" + ((dataComparacao.getDate() ));
  }

  if((sessionStorage.getItem('data')<=dataComparacaoFormatada) && ((sessionStorage.getItem('data') != atendimento.data_atendimento) || (sessionStorage.getItem('horario') != atendimento.horario))){
      await montarMsg("atendimento/mensagemAlteraracao").then(async function(result){

          var atual = new Date();
          var atualData = "";

          if((atual.getMonth() + 1) < 10){
            atualData = atual.getFullYear()+ "-0" + ((atual.getMonth() + 1));
          }else{
            atualData = atual.getFullYear()+ "-" + ((atual.getMonth() + 1));
          }

          if(((atual.getDate() ))<10){
            atualData += "-0" + ((atual.getDate() ));
          }else{
            atualData += "-" + ((atual.getDate() ));
          }

          var dataPreFormatada = new Date(sessionStorage.getItem('data'));
          dataPreFormatada.setDate(dataPreFormatada.getDate()+1);
          let dataFormatada;

          if(sessionStorage.getItem('data') == atualData){
              dataFormatada = "Hoje";
          }else{
              nomeDia = new Array ("Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado");
              dataFormatada = nomeDia[dataPreFormatada.getDay()];
          }

          nomeMes = new Array ("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
          let mesFormatado = nomeMes[dataPreFormatada.getMonth()];

          var mensagem = {};
          mensagem.titulo = 'Atendimento alterado';
          mensagem.corpo = `O seu atendimento do dia ${dataPreFormatada.getDate()} de ${mesFormatado}, ${dataFormatada}, agora será dia ${result.diaMsg} de ${result.mesMsg}, ${result.dataMsg}, às ${result.horaMsg}.`;
          mensagem.id_remetente = sessionStorage.getItem('authorization');
          mensagem.id_destinatario = sessionStorage.getItem('id_usuario');
          mensagem.id_atendimento = sessionStorage.getItem('id_atendimento');
          
          await enviaMensagem('mensagem', mensagem);
      });
  }
}

