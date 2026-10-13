import { NavLink } from 'react-router-dom'
import { Activity, Boxes, Building2, ClipboardList, Contact, Home, Info, Package, Truck, UserRound, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: Home, end: true },
  { to: '/products', label: 'Inventory', icon: Boxes },
  { to: '/orders', label: 'Orders', icon: ClipboardList },
  { to: '/customers', label: 'Customers', icon: Contact },
  { to: '/services', label: 'Services', icon: Truck },
  { to: '/about', label: 'About company', icon: Building2 },
  { to: '/contact', label: 'Contact', icon: Info },
  { to: '/profile', label: 'My profile', icon: UserRound }
]
export default function Sidebar({ open, onClose }) {
  return <>
    {open && <button className="sidebar-scrim" aria-label="Close menu" onClick={onClose} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><Activity size={23} /></div>
        <div><strong>VAD BROZ'S</strong><span>Materials management</span></div>
        <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close menu"><X size={19} /></button>
      </div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav">
        {links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Icon size={18} strokeWidth={1.9} /><span>{label}</span>
        </NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="support-icon"><Package size={20} /></div>
        <strong>Manage with confidence</strong>
        <p>Keep materials, customers and orders organized in one place.</p>
        <span className="version-label">FRONTEND PROJECT · v1.0</span>
      </div>
    </aside>
  </>
}