// HAS ACCESS TO NODE.JS APIs

const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')

const inDev = process.env.NODE_ENV !== 'development';

const createWindow = () => {
    const win = new BrowserWindow({
      width: inDev ?1200 : 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
      
    })
    
    //Open devtools while in development mode
    if(inDev) { 
      win.webContents.openDevTools(); 
    }

    win.loadFile('./app/index.html')
  }


  app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })