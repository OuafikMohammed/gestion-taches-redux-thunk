import { configureStore } from '@reduxjs/toolkit';
import tachesReducer from './features/tachesReducer/tachesReducer'

const store = configureStore({
  reducer: {
    taches: tachesReducer,
  },
});

export default store;
