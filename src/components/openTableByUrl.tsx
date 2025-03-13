import { useParams } from "react-router-dom";
import Table from "./table";
import { useState } from "react";
import EditModal from "./editModal";
import styles from '../views/styles.module.css'

export const OpenTable: React.FC = () => {
  // Obtiene los parámetros de la ruta
  const { project, collection } = useParams<{
    project: string;
    collection: string;
  }>();
  const [editModal, setEditModal] = useState({
    editAs: "",
    flag: false,
    obj: undefined,
    indexEdit: 0,
    mapList: [],
    doc: undefined,
    asEdit: false,
    addDoc: () => {},
    editDoc: () => {},
    indexList: [],
  });

  return (
    <div className={styles.content}>
      <Table
        project={project!}
        collection={collection!}
        setEditModal={setEditModal}
      ></Table>
      {editModal.flag ? (
        <EditModal
          editAs={editModal.editAs}
          indexEdit={editModal.indexEdit} 
          addDoc={editModal.addDoc}
          asEdit={editModal.asEdit}
          editDoc={editModal.editDoc}
          indexList={editModal.indexList}
          doc={editModal.doc}
          onClose={() =>
            setEditModal({
              editAs: "",
              obj: undefined,
              indexEdit: 0,
              mapList: [],
              flag: false,
              doc: undefined,
              asEdit: false,
              addDoc: () => {},
              editDoc: () => {},
              indexList: [],
            })
          }
          obj={editModal.obj}
          mapList={editModal.mapList}
        ></EditModal>
      ) : (
        <></>
      )}
    </div>
  );
};
