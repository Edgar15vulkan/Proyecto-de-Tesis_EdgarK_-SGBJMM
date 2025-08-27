/*Importaciones */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import PersonalTabla         from './componentes/TablaPersonal'; // Importar el componente Index de Clientes/Index.jsx
import BuscadorPersonal      from './componentes/BuscadorPersonal'; // Importar el componente BuscadorCliente de Clientes/BuscadorCliente.jsx
import React from 'react';

export default function Index({personal}) { // Recibe al personal como props

     //mensajes de consola
        console.log("Personal:", personal); // muestra al personal en la consola

        {/* ------------- Encabezado de la pagina ---------------- */}
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800"> {/* Color del texto */}
                    Lista del personal registrado
                </h2>
            }
        >
            <Head title="Personal" />

            <div className="py-5    ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                     {/*Bordes del contenido principal */}

                        {/*----------- Botón para añadir nuevo servicio -----------------
                        <div className='bg-gray-100 p-4 rounded mb-4 space-x-20'>
                            {/*<h2 className='text-2xl font-semibold mb-3'>Acciones rápidas</h2>
                            <Link href={route('personal.create')}> {/* Verificar ruta en web.php
                                <button className=" hover:brightness-90 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                                style={{ backgroundColor: '#FBC02D' }}
                                type="button">Añadir Nuevo Personal
                                </button>
                            </Link>  
                            {/* ------------- Gestionar grupos -------------------------------
                            <Link href={route('personal.create')}> {/* Verificar ruta en web.php
                                <button className="hover:brightness-90 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                                style={{ backgroundColor: '#FBC02D'}}
                                type="button">Gestionar Grupos
                                </button>
                            </Link>

                           {/* ------------------- Lista de asistencias ------------------------ 
                           <Link href={route('personal.create')}> {/* Verificar ruta en web.php*
                                <button className="hover:brightness-90 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                                style={{ backgroundColor: '#FBC02D'}}
                                type="button">Lista de Asistencias
                                </button>
                            </Link>
                            */}

                            {/* -----------------------Gestionar documentos ------------------ 
                            <Link href={route('documentos-personal.store')}>
                                <button className="hover:brightness-90 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                                style={{ backgroundColor: '#FBC02D'}}
                                type='button'>Gestionar documentos
                                </button>
                            </Link>

                            

                        </div> */}

                        {/*---------- Buscador de personal por ID ----------*/}
                        <div className='bg-gray-100 p-4 rounded mb-4'>
                            <h2 className='text-2xl font-semibold mb-4'>Buscar personal por ID</h2>
                            <BuscadorPersonal /> {/* Verificar ruta en web.php*/}
                        </div>

                        {/*------------ Mostrar el personal registrado en una tabla ------------ */}
                        <div className="bg-gray-100 p-4 rounded mb-4">
                            <h2 className='text-2xl font-semibold mb-3'>Personal de Estación registrado</h2>
                            Aqui se muestra una tabla paginada del personal de la estación
                            <PersonalTabla personal = {personal} /> {/* Verificar ruta en web.php*/} 
                        </div>

                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
    
}