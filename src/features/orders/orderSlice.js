import { createSlice, nanoid } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'orders',
  initialState: { items: [] },
  reducers: {
    addOrder: {
      reducer(state, action) { state.items.unshift(action.payload) },
      prepare(order) { return { payload: { ...order, id: nanoid(), createdAt: new Date().toISOString(), status: 'Pending' } } }
    },
    updateOrderStatus(state, action) {
      const order = state.items.find(item => item.id === action.payload.id)
      if (order) order.status = action.payload.status
    },
    deleteOrder(state, action) {
      state.items = state.items.filter(order => order.id !== action.payload)
    }
  }
})
export const { addOrder, updateOrderStatus, deleteOrder } = slice.actions
export default slice.reducer