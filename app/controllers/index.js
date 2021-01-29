const HomeDAO = require("../models/HomeDAO")

module.exports.index = function(application, req, res){
    res.render('index', {validacao: {}})
}

module.exports.autenticar = function(application, req, res){
    const dadosForm = req.body

    req.assert('email', 'E-mail deve ser preenchido').notEmpty()
    req.assert('senha', 'Senha deve ser preenchida').notEmpty()

    const erros = req.validationErrors()
    if(erros){
        res.render('index', {validacao: erros})
        return
    }

    const connection = application.config.dbConnection
    const UsuariosDAO = new application.app.models.UsuariosDAO(connection)
    const HomeDAO = new application.app.models.HomeDAO(connection)

    UsuariosDAO.autenticar(dadosForm, req, res);
    HomeDAO.watchlist(dadosForm.usuario)
}