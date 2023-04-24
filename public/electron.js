const path = require('path');
const tabs = require('./tabs');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow; 
function createWindow() {

  console.log("app ready");
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
  tabs.init(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
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

//---------

// const tabs = [];
// const views = {};
// const tabsConfig = [];
// let lastViewId = null;

// const updateTab = () => {
//  mainWindow.webContents.send('tab:updated', tabsConfig)
// }

// ipcMain.on('open:tab', ( event, path ) => {
//   event.preventDefault();
//    const view = new BrowserView();
//    view.id = view.webContents.id;
//   tabs.push(view.id);
//   tabsConfig.push({tabId: tabsConfig.length, tittle: path, name: path.split('/').pop()})
  
//   mainWindow.addBrowserView(view);
//   view.setBounds(getControlBounds());
//   view.setAutoResize({ width: true });
//   view.webContents.loadURL(path);

//   // add new
//   views[view.id] = view;
//   lastViewId = view.id;

//   updateTab();
// });

// ipcMain.on('close:tab', ( event, tabId ) => {
//   if(tabsConfig.length > 0) {
//     tabsConfig.splice(tabId, 1);
//     updateTab();
//   }
//   // active tab getting closed tab 
//   if(tabs[tabs.length - 1 ] === lastViewId) {
//     mainWindow.removeBrowserView(views[lastViewId]);
//     tabs.pop();
//     lastViewId = tabs.length - 1;
//     lastViewId = tabs[tabs.length - 1 ];

//   }
// })

// const getControlBounds = () => {
//   const contentBounds = mainWindow.getContentBounds();
//   return {
//     x: 150,
//     y: 80,
//     width: contentBounds.width - 150,
//     height: contentBounds.height - 60
//   };
// }
