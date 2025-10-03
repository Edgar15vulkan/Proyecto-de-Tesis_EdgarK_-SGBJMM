/*Importaciones */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import VehiculosTabla         from './componentes/TablaVehiculos'; // Importar el componente Index de Clientes/Index.jsx

import React from 'react';

export default function Index({vehiculos}) { // Recibe al personal como props

     //mensajes de consola
        //console.log("Personal:", personal); // muestra al personal en la consola

        {/* ------------- Encabezado de la pagina ---------------- */}
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800"> {/* Color del texto */}
                    Lista de los vehiculos registrados
                </h2>
            }
        >
            <Head title="Vehiculos" />

            <div className="py-5    ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                        {/*------------ Mostrar el personal registrado en una tabla ------------ */}
                        <div className="bg-gray-100 p-4 rounded mb-4">
                            <h2 className='text-2xl font-semibold mb-3'>Gestión de Vehículos</h2>
                            <p className='mb-4 text-lg text-gray-700'>
                                En esta sección se muestra el listado de vehículos 
                                registrados en la institución. Permite consultar la información 
                                básica de cada unidad, así como acceder a opciones para agregar, 
                                editar o dar de baja vehículos, asegurando un control organizado 
                                y actualizado del parque vehicular.
                            </p>
                            <VehiculosTabla vehiculos = {vehiculos} /> {/* Verificar ruta en web.php*/} 
                        </div>

                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
    
}