import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slice/product.slice'

export default configureStore({
  reducer: {
    products: productSlice,
  }
})