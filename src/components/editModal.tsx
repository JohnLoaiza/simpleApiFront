import { useEffect, useState } from "react";

interface modalProps {
    doc: any;
    onClose: () => void;
    editDoc: (id: string, doc: any) => void;
    indexList: string[];
    asEdit: boolean
    addDoc: ( doc: any) => void,
    obj: any,
    mapList: string[],
    indexEdit: number
}

const EditModal = (props: modalProps) => {
    const {mapList,indexEdit, obj, doc, onClose, indexList, editDoc, asEdit = false, addDoc } = props;
    const [objeto, setObject] = useState<any>();
    const [edit, setEdit] = useState(false)

    const submitEdit = () => {
        var collectionUpdate = doc.propierties
        mapList.forEach(c => {
            collectionUpdate = collectionUpdate[c]
        })
        console.log('finalmente va a actualizar en');
        console.log(collectionUpdate);

        collectionUpdate[indexEdit] = objeto
        console.log('actualizó');
        console.log('y el propierties es');
        console.log(doc.propierties);
        
        
        
      editDoc(doc.id, doc); onClose()
    }
    const submitAdd = () => {
        console.log(objeto.propierties); addDoc(objeto); onClose()
    }

    const change = (e: React.ChangeEvent<HTMLInputElement>, i: string) => {
        objeto[i] = e.target.value;
        setObject(objeto);
        setEdit(true)
    }

    useEffect(() => {
      asEdit ?  setObject(obj) : setObject({id: 0, propierties: {}})
        return () => { };
    }, []);

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                // Verifica si el clic fue en el overlay y no en el contenido del modal
                if (e.currentTarget === e.target) {
                    onClose();
                }
            }}
        >
            <div className="modal-content">
                <h2>{mapList}</h2>
                <h2>{indexEdit}</h2>
                {indexList.map((i) => <label>
                   <div style={{width: '10%'}}>{i}</div> 
                   <div style={{width: '10%'}}> <input type="text" value={objeto && !edit ? objeto[i] : undefined} onChange={(e) => change(e, i)} /></div>    
                </label>)}
                <div className="modal-buttons">
                    <button type="button" onClick={() => asEdit ? submitEdit() : submitAdd()} className="submit-button">{asEdit ? 'Editar' : 'Crear'}</button>
                    <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;