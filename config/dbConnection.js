const mongo = require('mongodb').MongoClient
const assert = require('assert')

const url = "mongodb://localhost:27017"
const dbName = 'cadastro'

const connMongoDB = function(dados){
    mongo.connect(url, function(err, client){
        assert.strictEqual(null, err)
        console.log("CONEXÃO BEM SUCEDIDA")
        const db = client.db(dbName)
        query(db, dados)
        client.close()
    })
}

function query(db, dados){
    const collection = db.collection(dados.collection)
    switch(dados.operacao){
        case 'inserir':
            collection.insertOne(dados.usuario, dados.callback)
            break
        case 'autenticar':
            collection.find(dados.usuario, dados.callback)
            break
        case 'lista':
            collection.insertOne(dados.dados_passados, dados.callback)
            break    
        default:
            break
    }
}

module.exports = function(){
    return connMongoDB
}