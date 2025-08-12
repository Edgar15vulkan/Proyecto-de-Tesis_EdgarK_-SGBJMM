import React from 'react';
import {usePage} from '@inertiajs/react';

const Detalle = () => {
    const { personal, documentos} = usePage().props; //obtener los datos de personal y documentos desde las props

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">
                Documentos de {personal.nombre} {personal.apellido_paterno} {personal.apellido_materno}
            </h1>

            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">  {/*------ ENCABEZADO TABLA------- */}
                    <tr>
                        <th className="p-2 border"> Nombre documento</th>
                        <th className="p-2 border"> Entregado</th>
                        <th className="p-2 border"> Archivo</th>

                    </tr>
                </thead> {/*------ FIN ENCABEZADO TABLA------- */}
                <tbody>
                    {documentos.length > 0 ? (
                        documentos.map((doc) => (
                            <tr key={doc.id}>
                                <td className="p-2 border">{doc.nombre_documento}</td>
                                <td className="p-2 border">{doc.entregado ? 'Sí' : 'No'}</td>
                                <td className="p-2 border">{doc.ruta_documento || 'Sin archivo'}</td>
                            </tr>    
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="p-2 border text-center">
                                No hay documentos registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Detalle;