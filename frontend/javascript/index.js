function Login(){
    var form = document.getElementById("login");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);

    var log = {};
    var matriculaLogin = document.getElementById("matriculaLogin");
    log.num_matricula = matriculaLogin.value;
    
    var senhaLogin = document.getElementById("senhaLogin");
    log.senha = senhaLogin.value;

    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
      keyboard: false,
      focus: true
    });

    login("usuario/login", log).then(function(result){
        window.location.href = './html/depenBase.html';
      }).catch(function(p){
        if(p.status == 405){
          showMod('msg', 'Este usuário não existe.');
          myModal.show();
        }else if(p.status = 403){
          showMod('msg', 'Esta conta ainda não está ativa.');
          myModal.show();
        }else if(p.status = 400){
          showMod('msg', 'Senha incorreta.');
          myModal.show();
        }else if(p == {}){
            window.location.href = './html/depenBase.html';
        }
      });
    }

async function login(theUrl, body){
    const myRequest = BASE_URL+theUrl;
    var ret = jQuery.ajax({
        type: 'POST',
        encoding:"UTF-8",
        dataType: 'json',
        contentType: 'application/json',
        url: myRequest,
        data:JSON.stringify(body),
    });
    return ret;
  }