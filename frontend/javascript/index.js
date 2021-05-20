// Funções da tela de principal (Tela de login)

function login(){

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

    enviaLogin("usuario/login", log).then(function(result){

        sessionStorage.setItem('authorization', result.id_usuario);
        
        if(result.tipo == 1){
          window.location.href = './html/estudante_html/estudanteBase.html';
          sessionStorage.setItem('primeiroLogin', result.primeiro_login);
        }else if(result.tipo == 2){
          window.location.href = './html/professor_html/professorBase.html';
          sessionStorage.setItem('primeiroLogin', result.primeiro_login);
        }else if(result.tipo == 3){
          window.location.href = './html/profPedag_html/profPedagBase.html';
          sessionStorage.setItem('primeiroLogin', result.primeiro_login);
        }else{
          window.location.href = './html/pedagogia_html/pedagogiaBase.html';
        }

      }).catch(function(p){

        if(p.status == 405){
          AlterarModal('msg', 'Este usuário não existe.');
          myModal.show();
        }else if(p.status == 400){
          AlterarModal('msg', 'Senha incorreta.');
          myModal.show();

        //prevenção de erro
        }else if(p == {}){
          if(p.tipo == 1){
            window.location.href = './html/estudante_html/estudanteBase.html';
            sessionStorage.setItem('primeiroLogin', p.primeiro_login);
          }else if(p.tipo == 2){
            window.location.href = './html/professor_html/professorBase.html';
            sessionStorage.setItem('primeiroLogin', p.primeiro_login);
          }else if(p.tipo == 3){
            window.location.href = './html/profPedag_html/profPedagBase.html';
            sessionStorage.setItem('primeiroLogin', p.primeiro_login);
          }else{
            window.location.href = './html/pedagogia_html/pedagogiaBase.html';
          }
        }

      });
    }

  //limpa a sessão toda vez que entra na tela de login
  function limpaSession(){

    var infos = ['horario','id_atendimento','authorization','local','data','nome','id_usuario','primeiroLogin','num_matricula','id_urls'];
    
    for(var info of infos){
      sessionStorage.removeItem(info);
    }

  }

  limpaSession();

// AJAX
async function enviaLogin(theUrl, body){
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

 