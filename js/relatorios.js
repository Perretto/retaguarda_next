function carregarTela(){
    var cnpj = localStorage.getItem("cnpj");

    var url = "http://" + window.location.hostname + ":3000/api/relatorios/listarRelatorios";
                
    $.ajax({        
        type: "GET",
        url: url,  
        headers: {
            "cnpj": cnpj 
        },
        success: function(data){
            if(data){
                if(data.length > 0){
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];

                        var htmlFiltros = "";
                        var jFiltro = JSON.parse(element.nm_filtro);
                        for (let indexFiltro = 0; indexFiltro < jFiltro.length; indexFiltro++) {
                            const elementfiltro = jFiltro[indexFiltro];  

                            htmlFiltros += "<div class=\"form-group col-md-4\" style=\"display: inline-block;\">";
                            //htmlFiltros += "    <label class=\" form-control-label\">" + element.nome + "</label>";
                            htmlFiltros += "    <input type=\"text\" name='" + elementfiltro.campo + "' id='" + elementfiltro.campo + "_" + indexFiltro + "' placeholder='" + elementfiltro.nome + "' class=\"form-control \">";
                            htmlFiltros += "</div>";
                        }

                        var html = "<div class=\"col-md-6 col-lg-3\">";
                        html += "    <div class=\"statistic__item statistic__item--blue\">";
                        html += "        <form id='form_"+ index +"'>";
                        html += "        <span style=\"color:rgba(255, 255, 255, 0.6)\" class=\"desc\">" + element.nm_nome + "</span>";
                        html += htmlFiltros;
                        html += "        <div class=\"icon\">";
                        html += "            <i class=\"zmdi zmdi-calendar-note\"></i>";
                        html += "        </div>";

                        html += "<button style=\"color:rgba(255, 255, 255, 0.6);background-color:rgba(255, 255, 255, 0.0);\" onclick=\"gerarRelatorio('form_"+ index +"','" + element.id + "')\" type=\"button\" class=\"btn btn-outline\">";
                        html += "    <i style=\"color:rgba(255, 255, 255, 0.6)\" class=\"zmdi zmdi-calendar-note\"></i>";
                        html += "</button>";

                        html += "    </div>";
                        html += "</div>";
                        html += "<script src=\"../jquery-ui-1.12.1/jquery-ui.min.js\"></script>"
                        html += "<script src=\"../js/generic.js\"></script>"
                        html += "<script>";

                        html += "$(document).ready(function(){";
                            html += "    fixarData()/";
                            html += "  });";
                            html += "</script>";
                        //

                        $("#relatorios").append(html);

                        
                         
                    }                   

                }
            }
        }
    });
}

carregarTela();

function gerarRelatorio(form, id){    
    var url = "http://" + window.location.hostname + ":3000/api/relatorios/buscarRelatorio"
    var data = $("#" + form).serialize();
    var envio = {};
    envio.id = id;
    envio.valores = [];

    var filtros = data.split("&");

    for (let index = 0; index < filtros.length; index++) {
        const element = filtros[index];
        var valor = element.substr(element.indexOf("=") + 1,element.length)
        valor = valor.replace("%2F", "/").replace("%2F", "/")
        envio.valores.push(valor);
    }

    $.ajax({        
        type: "POST",
        url: url,         
        headers: {           
            "cnpj": localStorage.getItem("cnpj")          
        },
        data: envio,
        success: function(data){
            if (data) {
                //$("#relat").html(data);
                window.open(data.caminhopdf)
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