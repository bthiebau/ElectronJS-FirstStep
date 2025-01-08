const ipc = require('electron').ipcRenderer;
const { shell } = require('electron');
const { exec } = require('child_process');
const { stdout } = require('process');

    function commandTerminal(){
        let cmd = 'ping google.fr';
        exec(cmd, (error, stdout, stderr)  => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log('stdout' + stdout);
            console.log('stderr' + stderr);
        })
    }

    function openLink(url) {
        shell.openExternal(url)
    }

    console.log('hello world');

    function test() {

        ipc.send('hello');

    }

    function getMyPass(){
        let myPseudo = 'Wi2'
        ipc.send('getMyVariable', myPseudo);

    }

    ipc.on('havePass', (event, myPass) => {

        console.log('back is ringing');
        console.log(myPass);

        let myH2 = document.getElementById('myH2');
        myH2.innerHTML = myPass;

    })