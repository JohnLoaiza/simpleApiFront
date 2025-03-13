import { Projects } from "..";
import { Project } from "../objects/projectAdmin";

export type ProjectsAdmin = {
  [value in Projects]: Project;
};
