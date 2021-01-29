module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {validacao: {}, dadosForm: {}})
}
module.exports.cadastrar = function(application, req, res){

    const dadosForm = req.body

    req.assert('email', 'E-mail é obrigatório').notEmpty()
    req.assert('usuario', 'Usuário é obrigatório').notEmpty()
    req.assert('data', 'Data é obrigatório').notEmpty()
    req.assert('data', 'Data deve ser DIA/MÊS/ANO').isDate()
    req.assert('senha', 'Senha é obrigatório').notEmpty()

    const erros = req.validationErrors()
    if(erros){
        res.render('cadastro', {validacao: erros, dadosForm: dadosForm})
        return
    }

    const connection = application.config.dbConnection
    const UsuariosDAO = new application.app.models.UsuariosDAO(connection)
    const HomeDAO = new application.app.models.HomeDAO(connection)

    UsuariosDAO.inserirUsuario(dadosForm)
    HomeDAO.watchlist(dadosForm.email)
    res.render('index', {validacao: {}})
}