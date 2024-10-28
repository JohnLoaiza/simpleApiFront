import React, { useState } from "react";
import './extraInfo.css'

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
    console.log("Tipo desconocido");
    return false;
}
}

export function isJSON(str: string): boolean {
    // Comprobación preliminar
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



export const InfoIconTooltip = ({info = []} : any) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const infoProcess = () => identificateVar(info, info, 
    <>
    {info.map((s: any) => <td>{s}</td>)}
    </>
    ,
    info
  );

  return (
    <div
      className="info-icon-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="info-icon">i</span>
      {showTooltip && <div className="info-tooltip">{infoProcess()}</div>}
    </div>
  );
};

export default InfoIconTooltip;