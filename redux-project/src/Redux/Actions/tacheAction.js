import { AJOUTER_TACHE, MODIFIER_TACHE,SUPPRIMER_TACHE, REMPLIR_TACHES } from "./actiontypes";
export function ajouterTache(tache) {
    return {
        type: AJOUTER_TACHE,
        payload: tache
    };
}

export function modifierTache(tache) {
    return {
        type: MODIFIER_TACHE,
        payload: tache
    };
}

export function supprimerTache(idTache) {
    return {
        type: SUPPRIMER_TACHE,
        payload: idTache
    };
}
// redux thunk : fonction qui prend les donées avec dispatch
export const fetchTaches = () => {
  return async (dispatch) => {
    const response = await fetch('https://dummyjson.com/todos');
    const data = await response.json();
    dispatch({ type: REMPLIR_TACHES, payload: data.todos });
  };
};

// function remplirTachesAction(data) {
//     return {
//         type: 'REMPLIR_TACHES',
//         payload: data
//     };
// }