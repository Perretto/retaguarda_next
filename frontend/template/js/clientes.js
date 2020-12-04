function listarclientes(callback) {
    var sql = "SELECT * FROM clientes ORDER BY nm_nome ";
    select(sql, function (ret) {
        callback(ret);
    })
}

function listsearch(callback) {
    var sql = "SELECT id AS id, nm_nome AS NOME, nm_codigo AS CODIGO, nm_cnpj AS CNPJ, nm_cpf AS CPF, sn_pessoa_fisica AS PESSOA_FISICA ";
    sql += "  FROM clientes ORDER BY nm_nome "
    select(sql, function (ret) {
        callback(ret);
    })
}

function search(table, id, callback) {
    var sql = "SELECT * ";
    sql += " FROM clientes WHERE id=" + id;
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
