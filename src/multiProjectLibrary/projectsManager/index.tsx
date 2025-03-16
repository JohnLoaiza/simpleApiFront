import {
  MainRoutes,
  Params,
  routes,
} from "../routesManager/multiProjectRoutes";
import { Project } from "./objects/project";

export abstract class Admin {
  private static PROJECTS: Project[] = [];

  static projectSelected?: Project;

  static setProjectSelected = (project: string): boolean => {
    this.projectSelected = this.getProject(project);
    console.log("selecciona el proyecto ");
    console.log(this.projectSelected);

    return true;
  };

  static generateProjectRoute(route: MainRoutes, module?: string): string {
    return routes[route]
      .replace(Params.COLLECTION, module ?? "")
      .replace(Params.MODULE, module ?? "")
      .replace(Params.PROJECT, this.projectSelected?.props.name!);
  }

  static addProject(newProject: Project): void {
    this.PROJECTS.push(newProject);
  }

  static projectsAdmin = (): Project[] => {
    return this.PROJECTS;
  };

  static validProject = (projectName: string) : boolean => this.PROJECTS.map(p => p.props.name).filter(p => p === projectName).length > 0;

  static getProject = (project: string): Project | undefined => {
    console.log("va a traer proyecto " + project);
    console.log("base de proyectos");
    return this.PROJECTS.find((p) => p.props.name === project);
  };
}
