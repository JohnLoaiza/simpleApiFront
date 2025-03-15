import { Projects } from "..";
import { Project } from "../objects/project";

export type ProjectsAdmin = {
  [value in Projects]: Project;
};
