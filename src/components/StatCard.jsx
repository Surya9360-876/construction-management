import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
export default function StatCard({ label, value, detail, icon: Icon, tone = 'green', trend }) {
  return <article className="stat-card">
    <div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={20} /></span></div>
    <div className="stat-value">{value}</div>
    <div className="stat-bottom">{trend && <span className="trend"><ArrowUpRight size={14} />{trend}</span>}<span>{detail}</span></div>
  </article>
}