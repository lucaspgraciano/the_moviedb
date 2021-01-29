function HomeDAO(connection){
    this._connection = connection
}

HomeDAO.prototype.watchlist = function(email, res){
    console.log(email)
    const dados = {
        operacao: 'lista',
        dados_passados:{email: email, lista: {}},
        collection: 'lista',
        callback: function(err, result){
        }
    }
    this._connection(dados)
}
module.exports = function(){
    return HomeDAO
}