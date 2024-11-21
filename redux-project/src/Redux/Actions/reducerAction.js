import { AJOUTER_TACHE, MODIFIER_TACHE, SUPPRIMER_TACHE, REMPLIR_TACHES } from './actiontypes';

const initialState = {
  tasks: [],
  todos: []
};

const tachesReducer = (state = initialState, action) => {
  switch (action.type) {
    case AJOUTER_TACHE:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case MODIFIER_TACHE:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
      };
    case SUPPRIMER_TACHE:
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
    case REMPLIR_TACHES:
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

export default tachesReducer;