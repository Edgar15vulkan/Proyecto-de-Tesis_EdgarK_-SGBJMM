import React from 'react';
import { router, Link, usePage } from '@inertiajs/react';
import { Button } from '@headlessui/react';

const TablaResumenDoc = ({ documentos }) => {

    const { personal } = usePage().props; // Obtener al personal desde las props de la página
    const listaPersonal = personal?.data || []; //Array real de clientes
    
    const handleGestionar = (personalId) => {
        router.get(route('documentos-personal.show', personalId));
    };

    return (
        <div>
            <table className='container mx-auto p-4'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='p-2 border'>ID Personal</th>
                        <th className= 'p-2 border'>Nombre(s) </th>
                        <th className= 'p-2 border'>Apellidos </th>
                        <th className= 'p-2 border'>Entregado </th>
                        <th className= 'p-2 border'>Nombre_doc</th>
                        <th className= 'p-2 border'>Tipo_doc</th>
                        <th className= 'p-2 border'>Archivo </th>

                        <th className= 'p-2 border'>Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    {listaPersonal.map((persona) => {
                        const documento = documentos.find(d => d.personal_id === persona.id) || {};
                        return (
                        <tr key={persona.id ?? documento.id}>
                            <td className='p-2 border'>{persona.personal_id}</td>
                            <td className='p-2 border'>{persona.nombre}</td>
                            <td className='p-2 border'>{persona.apellido_paterno} {persona.apellido_materno}</td>
                            <td className='p-2 border'>{documento.entregado ? 'Sí' : 'No'}</td>
                            <td className='p-2 border'>{documento.nombre_documento || 'Sin documento'}</td>
                            <td className='p-2 border'>{documento.archivo}</td>
                            <td className='p-2 border'>{documento.tipo_documento}</td>
                            {/* --------------Acciones de la Tabla Documentos - Resumen -----------*/}
                            <td className='p-2 border space-x-2'>
                                {/*--- Acción de gestionar ---*/}
                                <button 
                                    onClick = {() => handleGestionar(persona.personal_id)}
                                    className = 'text-green-600 hover:underline'
                                >
                                    Gestionar
                                </button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
            {/*Paginación */}
            <div className="flex justify-center mt-4">
                {personal?.links?.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`mx-1 px-4 py-2 rounded ${
                        link.active
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        dangerouslySetInnerHTML={{__html: link.label}}                        
                    />
                ))}
            </div>  {/* Fin de la paginación */}
        </div>
    );
};

export default TablaResumenDoc;