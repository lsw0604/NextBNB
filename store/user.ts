import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/user";
import { UserState } from "../types/reduxState";

const initialState = {
  id: 0,
  email: "",
  lastName: "",
  firstName: "",
  birthday: "",
  isLogged: false,
  profileImage: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;