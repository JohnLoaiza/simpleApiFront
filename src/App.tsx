import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Table from './components/table';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta que toma dos parámetros de la URL */}
        <Route path="/param/:project/:collection" element={<Table />} />
      </Routes>
    </Router>
  );
};

export default App;
