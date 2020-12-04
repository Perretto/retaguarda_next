console.log("not")
  var url = "http://" + window.location.hostname + ":3000/api/notificacao/quantidadenotificacao";
  $.ajax({        
    type: "GET",         
    headers: {           "cnpj": localStorage.getItem("cnpj")          },
    url: url,
    async: false,
    success: function(ret){
      if(ret){
        if(ret.length > 0){
          var html = "";

          if(ret.length > 0){
            html = "Você tem " + ret[0].quant + " notificações";
            $("#quantidadenotificacao").append(html)
            $("#notificon").addClass("has-noti");
          }       

        }
      }
    }
  });



  
  var url = "http://" + window.location.hostname + ":3000/api/notificacao/listsearch";
  $.ajax({        
    type: "GET",         
    headers: {           "cnpj": localStorage.getItem("cnpj")          },
    url: url,
    async: false,
    success: function(ret){
      if(ret){
        if(ret.length > 0){
          var html = "";

          if(ret.length > 0){


            for(var i=0;i < ret.length; i++){
                html += "<div class=\"notifi__item\">";

                var cor = "bg-flat-color-1";

                switch (ret[i].cor) {
                    case 1:
                        cor = "bg-c1"
                        break;
                    case 2:
                        cor = "bg-c2"
                        break;
                    case 3:
                        cor = "bg-c3"
                        break;
                    case 4:
                        cor = "bg-flat-color-1"
                        break;                
                    default:
                        break;
                }

                html += "   <div class=\"" + cor + " img-cir img-40\">";
                html += "       <i class=\"" + ret[i].icon + "\"></i>";
                html += "   </div>";
                html += "   <div class=\"content\">";
                html += "       <p>" + ret[i].descricao + "</p>";

                var data = new Date(ret[i].data);
                var monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto","Setembro", "Outubro", "Novembro", "Dezembro")

                html += "       <span class=\"date\">" + data.getDate() + " de " + monName[data.getMonth()] + " de " + data.getFullYear();// + " às " + data.getHours() + ":" + data.getMinutes() +  "</span>";
                html += "   </div>";
                html += "</div>";
            }

            html += "<div class=\"notifi__footer\">";
            html += "   <a href=\"notificacao.html\">Todas as notificações</a>";
            html += "</div>";

            $("#notificacaorapida").append(html)
          }       

        }
      }
    }
  });


function atualizaGrid(){
  var tableNot = $("#table_notificacao tbody");

  if(tableNot.length > 0){
    $(tableNot).html("");
    var url = "http://" + window.location.hostname + ":3000/api/notificacao/listall";
    $.ajax({        
      type: "GET",         
      headers: {           "cnpj": localStorage.getItem("cnpj")          },
      url: url,
      async: false,
      success: function(ret){
        if(ret){
          if(ret.length > 0){            
            if(ret.length > 0){
              for(var i=0;i < ret.length; i++){
                  var html = "";
                  html += "";

                  html += "<tr class=\"tr-shadow\">";
                  if(ret[i].tipo == "826c0127-be66-4cc8-b2ce-5a69304bc1f5"){
                    html += "<td class=\"desc\" style=\"color:red\">" + ret[i].descricao + "</td>";
                  }else{
                    html += "<td class=\"desc\">" + ret[i].descricao + "</td>";
                  }
                  html += "<td>" + dataHoraFormatada(ret[i].data) + "</td>";
                  html += "<td>R$ " + ret[i].valor + "</td>";
                  html += "<td>";
                  html += "    <div class=\"table-data-feature\">";
                  html += "        <button onclick=\"deletarNotificacao('" + ret[i].id + "')\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Deletar\">";
                  html += "            <i class=\"zmdi zmdi-delete\"></i>";
                  html += "        </button>";

                  if(ret[i].link){
                    html += "        <button onclick=\"abrirLink('" + ret[i].link +"')\" class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Mais\">";
                    html += "            <i class=\"zmdi zmdi-more\"></i>";
                    html += "        </button>";
                  }
                  
                  html += "    </div>";
                  html += "</td>";
                  html += "</tr>";
                  //html += "<div id='base64_file" + ret[i].id + "'></div>";
                  html += "<tr class=\"spacer\"></tr>";

                  $(tableNot).prepend(html);
              }
            }

          }
        }
      }
    });
  }
}

atualizaGrid();



function deletarNotificacao(id){
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
              
              var url = "http://" + window.location.hostname + ":3000/api/notificacao/delete/" + id
               
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
                              atualizaGrid();
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

function abrirLink(link){
  //window.open("data:application/pdf;base64," + link)
  //link = "data:application/pdf;base64, " + encodeURI(link);
  //window.open(link, '_blank');

  $("#base64_file").html('<embed src="data:application/pdf;base64,'+link+'" type="application/pdf" width="100%" height="800px" style="margin-top: 35px; border: 1px solid #ccc;" />');

}


function abrirLinkXml(link){
  //window.open("data:application/pdf;base64," + link)
  //link = "data:application/pdf;base64, " + encodeURI(link);
  //window.open(link, '_blank');
console.log("xml")
  $("#base64_file").html(link);

}