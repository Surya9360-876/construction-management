import { useEffect, useState } from 'react'

// Demo API hook: fetches public sample data and exposes loading/error states.
// The inventory itself is managed locally with Redux so CRUD works without a backend.
export default function useProducts() {
  const [sampleProducts, setSampleProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetch('https://fakestoreapi.com/products?limit=4', { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Could not load sample API data.')
        return response.json()
      })
      .then(data => setSampleProducts(data))
      .catch(err => { if (err.name !== 'AbortError') setError('Sample API unavailable. Your local inventory still works.') })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])
  return { sampleProducts, loading, error }
}