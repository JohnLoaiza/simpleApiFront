import React, { useEffect, useState } from 'react';

import { FaEdit, FaTrash, FaSync, FaPlus } from 'react-icons/fa'; // Importar íconos adicionales
import './Table.css'; // Archivo de estilos para personalizar la tabla
import axios from 'axios';
import GeneralModal from './editModal';
import DynamicKeyValue from './createDb';
import { apiRoute } from '../configs';
import InfoIconTooltip, { identificateVar, isJSON } from './extraInfo';

type Props = {
  project: string;
  collection: string;
  setEditModal: any
}

const Table = (props: Props) => {
  // Obtiene los parámetros de la ruta
  // const { project, collection } = useParams<{ project: string; collection: string }>();
  const { project, collection, setEditModal } = props;
  const [indexList, setIndexList] = useState<string[]>([]);
  const [dataList, setDataList] = useState<any[]>([]);
  const [dataFormat, setDataFormat] = useState<any[]>([])

  useEffect(() => {
    getData();
    return () => { };
  }, []);

  const getData = async () => {
    const response = await axios.get(`${apiRoute}/${project}/${collection}`).catch(() => {
      console.log('no hay que actualizar');
    });

    if (response) {
      const obj = response.data[0].propierties;
    //  setIndexList(Object.keys(obj));
      
      
    //  setDataList(response.data);
    toDataFormat(response.data, Object.keys(obj))
    } else {
      return { success: false };
    }
  };

  const toDataFormat = (dataResponse: any[], indexList: string[]) => {
    var finaList: any[] = []
    dataResponse.forEach((f: any) => {
      var add: any = {}
      indexList.forEach(i => {
        var finalValue;
        if (isJSON(f.propierties[i])) {
          finalValue = JSON.parse(f.propierties[i]);
        } else {
          finalValue = f.propierties[i];
        }
        add[i] = finalValue
      });
      finaList.push({id: f.id, propierties: add})
    })
    console.log(dataResponse);
    
    console.log('final list es');
    
    console.log(finaList);
    setDataList(finaList)
    setDataFormat(finaList)
  }

  const deleteDoc = async (id: string) => {
    const response = await axios.delete(`${apiRoute}/${project}/${collection}/${id}`).catch(() => {
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
    const response = await axios.put(`${apiRoute}/${project}/${collection}/update/${id}`, doc.propierties).catch(() => {
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
    const response = await axios.post(`${apiRoute}/${project}/${collection}/insert`, doc.propierties).catch(() => {
      console.log('no hay que actualizar');
    });
    if (response) {
      getData()
    }
  };

  return (
    <div className="table-container">
      <> {dataList.length > 0 ? <>
        <header className="header">
          <h1 onClick={() => {console.log(dataList);
          }}>Proyecto: {project}</h1>
          <h2>Colección: {collection}</h2>
        </header>
        <div className="action-icons">
          <FaSync onClick={async () => await getData()} style={{ cursor: 'pointer', marginRight: '10px' }} title="Reload Data" />
          <FaPlus onClick={() => setEditModal({ flag: true, doc: dataList[0], asEdit: false, addDoc: addDoc, editDoc: editDoc, indexList: indexList })} style={{ cursor: 'pointer', marginRight: '10px' }} title="Add New" />
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
                {indexList.map((i) => {
                  var finalValue;
                 
                    finalValue = doc.propierties[i];
                

                  return <td key={i}>{identificateVar(finalValue, finalValue, <InfoIconTooltip info={finalValue}></InfoIconTooltip>, <InfoIconTooltip info={finalValue}></InfoIconTooltip>)}</td>
                })}
                <td>
                  <FaEdit onClick={() => setEditModal({ flag: true, doc: doc, asEdit: true, addDoc: addDoc, editDoc: editDoc, indexList: indexList })} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <FaTrash onClick={() => deleteDoc(doc.id)} style={{ cursor: 'pointer', color: 'red' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </> : <DynamicKeyValue addDoc={addDoc}></DynamicKeyValue>}
      </>

    </div>
  );
};

export default Table;
