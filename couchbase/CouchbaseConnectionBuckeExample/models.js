const bucket = require('./app').bucket,
    NiqlQuery = require('couchbase').N1qlQuery,
    uuid = require('uuid');

//constructor vacio
function PersonModel() {

}
function CommentModel() {

}
PersonModel.getAll = function (callback) {
    //generar sentencia 
    var statement = "SELECT person.name,person.email,"
        + "(SELECT timestamp,message FROM `"
        + bucket._name + "` USE KEYS person.comments) as comments"
        + "FROM ´" + bucket._name
        + "` AS person WHERE person.type='person'";
    //transformar sentencia 
    var query = NiqlQuery.fromString(statement);
    //lanzar la transformacion traves de bucket
    bucket.query(query, (error, result) => {
        //gestion de errores
        if (error) {
            console.log('error on run query');
            return callback(error, null);
        } else {
            callback(null, result);
        }
    })
    //recoger datos y devolver resultados
}

PersonModel.getId = function (data, callback) {
    bucket.get(data.id, (error, result) => {
        if (error) {
            console.log('error getid');
            return callback(error, null);
        }
        callback(null, data);
    });
}
PersonModel.save = function (data, callback) {
    var person = {
        name: {
            first: data.name.first,
            last: data.name.last
        },
        email: data.email,
        comments: data.comments,
        type: 'person',
        timestamp: (new Date())
    };
    var id = data.id ? data.id : uuid.v4();

    bucket.upsert(id, person, (error, res) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, res);
    });
}

CommentModel.create = function (data, callback) {
    var comment = {
        timestamp: (new Date()),
        message: data.message,
        type: 'comment'
    };
    var id = data.id ? dat.id : uuid.v4();
    bucket.insert(id, comment, (error, result) => {
        if (error) {
            console.log(error);
            return callback(error, null);
        }
        comment.id = id;
        callback(null, comment);
    });
}
module.exports.PersonModel = PersonModel;
module.exports.CommentModel = CommentModel;


