/*Importaciones */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import PersonalTabla         from './componentes/TablaPersonal'; // Importar el componente Index de Clientes/Index.jsx
import BuscadorPersonal      from './componentes/BuscadorPersonal'; // Importar el componente BuscadorCliente de Clientes/BuscadorCliente.jsx
import React from 'react';

export default function Index({personal}) { // Recibe los servicios como props

     //mensajes de consola
        console.log("Personal:", personal); // muestra los servicios en la consola

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Personal 
                </h2>
            }
        >
            <Head title="Personal" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">

                        {/* Botón para añadir nuevo servicio */}
                        <div className='bg-blue-100 p-4 rounded mb-4 space-x-20'>
                            <h2 className='text-2xl font-semibold mb-3'>Acciones rápidas</h2>
                            <Link href={route('personal.create')}> {/* Verificar ruta en web.php*/}
                                <button className=" hover:brightness-90 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                                style={{ backgroundColor: '#FBC02D' }}
                                type="button">Añadir Nuevo Personal
                                </button>
                            </Link>
                              <Link href={route('personal.create')}> {/* Verificar ruta en web.php*/}
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                type="button">Gestionar Grupos
                                </button>
                            </Link>
                              <Link href={route('personal.create')}> {/* Verificar ruta en web.php*/}
                                <button className="hover:brightness-90 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                style={{ backgroundColor: '#FB2E2E'}}
                                type="button">Lista de Asistencias
                                </button>
                            </Link>
                        </div>

                        {/* Buscador de clientes */}
                        <div className='bg-green-100 p-4 rounded mb-4'>
                            <h2 className='text-2xl font-semibold mb-3'>Buscar personal por ID</h2>
                            <BuscadorPersonal /> {/* Verificar ruta en web.php*/}
                        </div>

                        {/* Mostrar los clientes  */}
                        <div className="bg-gray-100 p-4 rounded mb-4">
                            <h2 className='text-2xl font-semibold mb-3'>Personal de Estación registrado</h2>
                            Aqui se muestra una tabla paginada del personal de la estación
                            <PersonalTabla personal = {personal} /> {/* Verificar ruta en web.php*/} 
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
    
}