import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Ui = {
    mainMenuOpen: boolean
}
const initialState: Ui = {
    mainMenuOpen: false,
}

const UiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        updateSettings(state, action: PayloadAction<Ui>) {
            return (state = { ...state, ...action.payload })
        },
    },
})

export const { updateSettings } = UiSlice.actions
export default UiSlice.reducer
