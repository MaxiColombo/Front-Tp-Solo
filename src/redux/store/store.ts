import { configureStore } from '@reduxjs/toolkit'

//Reducers
import cartSlice from '../slices/cartSlice'
import userSlice from '../slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch