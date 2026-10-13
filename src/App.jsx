import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Services, { ServiceDetail } from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'

export default function App() {
  return <AuthProvider><Routes><Route element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="products" element={<Products />} />
    <Route path="products/:id" element={<ProductDetails />} />
    <Route path="orders" element={<Orders />} />
    <Route path="customers" element={<Customers />} />
    <Route path="services" element={<Services />}><Route path=":serviceId" element={<ServiceDetail />} /></Route>
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="profile" element={<Profile />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route></Routes></AuthProvider>
}