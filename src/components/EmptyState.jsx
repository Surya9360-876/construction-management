import { PackageSearch } from 'lucide-react'
export default function EmptyState({ title = 'No records found', message = 'Try changing your search or add a new record.' }) {
  return <div className="empty-state"><span><PackageSearch size={26} /></span><h3>{title}</h3><p>{message}</p></div>
}