import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@headlessui/react';

const TablaDocumentos = ({ documentos }) => {
    //const handleDescargar = (id) => {
        //window.open(route('documentos-personal.descargar', id), '_blank');
    //};

    const handleGestionar = (id) => {
        router.gestionar(route('documentos-personal.gestionar', id));
    };

    // acción eliminar documento por id
    //const handleEliminar = (id) => {
        //if (confirm('¿Seguro que deseas eliminar éste documento?')) {
            //router.delete(route('documentos-personal.destroy', id));
        //}
    //};

    return (
        <table className='container mx-auto p-4'>
            <thead className='bg-gray-100'>
                <tr>
                    <th className='p-2 border'>Tipo</th>
                    <th className= 'p-2 border'>Nombre </th>
                    <th className= 'p-2 border'>Fecha de entrega </th>
                    <th className= 'p-2 border'>Entregado </th>
                    <th className= 'p-2 border'>Archivo </th>
                    <th className= 'p-2 border'>Acciones </th>
                </tr>
            </thead>
            <tbody>
                {documentos.map((doc) => (
                    <tr key={doc.id}>
                        <td className='p-2 border'>{doc.tipo_documento}</td>
                        <td className='p-2 border'>{doc.nombre_documento}</td>
                        <td className='p-2 border'>{doc.fecha_entrega}</td>
                        <td className='p-2 border'>{doc.entregado ? 'Si' : 'No'}</td>
                        <td className='p-2 border'>{doc.archivo}</td>
                        {/* --------------Acciones de la Tabla Documentos - Resumen -----------*/}
                        <td className='p-2 border space-x-2'>
                            {/*--- Acción de gestionar ---*/}
                            <button 
                                onClick = {() => handleGestionar(doc.id)}
                                className = 'text-green-600 hover:underline'
                            >
                                Gestionar
                            </button>

                            {/*   --------- Acciones de descargar y eliminar documento   ----------------
                            <button
                                onClick = {() => handleDescargar(doc.id)}
                                className= 'text-blue-600 hover:underline'
                            >
                                Descargar
                            </button>
                            <button
                                onClick = {() => handleEliminar(doc.id)}
                                className= 'text-red-600 hover:underline'
                            >
                                Eliminar
                            </button>
                            */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TablaDocumentos;