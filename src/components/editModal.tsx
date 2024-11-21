import { useEffect, useState } from "react";
import { identificateVar } from "./extraInfo";

interface modalProps {
    doc: any;
    onClose: () => void;
    editDoc: (id: string, doc: any) => void;
    indexList: string[];
    asEdit: boolean
    addDoc: (doc: any) => void,
    obj: any,
    mapList: string[],
    indexEdit: number,
    editAs: string
}

const EditModal = (props: modalProps) => {
    const { editAs, mapList, indexEdit, obj, doc, onClose, indexList, editDoc, asEdit = false, addDoc } = props;
    const [objeto, setObject] = useState<any>();
    const [edit, setEdit] = useState(false)

    const submitEdit = () => {
        var collectionUpdate = doc.propierties
        console.log('map lis es');
        console.log(mapList);


        mapList.forEach(c => {
            console.log('collection viene '); console.log(collectionUpdate);

            console.log('y va a entrar a ' + c);

            const flag = identificateVar(c, 'string', 'subCollection', 'imposible')

            if (flag === 'string') {
                collectionUpdate = collectionUpdate[c]
            } else {
                collectionUpdate = collectionUpdate[c[1]][c[0]]
            }

            console.log('entro y quedo');
            console.log(collectionUpdate);


        })
        if (editAs === 'objectList') {

            console.log('finalmente va a actualizar en');
            console.log(collectionUpdate);

            collectionUpdate[indexEdit] = objeto

        } else if (editAs === 'simpleList') {
            console.log('finalmente va a actualizar la lista');
            console.log(collectionUpdate);
            objeto.forEach((d: any, index: number) => {
                collectionUpdate[index] = d
            });
            console.log('collectionUpdate');
            console.log(collectionUpdate);


        } else if (editAs === 'object') {
            console.log('finalmente va a actualizar el objeto');
            console.log(collectionUpdate);
            indexList.forEach((d) => {
                collectionUpdate[d] = objeto[d]
            })
            console.log('collectionUpdate');
            console.log(collectionUpdate);
        }
        console.log('actualizó');
        console.log('y el propierties es');
        console.log(doc.propierties);




        editDoc(doc.id, doc); onClose()
    }
    const submitAdd = () => {
console.log('add');
        var cloneDoc = structuredClone(doc)
        var collectionUpdate = cloneDoc.propierties
        console.log('map lis es');
        console.log(mapList);


        mapList.forEach(c => {
            console.log('collection viene '); console.log(collectionUpdate);

            console.log('y va a entrar a ' + c);

            const flag = identificateVar(c, 'string', 'subCollection', 'imposible')

            if (flag === 'string') {
                collectionUpdate = collectionUpdate[c]
            } else {
                collectionUpdate = collectionUpdate[c[1]][c[0]]
            }

            console.log('entro y quedo');
            console.log(collectionUpdate);


        })
        indexList.forEach((i) =>{
            const identificate = identificateVar(obj[i], '', 'array', 'object');
            if (identificate === 'array') {
                const arrayIdentificate = identificateVar(obj[i][0], 'string', 'array', 'object')
                if (arrayIdentificate === 'object') {
                    objeto.propierties[i] = [obj[i][0]];
                } else if (arrayIdentificate === '') {
                    objeto.propierties[i] = [];

                }
                
            } else if (identificate === 'object') {
                objeto.propierties[i] = obj[i]
            }
        })

        if (editAs === 'objectList') {

            console.log('finalmente va a agregar en');
            console.log(collectionUpdate);

            collectionUpdate.push(objeto.propierties)

        } else if (editAs === 'simpleList') {
            console.log('finalmente va a agregar en la lista');
            console.log(collectionUpdate);
            collectionUpdate.push(objeto)
            console.log('collectionUpdate');
            console.log(collectionUpdate);


        } 
        console.log('agregó');
        console.log('y el propierties es');
        console.log(cloneDoc.propierties);

       
        console.log(objeto.propierties); 

        if (mapList.length === 0) {
            console.log('inserta nuevo documento principal');
           addDoc(objeto);
        } else {
console.log('es subcolección entonces actualizará el documento principal con id ' + doc.id);
 editDoc(doc.id, cloneDoc);
        }
        
         onClose()
    }

    const change = (e: React.ChangeEvent<HTMLInputElement>, i: string) => {
        console.log('editando');
        console.log(objeto);
        
        objeto[i] = e.target.value;
        setObject(objeto);
        setEdit(true)
    }

    useEffect(() => {
        console.log('obj es');
        console.log(obj);


        asEdit ? setObject(obj) : setObject({ id: 0, propierties: {} })
        return () => { };
    }, []);

    const modalButtons = () => {
        return <>
            <div className="modal-buttons">
                <button type="button" onClick={() => asEdit ? submitEdit() : submitAdd()} className="submit-button">{asEdit ? 'Editar' : 'Crear'}</button>
                <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
            </div>
        </>
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
                {editAs == 'simpleList' ? <>
                    <SimpleTable asEdit={asEdit} edit={edit} setEdit={setEdit} setObject={setObject} title={mapList[mapList.length - 1]} obj={objeto ?? []}></SimpleTable>
                    {modalButtons()}
                </> : <>
                    <h2>{mapList}</h2>
                    {objeto && indexList.map((i) => {
                        const render = identificateVar(asEdit? objeto[i] : obj[i], true, false, false);
                       return render ? <label>
                        <div style={{ width: '10%' }}>{i}</div>
                        <div style={{ width: '10%' }}> <input type="text" value={objeto && !edit ? objeto[i] : undefined} onChange={(e) => change(e, i)} /></div>
                    </label> : <></>})}
                    {modalButtons()}
                </>}

            </div>
        </div>
    );
};

const SimpleTable = ({ obj, title, setObject, edit, setEdit, asEdit }: any) => {
    console.log('lista simple es');
    console.log(obj);


    return <>
        <h2>{title}</h2>
        { asEdit ? obj.map((i: string, index: number) => <label>
            <div style={{ width: '10%' }}> <input type="text" value={!edit ? obj[index] : undefined} onChange={(e) => {
                obj[index] = e.target.value; setEdit(true); setObject(obj); console.log('actualiza'); console.log(obj);
                ;
            }} /></div>
        </label>) : <><div style={{ width: '10%' }}> <input type="text" value={undefined} onChange={(e) => {
                 setObject(e.target.value); 
                ;
            }} /></div></>}
    </>
}

export default EditModal;