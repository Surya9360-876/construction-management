import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
const empty = { name: '', category: 'Aggregates', price: '', unit: 'ton', stock: '', description: '' }
export default function ProductForm({ product, onSave, onClose }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)
  useEffect(() => {
    setForm(product ? { ...product, price: String(product.price), stock: String(product.stock) } : empty)
    setErrors({})
    nameRef.current?.focus()
  }, [product])
  const change = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Enter a material name.'
    if (form.price === '' || Number(form.price) < 0 || !Number.isFinite(Number(form.price))) next.price = 'Enter a valid non-negative price.'
    if (form.stock === '' || Number(form.stock) < 0 || !Number.isFinite(Number(form.stock))) next.stock = 'Enter a valid stock quantity.'
    if (!form.description.trim()) next.description = 'Add a short description.'
    setErrors(next)
    if (Object.keys(next).length) return
    onSave({ ...form, price: Number(form.price), stock: Number(form.stock), ...(product ? { id: product.id } : {}) })
  }
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
    <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="product-form-title">
      <div className="modal-heading"><div><span className="eyebrow">INVENTORY MANAGEMENT</span><h2 id="product-form-title">{product ? 'Edit material' : 'Add new material'}</h2><p>Enter the material information below.</p></div><button className="icon-button" onClick={onClose} aria-label="Close form"><X size={20} /></button></div>
      <form onSubmit={submit} noValidate>
        <div className="form-grid">
          <label className="field field-full">Material name<input ref={nameRef} name="name" value={form.name} onChange={change} placeholder="e.g. 20mm Jelly" />{errors.name && <small className="field-error">{errors.name}</small>}</label>
          <label className="field">Category<select name="category" value={form.category} onChange={change}><option>Aggregates</option><option>Sand</option><option>By-products</option></select></label>
          <label className="field">Unit<select name="unit" value={form.unit} onChange={change}><option value="ton">Ton</option><option value="load">Load</option><option value="bag">Bag</option></select></label>
          <label className="field">Price (₹)<input name="price" type="number" min="0" value={form.price} onChange={change} placeholder="0" />{errors.price && <small className="field-error">{errors.price}</small>}</label>
          <label className="field">Stock quantity<input name="stock" type="number" min="0" value={form.stock} onChange={change} placeholder="0" />{errors.stock && <small className="field-error">{errors.stock}</small>}</label>
          <label className="field field-full">Description<textarea name="description" value={form.description} onChange={change} rows="3" placeholder="Describe this material..." />{errors.description && <small className="field-error">{errors.description}</small>}</label>
        </div>
        <div className="modal-footer"><button type="button" className="button button-light" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary">{product ? 'Save changes' : 'Add material'}</button></div>
      </form>
    </section>
  </div>
}