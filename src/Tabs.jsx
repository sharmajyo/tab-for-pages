
const closeTab = (tab) => {
   window.electronAPI.closeTab(tab.tabId)
}

export const Tabs = ({tabs}) => {
    
    return <div className="body-tab">
        <ul  className="tab-list">
        {
        tabs.map((tab) => (
            <li> 
            {tab.name || 'current window'}
            <span className="tab-close" onClick={() => closeTab(tab)}>x</span>
            </li>
            ))
        }
        </ul>
        </div>
}