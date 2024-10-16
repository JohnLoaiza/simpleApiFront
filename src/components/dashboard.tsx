// components/Dashboard.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ModuleContent from './ModuleContent';
import styles from './styles.module.css';
import GeneralModal from './editModal';

const Dashboard: React.FC = () => {
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
        <GeneralModal addDoc={editModal.addDoc} asEdit={editModal.asEdit} editDoc={editModal.editDoc} indexList={editModal.indexList} doc={editModal.doc} onClose={() => setEditModal({ flag: false, doc: undefined, asEdit:false, addDoc: () => {}, editDoc: () => {}, indexList: [] })}></GeneralModal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
