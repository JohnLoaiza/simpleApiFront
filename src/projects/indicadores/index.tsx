  import { Project } from "../../multiProjectLibrary/projectsManager/objects/project";


export const indicartorsProject: Project = new Project({name: 'indicators', roles: [
  {
    name: "Admin",
    authorizedModules: [
      { name: "users"},
    ],
  },
]})

