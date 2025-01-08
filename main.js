const { app, BrowserWindow, ipcMain,  } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
function createWindow() {

    mainWindow = new BrowserWindow({
        frame: true,
        title: 'My First App', //titre, il faut bien enleer la balise title du head dans le fichier html
        width: 1318,
        height:710,
        resizable: true,
        minWidth: 577,
        minHeight:609,
        icon: path.join(__dirname, 'assets/'),
        webPreferences: {
            preload: path.join(__dirname, 'front/preload.js'),
            webSecurity: true,
            nodeIntegration: true,
            contextIsolation: false, // empeche l'utilisation de variable entre les fichiers
            enableRemoteModule: true, // active la carte reseau
        }
    })

    mainWindow.setMenuBarVisibility(false);

    //mainWindow.loadURL('https://gamenium.fr')

    mainWindow.loadFile('front/main.html')


}



app.whenReady().then(() => {

    createWindow();

    console.log('app is ready');

})

ipcMain.on('hello', (event) => {
    console.log('hello im in back')
})


let myPass = 'Je suis un pass'
ipcMain.on('getMyVariable', (event, pseudo) => {
    console.log('Demande pris en compte');


    /* Renvoyer au front -> variable myPass*/
    event.sender.send('havePass', myPass)



    /*L'ecrire dans un fichier*/
    if (!fs.existsSync(path.join(app.getPath('appData') + '/.myFirstApp'))) {

        fs.mkdir(path.join(app.getPath('appData') + '/.myFirstApp'), (err) => {
            if(err) throw err;
        })

    }
    

    let url = path.join(app.getPath('appData') + '/.myFirstApp/pass.txt');
    let content = myPass;

    fs.appendFile(url, content, (err) => {
        if(err) throw err;
    })

    fs.readFile(path.join(app.getPath('appData') + '/.myFirstApp/pass.txt'), 'utf8', (err, data) => {
        if(err) throw err;

        console.log('donner du fichier : ' + data);
    })

})