  import { Project } from "../../multiProjectLibrary/projectsManager/objects/project";


export const dropshippingProject: Project = new Project({name: 'dropshipping', roles: [
    {
    name: "Logister",
    authorizedModules: [
      { name: "ventas"},
      { name: "users"},
      { name: "compras"},
    ] ,
  },
  {
    name: "Customer",
    authorizedModules: [
      { name: "Productos"},
      { name: "Destacados"},
    ],
  }
]})

