const { app, BrowserWindow,  } = require('electron');
const path = require('path');

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