import { formatearFecha } from "@/Utils/fechas";
import { Head, usePage, Link, router } from "@inertiajs/react";

import React from "react";

const Index = () => {
    const { reportes } = usePage().props; // Obtener al personal desde las props de la página
    const listaReportes = reportes?.data || []; //Array real de personal

    // ---- Función para manejar la eliminación de un personal del sistema ----
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar a este reporte del sistema?')){
            router.delete(route('reportes.destroy', id), {
                onSuccess:  () => alert ('Reporte de Incidente eliminado con exito'), //mensaje de exito
                });
            }
        };

    return (
        <div className="overflow-x-auto">  {/* overflow-x-auto añade scrollbar a la tabla si se alarga */}
            <h2 className="text-2xl font-bold mb-4"> </h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Titulo</th>
                        <th className="border px-4 py-2">Fecha de creación</th>
                        <th className="border px-4 py-2">Autor</th>
                        <th className="border px-4 py-2">Descripción</th>
                        <th className="border px-4 py-2">Archivo</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaReportes.map((reporte, ) => (
                        <tr key={reporte.id}>
                            <td className="border px-4 py-2">{reporte.id}</td>
                            <td className="border px-4 py-2">{reporte.titulo || 'Sin titulo'}</td>
                            <td className="border px-4 py-2">{reporte.fecha || 'N/A'}</td>
                            <td className="border px-4 py-2">{reporte.autor
                                                                ? `${reporte.autor.nombre} 
                                                                ${reporte.autor.apellido_paterno || ''} 
                                                                ${reporte.autor.apellido_materno || ''}`
                                                                : 'N/A'}
                                                                </td>
                            <td className="border px-4 py-2">{reporte?.descripcion || 'sin descripcion'}</td>
                            {/*<td className="border px-4 py-2">{reporte?.archivo || 'Sin archivo'}</td> */}
                            <td className="p-2 border flex space-x-2">
                                {/* --------Botón Ver documento en otra pestaña-------*/}
                                {/* --------Botón Ver documento -------*/}
                                {/*---------- Botón Descargar documento----- */}
                                {/* --------Botón Ver documento -------*/}
                               {reporte.archivo && (
                                    <a 
                                        href={route("reportes.archivo", reporte.id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"   
                                    >
                                        Ver
                                    </a>
                                )}


                                {/*---------- Botón Descargar documento----- */}
                                {reporte.archivo && (
                                    <a 
                                        href={route("reportes.download", reporte.id)}
                                        className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"   
                                    >
                                        Descargar
                                    </a>
                                )}
                                    
                                {/*----- Botón Eliminar documento----- */}
                                <button 
                                    onClick={() => handleDelete(reporte.id)}   //Actualizar campo según el ID  de la tabla
                                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">
                                    Eliminar 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {reportes?.links?.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`mx-1 px-4 py-2 rounded ${
                        link.active
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>   {/* Fin de la paginacion */}
        </div>
    );
}
export default Index;