import { Project } from "../../multiProjectLibrary/projectsManager/objects/project";

export const universitiesProject: Project = new Project({
  name: 'universities',
  roles: [
    {
      name: "Admin",
      authorizedModules: [{ name: "users" }, { name: "cursos" }],
    },
    {
      name: "Estudent",
      authorizedModules: [{ name: "prueba" }, { name: "pruebaFinal" }],
    },
  ],
});
