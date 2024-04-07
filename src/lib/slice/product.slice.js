import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [
    {
      id: 1,
      productName: "John",
      productCategory: "Doe",
      productFreshness: "Doe",
      productPrice: "Doe",
      image: null,
      additionalDescription: "Doe",
    }
  ]
}

export const counterSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      let sampleProduct = [...state.products]
      sampleProduct.push(action.payload);
      state.products = sampleProduct
    },
    deleteProduct: (state, action) => {
      const deleteIndex = action.payload;
      state.products.splice(deleteIndex, 1);
    },
    editProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const productIndex = state.products.findIndex(product => product.id === id);
      if (productIndex !== -1) {
        state.products[productIndex] = { ...state.products[productIndex], ...updatedProduct };
      }
    }
  }
})

export const { addProduct, deleteProduct, editProduct } = counterSlice.actions

export default counterSlice.reducer