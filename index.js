const { Tray } = require('electron');
const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu } = electron;
const path = require('path');
let mainWindow;
let tray;


app.on('ready', () => {
    console.log(`${__dirname}\\index.html`);
    mainWindow = new BrowserWindow({
        width: 250,
        height: 400,
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        },
      });
    mainWindow.loadURL(`file://${__dirname}\\index.html`); 

    const mainMenu = Menu.buildFromTemplate(barMenu);
    Menu.setApplicationMenu(mainMenu);

    //tray start
    const iconPath = path.join(__dirname, `./trayIcon/phone.png`);
    console.log(iconPath);
    tray = new Tray(iconPath);
    tray.on('click', (event, bounds) => {

        const {x , y} = bounds; //tray position on x-y plane
        
        console.log(x , y);

        const {height , width } = mainWindow.getBounds(); //window height, width and position on x-y plane



        if(mainWindow.isVisible()) {
            mainWindow.hide();
        }
        else {
            mainWindow.setBounds({
                x: x - Math.round(width/2),
                y: y-height+ 7,
                height: height,
                width: width

            });
            mainWindow.show();
        }
        
    })
    //tray end


});



const barMenu = [{
    label: 'File',
    submenu: [
        {
          label: 'Quit',
          accelerator: process.platform === 'drawin' ? 'Command+Q' : 'Ctrl+Q',
          click() {
            app.quit();
          }
        },

        {
          role: 'toggleDevTools'
        }
    ]
}];