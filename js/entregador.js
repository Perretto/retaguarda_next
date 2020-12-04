



$.ajax({
    url: "http://www.google.com/maps/search/?api=1&query=-23.4954252,-46.6725351"
}).done(function (data) {
    $("#navlocalizador").html(data)
});


var tableNot = $("#gridsearch tbody");
  
    if(tableNot.length > 0){
      $(tableNot).html("");
      //var datade = "01-07-2020";
      //var dataate = "31-07-2020";

      var url = "http://" + window.location.hostname + ":3000/api/entregador/listarpedidosentregador";// + datade + "/" + dataate;
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
                    
                    html += "<td  data-search='" + ret[i].data + "'>" + ret[i].data + "</td>"; 
                    html += "<td data-search='" + ret[i].numero + "'>" + ret[i].numero + "</td>";
                    html += "<td data-search='" + ret[i].nomecliente + "'>" + ret[i].nomecliente + "</td>";
                    html += "<td data-search='" + ret[i].nome + "'>" + ret[i].nome + "</td>";
 
                                        
                    html += "<td data-search='" + ret[i].status + "'>" + ret[i].status + "</td>"; 

                    html += "<td>";
                    html += "    <div class=\"table-data-feature\">";
                    
                    
   
                    html += "        <button href='#' onclick=\"criarLink('" + ret[i].lat + "', '" + ret[i].long + "')\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Mais\">";
                    html += "            <i class=\"zmdi zmdi-more\"></i>";
                    html += "        </button>";
                    
                   

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
  
  
  atualizaGrid();


  function criarLink(lat, log){
    window.open("https://www.google.com/maps/search/?api=1&query=" + lat + "," + log, "_blank")
  }