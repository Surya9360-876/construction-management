import { useMemo, useState } from 'react'
import { Contact, Mail, MapPin, Pencil, Phone, Plus, Search, Trash2, UserRound, X } from 'lucide-react'
import useLocalStorage from '../hooks/useLocalStorage'
import EmptyState from '../components/EmptyState'

const initial = [
  { id: 1, name: 'Arun Kumar', company: 'AK Builders', phone: '9876543210', email: 'arun@example.com', city: 'Chennai' },
  { id: 2, name: 'Priya Enterprises', company: 'Priya Construction', phone: '9876501234', email: 'priya@example.com', city: 'Chengalpattu' },
  { id: 3, name: 'Suresh Babu', company: 'SB Civil Works', phone: '9840012345', email: 'suresh@example.com', city: 'Tambaram' },
  { id: 4, name: 'Meena Homes', company: 'Meena Developers', phone: '9791012345', email: 'meena@example.com', city: 'Kanchipuram' }
]
const blank = { name: '', company: '', phone: '', email: '', city: '' }
export default function Customers() {
  const [customers, setCustomers] = useLocalStorage('vb-customers', initial)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)
  const [error, setError] = useState('')
  const filtered = useMemo(() => customers.filter(c => Object.values(c).join(' ').toLowerCase().includes(search.toLowerCase())), [customers, search])
  const save = e => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Name and phone are required. Enter a valid email address.'); return }
    if (editing) setCustomers(old => old.map(c => c.id === editing ? { ...form, id: editing } : c))
    else setCustomers(old => [{ ...form, id: Date.now() }, ...old])
    setEditing(null); setForm(blank); setError('')
  }
  const startEdit = c => { setEditing(c.id); setForm({ name: c.name, company: c.company, phone: c.phone, email: c.email, city: c.city }) }
  return <div className="page-stack"><section className="page-intro-row"><div><span className="eyebrow">RELATIONSHIP MANAGEMENT</span><h2>Your customers</h2><p>Store customer contact details and keep relationships organized.</p></div><span className="date-chip">{customers.length} customers</span></section>
    <section className="customer-workspace"><div className="panel customer-directory"><div className="panel-heading"><div><h3>Customer directory</h3><p>Search and manage your customer records.</p></div></div><label className="filter-search customer-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, city, company..." /></label>
      {filtered.length ? <div className="customer-grid">{filtered.map((c, i) => <article className="customer-card" key={c.id}><div className="customer-card-top"><span className={`customer-avatar customer-avatar-${i % 4}`}><UserRound size={22} /></span><div><h4>{c.name}</h4><p>{c.company || 'Independent customer'}</p></div><button className="icon-button" onClick={() => startEdit(c)} aria-label={`Edit ${c.name}`}><Pencil size={15} /></button><button className="icon-button" onClick={() => { if (window.confirm(`Delete ${c.name}?`)) setCustomers(old => old.filter(x => x.id !== c.id)) }} aria-label={`Delete ${c.name}`}><Trash2 size={15} /></button></div><div className="customer-detail"><Phone size={15} /><span>{c.phone}</span></div><div className="customer-detail"><Mail size={15} /><span>{c.email}</span></div><div className="customer-detail"><MapPin size={15} /><span>{c.city || 'City not added'}</span></div></article>)}</div> : <EmptyState title="No customers found" />}
    </div><aside className="panel customer-form-panel"><div className="panel-heading"><div><h3>{editing ? 'Edit customer' : 'Add a customer'}</h3><p>{editing ? 'Update customer information.' : 'Create a new customer record.'}</p></div>{editing && <button className="icon-button" onClick={() => { setEditing(null); setForm(blank); setError('') }} aria-label="Cancel editing"><X size={17} /></button>}</div><form onSubmit={save} className="customer-form" noValidate>
      <label className="field">Full name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Customer name" /></label><label className="field">Company<input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company (optional)" /></label><label className="field">Phone number<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Contact number" /></label><label className="field">Email address<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@example.com" /></label><label className="field">City<input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="City" /></label>{error && <p className="form-alert">{error}</p>}<button className="button button-primary button-full" type="submit">{editing ? <Pencil size={16} /> : <Plus size={16} />}{editing ? 'Save customer' : 'Add customer'}</button>
    </form></aside></section>
  </div>
}