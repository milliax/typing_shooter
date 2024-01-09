import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import scoreSlice from './reducer/scoreSlice';
import gameSlice from './reducer/gameSlice';

import { combineReducers } from 'redux';

const reducers = combineReducers({
    score: scoreSlice,
    game: gameSlice
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

