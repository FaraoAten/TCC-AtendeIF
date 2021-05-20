// arquivo com funções utilizadas por mais de uma tela

function mostrarSenha(elemento, label) {

  var x = document.getElementById(elemento);
  var mudaOlho = document.getElementById(label);

  if (x.type === "password") {
    x.type = "text";
    mudaOlho.innerHTML = 'Esconder senha <i class="far fa-eye-slash" id="olho"></i>';
  } else {
    x.type = "password";
    mudaOlho.innerHTML = 'Ver senha <i class="far fa-eye" id="olho"></i>'
  }

}

function setaErro(elemento,local){
  var texto = document.getElementById(elemento).value;
  var erro = document.getElementById(local);

  if(texto == null || texto == ""){
    erro.innerHTML = 'Digite sua matrícula.'
  }else{
    erro.innerHTML = 'Matrícula inválida, por favor verifique sua matrícula.';
  }

}

function maiuscula(elemento){
  document.getElementById(elemento).value = document.getElementById(elemento).value.toUpperCase();
}

function verificaIgualMatriculaEdicao(elemento,confirmacao,local){

  verificaE = document.getElementById(elemento).value;
  verificaC = document.getElementById(confirmacao);
  erro = document.getElementById(local);

  if(verificaE.toUpperCase() != verificaC.value.toUpperCase()){
    erro.innerHTML = 'As matrículas estão diferentes.'
    verificaC.setCustomValidity("As matrículas estão diferentes.");
  }else if(verificaE.toUpperCase() == verificaC.value.toUpperCase()){
    verificaC.setCustomValidity("");
  }

}

function verificaIgualSenhaEdicao(elemento,confirmacao,local){

  verificaE = document.getElementById(elemento).value;
  verificaC = document.getElementById(confirmacao);
  erro = document.getElementById(local);
  
  if(verificaE != verificaC.value){
    erro.innerHTML = 'As senhas estão diferentes.'
    verificaC.setCustomValidity("As senhas estão diferentes.");
  }else if(verificaE == verificaC.value){
    verificaC.setCustomValidity("");
  }

}

async function AlterarModal(modal, text) {
  document.getElementById(modal).innerHTML = text;
}

function limpar(lista, form){

  for(var i =0; i<lista.length;i++ ){
     document.getElementById(lista[i]).value = "";
  }

  document.getElementById(form).classList.remove('was-validated');
}

function voltar() {
  window.history.back();
}

function impedeReentrada(){
  var location = window.location.href.split("/");
  location = location[location.length-1];
  
  if(sessionStorage.getItem('authorization')==undefined && location !='index.html' && location !='cadastro.html'){
    window.location.replace('../../index.html')
  }
}
impedeReentrada();

//Ativa validador do Boostrap
(function () {
    'use strict'
    
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

// AJAX
//seta a URL base
const  BASE_URL = "http://localhost:3333/";

function montarMsg(theUrl){
  const myRequest = BASE_URL+theUrl;
  return new Promise((resolve,reject) => {
      $.ajax({
          url: myRequest,
          type: "GET",
          beforeSend: function(xhr){xhr.setRequestHeader('id_atendimento', sessionStorage.getItem('id_atendimento'));},
          success: function(result) {resolve(result)},
          error: function(erro) {reject(erro)}
       });
  });
}

async function enviaMensagem (theUrl, body){
  const myRequest = BASE_URL+theUrl;
  await jQuery.ajax({
      type: 'POST',
      encoding:"UTF-8",
      dataType: 'json',
      contentType: 'application/json',
      url: myRequest,
      data:JSON.stringify(body),
  });
}

async function cancelarAtendimento (theUrl, body){
  const myRequest = BASE_URL+theUrl;
  await jQuery.ajax({
      type: 'PUT',
      encoding:"UTF-8",
      dataType: 'json',
      contentType: 'application/json',
      url: myRequest,
      data:JSON.stringify(body),
  });
}

function pesquisaEstudante(theUrl){
  const myRequest = BASE_URL+theUrl;
  return new Promise((resolve,reject) => {
          $.getJSON(myRequest,  function(data){
              resolve(data);
          }).fail(function(jqXMLHttpRequest,textStatus,errorThrown) { reject() });
  });
}

async function primeiroLogin (theUrl){
  const myRequest = BASE_URL+theUrl;
  await jQuery.ajax({
      type: 'PUT',
      encoding:"UTF-8",
      dataType: 'json',
      contentType: 'application/json',
      url: myRequest,
      data:JSON.stringify({id_usuario:sessionStorage.getItem('authorization'),primeiro_login:1}),
  });
}

function listaAtendimentoProf(theUrl){
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

async function alterarAtendimento (theUrl, body){
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

function listaNotificacoes(theUrl){
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

function listaDocumentos(theUrl){
  const myRequest = BASE_URL+theUrl;
  return new Promise((resolve,reject) => {
      $.ajax({
          url: myRequest,
          type: "GET",
          success: function(result) {resolve(result)},
          error: function(erro) {reject(erro)}
       });
  });
}


