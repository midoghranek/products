import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ConfirmDialogIntialProps,
  ConfirmDialogIntialState,
  GlobalStore,
} from "@types";

export const confirmDialogSlice = createSlice({
  name: "@ui/confirmDialog",
  initialState: {
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  } as ConfirmDialogIntialState,
  reducers: {
    openConfirmDialog: (
      state,
      action: PayloadAction<ConfirmDialogIntialProps>
    ) => {
      state.open = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.onConfirm = action.payload.onConfirm;
    },
    closeConfirmDialog: (state) => {
      state.open = false;
    },
  },
});

// export selector
export const confirmDialogSelector = (state: GlobalStore) =>
  state["@ui/confirmDialog"];

// export actions
export const { openConfirmDialog, closeConfirmDialog } =
  confirmDialogSlice.actions;
