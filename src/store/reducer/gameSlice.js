import { createSlice } from '@reduxjs/toolkit'

import settingsConfig from '../../settings.config'

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        state: "menu",
        timeRemain: settingsConfig.gameTime,
        music: false,
        cards: [],
    },
    reducers: {
        setState: (state, action) => {
            state.state = action.payload
        },
        DecreaseTimeRemain: (state) => {
            state.timeRemain -= 1
        },
        setTimeRemain: (state, action) => {
            state.timeRemain = action.payload
        },
        setMusic: (state, action) => {
            state.music = action.payload
        },
        addCard: (state, action) => {
            state.cards.push(action.payload)
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter((card) => card.id !== action.payload)
        },
        removeCardByWord: (state, action) => {
            state.cards = state.cards.filter((card) => card.word.toLowerCase() !== action.payload.toLowerCase())
        }
    }
})

export const { setState, setMusic, DecreaseTimeRemain, setTimeRemain, addCard, removeCard, removeCardByWord } = gameSlice.actions

export default gameSlice.reducer