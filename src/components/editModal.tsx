import { useEffect, useState } from "react";
import { isJSON, isObject, renderObjectList } from "./extraInfo";

interface modalProps {
    doc: any;
    onClose: () => void;
    editDoc: (id: string, doc: any) => void;
    indexList: string[];
    asEdit: boolean
    addDoc: (doc: any) => void
}

const EditModal = (props: modalProps) => {
    const { doc, onClose, indexList, editDoc, asEdit = false, addDoc } = props;
    const [document, setDocument] = useState<any>();

    const submitEdit = () => {
        console.log(document.propierties); editDoc(document.id, document); onClose()
    }
    const submitAdd = () => {
        console.log(document.propierties); addDoc(document); onClose()
    }

    const change = (e: React.ChangeEvent<HTMLInputElement>, i: string) => {
        document.propierties[i] = e.target.value;
        setDocument(document);
    }

    useEffect(() => {
        asEdit ? setDocument(doc) : setDocument({ id: 0, propierties: {} })
        return () => { };
    }, []);

    const objectForm = (finalValue: any, key: string) => {


        return <>
        <div>
            <label>{key + ': '}</label>
            {objetcToForm(Object.keys(finalValue), finalValue)}
        </div>
    </>
    }

    const objetcToForm = (indexList: string[], objetc: any) => {
        var finalList: JSX.Element[] = [];
        indexList.map((i) => {
            var finalValue;
            var render: JSX.Element = <></>;
            var jsonParse = objetc[i]
            try {
                jsonParse = JSON.parse(objetc[i])
                console.log('json parse es ');
                console.log(jsonParse);
            } catch { }
            if (isObject(jsonParse)) {
                finalValue = JSON.parse(JSON.stringify(jsonParse));
                console.log('value es');
                console.log(finalValue);
                console.log('indexes son');
                console.log(Object.keys(finalValue));
                render = objectForm(finalValue, i);

            } else if (Array.isArray(jsonParse)) {
                finalValue = jsonParse
                render = isObject(finalValue[0]) ? (asEdit? renderObjectList(finalValue) :<>{objetcToForm(Object.keys(finalValue[0]), finalValue)}</> ): (asEdit?
                 <>
                <strong> {'Lista de ' + i}</strong>   
                <ul>
                    {finalValue.map((e: any) => {
                        return <>

                            {<li>{e}</li> }
                        </>
                    })}
                    </ul>
                </>: <label>
                    <div style={{ width: '10%' }}>{i}</div>
                    <div style={{ width: '10%' }}> <input type="text" value={undefined} onChange={(e) => change(e, i)} /></div>
                </label>
                
            )
            }

            else {
                finalValue = objetc[i];
                console.log('pasa derecho ');
                console.log(finalValue);
                render = <label>
                    <div style={{ width: '10%' }}>{i}</div>
                    <div style={{ width: '10%' }}> <input type="text" value={document && asEdit ? finalValue : undefined} onChange={(e) => change(e, i)} /></div>
                </label>
            }


            finalList.push(render)
        })
        return finalList;

    }

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
                {objetcToForm(indexList, doc.propierties)}
                <div className="modal-buttons">
                    <button type="button" onClick={() => asEdit ? submitEdit() : submitAdd()} className="submit-button">{asEdit ? 'Editar' : 'Crear'}</button>
                    <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};



export default EditModal;
