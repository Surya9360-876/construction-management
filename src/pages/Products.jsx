import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Download, Filter, Plus, Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import EmptyState from '../components/EmptyState'
import { addProduct, deleteProduct, updateProduct } from '../features/products/productSlice'
import useProducts from '../hooks/useProducts'

export default function Products() {
  const products = useSelector(s => s.products.items)
  const dispatch = useDispatch()
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [sort, setSort] = useState('name')
  const [editing, setEditing] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const { sampleProducts, loading, error } = useProducts()
  useEffect(() => {
    const listener = e => setSearch(e.detail || '')
    window.addEventListener('inventory-search', listener)
    return () => window.removeEventListener('inventory-search', listener)
  }, [])
  useEffect(() => {
    const next = {}
    if (search.trim()) next.q = search.trim()
    if (category !== 'All') next.category = category
    setParams(next, { replace: true })
  }, [search, category, setParams])
  const filtered = useMemo(() => products.filter(p => (p.name + ' ' + p.category + ' ' + p.description).toLowerCase().includes(search.toLowerCase()) && (category === 'All' || p.category === category)).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : a.name.localeCompare(b.name)), [products, search, category, sort])
  const save = product => {
    if (product.id) dispatch(updateProduct(product)); else dispatch(addProduct(product))
    setFormOpen(false); setEditing(null); setNotice(product.id ? 'Material updated successfully.' : 'New material added successfully.')
  }
  const remove = id => {
    const item = products.find(p => p.id === id)
    if (window.confirm(`Delete ${item?.name || 'this material'} from inventory?`)) {
      dispatch(deleteProduct(id)); setNotice('Material deleted.')
    }
  }
  const exportCsv = () => {
    const rows = [['Name', 'Category', 'Price', 'Unit', 'Stock', 'Description'], ...filtered.map(p => [p.name, p.category, p.price, p.unit, p.stock, p.description])]
    const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const a = document.createElement('a'); a.href = url; a.download = 'construction-inventory.csv'; a.click(); URL.revokeObjectURL(url)
  }
  return <div className="page-stack">
    <section className="page-intro-row"><div><span className="eyebrow">MATERIAL CATALOG</span><h2>Construction inventory</h2><p>Manage your products, pricing and stock levels in one place.</p></div><button className="button button-primary" onClick={() => { setEditing(null); setFormOpen(true) }}><Plus size={17} /> Add material</button></section>
    {notice && <div className="notice-success" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss message">×</button></div>}
    <section className="inventory-summary-strip"><div><span className="summary-symbol"><SlidersHorizontal size={19} /></span><div><small>Total materials</small><strong>{products.length}</strong></div></div><div><span className="summary-symbol summary-sand"><Filter size={19} /></span><div><small>Categories</small><strong>{new Set(products.map(p => p.category)).size}</strong></div></div><div><span className="summary-symbol summary-stock"><PackageIcon /></span><div><small>Total stock units</small><strong>{products.reduce((sum, p) => sum + Number(p.stock), 0).toLocaleString('en-IN')}</strong></div></div></section>
    <section className="filter-panel"><label className="filter-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search material, category..." /></label><label className="filter-select"><span>Category</span><select value={category} onChange={e => setCategory(e.target.value)}><option>All</option><option>Aggregates</option><option>Sand</option><option>By-products</option></select></label><label className="filter-select"><span>Sort by</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="name">Name A–Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label><button className="button button-light export-button" onClick={exportCsv}><Download size={16} /> Export CSV</button></section>
    <div className="results-line"><span>Showing <strong>{filtered.length}</strong> of {products.length} materials</span><span className="stock-legend"><i /> Healthy stock <i className="legend-low" /> Low stock</span></div>
    {filtered.length ? <section className="products-grid">{filtered.map(product => <ProductCard key={product.id} product={product} onEdit={p => { setEditing(p); setFormOpen(true) }} onDelete={remove} />)}</section> : <EmptyState title="No matching materials" message="Try a different search or category, or add a new material." />}
    <section className="api-demo-panel"><div><span className="api-icon"><Download size={17} /></span><div><h3>API integration demo</h3><p>Sample product data fetched from a public API using a custom hook and useEffect.</p></div></div>{loading ? <span className="api-status">Loading sample API…</span> : error ? <span className="api-status api-error">{error}</span> : <span className="api-status">{sampleProducts.length} sample products fetched</span>}</section>
    {formOpen && <ProductForm product={editing} onSave={save} onClose={() => { setFormOpen(false); setEditing(null) }} />}
  </div>
}
function PackageIcon() { return <span className="package-glyph">▦</span> }