import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClipboardList, Plus, Trash2 } from 'lucide-react'
import { addOrder, deleteOrder, updateOrderStatus } from '../features/orders/orderSlice'
import EmptyState from '../components/EmptyState'

export default function Orders() {
  const orders = useSelector(s => s.orders.items)
  const products = useSelector(s => s.products.items)
  const dispatch = useDispatch()
  const [form, setForm] = useState({ customer: '', materialId: products[0]?.id || '', quantity: '1', phone: '', delivery: '' })
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const selected = products.find(p => p.id === form.materialId)
  const total = selected ? Number(selected.price) * Math.max(0, Number(form.quantity) || 0) : 0
  const submit = e => {
    e.preventDefault()
    if (!form.customer.trim() || !form.phone.trim() || !form.materialId || !form.delivery || Number(form.quantity) <= 0 || !Number.isFinite(Number(form.quantity))) { setError('Complete all fields and enter a quantity greater than zero.'); return }
    if (selected && Number(form.quantity) > Number(selected.stock)) { setError(`Only ${selected.stock} ${selected.unit}(s) are currently in stock.`); return }
    dispatch(addOrder({ ...form, material: selected.name, quantity: Number(form.quantity), unitPrice: selected.price, total }))
    setForm(prev => ({ ...prev, customer: '', phone: '', quantity: '1', delivery: '' }))
    setError(''); setNotice('Order created successfully.')
  }
  const statusClass = status => status.toLowerCase().replaceAll(' ', '-')
  return <div className="page-stack"><section className="page-intro-row"><div><span className="eyebrow">ORDER MANAGEMENT</span><h2>Customer orders</h2><p>Create new orders and track their progress.</p></div><span className="date-chip">{orders.length} total orders</span></section>
    {notice && <div className="notice-success" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss message">×</button></div>}
    <section className="order-layout"><div className="panel order-form-panel"><div className="panel-heading"><div><h3><Plus size={18} /> Create an order</h3><p>Enter the customer and delivery details.</p></div></div><form onSubmit={submit} className="order-form" noValidate>
      <label className="field">Customer name<input value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} placeholder="Full name" /></label>
      <label className="field">Phone number<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Contact number" inputMode="tel" /></label>
      <label className="field">Material<select value={form.materialId} onChange={e => setForm({ ...form, materialId: e.target.value })}>{products.map(p => <option value={p.id} key={p.id}>{p.name} — ₹{Number(p.price).toLocaleString('en-IN')}/{p.unit}</option>)}</select></label>
      <label className="field">Quantity<input type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} /></label>
      <label className="field">Delivery date<input type="date" min={new Date().toISOString().slice(0, 10)} value={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.value })} /></label>
      <div className="order-total"><span>Estimated order total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div>
      {error && <p className="form-alert" role="alert">{error}</p>}
      <button className="button button-primary button-full" type="submit" disabled={!products.length}><Plus size={16} /> Create order</button>
    </form></div>
    <div className="panel order-list-panel"><div className="panel-heading"><div><h3>Recent orders</h3><p>Update each order's status as work progresses.</p></div><span className="activity-count">{orders.length}</span></div>
      {orders.length ? <div className="table-wrap"><table><thead><tr><th>ORDER / CUSTOMER</th><th>MATERIAL</th><th>TOTAL</th><th>STATUS</th><th /></tr></thead><tbody>{orders.map((o, i) => <tr key={o.id}><td><strong>ORD-{String(orders.length - i).padStart(3, '0')}</strong><small>{o.customer}<br />{o.phone}</small></td><td>{o.material}<small>{o.quantity} unit(s) · {o.delivery}</small></td><td><strong>₹{Number(o.total).toLocaleString('en-IN')}</strong></td><td><select aria-label={`Status for ${o.customer}`} className={`status-select ${statusClass(o.status)}`} value={o.status} onChange={e => dispatch(updateOrderStatus({ id: o.id, status: e.target.value }))}><option>Pending</option><option>Processing</option><option>Delivered</option><option>Cancelled</option></select></td><td><button className="icon-button table-delete" onClick={() => { if (window.confirm('Delete this order?')) dispatch(deleteOrder(o.id)) }} aria-label={`Delete order for ${o.customer}`}><Trash2 size={16} /></button></td></tr>)}</tbody></table></div> : <EmptyState title="No orders yet" message="Create your first order using the form." /> }
    </div></section>
    <div className="dashboard-note"><span><ClipboardList size={18} /></span><div><strong>Order tracking made simple.</strong><p>Orders are stored in Redux for this browser session. Connect a backend for permanent, shared records.</p></div></div>
  </div>
}