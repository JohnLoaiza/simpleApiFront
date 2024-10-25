// components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ModuleContent from '../components/ModuleContent';
import styles from './styles.module.css';
import EditModal from '../components/editModal';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const storage = localStorage.getItem('settings')
  const navigate = useNavigate(); // Hook de navegación

  const settings = storage ? JSON.parse(storage) : {
    sesion:false,
    userId: ''
} ;

  const [selectedModule, setSelectedModule] = useState<string>('Home');
  const [loading, setLoading] = useState(false)
  const [editModal, setEditModal] = useState({ flag: false, doc: undefined, asEdit:false, addDoc: () => {}, editDoc: () => {}, indexList: [] });


  

  const handleChange = (module: string) => {
    setLoading(true)
    setTimeout(() => {
      setSelectedModule(module)
      setLoading(false)
    }, 100);
  }

  useEffect(() => {
   if(settings.sesion) {

   } else {
    navigate('/login');
   }
}, []);

  return (
    <div className={styles.dashboard}>
      <Sidebar onSelectModule={handleChange} />
      <div className={styles.content}>
        <h1>{selectedModule}</h1>
        {!loading ? <ModuleContent module={selectedModule} setEditModal={setEditModal} /> : 
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>}
      </div>
      {editModal.flag ? (
        <EditModal addDoc={editModal.addDoc} asEdit={editModal.asEdit} editDoc={editModal.editDoc} indexList={editModal.indexList} doc={editModal.doc} onClose={() => setEditModal({ flag: false, doc: undefined, asEdit:false, addDoc: () => {}, editDoc: () => {}, indexList: [] })}></EditModal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
