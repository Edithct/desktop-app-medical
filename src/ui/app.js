const {remote} = require("electron");
var main = remote.require("./main");
var Paciente = require('./models/paciente');
var Usuario = require('./models/usuario');
var Servicio= require('./models/servicio');
var Movimiento= require('./models/movimieno');
var TableManager=require('./models/tableManager');


/*
let paciente=new Paciente(70214782,'Keivn',main.repository);
paciente.save().
then((res)=>console.log(res));



*/