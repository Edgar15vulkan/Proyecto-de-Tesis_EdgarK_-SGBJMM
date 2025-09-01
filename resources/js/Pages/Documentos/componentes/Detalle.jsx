//Importar dependencias
import React from 'react';
import AuthenticatedLayout
 from '@/Layouts/AuthenticatedLayout';
import {usePage, Head, Link, router} from '@inertiajs/react';
import { formatearFecha } from '@/Utils/fechas';

const Detalle = () => {
    const { personal, documentos} = usePage().props; //obtener los datos de personal y documentos desde las props

    //------------------Funcion eliminar documento -------------
    const handleDelete = (id) => {
        if (confirm("¿Seguro que quieres eliminar este documento?")) {
            router.delete(route("documentos-personal.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ver documentación individual del personal
                </h2>
            }
        >
            <Head title="Documentos de personal"/>

            {/* Formulario de nuevo documento  */}
                <div className="bg-white shadow-md p-4 rounded-lg max-w-md mx-auto">
                    <h2 className="text-2xl font-semibold mb-3">Acciones</h2>
                    <Link href={route('documentos-personal.create', {personal: personal.personal_id} )}>
                        <button className="hover:brightness-90 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                        style={{backgroundColor: '#FBC02D'}}
                        type="button">
                            Nuevo Documento
                        </button>
                    </Link>
                </div> 

            {/*---------------- Tabla de documentos personaes ------------ */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-xl font-bold mb-4">
                            Documentos de {personal.nombre} {personal.apellido_paterno} {personal.apellido_materno}
                        </h1>
                        <div className="bg-gray-100 p-4 rounded mb-4 space-x-20 overflow-x-auto">  {/* overflow-x-auto */}
                            <table className="table-auto w-full border">
                                <thead className="bg-gray-100">  {/*------ ENCABEZADO TABLA------- */}
                                    <tr>
                                        <th className="p-2 border">ID documento</th>
                                        <th className="p-2 border">Tipo de documento</th>
                                        <th className="p-2 border"> Nombre documento</th>
                                        <th className="p-2 border"> Entregado</th>
                                        <th className="p-2 border"> Fecha de entrega</th>
                                        <th className="p-2 border"> Acciones</th>

                                    </tr>
                                </thead> {/*------ FIN ENCABEZADO TABLA------- */}
                                <tbody>
                                    {documentos.length > 0 ? (
                                        documentos.map((doc) => (
                                            <tr key={doc.id}>
                                                <td className="p-2 border">{doc.id}</td>
                                                <td className="p-2 border">{doc.tipo_documento}</td>
                                                <td className="p-2 border">{doc.nombre_documento}</td>
                                                <td className="p-2 border">{doc.entregado ? 'Sí' : 'No'}</td>
                                                <td className="p-2 border">{formatearFecha(doc.fecha_entrega)}</td>
                                             
                                                
                                                {/*--------Botones de Acción--------*/}
                                                <td className="p-2 border flex space-x-2">

                                                    {/* --------Botón Ver documento -------*/}
                                                    <a
                                                        href={route("documentos-personal.ver", doc.id)}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                                                    >
                                                        Ver
                                                    </a>
                    
                                                    {/*---------- Botón Descargar documento----- */}
                                                    <a 
                                                        href={route("documentos-personal.descargar", doc.id)}
                                                        className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"   
                                                    >
                                                        Descargar
                                                    </a>
                                                        
                                                    {/*----- Botón Eliminar documento----- */}
                                                    <button 
                                                        onClick={() => handleDelete(doc.id)}   //Actualizar campo según el ID  de la tabla
                                                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">
                                                        Eliminar 
                                                    </button>
                                                </td>
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
                    </div>
                       
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Detalle;