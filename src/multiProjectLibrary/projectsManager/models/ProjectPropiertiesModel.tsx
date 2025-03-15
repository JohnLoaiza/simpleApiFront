import { Projects } from "..";
import { Module } from "./moduleModel";

export  type ProjectPropierties = {
    name: Projects;
    roles: Rol[];
  };
  
  export type Rol = {
   name: string 
   authorizedModules: Module[]
  }