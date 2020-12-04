function listarvendas(callback) {
    var sql = "SELECT SELECT vendas.id AS ID, clientes.nm_nome AS Cliente, usuarios.nm_nome AS Vendedor, ";
    sql += " vendas.dt_venda AS Data, vendas.vl_valor_total AS 'Valor Total' ";
    sql += " FROM vendas ";
    sql += "    INNER JOIN clientes ON vendas.id_clientes = clientes.id ";
    sql += "    INNER JOIN usuarios ON vendas.id_usuarios = usuarios.id ";
    sql += " ORDER BY vendas.dt_venda ";
    select(sql, function (ret) {
        callback(ret);
    })
}

function listsearch(callback) {
    var sql = "SELECT SELECT vendas.id AS ID, clientes.nm_nome AS Cliente, usuarios.nm_nome AS Vendedor, ";
    sql += " vendas.dt_venda AS Data, vendas.vl_valor_total AS 'Valor Total' ";
    sql += " FROM vendas ";
    sql += "    INNER JOIN clientes ON vendas.id_clientes = clientes.id ";
    sql += "    INNER JOIN usuarios ON vendas.id_usuarios = usuarios.id ";
    sql += " ORDER BY vendas.dt_venda ";
    select(sql, function (ret) {
        callback(ret);
    })
}

function search(table, id, callback) {
    var sql = "SELECT * ";
    sql += " FROM vendas WHERE id=" + id;
    select(sql, function (ret) {
        callback(ret);
    })
}

function gravar(table, parametros, callback) {
    executeObj(table, parametros, function (ret) {
        callback(ret);
    })
}

function ondelete(table, id, callback) {
    var sql = "DELETE FROM " + table + " WHERE id=" + id;
    execute(sql, function (ret) {
        callback(ret);
    })
}

function listarcategorias(callback) {
    var sql = "SELECT id, nm_nome FROM categorias ORDER BY nm_nome ";
    select(sql, function (ret) {
        callback(ret);
    })
}
