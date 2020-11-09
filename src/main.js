const{BrowserWindow}=require('electron');
const{getConnection}=require('./database');

async function createElement(table,element){
    try {
        let conn =await getConnection();
        let result = await conn.query('insert into '+table+' set ?',element);
        return {error:false,result};
    } catch (error) {
        return {error:true,message:error};
    }
}

function test(){
    console.log('Hola desde main');
}
/*
async function deleteElement(table,element){
    try {
        let conn =await getConnection();
        let result = await conn.query(´insert into ${table} set ?´,element);
        return {error:false,result};
    } catch (error) {
        return {error:true,message:error}
    }
}
async function updateElement(table,element){
    try {
        let conn =await getConnection();
        let result = await conn.query(´insert into ${table} set ?´,element);
        return {error:false,result};
    } catch (error) {
        return {error:true,message:error}
    }
}
async function getElements(table,element){
    try {
        let conn =await getConnection();
        let result = await conn.query(´insert into ${table} set ?´,element);
        return {error:false,result};
    } catch (error) {
        return {error:true,message:error}
    }
}
*/

let window


function createWindow() {
    window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
    });
  
    window.loadFile("src/ui/index.html");
  }

module.exports = {
    createWindow,
    repository:{
        createElement
    },
    test
    
}