import { Head, usePage, Link, router } from "@inertiajs/react";

import React from "react";

const Index = () => {
    const { personal } = usePage().props; // Obtener al personal desde las props de la página
    const listaPersonal = personal?.data || []; //Array real de personal

    // ---- Función para manejar la eliminación de un personal del sistema ----
    const handleDelete = (id) => {
        if (confirm('¿Estas seguro de que quieres eliminar este servicio?')){
            router.delete(route('personal.destroy', id), {
                onSuccess:  () => alert ('servicio eliminado con exito'), //mensaje de exito
                });
            }
        };

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4"> </h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Nombre(s)</th>
                        <th className="border px-4 py-2">Apellidos(s)</th>
                        <th className="border px-4 py-2">Grupo</th>
                        <th className="border px-4 py-2">Cargo</th>
                        
                        <th className="border px-4 py-2">Estado</th>
                        <th className="border px-4 py-2">Fecha Ingreso</th>
                        
                        {/*<th className="border px-4 py-2">CURP</th>
                        *<th className="border px-4 py-2">Fecha de Nacimiento</th>
                        <th className="border px-4 py-2">Lugar de Nacimiento</th>
                         Agregar más encabezados según los campos de la tabla */}

             
                     
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPersonal.map((persona, ) => (
                        <tr key={persona.id}>
                            <td className="border px-4 py-2">{persona.personal_id}</td>
                            <td className="border px-4 py-2">{persona.nombre}</td>
                            <td className="border px-4 py-2">{persona.apellido_paterno} {persona.apellido_materno}</td> {/* Concatenar apellido paterno y materno */}
                            <td className="border px-4 py-2">N/A</td>
                            <td className="border px-4 py-2">{persona?.servicios?.cargo || 'sin cargo'}</td>
                            <td className="border px-4 py-2">{persona?.servicios?.estado || 'sin estado'}</td>
                            <td className="border px-4 py-2">{persona?.servicios?.fecha_ingreso || 'N/A'}</td>
                            {/*<td className="border px-4 py-2">{persona.lugar_nacimiento}</td>
                             -- Aquí puedes agregar más celdas según los campos de la tabla */}
                  

                            <td className="p-2 border flex space-x-2">
                                {/* Botón Ver detalles */}
                                <Link href= {route("personal.show", persona.personal_id)}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">
                                        Ver
                                    </button>
                                </Link>

                                {/* Botón Editar */}
                               <Link href={route("personal.edit", persona.personal_id)}>
                                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded">
                                        Editar
                                    </button>
                                </Link>
                                    
                                {/* Botón Eliminar */}
                                <button 
                                    onClick={() => handleDelete(persona.personal_id)}   //Actualizar campo según el ID  de la tabla
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
                {personal?.links?.map((link, index) => (
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