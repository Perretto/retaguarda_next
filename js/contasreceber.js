
function atualizaGrid(){
    var tableNot = $("#gridsearch tbody");
  
    if(tableNot.length > 0){
      $(tableNot).html("");
      //var datade = "01-07-2020";
      //var dataate = "31-07-2020";

      var url = "http://" + window.location.hostname + ":3000/api/arec/listararecpendentes";// + datade + "/" + dataate;
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
                    
                    html += "<td  data-search='" + ret[i].doc + "'>" + ret[i].doc + "</td>";
                    html += "<td  data-search='" + ret[i].cliente.toLowerCase() + "'class=\"desc\">" + ret[i].cliente + "</td>";
                    html += "<td data-search='" + ret[i].datacompra + "'>" + ret[i].datacompra + "</td>";
                    html += "<td data-search='" + ret[i].datavenc + "'>" + ret[i].datavenc + "</td>";
                    html += "<td data-search='" + ret[i].datapag + "'>" + ret[i].datapag + "</td>";

                    
                    html += "<td data-search='" + ret[i].formapag.toLowerCase() + "'>" + ret[i].formapag + "</td>";
                                        
                    html += "<td data-search='" + ret[i].valordoc + "'>R$ " + ret[i].valordoc + "</td>";
                    html += "<td data-search='" + ret[i].valorpag + "'>R$ " + ret[i].valorpag + "</td>";

                    var status = "";

                    switch (ret[i].status) {
                        case "C":
                            status = "PAGO";
                            break;
                        case "D":
                            status = "PENDENTE";
                            break;                    
                        default:
                            status = "PENDENTE";
                            break;
                    }

                    html += "<td data-search='" + status.toLowerCase() + "'>" + status + "</td>";
                    html += "<td>";
                    html += "    <div class=\"table-data-feature\">";
                    
                    /*
                    html += "        <button onclick=\"deletarNotificacao('" + ret[i].id + "')\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Deletar\">";
                    html += "            <i class=\"zmdi zmdi-delete\"></i>";
                    html += "        </button>";
  
                    
                    if(ret[i].link){
                      html += "        <button onclick=\"abrirLink('" + ret[i].link +"')\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Mais\">";
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

                    $("#table_contas_receber_div").append(html);
              }  
            }
          }
        }
      });
    }
  }
  
  atualizaGrid();
  