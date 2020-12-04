
function logar(){
    var login = $("#login").val();
    var senha = $("#senha").val();
    var username = "";
    var userid = "";
    var tipo = "";
    var foto = ""

   
    
    var url = "http://" + window.location.hostname + ":3000/api/adminempresa/login/" + login + "/" + senha
                 
    $.ajax({  
        url: url,
        type: "GET",
        success: function(data){
            if(data){
                if(data.length > 0){
                    if(data[0]){
                        localStorage.setItem("username", data[0].nm_nome);
                        localStorage.setItem("userid", data[0].id);

                        localStorage.setItem("tipo", data[0].nm_tipousuario);
                        //localStorage.setItem("foto", data[0].img_foto);
                        
                        window.location.href = "http://" + window.location.host + "/pages/adminempresa.html"; 
                        
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
        }
    
    });
}