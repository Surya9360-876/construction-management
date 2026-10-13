import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vb-user')) } catch { return null }
  })
  const login = name => {
    const next = { name: name.trim() || 'Manager', role: 'Administrator' }
    setUser(next)
    localStorage.setItem('vb-user', JSON.stringify(next))
  }
  const logout = () => { setUser(null); localStorage.removeItem('vb-user') }
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)