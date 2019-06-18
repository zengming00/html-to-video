const electron = require('electron');
const { ipcMain } = require('electron')
const fs = require('fs');
const app = electron.app
const BrowserWindow = electron.BrowserWindow


let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    x: 2000,
    y: 0,
    width: 480, height: 800, frame: false,// show: false 
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  var url = `file://${__dirname}/win.html`;
  // var url = `file://${__dirname}/test.html`;
  mainWindow.loadURL(url)
  // mainWindow.webContents.openDevTools()

  // mainWindow.once('ready-to-show', function(){
  //   mainWindow.show();
  // })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('message', (event, arg) => {
  if (arg === 'getURL') {
    // const src = 'http://a3.rabbitpre.com/m/U7VRJzs?mobile=1';
    const src = `file://${__dirname}/c.html`;
    event.returnValue = src;
  }
})

