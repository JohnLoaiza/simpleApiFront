import { useEffect, useState } from "react";

interface modalProps {
    doc: any;
    onClose: () => void;
    editDoc: (id: string, doc: any) => void;
    indexList: string[];
    asEdit: boolean
    addDoc: ( doc: any) => void
}



const GeneralModal = (props: modalProps) => {
    const { doc, onClose, indexList, editDoc, asEdit = false, addDoc } = props;
    const [document, setDocument] = useState<any>();
    const [edit, setEdit] = useState(false)

    const submitEdit = () => {
        console.log(document.propierties); editDoc(document.id, document); onClose()
    }
    const submitAdd = () => {
        console.log(document.propierties); addDoc(document); onClose()
    }

    const change = (e: React.ChangeEvent<HTMLInputElement>, i: string) => {
        document.propierties[i] = e.target.value;
        setDocument(document);
        setEdit(true)
    }

    useEffect(() => {
      asEdit ?  setDocument(doc) : setDocument({id: 0, propierties: {}})
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
                <h2>Title</h2>
                {indexList.map((i) => <label>
                    {i}
                    <input type="text" value={document && !edit ? document.propierties[i] : undefined} onChange={(e) => change(e, i)} />
                </label>)}
                <div className="modal-buttons">
                    <button type="button" onClick={() => asEdit ? submitEdit() : submitAdd()} className="submit-button">Submit</button>
                    <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default GeneralModal;
