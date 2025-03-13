import App from "../App";
import { ProjectsAdmin } from "./models/ProjectAdminModel";
import { Project } from "./objects/projectAdmin";

export enum Projects {
  UNIVERSITIES = "universities",
  INDICATORS = "indicators",
}

 const PROJECTS: Partial<ProjectsAdmin> = {
    ...Project.instance(Projects.UNIVERSITIES, <App/>),
    ...Project.instance(Projects.INDICATORS, <App/>),
 }

export const projectsAdmin = (
  get?: Projects
): ProjectsAdmin | Partial<Project> => {
  var pro: Partial<ProjectsAdmin> = {};
  pro = {
    ...pro,
    ...PROJECTS
  };
  if (get) {
    return (pro as ProjectsAdmin)[get];
  } else {
    return pro as ProjectsAdmin;
  }
};
