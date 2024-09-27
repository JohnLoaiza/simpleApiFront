import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaSync, FaPlus } from 'react-icons/fa'; // Importar íconos adicionales
import './Table.css'; // Archivo de estilos para personalizar la tabla
import axios from 'axios';
import GeneralModal from './editModal';

const Table: React.FC = () => {
  // Obtiene los parámetros de la ruta
  const { project, collection } = useParams<{ project: string; collection: string }>();
  const [indexList, setIndexList] = useState<string[]>([]);
  const [dataList, setDataList] = useState<any[]>([]);
  const [editModal, setEditModal] = useState({ flag: false, doc: undefined, asEdit:false });

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    const response = await axios.get(`http://localhost:5020/Dynamic/${project}/${collection}`).catch(() => {
      console.log('no hay que actualizar');
    });

    if (response) {
      const obj = response.data[0].propierties;
      setIndexList(Object.keys(obj));
      setDataList(response.data);
    } else {
      return { success: false };
    }
  };

  const deleteDoc = async (id: string) => {
    const response = await axios.delete(`http://localhost:5020/Dynamic/${project}/${collection}/${id}`).catch(() => {
      console.log('no hay que actualizar');
    });

    if (response) {
      const updatedList = dataList.filter((doc) => doc.id !== id);
      setDataList([...updatedList]);
    } else {
      return { success: false };
    }
  };

  const editDoc = async (id: string, doc: any) => {
    const response = await axios.put(`http://localhost:5020/Dynamic/${project}/${collection}/update/${id}`,doc.propierties).catch(() => {
        console.log('no hay que actualizar');
      });
      if (response) {
        const index = dataList.findIndex((doc) => doc.id === id);
        if (index > -1) {
          dataList[index] = doc;
          setDataList([...dataList]);
        }
      }
  };

  const addDoc = async (doc: any) => {
    const response = await axios.post(`http://localhost:5020/Dynamic/${project}/${collection}/insert`,doc.propierties).catch(() => {
        console.log('no hay que actualizar');
      });
      if (response) {
       dataList.push({id: response!.data.id, propierties: doc.propierties})
       setDataList([...dataList])
      }
  };

  return (
    <div className="table-container">
      <header className="header">
        <h1 onClick={() => console.log(dataList)}>Project: {project}</h1>
        <h2>Collection: {collection}</h2>
      </header>
      <div className="action-icons">
        <FaSync onClick={async ()=> await getData()} style={{ cursor: 'pointer', marginRight: '10px' }} title="Reload Data" />
        <FaPlus onClick={() => setEditModal({ flag: true, doc: undefined, asEdit:false })} style={{ cursor: 'pointer', marginRight: '10px' }} title="Add New" />
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            {indexList.map((i) => (
              <th key={i}>{i}</th>
            ))}
            <th>Actions</th> {/* Columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {dataList.map((doc) => (
            <tr key={doc.id}>
              {indexList.map((i) => (
                <td key={i}>{doc.propierties[i]}</td>
              ))}
              <td>
                <FaEdit onClick={() => setEditModal({ flag: true, doc: doc, asEdit: true })} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <FaTrash onClick={() => deleteDoc(doc.id)} style={{ cursor: 'pointer', color: 'red' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editModal.flag ? (
        <GeneralModal addDoc={addDoc} asEdit={editModal.asEdit} editDoc={editDoc} indexList={indexList} doc={editModal.doc} onClose={() => setEditModal({ flag: false, doc: undefined, asEdit: false })}></GeneralModal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Table;
