import { Projects } from "..";
import { ProjectsAdmin } from "../models/ProjectAdminModel";
import { ProjectPropierties } from "../models/ProjectPropiertiesModel";

export class Project {
    props: ProjectPropierties;
   private constructor(props: ProjectPropierties) {
    this.props = props;
      this.props = props
    }
    
    nameToUrl = (): string => "/" + this.props.name;

     static instance = (
        project: Projects,
        initComponent: React.JSX.Element
      ): Partial<ProjectsAdmin> => {
        return {
          [project]: new Project({
            name: project,
            initComponent: initComponent,
          }),
        };
      };
  }