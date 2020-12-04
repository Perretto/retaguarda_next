
  $( function() {
    $( "#nm_nome" ).autocomplete({
      source: function( request, response ) {
        var url = "http://" + window.location.hostname + ":3000/api/notafiscal/autocompletecliente/" + request.term
        $.ajax({
          url: url,
          context: document.body
        }).done(function (data) {   
          response($.map(data, function (item) {
              return {
                  label: item.text,
                  id: item.value
              }
          }));
        });
        
      },
      select: function( event, ui ) {
        $("[name='nm_nome']").val(ui.item.id);
      }
    });
  } );
