import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { LogIn, LogOut, ShieldCheck, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
export default function Profile() {
  const { user, login, logout } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [notice, setNotice] = useState('')
  const save = e => { e.preventDefault(); if (!name.trim()) { setNotice('Please enter a display name.'); return } login(name); setNotice('Profile saved in this browser.') }
  return <div className="page-stack"><section className="page-intro-row"><div><span className="eyebrow">ACCOUNT SETTINGS</span><h2>Your profile</h2><p>A simple local profile to demonstrate conditional rendering and state.</p></div></section>
    <section className="profile-layout"><div className="panel profile-card"><div className="profile-cover" /><span className="profile-avatar"><UserRound size={34} /></span><div className="profile-main"><h2>{user?.name || 'Guest Manager'}</h2><p>{user?.role || 'Demo account'}</p><span className={`profile-status ${user ? 'signed-in' : ''}`}><i />{user ? 'Signed in locally' : 'Guest session'}</span></div><div className="profile-info-row"><span>Account type</span><strong>Frontend demo</strong></div><div className="profile-info-row"><span>Data storage</span><strong>This browser</strong></div><div className="profile-info-row"><span>Permissions</span><strong>Demo administrator</strong></div><div className="profile-card-note"><ShieldCheck size={17} /><span>This is a sample frontend profile, not secure authentication.</span></div></div>
      <div className="panel profile-settings"><span className="settings-icon"><UserRound size={22} /></span><h3>{user ? 'Update display name' : 'Personalize your workspace'}</h3><p>Set the name displayed in the dashboard header. This demo stores the profile in local storage.</p><form onSubmit={save} className="profile-form"><label className="field">Display name<input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" /></label>{notice && <p className={notice.startsWith('Please') ? 'form-alert' : 'inline-success'}>{notice}</p>}<button type="submit" className="button button-primary button-full"><LogIn size={16} /> Save profile</button></form>{user && <button className="button button-light button-full profile-logout" onClick={() => { logout(); setName(''); setNotice('You are now signed out.') }}><LogOut size={16} /> Sign out</button>}</div>
    </section>
  </div>
}