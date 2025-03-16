import React from "react";
import MultiProjectsRoutes from "./multiProjectLibrary/routesManager/multiProjectRoutes";
import { dropshippingProject } from "./projects/dropshipping";
import { indicartorsProject } from "./projects/indicadores";
import { universitiesProject } from "./projects/universidades";

const App: React.FC = () => {
  return (
    <MultiProjectsRoutes
      suscribeProjects={[
        universitiesProject,
        dropshippingProject,
        indicartorsProject,
      ]}
    ></MultiProjectsRoutes>
  );
};

export default App;
