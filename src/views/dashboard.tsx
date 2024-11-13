// components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ModuleContent from '../components/ModuleContent';
import styles from './styles.module.css';
import EditModal from '../components/editModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiRoute, dbName } from '../configs';

export interface Settings {
  sesion:false,
  userId: ''
}

export interface User {
  roles: string[],
  username: string
}

const Dashboard: React.FC = () => {
  const storage = sessionStorage.getItem('settings')
  const navigate = useNavigate();
  const [user , setUser] = useState({
    roles: [],
    username: ''
  })

  const settings: Settings = storage ? JSON.parse(storage) : {
    sesion:false,
    userId: ''
} ;

  const [selectedModule, setSelectedModule] = useState<string>('Home');
  const [loading, setLoading] = useState(false)
  const [editModal, setEditModal] = useState({ flag: false, obj: undefined, indexEdit: 0, mapList: [], doc: undefined, asEdit:false, addDoc: () => {}, editDoc: () => {}, indexList: [] });


  

  const handleChange = (module: string) => {
    setLoading(true)
    setTimeout(() => {
      setSelectedModule(module)
      setLoading(false)
    }, 100);
  }

  useEffect(() => {
   if(settings.sesion) {
    getDataByUserId()
   } else {
    navigate('/login');
   }
}, []);

const getDataByUserId = async () => {
  console.log('trae');
  console.log(`${apiRoute}/${dbName}/users/${settings.userId}`);
  
  
  const response = await axios.get(`${apiRoute}/${dbName}/users/${settings.userId}`).then(
    (response) => {
      console.log(response.data);
      setUser({
        roles: JSON.parse(response.data.propierties.roles),
        username: response.data.propierties.username
      })    }

  ).catch(
    (error) => {
      console.error(error);
      alert('No se pudo encontrar usuario con este id')
      navigate('/login');
    }
  );
}

  return (
    <div className={styles.dashboard}>
      <Sidebar userSettings ={user} onSelectModule={handleChange} />
      <div className={styles.content}>
        <h1>{selectedModule}</h1>
        {!loading ? <ModuleContent userSettings ={user} module={selectedModule} setEditModal={setEditModal} /> : 
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>}
      </div>
      {editModal.flag ? (
        <EditModal indexEdit={editModal.indexEdit} addDoc={editModal.addDoc} asEdit={editModal.asEdit} editDoc={editModal.editDoc} indexList={editModal.indexList} doc={editModal.doc} onClose={() => setEditModal({ obj: undefined, indexEdit:0, mapList: [], flag: false, doc: undefined, asEdit: false, addDoc: () => { }, editDoc: () => { }, indexList: [] })} obj={editModal.obj} mapList={editModal.mapList}></EditModal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
