function buscarestoque(){
    var cod = $("#nm_codigo").val();
    var produto = $("#nm_nome").val();

    if(!cod){
        cod = "*";
    }

    
    if(!produto){
        produto = "*";
    }

    var url = "http://" + window.location.hostname + ":3000/api/estoque/searchgrid/" + cod + "/" + produto
    var table = "estoque";    
    var ths = "";
    var tds = ""; 
    $.ajax({        
        type: "GET",         
        headers: {           
            "cnpj": localStorage.getItem("cnpj")          
        },
        url: url,
        success: function(data){
            if(data){
                if(data.length > 0){
                    var perpage = 10;
                    var ind = 0;
                    ths = "";
                    tds = "";
                    ths += "<tr>";
                    for (index in data[0]) {
                        if(index == "id"){
                            ths += "<th style='display:none'></th>";   
                        }else
                            ths += "<th>" + index + "</th>";   
                        }                     
                    }
                    ths += "</tr>";

                    var page = 0;
                    var changepage = 0;

                    for (let i = 0; i < data.length; i++) {
                        const element = data[i]; 
                        if(changepage == perpage){
                            page += 1;
                            changepage = 0;
                        }

                        changepage += 1;

                        if(i > perpage){
                            tds += "<tr page=" + page + " style=\"display:none\">";
                        }else{
                            tds += "<tr page=" + page + ">";
                        }

                        var id = "";
                        for (index in element) {
                            if(index == "id"){
                                tds += "<td style=\"padding:1px;display:none\">";
                                //tds += "<button  onclick=\"edit('" + element[index] + "','" + table + "')\" type=\"button\" class=\"btn btn-icons btn-rounded btn-outline-info\">";
                                //tds += "    <i class=\"fa fa-edit\"></i>";
                                //tds += "</button>";
                                tds += "<input type=\"hidden\" value='" + element[index] + "' class=\"form-control id\"></input>";
                                tds += "</td>";
                                id = element[index];
                            }else{

                                if(element[index] == null){
                                    element[index] = "";
                                }

                                if(index == "quantidade"){
                                    tds += "<td><input style=\"text-align: end;\" data-id='" + id + "' type=\"number\" value=\"" + element[index] + "\" class=\"form-control quantidade\"></input></td>";  
                                }else{
                                    tds += "<td>" + element[index] + "</td>";  
                                }   
                            }                   
                        }
                        tds += "</tr>";
                    }
                                            
                    var html = "<div class=\"col-md-12 grid-margin stretch-card\">";
                    html += "   <div class=\"form-panel\">";
                    html += "       <div class=\"card-body\">   ";                    
                    html += "           <div class=\"table-responsive\">";
                    html += "               <table class=\"table table-striped\">";
                    html += "                   <thead>";
                    html += ths;
                    html += "                   </thead>";
                    html += "                   <tbody>";
                    html += tds;
                    html += "                   </tbody>";
                    html += "               </table>";

                    html += "           </div>";   
                    page = parseInt(page) + 1;
                    html += "<p class=\"card-description\" >Numero de paginas: " + page + "</p>";
                    
                    html += "<div style=\"padding-left: 42%;\">";  
                    html += "   <button  type=\"button\" onclick=\"anterior()\" class=\"btn btn-light\">Anterior</button>";
                    html += "   <span id=\"numeracao\">1</span>";
                    html += "   <button type=\"button\" onclick=\"proximo()\" class=\"btn btn-light\">Próximo</button>"; 
                    
                    
                    html += "</div>";

                    
                    html += "<div style=\"margin-left: 90%;\">";  

                    html += "   <button onclick='salvarestoque()' type=\"button\" class=\"btn btn-outline-success\">";
                    html += "       <i class=\"fa fa-save\"></i>";
                    html += "   </button>";
                    
                    html += "   <button type=\"button\" style=\"\" onclick=\"cancelargrid()\"  class=\"btn btn-danger\">Voltar</button>"; 
                    
                    html += "</div>";
                    
                   
                    html += "       </div>";
                    html += "   </div>";
                    html += "</div>";

                    $("#gridsearch").html(html);                       
                    //$("#rowform").hide();
                    $("#gridsearch").show();
            
            }                        
        }    
    });
}

function salvarestoque(){

    iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: '',
        message: 'Deseja alterar a quantidade estes registros?',
        position: 'center',
        buttons: [
            ['<button><b>SIM</b></button>', function (instance, toast) {
                var arrayquant = $(".quantidade")
                var arrayid = [];
                var arrayvalor = [];

                for (let index = 0; index < arrayquant.length; index++) {
                    const element = arrayquant[index];
                    var valor = $(element).val();
                    if(valor != "0" && valor != ""){
                        arrayvalor.push(valor);
                        arrayid.push($(element).attr("data-id"));
                    }
                }

                if(arrayid.length == 0){
                    iziToast.warning({
                        title: '',
                        message: 'Digite pelo menos um valor antes de gravar!',
                    });
                }else{

                    var url = "http://" + window.location.hostname + ":3000/api/estoque/salvarestoque"
                
                    $.ajax({        
                        type: "POST",
                        url: url,
                        data: {valores: arrayvalor, ids: arrayid},         
                        headers: {           
                            "cnpj": localStorage.getItem("cnpj")          
                        },
                        success: function(data){
                            if(data.length > 0){
                                if(data[0].command){
                                    if(data[0].command == "INSERT"){
                                        iziToast.success({
                                            title: '',
                                            message: 'Registro(s) salvo(s) com sucesso!',
                                        });
                                        $("#gridsearch").html("");  
                                        $("#gridsearch").hide();
                                    }
                                }else{
                                    iziToast.error({
                                        title: '',
                                        message: 'Erro ao gravar registro(s)!',
                                    });
                                }
                            }else{
                                iziToast.error({
                                    title: '',
                                    message: 'Erro ao gravar registro(s)!',
                                });
                            }
                            
                            
                        }
                    });
                }
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            }, true],
                ['<button>NÃO</button>', function (instance, toast) {
         
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
         
                }]
]
});



}