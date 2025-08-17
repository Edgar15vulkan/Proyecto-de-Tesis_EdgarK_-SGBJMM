import React from 'react';
import AuthenticatedLayout
 from '@/Layouts/AuthenticatedLayout';
import {usePage, Head, Link, router} from '@inertiajs/react';
import FormNuevoDocumento from './FormNuevoDocumento';

const Detalle = () => {
    const { personal, documentos} = usePage().props; //obtener los datos de personal y documentos desde las props

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ver documentación individual del personal
                </h2>
            }
        >
            <Head title="Documentos de personal"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-xl font-bold mb-4">
                            Documentos de {personal.nombre} {personal.apellido_paterno} {personal.apellido_materno}
                        </h1>
                        <div className="bg-gray-100 p-4 rounded mb-4 space-x-20">
                            <table className="table-auto w-full border">
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
                    </div>
                    {/* Formulario de nuevo documento  */}
                    <div className="bg-gray-100 p-4 rounded mb-4">
                        <div className="bg-blue-100 p-4 rounded mb-4 space-x-20">
                        <h2 className="text-2xl font-semibold mb-3">Nuevo documento</h2>
               
                        <Link href={route('documentos-personal.create', {personal: personal.personal_id} )}>
                            <button className="hover:brightness-90 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                            style={{backgroundColor: '#FBC02D'}}
                            type="button">
                                Añadir nuevo Documento
                            </button>
                        </Link>
                        </div>
                    </div>    
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Detalle;