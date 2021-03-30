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

function setaErro(x,y){
  var texto = document.getElementById(x);
  var erro = document.getElementById(y);
  if(texto.nodeValue != null || texto.nodeValue != ""){
    erro.innerHTML = 'Matrícula inválida, por favor verifique sua matrícula.';
  }
}

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