const electron = require('electron');
const fs = require('fs');
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

app.disableHardwareAcceleration()

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480, height: 800, frame: false, resizable: false, show: false,
    webPreferences: {
      offscreen: true
    }
  })
  // mainWindow = new BrowserWindow({ width: 480, height: 800 })

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // mainWindow.webContents.on('paint', function(event, dirtyRect, image){
  //   console.log(Date.now())
  // })
  // mainWindow.webContents.setFrameRate(2);
  
  var url = 'https://github.com';
  var url = `file://${__dirname}/a.html`;
  var url = 'http://a3.rabbitpre.com/m/U7VRJzs?mobile=1';
  mainWindow.loadURL(url)
  //mainWindow.webContents.openDevTools()

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