
function atualizaGrid(){
    var tableNot = $("#gridsearch tbody");
  
    if(tableNot.length > 0){
      $(tableNot).html("");

      var url = "http://" + window.location.hostname + ":3000/api/nfeemitidas/listarnfeemitidas";// + datade + "/" + dataate;
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
 
                    
                    html += "<td data-search='" + ret[i].nm_nfenumero + "'>" + ret[i].nm_nfenumero + "</td>";
                    html += "<td data-search='" + ret[i].nm_destrazao.toLowerCase() + "' class=\"desc\">" + ret[i].nm_destrazao + "</td>";
                    html += "<td data-search='" + ret[i].nm_destcnpj_cpf + "'>" + ret[i].nm_destcnpj_cpf + "</td>";
                    html += "<td data-search='" + ret[i].dt_nfedtemis + "'>" + ret[i].dt_nfedtemis + "</td>";
                    html += "<td data-search='" + ret[i].dt_nfedtsaida + "'>" + ret[i].dt_nfedtsaida + "</td>";

                    
                    html += "<td data-search='" + ret[i].db_nfetotal + "'>R$ " + ret[i].db_nfetotal + "</td>";
                                        
                    html += "<td data-search='" + ret[i].nm_nfechave + "'>" + ret[i].nm_nfechave + "</td>"; 

                     

                    html += "<td data-search='" + ret[i].nm_nfestatus.toLowerCase() + "'>" + ret[i].nm_nfestatus + "</td>";
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
*/
                    if(ret[i].nm_nfedistribuicaopdf){
                      html += "        <button onclick=\"abrirLinkpdf('" + ret[i].nm_nfedistribuicaopdf +"')\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"PDF\">";
                      html += "            <i class=\"zmdi zmdi-more\"></i>";
                      html += "        </button>";
                    }

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

                    $("#table_nfe_emitidas_div").append(html);

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