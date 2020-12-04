let edge = require('electron-edge-js');

function sat() {

    var Utilitarios = edge.func({
        source: function () {/*
            async (dynamic input) =>
            {
                var Util = ECFSatCFe.Utils.Utilitarios.F_RemoveAcentos(input.str);
                return Util;
            }
        */},
        references: ["bin/SatCFe.dll"]
    });

    Utilitarios({ str: 'É, será mês da convenção.' }, function (error, result) {
        if (error) throw error;
        console.log(result);
    });
}