import { createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  value: any;
  isLoggin: boolean;
}

const initialState: IUserState = {
  value: null,
  isLoggin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfoUser: (state, { payload }) => {
      state.value = payload;
      state.isLoggin = true;
    },
    setLogout: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setInfoUser, setLogout } = userSlice.actions;

export default userSlice.reducer;
