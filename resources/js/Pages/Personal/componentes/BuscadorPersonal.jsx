import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';

const BuscadorPersonal = () => {
    const [busqueda, setBusqueda] = useState(''); // Estado para el buscador

    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        
        router.get('/personal', { search: busqueda }, {
            preserveScroll: true, // Mantener el desplazamiento actual de la página
            replace: true, // Reemplazar la URL sin agregar una nueva entrada al historial
        }); //  { search: busqueda }, {  Enviar la búsqueda al servidor
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                    placeholder="Buscar personal por ID"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
                >
                    Buscar
                </button>
                {/* Enlace para ver todos los servicios */}
                <Link href={route('personal.index')} className=''>
                <button className='border px4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
                    type="button">Ver todo</button>
                </Link>
            </form>
        </div>
    );
};
export default BuscadorPersonal;