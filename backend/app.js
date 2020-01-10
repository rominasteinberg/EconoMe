var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');


dotenv.config();

const fs = require('fs');
var indexRouter = require('./controllers/index');
var usuariosRouter = require('./controllers/usuarios');
const registro = require('./controllers/registro');
const auth = require('./controllers/auth');
const ahorros = require('./controllers/ahorros');
const cuentaProyecto = require('./controllers/cuentaProyecto');
const ingresos = require('./controllers/ingresos');
const categorias = require('./controllers/admin/categorias');
const usuariosAdmin = require('./controllers/admin/usuarios');
const gastos = require('./controllers/gastos');
const formulario = require('./controllers/formulario');


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//RUTAS SEGURAS

secured = (req,res,next) => {
  try {

    let token = req.headers.authorization;

    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./keys/public.pem');

    let decoded = jwt.verify(token, publicKey);

    req.id = decoded.id;
    req.nombre = decoded.nombre;
    next();
  } catch (error) {
    res.status(401).json({status : 'unauthorized'});
  }
}

securedAdmin = (req,res,next) => {
  try {

    let token = req.headers.authorization;

    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./keys/public.pem');

    let decoded = jwt.verify(token, publicKey);

    req.id = decoded.id;
    req.nombre = decoded.nombre;
    req.role = decoded.role;

    if(req.role == "admin") {
      next();
    } else {
      res.status(401).json({status : 'unauthorized'});
    }

  } catch (error) {
    res.status(401).json({status : 'unauthorized'});
  }
}

//RUTAS

app.use('/', indexRouter);
app.use('/registro', registro);
app.use('/auth', auth);
app.use('/formulario', formulario);

//RUTAS PROTEGIDAS
app.use('/usuarios', secured, usuariosRouter);
app.use('/ahorros', secured, ahorros);
app.use('/cuentaProyecto', secured, cuentaProyecto);
app.use('/ingresos', secured, ingresos);
app.use('/gastos', secured, gastos);

//RUTAS DE ADMINISTRADORA
app.use('/categorias', securedAdmin, categorias);
app.use('/panelUsuarios', securedAdmin, usuariosAdmin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
