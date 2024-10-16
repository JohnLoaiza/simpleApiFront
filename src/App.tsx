import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import { OpenTable } from './components/openTableByUrl';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta que toma dos parámetros de la URL */}
        <Route path="/param/:project/:collection" element={<OpenTable/>} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
