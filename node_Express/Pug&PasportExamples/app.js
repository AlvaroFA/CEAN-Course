//imports
const passport= require('passport'),
    express= require('express'),
    pug=require('pug'),
    bodyParser=require('body-parser'),
    session=require('express-session'),
    LocalStrategy= require('passport-local').Strategy;

const app= express();
//local oauth callbacks
passport.use(new LocalStrategy((username,password,done)=>{
    if(password !== '1234'){
        return done(null,false);
    }
    return done(null,{username:username});
}));
//config de la session

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});

//creacion del server
var port = process.env.PORT || 3000;
//
app.use(session({
    secret:'hola mundo',
    resave: false,
    saveUninitialized:true
}));
//inicializacion del passport y de la session


app.use(passport.initialize());
app.use(passport.session());
//templates
app.set("views","./views");
app.set("view engine","pug");
//using 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//En caso de que ya este auth
var requireAuthentication= (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/login');
    }
};


//peticion GET
app.get('/',(req,res)=>{
    res.render('index',{title:'Pagina principal'});
});
//colocamos los recursos al final de los verbos (DEPRECATED)
//app.use(express.static("public"));
// renderizado de plantilla
app.get('/login',(req,res)=>{
    res.render('login',{title:'Acreditacion'});
});
//Mecanismo de autentificacion.. recoge los valores del form
app.post('/login',passport.authenticate('local',{
    //en caso de exito redirige a raiz sino devuelve a login
    successRedirect:'/',failureRedirect:'/login'
}));
/*dentro del array se ejecutan las funciones por orden, pasa de una a otra por el metodo next()
--> implementado en la primera funcion requireAuthentication (ver arriba)
*/
app.get('/profile',[requireAuthentication,(req,res)=>{
    res.render('profile',{user:req.session.passport.user.username});
}]);

app.get('/about',(req,res)=>{
    res.render('about',{title:'Acerca de'});
});

app.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/login');
});

//creacion del servidor
app.listen(3000,(error)=>{
    if(error){
        console.log('error');
    }
    console.log('lanzando');
});
