import { Admin, Projects } from "..";
import { Module } from "../models/moduleModel";
import { ProjectsAdmin } from "../models/ProjectAdminModel";
import { ProjectPropierties, Rol } from "../models/ProjectPropiertiesModel";

export class Project {
  props: ProjectPropierties;
   constructor(props: ProjectPropierties) {
    this.props = props;
  }

  nameToUrl = (): string => "/" + this.props.name;

  initProyect() {
    Admin.addProject(this);
  }

  static instance = (
    project: Projects,
    roles: Rol[]
  ): Partial<ProjectsAdmin> => {
    return {
      [project]: new Project({
        name: project,
        roles: roles 
      }),
    };
  };

  
}
