module.exports.home = function(application, req, res){

    if(req.session.autorizado){
        res.render('home')
    }else{
        res.render('index', {validacao: [{msg:'Usuário precisa estar logado'}]})
    }

}

module.exports.sair = function(application, req, res){
    req.session.destroy( function(err, result){
        res.render('index', {validacao: {}})
    })
}

