import { Edit3, Package, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function ProductCard({ product, onEdit, onDelete }) {
  const low = Number(product.stock) < 25
  return <article className="product-card">
    <div className={`product-art ${product.category === 'Sand' ? 'sand-art' : product.category === 'By-products' ? 'dust-art' : 'stone-art'}`}><Package size={31} strokeWidth={1.5} /><span>{product.category}</span></div>
    <div className="product-card-content">
      <div className="product-name-row"><div><Link className="product-title" to={`/products/${product.id}`}>{product.name}</Link><p>{product.description}</p></div><span className={`stock-dot ${low ? 'low' : ''}`} title={low ? 'Low stock' : 'Stock available'} /></div>
      <div className="product-price">₹{Number(product.price).toLocaleString('en-IN')} <small>/ {product.unit}</small></div>
      <div className="product-meta"><span>Stock available</span><strong className={low ? 'text-warning' : ''}>{product.stock} {product.unit}s</strong></div>
      <div className="stock-track"><span style={{ width: `${Math.min(100, Math.max(0, Number(product.stock)))}%` }} /></div>
      <div className="product-actions"><button className="button button-light button-small" onClick={() => onEdit(product)}><Edit3 size={14} /> Edit</button><button className="button button-danger-light button-small" onClick={() => onDelete(product.id)}><Trash2 size={14} /> Delete</button></div>
    </div>
  </article>
}