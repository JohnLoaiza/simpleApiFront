import { useParams } from "react-router-dom";
import Table from "./table";
import { useState } from "react";
import EditModal from "../databaseManager/view/components/editModal";
import styles from '../views/styles.module.css'

export const OpenTable: React.FC = () => {
  // Obtiene los parámetros de la ruta
  const { project, collection } = useParams<{
    project: string;
    collection: string;
  }>();
  
  return (
    <div className={styles.content}>
      <Table
        project={project!}
        collection={collection!}
      ></Table>
      
    </div>
  );
};
