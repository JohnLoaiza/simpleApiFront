import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OpenTable } from './components/openTableByUrl';
import Login from './multiProjectLibrary/databaseManager/frontServices/login';
import Register from './multiProjectLibrary/databaseManager/frontServices/register';
import InicialiceProject from './multiProjectLibrary/projectsManager/utils/inicializeProject';
import Dashboard from './multiProjectLibrary/databaseManager/frontServices/dashboard';

export enum Params {
  PROJECT = ':project',
  MODULE = ':module',
  COLLECTION = ':collection'
}

const routeFactory = (route: string) : any => `/${Params.PROJECT}${route}`;

export enum MainRoutes {
  MAIN = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  DASHBOARD = '/dashborad',
 MODULE = '/module',
 TABLE = '/table'
}

export const routes: Record<MainRoutes, string> = {
  [MainRoutes.MAIN] : routeFactory(MainRoutes.MAIN),
  [MainRoutes.LOGIN] : routeFactory(MainRoutes.LOGIN),
  [MainRoutes.REGISTER] : routeFactory(MainRoutes.REGISTER),
  [MainRoutes.DASHBOARD] : routeFactory(MainRoutes.DASHBOARD),
  [MainRoutes.MODULE] : routeFactory(MainRoutes.DASHBOARD + '/' + Params.MODULE),
  [MainRoutes.TABLE] : routeFactory(MainRoutes.TABLE + Params.COLLECTION),
}

const App: React.FC = () => {
  return (
    <Router> 
      <Routes>   
        {/* Ruta protegida para el dashboard */}
        <Route
          path= "/"
          element={<>Se debe estanciar un proyecto</>}
        />
        <Route
          path= {routes[MainRoutes.MODULE]}
          element={<InicialiceProject protected element={<Dashboard />} />}
        />
        <Route
          path= {routes[MainRoutes.DASHBOARD]}
          element={<InicialiceProject protected element={<Dashboard />} />}
        />
        <Route
          path= {routes[MainRoutes.MAIN]}
          element={<InicialiceProject  element={<Dashboard />} />}
        />
        {/* Rutas públicas */}
        <Route 
          path= {routes[MainRoutes.LOGIN]}
          element={ <InicialiceProject element={<Login />} />} />
        <Route 
          path= {routes[MainRoutes.REGISTER]}
          element={<InicialiceProject element={<Register /> } />} />
        <Route
          path={routes[MainRoutes.TABLE]}
          element={ <InicialiceProject element={<OpenTable />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
