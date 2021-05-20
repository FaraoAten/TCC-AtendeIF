//Funções AJAX para enviar infos do front para o back
//seta a URL base
const  BASE_URL = "http://localhost:3333/";

//POST
async function ajaxPost (theUrl, body){
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

async function ajaxPostReturn(theUrl, body){
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

async function ajaxPostInsereDoc (theUrl){
    const myRequest = BASE_URL+theUrl;
    var formData = new FormData();
    formData.append('URL', $('#insereDocumento')[0].files[0]);
    formData.append('tipo', 2);
    $.ajax({
          url : myRequest,
          type : 'POST',
          data : formData,
          processData: false,  
          contentType: false,  
    });
  }

  async function ajaxPostInsereFoto (theUrl){
    const myRequest = BASE_URL+theUrl;
    var formData = new FormData();
    formData.append('URL', $('#fotoEditProf')[0].files[0]);
    formData.append('tipo', 1);
    formData.append('id_usuario', sessionStorage.getItem('authorization'));
    $.ajax({
          url : myRequest,
          type : 'POST',
          data : formData,
          processData: false,  
          contentType: false,  
    });
  }


  //PUT
  async function ajaxPut (theUrl, body){
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

  async function ajaxPutPrimeiroLogin (theUrl){
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
  

  //GET
  function ajaxGet(theUrl){
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
  
  function ajaxGetHeaderIdAtendimento(theUrl){
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
  
  function ajaxGetHeaderAuthorization(theUrl){
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

function ajaxGetHeaderIdUsuario(theUrl){
    const myRequest = BASE_URL+theUrl;
    return new Promise((resolve,reject) => {
        $.ajax({
            url: myRequest,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('id_usuario', sessionStorage.getItem('id_usuario'));},
            success: function(result) {resolve(result)},
            error: function(erro) {reject(erro)}
         });
    });
}


  //DELETE
  async function ajaxDelete (theUrl, body){
    const myRequest = BASE_URL+theUrl;
    await jQuery.ajax({
        type: 'DELETE',
        encoding:"UTF-8",
        dataType: 'json',
        contentType: 'application/json',
        url: myRequest,
        data:JSON.stringify(body),
    });
}