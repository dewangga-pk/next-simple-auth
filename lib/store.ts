import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { userSlice } from "./features/user/userSlice"


const rootReducer = combineSlices(userSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']