import { useMemo, useReducer } from 'react'
import { useSelector } from 'react-redux'
import { ArrowRight, Boxes, ClipboardList, Contact, IndianRupee, Plus, Truck, TrendingUp } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import StatCard from '../components/StatCard'
import EmptyState from '../components/EmptyState'

function activityReducer(state, action) {
  if (action.type === 'dismiss') return state.filter(item => item.id !== action.id)
  if (action.type === 'restore') return action.items
  return state
}
const initialActivity = [
  { id: 1, title: 'Inventory workspace ready', detail: 'Review your materials and stock levels', tag: 'INVENTORY', time: 'Just now' },
  { id: 2, title: 'Order tracking enabled', detail: 'New orders will appear in the orders page', tag: 'ORDERS', time: 'Today' },
  { id: 3, title: 'Customer records', detail: 'Keep delivery and contact information handy', tag: 'CUSTOMERS', time: 'Today' }
]
export default function Home() {
  const products = useSelector(s => s.products.items)
  const orders = useSelector(s => s.orders.items)
  const [activity, dispatch] = useReducer(activityReducer, initialActivity)
  const navigate = useNavigate()
  const lowStock = products.filter(p => Number(p.stock) < 25)
  const orderValue = useMemo(() => orders.reduce((sum, order) => sum + Number(order.total || 0), 0), [orders])
  return <div className="page-stack">
    <section className="welcome-banner"><div className="welcome-copy"><span className="banner-kicker"><span className="live-dot" /> BUSINESS OVERVIEW</span><h2>Build better.<br /><em>Manage smarter.</em></h2><p>Your construction materials, orders and customer activity — all in one organized workspace.</p><div className="banner-actions"><button className="button button-white" onClick={() => navigate('/products')}><Boxes size={16} /> Manage inventory <ArrowRight size={15} /></button><Link to="/services" className="banner-text-link">Explore services <ArrowRight size={15} /></Link></div></div><div className="banner-graphic" aria-hidden="true"><div className="graphic-circle circle-one" /><div className="graphic-circle circle-two" /><div className="graphic-building building-back" /><div className="graphic-building building-front"><span /><span /><span /><span /><span /><span /></div><div className="graphic-ground" /><div className="graphic-tag"><TrendingUp size={16} /> Your business, in focus</div></div></section>
    <div className="section-heading"><div><h2>Business at a glance</h2><p>A quick summary of your workspace</p></div><span className="date-chip">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
    <section className="stats-grid">
      <StatCard label="Total materials" value={products.length} detail="Items in inventory" icon={Boxes} tone="green" />
      <StatCard label="Active orders" value={orders.length} detail="Orders created locally" icon={ClipboardList} tone="blue" />
      <StatCard label="Low stock items" value={lowStock.length} detail="Below 25 units" icon={Truck} tone="orange" />
      <StatCard label="Order value" value={`₹${orderValue.toLocaleString('en-IN')}`} detail="Value of created orders" icon={IndianRupee} tone="purple" />
    </section>
    <section className="dashboard-grid">
      <div className="panel inventory-panel"><div className="panel-heading"><div><h3>Inventory overview</h3><p>Your frequently supplied materials</p></div><Link to="/products" className="subtle-link">View inventory <ArrowRight size={15} /></Link></div>
        {products.length ? <div className="inventory-list">{products.slice(0, 5).map((p, i) => <div className="inventory-row" key={p.id}><span className={`mini-material material-${i % 3}`}><Boxes size={17} /></span><div className="inventory-item-name"><strong>{p.name}</strong><small>{p.category}</small></div><div className="inventory-item-stock"><strong>{p.stock} {p.unit}s</strong><small>Available</small></div><div className="inventory-item-price"><strong>₹{Number(p.price).toLocaleString('en-IN')}</strong><small>per {p.unit}</small></div></div>)}</div> : <EmptyState title="Inventory is empty" />}
        <Link to="/products" className="panel-bottom-link"><Plus size={16} /> Add or update materials</Link>
      </div>
      <div className="right-panels">
        <div className="panel quick-panel"><div className="panel-heading"><div><h3>Quick actions</h3><p>Jump straight into a task</p></div></div><div className="quick-actions"><button onClick={() => navigate('/products')}><span className="quick-icon green"><Plus size={18} /></span><span><b>Add material</b><small>Update your catalog</small></span><ArrowRight size={16} /></button><button onClick={() => navigate('/orders')}><span className="quick-icon blue"><ClipboardList size={18} /></span><span><b>Create order</b><small>Record a customer order</small></span><ArrowRight size={16} /></button><button onClick={() => navigate('/customers')}><span className="quick-icon purple"><Contact size={18} /></span><span><b>Customers</b><small>Manage contact details</small></span><ArrowRight size={16} /></button></div></div>
        <div className="panel activity-panel"><div className="panel-heading"><div><h3>Workspace activity</h3><p>Helpful reminders</p></div><span className="activity-count">{activity.length}</span></div>
          {activity.length ? activity.map(item => <div className="activity-row" key={item.id}><span className="activity-bullet" /><div><strong>{item.title}</strong><p>{item.detail}</p><small>{item.time} · {item.tag}</small></div><button className="activity-dismiss" aria-label={`Dismiss ${item.title}`} onClick={() => dispatch({ type: 'dismiss', id: item.id })}>×</button></div>) : <div className="activity-empty"><p>All caught up.</p><button className="text-button" onClick={() => dispatch({ type: 'restore', items: initialActivity })}>Restore reminders</button></div>}
        </div>
      </div>
    </section>
    <div className="dashboard-note"><span><TrendingUp size={18} /></span><div><strong>Make every delivery count.</strong><p>Keep your inventory up to date and record each order to help your team plan with confidence.</p></div><Link to="/orders">Manage orders <ArrowRight size={15} /></Link></div>
  </div>
}