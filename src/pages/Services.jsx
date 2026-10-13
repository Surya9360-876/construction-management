import { ArrowRight, Boxes, ClipboardCheck, Truck } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
const services = [
  { slug: 'material-supply', title: 'Material supply', icon: Boxes, tag: 'CORE SERVICE', text: 'Construction aggregates and sand supplied for residential, commercial and infrastructure projects.', features: ['12mm, 20mm and 40mm jelly', 'M-Sand and P-Sand', 'Crusher dust and filling material'] },
  { slug: 'transportation', title: 'Transportation', icon: Truck, tag: 'DELIVERY', text: 'Coordinate material delivery to your site and plan loads around your construction schedule.', features: ['Delivery coordination', 'Load planning', 'Site delivery scheduling'] },
  { slug: 'bulk-orders', title: 'Bulk orders', icon: ClipboardCheck, tag: 'PROJECT SUPPORT', text: 'Organize larger material requirements for contractors, builders and project teams.', features: ['Volume requirement planning', 'Order tracking', 'Repeat order coordination'] }
]
export function ServiceDetail() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean).at(-1)
  const service = services.find(s => s.slug === slug)
  if (!service) return <div className="panel not-found"><h2>Service not found</h2><Link to="/services" className="button button-primary">All services</Link></div>
  const Icon = service.icon
  return <div className="panel service-detail-panel"><Link to="/services" className="back-link">← All services</Link><span className="service-detail-icon"><Icon size={27} /></span><span className="eyebrow">{service.tag}</span><h2>{service.title}</h2><p>{service.text}</p><h3>What this includes</h3><ul className="feature-list">{service.features.map(f => <li key={f}><span>✓</span>{f}</li>)}</ul><Link to="/contact" className="button button-primary">Enquire about this service <ArrowRight size={16} /></Link></div>
}
export default function Services() {
  const location = useLocation()
  const nested = location.pathname !== '/services'
  return <div className="page-stack"><section className="page-intro-row"><div><span className="eyebrow">WHAT WE DO</span><h2>Services built around your site</h2><p>Practical material supply support from selection to delivery.</p></div></section>
    {!nested && <section className="services-grid">{services.map(s => { const Icon = s.icon; return <article className="service-card" key={s.slug}><span className="service-card-icon"><Icon size={24} /></span><span className="eyebrow">{s.tag}</span><h3>{s.title}</h3><p>{s.text}</p><ul>{s.features.slice(0, 2).map(f => <li key={f}>{f}</li>)}</ul><Link to={`/services/${s.slug}`} className="subtle-link">Explore service <ArrowRight size={15} /></Link></article> })}</section>}
    <Outlet />
    <div className="service-cta"><div><h3>Planning your next project?</h3><p>Tell us what materials you need and where they should be delivered.</p></div><Link to="/contact" className="button button-white">Talk to our team <ArrowRight size={16} /></Link></div>
  </div>
}