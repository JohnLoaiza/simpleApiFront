import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/dashboard';
import { OpenTable } from './components/openTableByUrl';
import Login from './views/login';
import Register from './views/register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta que toma dos parámetros de la URL */}
        <Route path="/param/:project/:collection" element={<OpenTable/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
