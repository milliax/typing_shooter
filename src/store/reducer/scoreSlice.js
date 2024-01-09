import { createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        score: 0,
        highestScore: 0,
    },
    reducers: {
        setScore: (state, action) => {
            state.score = action.payload
        },
        setHighestScore: (state, action) => {
            state.highestScore = state.highestScore > action.payload ? state.highestScore : action.payload
        },
        addScoreByAmount: (state, action) => {
            state.score += action.payload
        }
    }
})

export const { setScore, setHighestScore, addScoreByAmount } = scoreSlice.actions

export default scoreSlice.reducer