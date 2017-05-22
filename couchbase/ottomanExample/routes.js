//routes
const PersonModel = require('./models').personModel;
const CommentModel = require('./models').commentModel;
const ottoman = require('ottoman');
const bodyparser = require('body-parser');
const pug = require('pug');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var appRouter = function (app) {
    //get personalist
    app.get('/all', (req, res) => {
        PersonModel.find({}, { load: ["comments"] }, (error, person) => {
            if (error) {
                return res.status('400').send(error);
            }
            res.send(person);
        })
    });
    // templates
    app.set("views", "./views");
    app.set("view engine", "pug");
    //post persona
    var requireAuthentication= (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
};
    //login
    app.get('/', [requireAuthentication, (req, res) => {
        res.render('/comments', { user: req.session.passport.user.username });
    }]);


    app.get('/comments', [requireAuthentication, (req, res) => {
        res.render('comments', { user: req.session.passport.user.username });
    }]);

    app.post('/person', (req, res) => {
        var person = new PersonModel({
            name: {
                first: req.body.name.first,
                last: req.body.name.last
            },
            email: req.body.email
        });
        person.save((error, result) => {
            if (error) {
                return res.status('400').send(error);
            }
            res.send(result);
        });
    });


    app.post('/', passport.authenticate('local', {
        //en caso de exito redirige a raiz sino devuelve a login
        successRedirect: '/comments', failureRedirect: '/'
    }));

    //get persona by id
    app.get('/person/:id', (req, res) => {
        PersonModel.getById(req.params.id, { load: ["comments"] }, (error, person) => {
            if (error) {
                return res.status('400').send(error);
            }
            res.send(person);
        })
    });
    // busqueda sin indices
    app.get('/person/searchByEmail/:email', (req, res) => {
        PersonModel.find({ email: req.params.email }, { load: ["comments"] }, (error, person) => {
            if (error) {
                return res.status('400').send(error);
            }
            res.send(person);
        });
    });
    //busqueda mediante indices
    app.get('/person/findByEmail/:email', (req, res) => {
        PersonModel.findByEmail(req.params.email, { load: ["comments"] }, (error, person) => {
            if (error) {
                return res.status('400').send(error);
            }
            res.send(person);
        });
    });


    var id = '2fb15100-5d30-4c40-b3ba-e9749ce30c05';
    //post commnet
    app.post('/coment', (req, res) => {
        var comment = new CommentModel({
            message: req.body.comment
        });
        comment.save((error, result) => {
            if (error) {
                return res.status('400').send(error);
            }
            PersonModel.getById(id, (error, person) => {
                if (error) {
                    return res.status('400').send(error);
                }
                person.comments.push(comment);
                person.save((error, success) => {
                    if (error) {
                        return res.status('400').send(error);
                    }
                    //res.send(person);
                    res.send(person);
                })
            })
        });
    });
};
module.exports = appRouter;
