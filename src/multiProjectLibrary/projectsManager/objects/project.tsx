import { Admin } from "..";
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
    project: string,
    roles: Rol[]
  ): Project => {
    return new Project({
      name: project,
      roles: roles 
    })
  };
}
