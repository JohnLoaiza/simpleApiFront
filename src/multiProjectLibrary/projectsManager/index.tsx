import { MainRoutes, Params, routes } from "../routesManager/multiProjectRoutes";
import { ProjectsAdmin } from "./models/ProjectAdminModel";
import { Project } from "./objects/project";

export enum Projects {
  UNIVERSITIES = "universities",
  INDICATORS = "indicators",
  DROPSHIPPING = "dropshiping"
}

export abstract class Admin {
  private static PROJECTS: Partial<ProjectsAdmin> = {};

  static projectSelected?: Project;

  static setProjectSelected = (project: Projects): boolean => {
    this.projectSelected = this.getProject(project);
    console.log("selecciona el proyecto ");
    console.log(this.projectSelected);

    return true;
  };

  static generateProjectRoute(route: MainRoutes, module?: string): string {
    return (
      routes[route]
        .replace(Params.COLLECTION, module ?? "")
        .replace(Params.MODULE, module ?? "")
        .replace(Params.PROJECT, this.projectSelected?.props.name!)
    );
  }

  private static initializeProjects(): void {
    if (!this.PROJECTS) {
      this.PROJECTS = {
        ...(this.PROJECTS as Partial<ProjectsAdmin>)
      };
    }
  }

  static addProject(newProject: Project): void {
    this.initializeProjects();
      this.PROJECTS = {
        ...(this.PROJECTS as Partial<ProjectsAdmin>),
        ...{ [newProject.props.name]: newProject },
      };
  
  }

  static projectsAdmin = (): ProjectsAdmin => {
    this.initializeProjects();
    var pro: Partial<ProjectsAdmin> = {};
    pro = {
      ...pro,
      ...this.PROJECTS,
    };
    return pro as ProjectsAdmin;
  };

  static getProject = (project: Projects): Project | undefined => {
    this.initializeProjects();
    console.log("va a traer proyecto " + project);
    console.log("base de proyectos");
    console.log(this.projectsAdmin());
    console.log(this.projectsAdmin()[project]);
    return this.projectsAdmin()[project];
  };

  static validProject(value: string): boolean | Projects {
    this.initializeProjects();
    console.log("llega");
    const final = Object.values(Projects).includes(value as Projects)
      ? (value as Projects)
      : false;
    console.log("pasa");

    return final;
  }
}
