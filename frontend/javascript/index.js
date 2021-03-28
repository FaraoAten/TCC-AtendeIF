function mostrarSenha() {
    var x = document.getElementById("senhaLogin");
    var mudaOlho = document.getElementById("labelCbSenha");
    if (x.type === "password") {
      x.type = "text";
      mudaOlho.innerHTML = 'Esconder senha <i class="far fa-eye-slash" id="olho"></i>';
    } else {
      x.type = "password";
      mudaOlho.innerHTML = 'Ver senha <i class="far fa-eye" id="olho"></i>'
    }
  }