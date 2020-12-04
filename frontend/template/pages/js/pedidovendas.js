$(document).ready(function () {
    $(function () {
        $("#buscacliente").autocomplete({
            source: function (request, response) {
                $.ajax({
                    dataType: "json",        
                    headers: {           
                        "cnpj": localStorage.getItem("cnpj")          
                    },
                    type: 'Get',
                    url: "http://" + window.location.hostname + ":3000/api/clientes/buscapornome" + "/" + request.term,
                    success: function (data) {
                        response(data);
                        $("#id_clientes").val("");
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            },
            select: function (event, ui) {
                event.preventDefault();
                $(this).val(ui.item.label);
                $("#id_clientes").val(ui.item.id);
            }
        });
    });


    $(function () {
        $("#buscaproduto").autocomplete({
            source: function (request, response) {
                $.ajax({
                    dataType: "json",        
                    headers: {           
                        "cnpj": localStorage.getItem("cnpj")          
                    },
                    type: 'Get',
                    url: "http://" + window.location.hostname + ":3000/api/produtos/buscapornome" + "/" + request.term,
                    success: function (data) {
                        response(data);
                        $("#txtIdProduto").val("");
                        $("#txtValor").val("");
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            },
            select: function (event, ui) {
                event.preventDefault();
                $(this).val(ui.item.label);
                $("#txtIdProduto").val(ui.item.id);
                $("#txtValor").val(ui.item.valor);
            }
        });
    });
});

function addproduto(){
    var id = $("#txtIdProduto").val();

    if($("[data-idproduto='"+id+"']").length > 0){
        iziToast.warning({
            title: '',
            message: 'Produto já foi adicionado no pedido!',
        });
        $("#txtIdProduto").val("");
        $("#buscaproduto").val("");
        $("#txtValor").val("");
        return;
    }

    var qnt = $("#quantidadeprod").val();
    if(id && qnt){
        var nome = $("#buscaproduto").val();
        var valor = $("#txtValor").val();
        var html = "";
        var total = parseFloat(qnt) * parseFloat(valor);
        total =parseFloat(total.toFixed(2));

        var countindex = $("[data-idproduto]").length;

        html += "<tr data-spacerid=\"" + id + "\"class=\"spacer\"></tr>";
        html += "<tr data-index=\"" + countindex + "\" data-id=\"\" data-idproduto=\"" + id + "\" data-quant='" + qnt + "' data-vlunt='" + valor + "'  data-vltot='" + total + "' class=\"tr-shadow\">";
        html += "    <td class=\"desc\">" + nome + "</td>";
        html += "    <td >" + qnt + "</td>";
        html += "    <td>R$ " + valor + "</td>";
        html += "    <td>R$ " + total + "</td>";
        html += "    <td>";
        html += "        <div class=\"table-data-feature\">";
        html += "            <button  type=\"button\"  data-produtogridid='" + id + "' onclick=\"deleteproduto('" + id + "')\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\"";
        html += "                title=\"\" data-original-title=\"Delete\">";
        html += "                <i class=\"zmdi zmdi-delete\"></i>";
        html += "            </button>";
        html += "        </div>";
        html += "    </td>";
        html += "</tr>";



        $("#tableproduto").append(html);
        
        $("#txtIdProduto").val("");
        $("#quantidadeprod").val("1");
        $("#buscaproduto").val("");
        $("#txtValor").val("");
        var valortotal = parseFloat($("[data-total-footer]").attr("data-total-footer"));
        valortotal += total;
        valortotal =parseFloat(valortotal.toFixed(2));
        $("[data-total-footer]").attr("data-total-footer", valortotal)
        $("[data-total-footer]").html("R$ " + valortotal)

    }    
}

function deleteproduto(id){

    var total = parseFloat($("[data-idproduto='" + id + "']").attr("data-vltot"));
    var valortotal = parseFloat($("[data-total-footer]").attr("data-total-footer"));
    valortotal -= total;
    $("[data-total-footer]").attr("data-total-footer", valortotal)
    $("[data-total-footer]").html("R$ " + valortotal)
 
    $("[data-spacerid='" + id + "'").remove();
    $("[data-id='" + id + "'").remove();
}

function savepedido(table){
    iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: '',
        message: 'Deseja gravar este registro?',
        position: 'center',
        buttons: [
            ['<button><b>SIM</b></button>', function (instance, toast) {
     
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');                
                
                var url = "http://" + window.location.hostname + ":3000/api/vendas/gravarpedido"
                
                var data = "";

                var produtos = $("[data-id]");

                for (let index = 0; index < produtos.length; index++) {
                    const element = produtos[index];
                    data += "&id_clientes=" + $("#id_clientes").val();
                    data += "&id_produtos=" + $(element).attr("data-idproduto");
                    data += "&db_quantidade=" + $(element).attr("data-quant");
                    data += "&db_valorunitario=" + $(element).attr("data-vlunt");  
                    data += "&db_valortotal=" + $(element).attr("data-vltot");  
                    data += "&id=" + $(element).attr("data-id"); 
                }


                
                for (let index = 0; index < $("form [name][type='checkbox']").length; index++) {
                    const element = $("form [name][type='checkbox']")[index];
                    if(!$(element).is(":checked")){
                        var name = $(element).attr("name");
                        data += "&" + name + "=false"
                    }                    
                }

                for (let index = 0; index < $("[id*=db_]").length; index++) {
                    const element = $("[id*=db_]")[index];
                    var name = $(element).attr("name");
                    var valor = $(element).val();
                    if(valor.indexOf(",") >= 0){
                        var data1 = data.substring(0, data.indexOf(name));
                        var data2 = data.substring(data.indexOf(name), data.length);
                        data2 = data2.substring(data2.indexOf("&") + 1, data2.length);    
                        valor = valor.replace(".","").replace(",",".");    
                        data = data1 + name + "='" + valor + "'&" + data2;
                    }
                }

                data += "&sistema=true";

                $.ajax({        
                    type: "POST",
                    url: url,         
                    headers: {           
                        "cnpj": localStorage.getItem("cnpj")          
                    },
                    data: data,
                    success: function(data){
                        if (data) {
                            if (data.lastID) {
                                $("#id").val(data.lastID);
                                iziToast.success({
                                    title: '',
                                    message: 'Registro salvo com sucesso!',
                                });
                                novoPedidoVenda()
                            }
                        }                     
                    }                
                });
            }, true],
            ['<button>NÃO</button>', function (instance, toast) {
     
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
     
            }],
        ],
        onClosing: function(instance, toast, closedBy){
            console.info('Closing | closedBy: ' + closedBy);
        },
        onClosed: function(instance, toast, closedBy){
            console.info('Closed | closedBy: ' + closedBy);
        }
    });    
}

function deletepedido(table){
    var id = $("#id").val();
    if(!id){
        
        iziToast.warning({
            title: '',
            message: 'Edite um registro antes de deletar!',
        });
        return;
    }

    iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: '',
        message: 'Deseja deletar este registro?',
        position: 'center',
        buttons: [
            ['<button><b>SIM</b></button>', function (instance, toast) {
     
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');                
                
                var url = "http://" + window.location.hostname + ":3000/api/" + table + "/delete/" + id
                 
                $.ajax({        
                    type: "GET",         
                    headers: {           
                        "cnpj": localStorage.getItem("cnpj")          
                    },
                    url: url,
                    success: function(data){
                        if (data) {
                            //if (data.length == 0) {
                            if(data.command == "DELETE"){
                                novo()
                                iziToast.success({
                                    title: '',
                                    message: 'Registro deletado com sucesso!',
                                });
                            }
                        }                      
                    }
                
                });
            }, true],
            ['<button>NÃO</button>', function (instance, toast) {
     
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
     
            }],
        ],
        onClosing: function(instance, toast, closedBy){
            console.info('Closing | closedBy: ' + closedBy);
        },
        onClosed: function(instance, toast, closedBy){
            console.info('Closed | closedBy: ' + closedBy);
        }
    });
}


function novoPedidoVenda(){
    var data = $("form input");
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if($(element).attr("type") == "checkbox"){
            $(element).attr("checked", false)
            $(element).prop("checked", false)
            $(element).val(false);
            $(element).removeProp("checked")
        }else{
            $(element).val("");
        }      
    }
    imagensPadrao()
    $("textarea").val("");
    $("select").val("");
    $("#tableproduto").html("");
    $("#quantidadeprod").val("1");
    $("[data-total-footer]").attr("data-total-footer", "0")
    $("[data-total-footer]").html("R$ 0,00")
}

function lercodebar(){
    $("video").addClass("col-md-12")
    $("video").css("z-index", "-9999")
    $("#topo").hide();
    $("#footer").hide();
    document.getElementById("interactive").requestFullscreen();
    $("#container").show(); 
}

function saircodebar(){
    $("#codigobarras").val("");
    $("#topo").show();
    $("#footer").show();
    document.exitFullscreen();
    $("#container").hide(); 
}

function configcodebar(){
    if($(".controls").css('display') == "none"){
        $(".controls").show();
    }else{
        $(".controls").hide();
    }
    
}

function addCodeBar(){
    var codebar = $("#codigobarras").val();
    $.ajax({
        dataType: "json",        
        headers: {           
            "cnpj": localStorage.getItem("cnpj")          
        },
        type: 'Get',
        url: "http://" + window.location.hostname + ":3000/api/produtos/buscaporcodebar" + "/" + codebar,
        success: function (data) {
            
            if(data && data.length > 0){
                $("#txtIdProduto").val(data[0].id);
                $("#txtValor").val(data[0].valor);
                $("#buscaproduto").val(data[0].label);
                $("#codigobarras").val("");
                addproduto();
            }else{
                iziToast.error({
                    title: '',
                    message: 'Produto não encontrado',
                });
            }
            
        },
        error: function (data) {
            console.log(data);
        }
    });
}



function atualizaGrid(){
    var tableNot = $("#gridsearch tbody");
  
    if(tableNot.length > 0){
      $(tableNot).html("");

      var url = "http://" + window.location.hostname + ":3000/api/vendas/listarpedidovendas";// + datade + "/" + dataate;
      $.ajax({        
        type: "GET",         
        headers: {           "cnpj": localStorage.getItem("cnpj")          },
        url: url,
        async: false,
        success: function(ret){
          if(ret){
            if(ret.length > 0){            
              if(ret.length > 0){
                var perpage = 9;
                var page = 0;
                var changepage = 0;

                for(var i=0;i < ret.length; i++){

                    if(ret[i].datapag == null)
                        ret[i].datapag = "";

                    var html = "";
                    html += "";
  
                    if(changepage == perpage){
                        page += 1;
                        changepage = 0;
                    }

                    changepage += 1;

                    if(i >= perpage){
                        html += "<tr class=\"tr-shadow\" data-indexgrid=" + i + " page=" + page + " style=\"display:none\">";
                    }else{
                        html += "<tr class=\"tr-shadow\" data-indexgrid=" + i + " page=" + page + ">";
                    }
 
                    
                    html += "<td data-search='" + ret[i].cliente + "'>" + ret[i].cliente + "</td>";
                    html += "<td data-search='" + ret[i].cnpj + "'>" + ret[i].cnpj + "</td>";
                    html += "<td data-search='" + ret[i].produto + "'>" + ret[i].produto + "</td>";
                    html += "<td data-search='" + ret[i].quantidade + "'>" + ret[i].quantidade + "</td>";                    
                    html += "<td data-search='" + ret[i].valortotal + "'>R$ " + ret[i].valortotal + "</td>";
                                        
                    if(ret[i].status){
                        html += "<td data-search='PENDENTE'>PENDENTE</td>";
                    }else{
                        html += "<td data-search='CONVERTIDO'>CONVERTIDO</td>";
                    }
                     

                    html += "<td>";
                    html += "    <div class=\"table-data-feature\">";
                    
 
                    /*
                    html += "        <button onclick=\"deletarNotificacao('" + ret[i].id + "')\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Deletar\">";
                    html += "            <i class=\"zmdi zmdi-delete\"></i>";
                    html += "        </button>";
  
                    
                    
                    

                    if(ret[i].nm_nfedistribuicao){
                        html += "        <button onclick='$(\"#base64_file\").html(" + ret[i].nm_nfedistribuicao +")' class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"XML\">";
                        html += "            <i class=\"zmdi zmdi-more\"></i>";
                        html += "        </button>";
                    }

                    if(ret[i].nm_nfedistribuicaopdf){
                      html += "        <button onclick=\"abrirLinkpdf('" + ret[i].nm_nfedistribuicaopdf +"')\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"PDF\">";
                      html += "            <i class=\"zmdi zmdi-more\"></i>";
                      html += "        </button>";
                    }
*/
                    html += "    </div>";
                    html += "</td>";
                    html += "</tr>";
                    //html += "<div id='base64_file" + ret[i].id + "'></div>";
                    
                    if(i >= perpage){
                        html += "<tr class=\"spacer\" data-indexgrid=" + i + " page=" + page + " style=\"display:none\"></tr>"; 
                    }else{
                        html += "<tr class=\"spacer\" data-indexgrid=" + i + " page=" + page + "></tr>";
                    }
  
                    $(tableNot).prepend(html);
                }

                html = "<p class=\"card-description\" >Numero de paginas: " + (page + 1) + "</p>";
                    
                    html += "<div style=\"padding-left: 42%;\">";  
                    html += "   <button  type=\"button\" onclick=\"anterior()\" class=\"btn btn-light\">Anterior</button>";
                    html += "   <span id=\"numeracao\">1</span>";
                    html += "   <button type=\"button\" onclick=\"proximo()\" class=\"btn btn-light\">Próximo</button>"; 
                    
                    
                    html += "</div>";

                    $("#table_pedidos_div").append(html);

              }  
            }
          }
        }
      });
    }
  }
  
  atualizaGrid();
  
  
function abrirLinkpdf(link){
    //window.open("data:application/pdf;base64," + link)
    //link = "data:application/pdf;base64, " + encodeURI(link);
    //window.open(link, '_blank');
  
    $("#base64_file").html('<embed src="data:application/pdf;base64,'+link+'" type="application/pdf" width="100%" height="800px" style="margin-top: 35px; border: 1px solid #ccc;" />');
  
  }