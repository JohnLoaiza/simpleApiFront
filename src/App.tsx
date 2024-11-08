import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/dashboard';
import { OpenTable } from './components/openTableByUrl';
import Login from './views/login';
import Register from './views/register';
import ProtectedRoute from './components/protectedRoute'; // Importa el componente ProtectedRoute

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta protegida que toma dos parámetros de la URL */}
        <Route
          path="/param/:project/:collection"
          element={<ProtectedRoute element={<OpenTable />} />}
        />
        
        {/* Ruta protegida para el dashboard */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
