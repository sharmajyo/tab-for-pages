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
          <li onClick={openFile}><a href="https://www.gstatic.com/webp/gallery/1.jpg">1</a></li>
          <li onClick={openFile}><a href="https://www.africau.edu/images/default/sample.pdf">sample</a></li>
          <li onClick={openFile}><a href="https://miro.medium.com/v2/resize:fit:400/format:webp/0*Db6jgQW31c0dYK6V.jpg">dog</a></li>
          <li onClick={openFile}><a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">dummy</a></li>
        </ul>
      </div>
      <div className="app-body">
        <Tabs tabs = {tabsConfig}/>
      </div>
    </div>
  );
}

export default App;
