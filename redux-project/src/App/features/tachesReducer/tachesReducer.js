import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone avec Redux Thunk
// createAsyncThunk gere authomatiquement le cycle pending / fulfilled / rejected
export const fetchTaches = createAsyncThunk(
  'taches/fetchTaches',
  async () => {
    const response = await fetch('https://dummyjson.com/todos');
    const data = await response.json();
    return data.todos; // Redux Toolkit gère automatiquement `dispatch`.
  }
);

const tachesSlice = createSlice({
  name: 'taches', // Nom du slice
  initialState: {
    tasks: [],
    todos: [],
  },
  reducers: {
    // Avec Redux Toolkit, les actions (comme ajouterTache) 
    // sont créées automatiquement et 
    // exportées depuis le slice.
    ajouterTache: (state, action) => {
      state.tasks.push(action.payload); // Mutation possible grâce à Immer on n'a pas besoin de 
                                        // recopier l'objet et ajouter Immer est par defaut integré
                                        // dans redux-toolkit

    },
    modifierTache: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    supprimerTache: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaches.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const { ajouterTache, modifierTache, supprimerTache } = tachesSlice.actions;
export default tachesSlice.reducer;