function UsuariosDAO(connection){
    this._connection = connection
}

UsuariosDAO.prototype.inserirUsuario = function(usuario, res){
    console.log(usuario)
    const dados = {
        operacao: 'inserir',
        usuario: usuario,
        collection: 'usuarios',
        callback: function(err, result){
        }
    }
    this._connection(dados)
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    console.log(usuario)
    const dados = {
        operacao: 'autenticar',
        usuario: usuario,
        collection: 'usuarios',
        callback: function(err, result){
            result.toArray(function(err, result){
                if(result[0] != undefined){
                    req.session.autorizado = true
                    req.session.senha = result[0].senha
                    req.session.usuario = result[0].usuario
                }
                if(req.session.autorizado){
                    res.redirect('home')
                }else{
                    res.render('index', {validacao: [{msg: 'Usuário não cadastrado'}]})
                }
            })
        }
    }
    this._connection(dados)
}

module.exports = function(){
    return UsuariosDAO
}