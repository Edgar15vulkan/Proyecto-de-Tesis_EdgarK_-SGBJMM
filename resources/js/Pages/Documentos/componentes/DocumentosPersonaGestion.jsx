import React from 'react';
import TablaDocumentos from './TablaDocumentos';

const DocumentosPersonaGestion = ({ persona }) => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">
                Documentos de {persona.nombre}
            </h2>
            <TablaDocumentos persona={persona} />
        </div>
    );
};

export default DocumentosPersonaGestion;

