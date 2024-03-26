import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  name: string;
  phone: string;
  password: string;
}

export interface UserSliceState {
  users: Array<User>;
  currentUser: null | User;
  status: 'authenticated' | 'guest'
}

const initialState: UserSliceState = {
  users: [{
    name: 'Dewangga',
    password: 'dewa123',
    phone: '085123123123'
  }],
  currentUser: null,
  status: 'guest'
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    // Create New User
    register: create.reducer((state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    }),

    // Clear Logged User or Log out
    clearCurrentUser: create.reducer((state) => {
      state.currentUser = null
      state.status = 'guest'
    }),

    // Set Logged User or Log in
    setCurrentUser: create.reducer((state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.status = 'authenticated'
    }),
  }),
  selectors: {
    selectUsers: (user) => user.users,
    selectCurrentUser: (user) => user.currentUser,
    selectStatus: (user) => user.status
  }
})

export const { register, clearCurrentUser, setCurrentUser } = userSlice.actions;

export const { selectCurrentUser, selectUsers, selectStatus } = userSlice.selectors