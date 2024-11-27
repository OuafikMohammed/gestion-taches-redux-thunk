import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ajouterTache, modifierTache, supprimerTache, fetchTaches } from './features/tachesReducer/tachesReducer';


const TaskManager = () => {
  const [newTask, setNewTask] = useState({ libelle: '', dateDebut: '', dateFin: '' });
  const [editTask, setEditTask] = useState({ id: '', libelle: '', dateDebut: '', dateFin: '', terminer: false });
  const [filteredTasks, setFilteredTasks] = useState([]);
  const dispatch = useDispatch();
  const { tasks, todos } = useSelector(state => state.taches); // Accès au slice 'taches'

  useEffect(() => {
    dispatch(fetchTaches());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.libelle && newTask.dateDebut && newTask.dateFin) {
      dispatch(ajouterTache({ ...newTask, id: Date.now(), terminer: false }));
      setNewTask({ libelle: '', dateDebut: '', dateFin: '' });
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleUpdateTask = () => {
    if (editTask.libelle && editTask.dateDebut && editTask.dateFin) {
      dispatch(modifierTache(editTask));
      setEditTask({ id: '', libelle: '', dateDebut: '', dateFin: '', terminer: false });
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(supprimerTache(id));
  };

  const handleToggleComplete = (task) => {
    dispatch(modifierTache({ ...task, terminer: !task.terminer }));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredTasks(tasks.filter(task => task.libelle.toLowerCase().includes(searchTerm)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Tâches</h1>
      <input
        type="text"
        placeholder="Rechercher une tâche"
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="mb-4">
        <select
          value={newTask.libelle}
          onChange={(e) => setNewTask({ ...newTask, libelle: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
        >
          <option value="">Sélectionner une tâche</option>
          {todos.map(todo => (
            <option key={todo.id} value={todo.todo}>{todo.todo}</option>
          ))}
        </select>
        <input
          type="date"
          value={newTask.dateDebut}
          onChange={(e) => setNewTask({ ...newTask, dateDebut: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="date"
          value={newTask.dateFin}
          onChange={(e) => setNewTask({ ...newTask, dateFin: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
        />
        <button onClick={handleAddTask} className="p-2 bg-blue-500 text-white rounded w-full">Ajouter Tâche</button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Liste des Tâches</h2>
      {filteredTasks.map(task => (
        <div key={task.id} className="mb-4 p-4 border rounded shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold">{task.libelle}</span> (du {task.dateDebut} au {task.dateFin})
              <input
                type="checkbox"
                checked={task.terminer}
                onChange={() => handleToggleComplete(task)}
                className="ml-2"
              />
              {task.terminer && (
                <span className="ml-2 text-green-500">Tâche terminée avec succès ! ✅</span>
              )}
            </div>
            <div>
              <button onClick={() => handleEditTask(task)} className="p-2 bg-yellow-500 text-white rounded mr-2">Modifier</button>
              <button onClick={() => handleDeleteTask(task.id)} className="p-2 bg-red-500 text-white rounded">Supprimer</button>
            </div>
          </div>
        </div>
      ))}

      {editTask.id && (
        <div className="mt-4 p-4 border rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Modifier Tâche</h2>
          <select
            value={editTask.libelle}
            onChange={(e) => setEditTask({ ...editTask, libelle: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          >
            <option value="">Sélectionner une tâche</option>
            {todos.map(todo => (
              <option key={todo.id} value={todo.todo}>{todo.todo}</option>
            ))}
          </select>
          <input
            type="date"
            value={editTask.dateDebut}
            onChange={(e) => setEditTask({ ...editTask, dateDebut: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="date"
            value={editTask.dateFin}
            onChange={(e) => setEditTask({ ...editTask, dateFin: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          />
          <button onClick={handleUpdateTask} className="p-2 bg-green-500 text-white rounded w-full">Mettre à jour</button>
        </div>
      )}
    </div>
  );
};

export default TaskManager;