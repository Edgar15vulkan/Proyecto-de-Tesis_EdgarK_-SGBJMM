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
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
    
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