import { Projects } from "../../multiProjectLibrary/projectsManager";
import { Module } from "../../multiProjectLibrary/projectsManager/models/moduleModel";
  import { Project } from "../../multiProjectLibrary/projectsManager/objects/project";


export const indicartorsProject: Project = new Project({name: Projects.DROPSHIPPING, roles: [
  {
    name: "Admin",
    authorizedModules: [
      { name: "users"},
    ],
  },
]})

