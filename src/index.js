const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) { 
  app.quit();
}

//process.env.NODE_ENV = "production";

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    resizable: false,
    webPreferences:{
      nodeIntegration:true,
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
};


app.on('ready', function(){
  createWindow();

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function newWindow(){
  const aboutWindow = new BrowserWindow({
    width: 600,
    height: 500,
    resizable: false,
    webPreferences:{
      nodeIntegration:true,
    }
  });

  aboutWindow.loadFile(path.join(__dirname, 'about.html'));
  aboutWindow.webContents.openDevTools();
}

const mainMenuTemplate = [
  {
    label:"About",
    click(){
      newWindow();
    }   
  },
  {
    label:"File",
    submenu:[
      {
        label: "Exit",  
        click(){
          app.quit();
        }
      }
    ]
  }
]

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
