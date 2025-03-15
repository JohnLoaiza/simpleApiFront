import { useParams } from "react-router-dom";
import { useState } from "react";
import EditModal from "../multiProjectLibrary/databaseManager/frontServices/components/editModal";
import styles from '../views/styles.module.css'
import Table from "../multiProjectLibrary/databaseManager/frontServices/tableView";

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
