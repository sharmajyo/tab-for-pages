
const closeTab = (tab) => {
   window.electronAPI.closeTab(tab.tabId)
}

const showTab = (tab) => {
    window.electronAPI.showTab(tab.tabId)
 }

export const Tabs = ({tabs}) => {
    return <div className="body-tab">
        <ul  className="tab-list">
        {
        tabs.map((tab) => (
            <li style={tab.isActive ? { 'background-color': '#f6f6f6' } : null}> 
            <span onClick={() => showTab(tab)}> {tab.tittle || 'current window'}  </span>
            <span className="tab-close" onClick={() => closeTab(tab)}>x</span>
            </li>
            ))
        }
        </ul>
        </div>
}