import { Bell, Menu, Search, UserRound } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const titles = {
  '/': ['Dashboard', 'Here is what is happening with your business today.'],
  '/products': ['Inventory', 'Manage your construction materials and stock.'],
  '/orders': ['Orders', 'Create, track and update customer orders.'],
  '/customers': ['Customers', 'Keep customer details organized.'],
  '/services': ['Services', 'Explore supply and delivery services.'],
  '/about': ['About company', 'Learn more about our business.'],
  '/contact': ['Contact', 'We are here to help with your requirements.'],
  '/profile': ['My profile', 'Manage your local demo profile.']
}
export default function Topbar({ onMenu, searchValue, onSearch }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const title = location.pathname.startsWith('/services/') ? ['Service details', 'Explore our construction support services.'] : titles[location.pathname] || ['Materials management', 'Manage your business.']
  return <header className="topbar">
    <button className="icon-button menu-trigger" onClick={onMenu} aria-label="Open navigation"><Menu size={21} /></button>
    <div className="page-heading"><h1>{title[0]}</h1><p>{title[1]}</p></div>
    <div className="topbar-actions">
      <label className="global-search"><Search size={17} /><input value={searchValue} onChange={e => onSearch(e.target.value)} placeholder="Search inventory..." aria-label="Search inventory" onFocus={() => { if (location.pathname !== '/products') navigate('/products') }} /></label>
      <button className="notification-button" aria-label="Notifications" title="Notifications"><Bell size={19} /><i /></button>
      <button className="user-chip" onClick={() => navigate('/profile')}><span className="avatar"><UserRound size={17} /></span><span className="user-chip-text"><b>{user?.name || 'Guest Manager'}</b><small>{user?.role || 'Demo account'}</small></span></button>
    </div>
  </header>
}