import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialProducts = [
  { id: 'p1', name: '12mm Jelly', category: 'Aggregates', price: 1250, unit: 'ton', stock: 48, description: 'Fine-grade blue metal aggregate for concrete work.' },
  { id: 'p2', name: '20mm Jelly', category: 'Aggregates', price: 1180, unit: 'ton', stock: 72, description: 'Popular coarse aggregate for slabs and foundations.' },
  { id: 'p3', name: '40mm Jelly', category: 'Aggregates', price: 1100, unit: 'ton', stock: 36, description: 'Heavy aggregate for foundations and road base.' },
  { id: 'p4', name: 'M-Sand', category: 'Sand', price: 950, unit: 'ton', stock: 65, description: 'Manufactured sand suitable for concrete and masonry.' },
  { id: 'p5', name: 'P-Sand', category: 'Sand', price: 1050, unit: 'ton', stock: 42, description: 'Plastering sand with a smooth, consistent texture.' },
  { id: 'p6', name: 'Crusher Dust', category: 'By-products', price: 650, unit: 'ton', stock: 28, description: 'Crusher dust for filling, leveling and paving work.' },
  { id: 'p7', name: 'River Sand', category: 'Sand', price: 1850, unit: 'ton', stock: 19, description: 'Washed natural sand for selected construction uses.' },
  { id: 'p8', name: 'Wastage Material', category: 'By-products', price: 400, unit: 'ton', stock: 55, description: 'Budget-friendly material for filling and site leveling.' }
]

const slice = createSlice({
  name: 'products',
  initialState: { items: initialProducts },
  reducers: {
    addProduct: {
      reducer(state, action) { state.items.unshift(action.payload) },
      prepare(product) { return { payload: { ...product, id: nanoid() } } }
    },
    updateProduct(state, action) {
      const index = state.items.findIndex(p => p.id === action.payload.id)
      if (index !== -1) state.items[index] = action.payload
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(p => p.id !== action.payload)
    }
  }
})
export const { addProduct, updateProduct, deleteProduct } = slice.actions
export default slice.reducer