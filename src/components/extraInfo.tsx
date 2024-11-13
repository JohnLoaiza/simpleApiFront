import React, { useState } from "react";
import './extraInfo.css'
import { FaEdit, FaTrash } from "react-icons/fa";

type MyType = string | object | any[];
export const identificateVar = (myVariable: MyType, isString: any, isArray: any, isObject: any) => {
  if (typeof myVariable === 'string') {
    // Es un string
    console.log("Es un string:", myVariable);
    return isString
  } else if (Array.isArray(myVariable)) {
    // Es un array
    console.log("Es un array:", myVariable);
    return isArray
  } else if (typeof myVariable === 'object' && myVariable !== null) {
    // Es un objeto
    console.log("Es un objeto:", myVariable);
    return isObject
  } else {
    console.log("Tipo desconocidoo");
    console.log(myVariable);
    
    return false;
  }
}

export function isJSON(str: string): boolean {
  // Comprobación preliminar
  console.log('compureba si es json a ');
  console.log(str);


  if (str.trim().startsWith("{") && str.trim().endsWith("}") ||
    str.trim().startsWith("[") && str.trim().endsWith("]")) {
    try {
      JSON.parse(str); // Intenta parsear el string
      return true; // Es JSON válido
    } catch (e) {
      return false; // No es JSON válido
    }
  }
  return false; // No comienza ni termina como JSON
}

export function isObject(value: any): value is object {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export const ObjetctToView = ({info, setEditModal, mapList, doc, editDoc}: any) => {

  return <>
   <FaEdit onClick={() => {
           
           setEditModal({editAs: 'object', flag: true, mapList: mapList, indexEdit: 0, doc: doc, obj: info, asEdit: true, addDoc: () => {}, editDoc:  editDoc, indexList: Object.keys(info) })}} style={{ cursor: 'pointer', marginRight: '10px' }} />
  {
    Object.keys(info).map((k) => {
      let finalValue;
    
      if (isJSON(info[k] + '')) {
        console.log('Es JSON');
        finalValue = JSON.parse(info[k]);
      } else {
        console.log('Es variable limpia');
        finalValue = typeof info[k] === 'number' ? info[k] + '' : info[k];
      }
    
      // Aquí verificamos el tipo de finalValue para ver si necesita el InfoIconTooltip
      const renderValue = identificateVar(
        finalValue,
        // Si es un string o número simple
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {finalValue}
        </span>,
        // Si es un array o un objeto
        <InfoIconTooltip info={finalValue} />,
        <InfoIconTooltip info={finalValue} />
      );
    
      return (
        <div key={k} style={{ display: 'flex', alignItems: 'center' }}>
          <strong>{k}:</strong>
          <span style={{ marginLeft: '5px' }}>{renderValue}</span>
        </div>
      );
    })
  }
  </>
};

export const renderObjectList = (info: Array<any>, mapList: string[], title:  string, setEditModal: any, doc: any, editDoc: any) => {
console.log('entra info');
console.log(info);



  return (
    <>
    <strong style={{textAlign: 'center'}}>{title}</strong>
      {/* Encabezado de la tabla */}
      <div style={{ display: 'flex', gap: '10px', fontWeight: 'bold', width: '100%' }}>
        {Object.keys(info[0]).map((key) => (
          <span key={key} style={{ width: '100px', textAlign: 'center' }}>{key}</span>
        ))}
      </div>
      <br />
  
      {/* Filas de objetos */}
      {info.map((obj: any, index: number) => (
        <div key={index} style={{ display: 'flex', gap: '10px', width: '100%' }}>
          {Object.keys(info[0]).map((key) => {
            console.log('va a consultar formato de ');
            console.log(obj[key]);
  
            var finalValue;
            if (isJSON(obj[key] + '')) {
              console.log('es json');
  
              finalValue = JSON.parse(obj[key]);
            } else {
              console.log('Es variable limpia');
              if (typeof obj[key] === 'number') {
                finalValue = obj[key] + ''
              } else {
                finalValue = obj[key]
              }
            }
            return <span key={key} style={{ width: '100px', textAlign: 'center' }}>{identificateVar(finalValue, finalValue, <InfoIconTooltip editDoc={editDoc} doc={doc} setEditModal={setEditModal} mapList={[...mapList, [key, index]]} info={finalValue}></InfoIconTooltip>, <InfoIconTooltip editDoc={editDoc} doc={doc} setEditModal={setEditModal} mapList={[...mapList, [key, index]]} info={finalValue}></InfoIconTooltip>)}</span>
          })}
           <FaEdit onClick={() => {console.log(obj); console.log(Object.keys(info[0]));
           
            setEditModal({editAs: 'objectList', flag: true, mapList: mapList, indexEdit: index, doc: doc, obj: obj, asEdit: true, addDoc: () => {}, editDoc:  editDoc, indexList: Object.keys(info[0]) })}} style={{ cursor: 'pointer', marginRight: '10px' }} />
           <FaTrash onClick={() => {}} style={{ cursor: 'pointer', color: 'red' }} />
        </div>
      ))}
    </>
  )
}

export const InfoIconTooltip = ({ info, mapList = [], setEditModal, doc, editDoc }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const infoProcess = () => identificateVar(info, info,
    <>
      {identificateVar(info, false, true, false) ? (
        isObject(info[0]) ? renderObjectList(info, mapList, '', setEditModal, doc, editDoc) : (
          // Muestra lista simple de strings si no es un array de objetos
        <> <FaEdit onClick={() => {
          setEditModal({editAs: 'simpleList', flag: true, mapList: mapList, indexEdit: 0, doc: doc, obj: structuredClone(info), asEdit: true, addDoc: () => {}, editDoc:  editDoc, indexList: [] })}} style={{ cursor: 'pointer', marginRight: '10px' }} />
          {  info.map((s: any, index: number) => <div key={index}>{s}</div>)}
          </>  
        
        )
      ) : ''}
    </>,
   <ObjetctToView info={info} setEditModal={setEditModal} mapList={mapList} doc={doc} editDoc={editDoc}></ObjetctToView>
  );
  return (
    <div
      className="info-icon-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="info-icon">i</span>
      {showTooltip &&
      
      <div className="info-tooltip">
        {mapList.toString()}
        {infoProcess()}</div>}
    </div>
  );
};

export default InfoIconTooltip;