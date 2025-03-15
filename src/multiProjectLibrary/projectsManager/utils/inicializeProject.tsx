import React from "react";
import { useParams } from "react-router-dom";
import { Admin, Projects } from "..";
import ProtectedRoute from "./ProtectedRoute";

interface InicialiceProjectProps {
  element: React.ReactNode;
  protected?: boolean 
}

const InicialiceProject: React.FC<InicialiceProjectProps> = (props) => {
  const { project = "NA" } = useParams<{
    project: string;
  }>();
console.log('Entra a inicializar');
console.log('project es');
console.log(project);



  const projectName = Admin.validProject(project);
  console.log('sale');
  
  if (projectName) {
    console.log('es valido');
    
    const projectLoad = Admin.setProjectSelected(projectName as Projects);
    if (projectLoad) {
      return props.protected? <ProtectedRoute element={props.element} /> : props.element;
    }
  } else {
  return  <>No existe el projecto {project}</>;
  }
};

export default InicialiceProject;
