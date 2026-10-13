import { useState } from 'react'
import { CheckCircle2, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react'
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'Material enquiry', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const update = e => { setForm({ ...form, [e.target.name]: e.target.value }); setSubmitted(false) }
  const submit = e => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.message.trim().length < 10) next.message = 'Please enter at least 10 characters.'
    setErrors(next)
    if (!Object.keys(next).length) setSubmitted(true)
  }
  return <div className="page-stack"><section className="page-intro-row"><div><span className="eyebrow">GET IN TOUCH</span><h2>Let's talk materials.</h2><p>Send your requirement and use this demo form to see client-side validation in action.</p></div></section>
    <section className="contact-layout"><div className="contact-aside"><span className="eyebrow">WE'RE HERE TO HELP</span><h2>Tell us what<br />you're building.</h2><p>Have a material requirement or a delivery question? Share a few details and we can start the conversation.</p><div className="contact-method"><span><Phone size={18} /></span><div><small>PHONE</small><strong>+91 98765 43210</strong><p>Demo contact number — replace with your business number.</p></div></div><div className="contact-method"><span><Mail size={18} /></span><div><small>EMAIL</small><strong>hello@vadbrozs.example</strong><p>Demo address for this frontend project.</p></div></div><div className="contact-method"><span><MapPin size={18} /></span><div><small>LOCATION</small><strong>Tamil Nadu, India</strong><p>Serving construction material requirements.</p></div></div><div className="contact-aside-note"><MessageSquare size={18} /><span>Submitting this demo form displays a confirmation locally. Connect a backend or form service to receive real messages.</span></div></div>
      <div className="panel contact-form-panel">{submitted ? <div className="success-state"><span><CheckCircle2 size={36} /></span><h2>Thank you, {form.name}!</h2><p>Your demo enquiry has passed validation. No message was sent to a server.</p><button className="button button-primary" onClick={() => { setForm({ name: '', email: '', phone: '', topic: 'Material enquiry', message: '' }); setSubmitted(false) }}>Send another enquiry</button></div> : <form onSubmit={submit} noValidate><div className="form-heading"><h3>Send an enquiry</h3><p>Fields marked with * are required.</p></div><div className="form-grid"><label className="field">Full name *<input name="name" value={form.name} onChange={update} placeholder="Your name" />{errors.name && <small className="field-error">{errors.name}</small>}</label><label className="field">Email address *<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" />{errors.email && <small className="field-error">{errors.email}</small>}</label><label className="field">Phone number<input name="phone" value={form.phone} onChange={update} placeholder="+91 ..." /></label><label className="field">Enquiry type<select name="topic" value={form.topic} onChange={update}><option>Material enquiry</option><option>Bulk order</option><option>Transportation</option><option>Other</option></select></label><label className="field field-full">Your message *<textarea name="message" value={form.message} onChange={update} rows="5" placeholder="Tell us what you need..." />{errors.message && <small className="field-error">{errors.message}</small>}</label></div><button type="submit" className="button button-primary button-full"><Send size={16} /> Submit enquiry</button></form>}</div></section>
  </div>
}