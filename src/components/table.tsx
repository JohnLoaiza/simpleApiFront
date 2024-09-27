import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Table.css'; // Archivo de estilos para personalizar la tabla
import axios from 'axios';

const Table: React.FC = () => {
  // Obtiene los parámetros de la ruta
  const { project, collection } = useParams<{ project: string; collection: string }>();

  const [indexList, setIndexList] = useState<string[]>([]);
  const [dataList, setDataList] = useState<any[]>([]);

  // Datos aleatorios para llenar la tabla
  const data = [
    { id: 1, name: 'Item 1', description: 'Description of Item 1', status: 'Active' },
    { id: 2, name: 'Item 2', description: 'Description of Item 2', status: 'Inactive' },
    { id: 3, name: 'Item 3', description: 'Description of Item 3', status: 'Pending' },
    { id: 4, name: 'Item 4', description: 'Description of Item 4', status: 'Completed' },
  ];

  useEffect(() => {

console.log('useefeect');

    getData()
    return () => {    };
  }, []);

   const getData = async ()  => {

    console.log('entra')
    const response = await axios.get('http://localhost:5020/Dynamic/' + project + '/' + collection).catch(() => {
        console.log('no hay que actualizar')

    })
    console.log(response!.data);

    if (response) {
        const obj = response!.data[0].propierties;
       setIndexList([])
Object.keys(obj).forEach((key) => {
 indexList.filter((i) => i === key).length === 0 ? indexList.push(key) : () => {}
});

setIndexList([...indexList])
setDataList([...response!.data])
console.log('index list');
console.log(indexList);
console.log('data list');
console.log(dataList);
        return response!.data

    } else {
        return { success: false }
    }

}
console.log('holaaaa');

  return (
    <div className="table-container">
      <header className="header">
        <h1 onClick={() => console.log(dataList) }>Project: {project}</h1>
        <h2>Collection: {collection}</h2>
      </header>
      <table className="styled-table">
        <thead>
          <tr>
            {indexList.map((i) => <th>{i}</th>)}
          </tr>
        </thead>
        <tbody>
          {dataList.map((doc, index) => (
            <tr key={doc.id}>
                {indexList.map((i) => <td>{doc.propierties[i]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
