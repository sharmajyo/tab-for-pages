
const { ipcMain, BrowserView } = require('electron');
const uuid = require('uuid');
let mainWindow;

// tab data
const openTabsViewMap = {};
const tabsConfig = [];
let currentView;

const getControlBounds = () => {
    const contentBounds = mainWindow.getContentBounds();
    return {
      x: 150,
      y: 80,
      width: contentBounds.width - 150,
      height: contentBounds.height - 60
    };
  }

const updateTab = () => {
 mainWindow.webContents.send('tab:updated', tabsConfig)
}
const setTabConfig = (activeTabId, path) => {
    let existing;
    for (const tab of tabsConfig) {
        if(path && tab.path === path) {
            existing = tab;
            tab.isActive = true;
        } else {
            tab.isActive = tab.tabId === activeTabId;
        }
        
    }

    if (path) {
        if(existing) {
            return existing.tabId;
        }
        const tabId = uuid.v1();
        tabsConfig.push({
            tabId, 
            path, 
            tittle: path.split('/').pop(),
            isActive: true,
        })
    return tabId;
    }
}

const setCurrentView = (view) => {
    if(currentView) {
        mainWindow.removeBrowserView(currentView);
    }
    if(view) {
        mainWindow.addBrowserView(view);
    }
    currentView = view;
  }

ipcMain.on('open:tab', ( event, path ) => {
  event.preventDefault();
  //todo: open existing file
   const tabId = setTabConfig(undefined, path);
   let view = openTabsViewMap[tabId];
   if(!view) {
    view = new BrowserView();
    view.id = view.webContents.id;
    openTabsViewMap[tabId] = view;
    setCurrentView(view);
    view.setBounds(getControlBounds());
    view.setAutoResize({ width: true });
    view.webContents.loadURL(path);
   } else {
    setCurrentView(view);
   }
  
  updateTab();
});

ipcMain.on('show:tab', ( event, tabId ) => {
    setTabConfig(tabId);
    setCurrentView(openTabsViewMap[tabId]);
    updateTab();
});

ipcMain.on('close:tab', ( event, tabId ) => {
  const view = openTabsViewMap[tabId];
  const tabIndex = tabsConfig.findIndex(tab => tab.tabId === tabId)
  const previousTab = tabIndex > 0 ? tabsConfig[tabIndex - 1]: null;
  const nextTab = (tabIndex + 1) < tabsConfig.length ? tabsConfig[tabIndex + 1]: null;
  
  tabsConfig.splice(tabIndex, 1);
 
  if (view === currentView) { // an active tab
    let nextView;
    if(previousTab) {
        nextView = openTabsViewMap[previousTab.tabId];
        setTabConfig(previousTab.tabId);
    } else if(nextTab) {
        nextView = openTabsViewMap[nextTab.tabId];
        setTabConfig(nextTab.tabId);
    }
    setCurrentView(nextView);
  }
  delete openTabsViewMap[tabId];
  view.webContents.destroy();
  updateTab();
})

module.exports = {
    init: (win) => {
        mainWindow = win;
    }
 }