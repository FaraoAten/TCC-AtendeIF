//Muda o texto e o ícone das checkboxes de mostrar senha
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

//Muda o texto de erro dos input de matrícula, já que ele pode ter 2 erros diferentes
function setaErro(elemento,local){
  var texto = document.getElementById(elemento).value;
  var erro = document.getElementById(local);
  if(texto == null || texto == ""){
    erro.innerHTML = 'Digite sua matrícula.'
  }else{
    erro.innerHTML = 'Matrícula inválida, por favor verifique sua matrícula.';
  }
}

//Valida se as matriculas são iguais, muda o texto de erro e seta o input como inválido(se os campos não forem iguais) ou válido(se os campos forem iguais)
function verificaIgualMat(elemento,confirmacao,local){
  verificaE = document.getElementById(elemento).value;
  verificaC = document.getElementById(confirmacao);
  erro = document.getElementById(local);
  if(verificaC.value == null || verificaC.value == ""){
    erro.innerHTML = 'Repita sua matrícula.'
  }else if(verificaE.toUpperCase() != verificaC.value.toUpperCase()){
    erro.innerHTML = 'As matrículas estão diferentes.'
    verificaC.setCustomValidity("As matrículas estão diferentes.");
  }else if(verificaE.toUpperCase() == verificaC.value.toUpperCase()){
    verificaC.setCustomValidity("");
  }
}

//Valida se as senhas são iguais, muda o texto de erro e seta o input como inválido(se os campos não forem iguais) ou válido(se os campos forem iguais)
function verificaIgualSen(elemento,confirmacao,local){
  verificaE = document.getElementById(elemento).value;
  verificaC = document.getElementById(confirmacao);
  erro = document.getElementById(local);
  if(verificaC.value == null || verificaC.value == ""){
    erro.innerHTML = 'Repita sua senha.'
  }else if(verificaE != verificaC.value){
    erro.innerHTML = 'As senhas estão diferentes.'
    verificaC.setCustomValidity("As senhas estão diferentes.");
  }else if(verificaE == verificaC.value){
    verificaC.setCustomValidity("");
  }
}

//Ativa validador do Boostrap
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
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


//-- AJAX --
//seta a URL base
const  BASE_URL = "http://localhost:8080/"

//executa os gets
async function httpGet(theUrl){
  const myRequest = BASE_URL+theUrl;
  return new Promise((resolve,reject) => {
      $.getJSON(myRequest,  function(data){
          resolve(data);
      });
  });
}

//executa os posts
async function httpPost(theUrl, body){
  const myRequest = BASE_URL+theUrl;
  jQuery.ajax({
      type: 'POST',
      encoding:"UTF-8",
      dataType: 'json',
      contentType: 'application/json',
      url: myRequest,
      data:JSON.stringify(body),
      success: function() {
          if(theUrl == "usuario"){
            window.alert("Seu cadastro foi feito. Você receberá um E-mail do Departamento de Ensino avisando que sua conta está ativa e pode ser utilizada assim que ela for verificada.")
          }
      }
  });
}
