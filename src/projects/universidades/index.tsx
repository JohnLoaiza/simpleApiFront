import { Projects } from "../../multiProjectLibrary/projectsManager";
import { Module } from "../../multiProjectLibrary/projectsManager/models/moduleModel";
import { Project } from "../../multiProjectLibrary/projectsManager/objects/project";

export const universitiesProject: Project = new Project({
  name: Projects.INDICATORS,
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
