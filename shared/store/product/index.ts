import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalStore, Product, ProductIntialState } from "@types";

const initialState: ProductIntialState = {
  productForm: {
    open: false,
    edit: null,
  },
};

export const productSlice = createSlice({
  name: "product/store",
  initialState,
  reducers: {
    openProductForm: (state) => {
      state.productForm.open = true;
    },
    openEditProduct: (state, action: PayloadAction<Product>) => {
      state.productForm = {
        open: true,
        edit: action.payload,
      };
    },
    closeProductForm: (state) => {
      state.productForm = {
        open: false,
        edit: null,
      };
    },
  },
});

// export selector
export const productFormSelector = (state: GlobalStore) =>
  state["product/store"].productForm;

// export actions
export const { openEditProduct, openProductForm, closeProductForm } =
  productSlice.actions;
