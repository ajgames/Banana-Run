// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import uiSliceReducer from './slices/uiSlice'

export const store = configureStore({
    reducer: {
        uiState: uiSliceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
