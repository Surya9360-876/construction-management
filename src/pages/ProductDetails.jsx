import { ArrowLeft, Boxes, PackageCheck, Tag } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function ProductDetails() {
  const { id } = useParams()
  const product = useSelector(s => s.products.items.find(p => p.id === id))
  if (!product) return <section className="panel not-found"><h2>Material not found</h2><p>This material may have been removed from the inventory.</p><Link to="/products" className="button button-primary">Back to inventory</Link></section>
  return <div className="page-stack"><Link to="/products" className="back-link"><ArrowLeft size={16} /> Back to inventory</Link><section className="detail-layout"><div className="detail-art"><Boxes size={74} strokeWidth={1.2} /><span>{product.category}</span></div><div className="panel detail-info"><span className="eyebrow">MATERIAL DETAILS</span><h2>{product.name}</h2><p>{product.description}</p><div className="detail-price">₹{Number(product.price).toLocaleString('en-IN')} <small>/ {product.unit}</small></div><div className="detail-meta"><span><Tag size={16} /> Category</span><strong>{product.category}</strong></div><div className="detail-meta"><span><PackageCheck size={16} /> Stock available</span><strong>{product.stock} {product.unit}s</strong></div><Link to="/orders" className="button button-primary detail-order-button">Create an order</Link></div></section></div>
}