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

function maiuscula(elemento){
  document.getElementById(elemento).value = document.getElementById(elemento).value.toUpperCase();
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

  function limpar(lista, form){
    for(var i =0; i<lista.length;i++ ){
       document.getElementById(lista[i]).value = "";
    }
    document.getElementById(form).classList.remove('was-validated');
  }

//-- AJAX --
//seta a URL base
const  BASE_URL = "http://localhost:3333/";

async function showMod(modal, text) {
  document.getElementById(modal).innerHTML = text;
}


function navActive(listaNavs, nav){
  for (let i = 0; i < listaNavs.length; i++) {
    document.getElementById(listaNavs[i]).classList.remove('active');
  }
  document.getElementById(nav).classList.add('active');
}
