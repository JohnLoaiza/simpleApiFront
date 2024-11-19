import { useParams } from "react-router-dom";
import Table from "./table";
import { useState } from "react";
import EditModal from "./editModal";


export const OpenTable: React.FC = () => {
    // Obtiene los parámetros de la ruta
    const { project, collection } = useParams<{ project: string; collection: string }>();
    const [editModal, setEditModal] = useState({ flag: false, doc: undefined, asEdit: false, addDoc: () => { }, editDoc: () => { }, indexList: [] });


    return <>
        <Table project={project!} collection={collection!} setEditModal={setEditModal}></Table>
        {editModal.flag ? (
            <EditModal
                addDoc={editModal.addDoc}
                
                asEdit={editModal.asEdit}
                editDoc={editModal.editDoc}
                indexList={editModal.indexList}
                doc={editModal.doc}
                onClose={() => setEditModal({ flag: false, doc: undefined, asEdit: false, addDoc: () => { }, editDoc: () => { }, indexList: [] })} obj={undefined} mapList={[]} indexEdit={0} editAs={""}>

            </EditModal>
        ) : (
            <></>
        )}</>
}