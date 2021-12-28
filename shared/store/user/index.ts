import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalStore, User, UserIntialState } from "@types";

const initialState: UserIntialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user/store",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

// export selector
export const userSelector = (state: GlobalStore) => state["user/store"].user;

// export actions
export const { setUser, logoutUser } = userSlice.actions;
