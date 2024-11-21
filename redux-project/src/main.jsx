import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import NewTaches from './RemplirTaches.jsx'
import store from './Redux/store';
import { Provider } from 'react-redux';
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/taches' element={<NewTaches />} />
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
