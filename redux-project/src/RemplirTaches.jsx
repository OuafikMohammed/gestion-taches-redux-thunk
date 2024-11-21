import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTaches } from "./Redux/Actions/tacheAction";
import { useSelector } from "react-redux";

export default function NewTaches(){
    const dispatch = useDispatch();
    const taches = useSelector((state) => state.tachesReducer.tasks)
    useEffect(() => {
        dispatch(fetchTaches());
      }, [dispatch]);
    function afficherProduits(){
        console.log(taches)
    }
    return (
        <button onClick={afficherProduits}>afficher taches</button>
    )
}