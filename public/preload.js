// In the preload script.
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
  getTabConfig :(callback) => {
    ipcRenderer.on('tab:updated', callback)
  },
  openTab: (filePath) => ipcRenderer.send('open:tab', filePath),
  closeTab:(tabId) => ipcRenderer.send('close:tab', tabId),
  showTab:(tabId) => ipcRenderer.send('show:tab', tabId),
})
