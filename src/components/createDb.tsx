import React, { useState } from 'react';
import './createDb.css'; // Asegúrate de crear este archivo para los estilos

interface ParClaveValor {
  indice: string;  // Cambiamos 'key' a 'indice'
  valor: string; 
}

interface Props {
    addDoc: (doc: any) => void;
}

const DynamicKeyValue = (props: Props) => {
  // Estado para almacenar pares índice-valor como un arreglo de objetos
  const [paresClaveValor, setParesClaveValor] = useState<ParClaveValor[]>([{ indice: 'índice1', valor: 'valor1' }]);
  const [objetoFinal, setObjetoFinal] = useState<Record<string, string>>({}); // Estado para el objeto final

  // Maneja el cambio en los campos de texto
  const manejarCambioInput = (index: number, field: 'indice' | 'valor', value: string) => {
    const nuevosParesClaveValor = [...paresClaveValor];
    nuevosParesClaveValor[index][field] = value;

    // Actualiza el estado con los nuevos valores
    setParesClaveValor(nuevosParesClaveValor);
    actualizarObjetoFinal(nuevosParesClaveValor); // Actualiza el objeto final al cambiar
  };

  // Maneja la adición de nuevos pares
  const agregarPar = () => {
    setParesClaveValor([...paresClaveValor, { indice: '', valor: '' }]);
  };

  // Actualiza el objeto final en base a los pares actuales
  const actualizarObjetoFinal = (pares: ParClaveValor[]) => {
    const objetoResultado = pares.reduce((acc, par) => {
      acc[par.indice] = par.valor; // Asigna cada índice a su valor correspondiente
      return acc;
    }, {} as Record<string, string>);

    setObjetoFinal(objetoResultado); // Establece el objeto final en el estado
  };

  // Función para manejar la acción de finalizar
  const finalizar = () => {
    console.log("Objeto Final:", objetoFinal); // Aquí puedes realizar la acción que desees con el objeto final
    props.addDoc({id: 0, propierties: objetoFinal})
   // alert(JSON.stringify(objetoFinal, null, 2)); // Ejemplo: mostrar el objeto final en un alert
  };

  return (
    <div className="container">
      <h1>Pares Dinámicos Índice-Valor</h1>
      
      {/* Indicadores para Índice y Valor */}
      <div className="indicadores-container">
        <span className="indicador">Índice</span>
        <span className="indicador">Valor</span>
      </div>

      <div className="pares-container">
        {paresClaveValor.map((par, index) => (
          <div key={index} className="par-item">
            <input
              type="text"
              placeholder="Índice"  // Placeholder en español
              value={par.indice}
              onChange={(e) => manejarCambioInput(index, 'indice', e.target.value)}
            />
            <input
              type="text"
              placeholder="Valor"  // Placeholder en español
              value={par.valor}
              onChange={(e) => manejarCambioInput(index, 'valor', e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={agregarPar}>Agregar Par</button>
      <br></br>
      <button onClick={finalizar}>Finalizar</button> {/* Botón de finalizar */}

      <h2>Objeto Formado:</h2>
      <div className="pares-lista">
        <pre>{JSON.stringify(objetoFinal, null, 2)}</pre> {/* Muestra el objeto final */}
      </div>
    </div>
  );
};

export default DynamicKeyValue;
