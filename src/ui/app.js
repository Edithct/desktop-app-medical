const {remote} = require("electron");
var main = remote.require("./main");
var Paciente = require('./models/paciente');
/*
let paciente=new Paciente(70214782,'Keivn',main.repository);
paciente.save().
then((res)=>console.log(res));



*/