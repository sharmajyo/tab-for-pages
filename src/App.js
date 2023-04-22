import { useEffect, useState } from "react"

import './App.css';
import { Tabs } from './Tabs';

const openFile = async (e) => {
  e.preventDefault();
  const path = e.target.href;
  window.electronAPI.openTab(path);
}
function App() {
  const [tabsConfig, setTabsConfig] = useState([]);

  useEffect(() => {
        window.electronAPI.getTabConfig((e, data) => {
          setTabsConfig(data);
        })
    }, [])
  return (
    <div className="App">
      <div className="app-panel">
        <ul>
          <li onClick={openFile}><a href="file:///Users/jsharma2/Desktop/charvi.pdf">first</a></li>
          <li onClick={openFile}><a href="file:///Users/jsharma2/Desktop/Screenshot%202023-04-21%20at%201.27.28%20AM.png">second</a></li>
        </ul>
      </div>
      <div className="app-body">
        <Tabs tabs = {tabsConfig}/>
      </div>
    </div>
  );
}

export default App;
