import { formatearFecha } from "@/Utils/fechas";
import { Head, usePage, Link, router } from "@inertiajs/react";


import React from "react";

const Index = () => {
    const { vehiculos } = usePage().props; // Obtener al personal desde las props de la página
    const listaVehiculos = vehiculos?.data || []; //Array real de personal

    // ---- Función para manejar la eliminación de un personal del sistema ----
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este reporte del sistema?')){
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
                        <th className="border px-4 py-2">Número economico</th>
                        <th className="border px-4 py-2">Tipo</th>
                        <th className="border px-4 py-2">Marca y modelo</th>
                        <th className="border px-4 py-2">Placas de circulación</th>
                        <th className="border px-4 py-2">Estado</th>
                        <th className="border px-4 py-2">Fecha adquisición</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaVehiculos.map((vehiculo, ) => (
                    <tr key={vehiculo.id}>
                        <td className="border px-4 py-2">{vehiculo.id}</td>
                        <td className="border px-4 py-2">{vehiculo.numero_economico || 'Sin numero econ.'}</td>
                        <td className="border px-4 py-2">{vehiculo?.tipo_vehiculo || 'N/A'}</td>
                        <td className="border px-4 py-2">{vehiculo.marca || 'Sin marca'}</td>
                         <td className="border px-4 py-2">{vehiculo?.placas || 'N/A'}</td>
                          <td className="border px-4 py-2">{vehiculo?.estado_vehiculo || 'N/A'}</td>
                        <td className="border px-4 py-2">{formatearFecha(vehiculo.fecha_adquisicion || 'N/A')}</td>
                    
                        <td className="p-2 border flex space-x-2">
                            
                            {/* --------Botón Ver documento -------
                              {/* Botón Ver detalles */}
                            <Link href= {route("vehiculos.show", vehiculo.id)}>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">
                                    Ver
                                </button>
                            </Link>
                        

                            {/*----- Botón Eliminar documento----- */}
                            <button 
                                onClick={() => handleDelete(vehiculo.id)}   //Actualizar campo según el ID  de la tabla
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
                {vehiculos?.links?.map((link, index) => (
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