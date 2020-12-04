
function logar(){
    var login = $("#login").val();
    var senha = $("#senha").val();
    var cnpj = $("#cnpj").val();
    var username = "";
    var userid = "";
    var tipo = "";
    var foto = ""

    if(!cnpj){
        iziToast.error({
            title: '',
            message: 'Digite um CNPJ valido!',
        });
        return;
    }

    if(!login && !senha){
        iziToast.error({
            title: '',
            message: 'Digite um login e senha validos!',
        });
        return;
    }

    cnpj = cnpj.replace("/","").replace(".","").replace(".","").replace("-","")

    var url = "http://" + window.location.hostname + ":3000/api/administrador/login/" + login + "/" + senha
                 
    $.ajax({  
        url: url,  
        headers: {
            "cnpj": cnpj 
          },
        type: "GET",
        success: function(data){
            if(data){
                if(data.length > 0){
                    if(data[0]){
                        localStorage.setItem("username", data[0].nm_nome);
                        localStorage.setItem("userid", data[0].id);
                        localStorage.setItem("cnpj", cnpj);

                        localStorage.setItem("tipo", data[0].nm_tipousuario);
                        //localStorage.setItem("foto", data[0].img_foto);
                        
                        window.location.href = "http://" + window.location.host + "/pages/index.html"; 
                        
                    }else{
                        iziToast.error({
                            title: '',
                            message: 'Login ou senha não localizado!',
                        }); 
                    }  
                }else{
                    iziToast.error({
                        title: '',
                        message: 'Login ou senha não localizado!',
                    }); 
                }
            }                        
        },
        error: function (xhr, ajaxOptions, thrownError) {
            iziToast.error({
                title: '',
                message: xhr.responseText,
            });
        }
    
    });
}