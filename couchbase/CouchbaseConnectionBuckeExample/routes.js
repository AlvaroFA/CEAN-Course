//routes
const PersonModel = require('./models').PersonModel;
const CommentModel= require('./models').CommentModel;

var appRouter = function (app) {
    //get personalist
    app.get('/all', (req, res) => {
        PersonModel.getAll((error, result) => {
            if (error) {
                return result.status('400').send(error);
                console.log('error');
            }    
                res.send(result);
            
        });
    });
    //post persona
    app.post('/person', (req, res) => {
        PersonModel.save(req.body, (error, result) => {
            if (error) {
                return res.status('400').send(error);
            } else {
                res.send(result)
            }
        })
    });
    //get persona by id
    app.get('/person/:id', (req, res) => {
        PersonModel.getId(req.params, (error, result) => {
            if (error) {
                return res.status('400').send(error);
            }
            PersonModel.getId(person, (error, result) => {
                if (error) {
                    return res.status('400').send(error);
                }
                res.send(result);
            });
        })
    });
    //post commnet
    app.post('/coment', (req, res) => {
        //Creacion del comentario
        CommentModel.create(req.body, (req, comment) => {
            if (req) {
                return res.status('400').send(req);
            }
            //recuperar id de person
            PersonModel.getId(req.body, (error, person) => {
                if (error) {
                    return res.status('400').send(error);
                }
                //asociacion comment cpn person
                /*
                    si el person no tiene comentario,
                    crea un array vacio
                */
                if(!person.comments){
                    person.comments= [];
                }
                person.comments.push(comment.id);
                // insert o update comment con person
                //recuperamos el id de persona desde la peticion
                person.id = req.body.id;
                PersonModel.save(person, (error, result) => {
                    if (error) {
                        return res.status('400').send(error);
                    }
                    res.send(person);
                });
            });
        })
    });
};
module.exports = appRouter;
