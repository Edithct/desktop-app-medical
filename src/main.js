const{BrowserWindow}=require('electron')

let window
function createWindow(){
    window =  new BrowserWindow({
        width: 800,
        heigth: 600,
        webPreference:{
            nodeIntegration: true
        }
    })
    window.loadFile('src/ui/index.html');
}

module.exports = {
    createWindow
}