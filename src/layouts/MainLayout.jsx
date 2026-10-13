import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAuth } from '../context/AuthContext'
export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const location = useLocation()
  const { user, login, logout } = useAuth()
  return <div className="app-shell">
    <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    <div className="main-column">
      <Topbar onMenu={() => setSidebarOpen(true)} searchValue={searchValue} onSearch={value => {
        setSearchValue(value)
        if (location.pathname !== '/products') window.history.replaceState(null, '', '/products')
        window.dispatchEvent(new CustomEvent('inventory-search', { detail: value }))
      }} />
      <main className="page-content"><Outlet context={{ searchValue, user, login, logout }} /></main>
      <footer className="app-footer"><span>© {new Date().getFullYear()} VAD BROZ'S Materials</span><span>Built with React · Redux Toolkit · React Router</span></footer>
    </div>
  </div>
}