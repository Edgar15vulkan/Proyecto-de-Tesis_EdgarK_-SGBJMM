/*Importaciones */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import React from 'react';

export default function Show({persona}) { // Recibe los servicios como props

     //mensajes de consola
        console.log("Personal:", persona); // muestra los servicios en la consola
        
    
     const { personal } = usePage().props; // Obtener al personal desde las props de la página

    const listaPersonal = personal?.data || []; //Array real de personal
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ver a detalle una persona del personal
                </h2>
            }
        >
            <Head title="Personal" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        {/* -------Mostrar DATOS PERSONALES ----- */}
                        <div className="mt-5 ">
                            <h1 className="text-xl font-bold"> DATOS PERSONALES:</h1>
                            <p></p>
                            <p><b>Personal ID:</b> {persona.personal_id}</p>
                            <p><b>Nombre(s):</b> {persona.nombre}</p>
                            <p><b>Apellidos</b> {persona.apellido_paterno} {persona.apellido_materno}</p>
                            <p><b>Sexo:</b> {persona.sexo}</p>
                            <p><b>CURP:</b> {persona.CURP}</p>
                            <p><b>Fecha de nacimiento:</b>{persona.fecha_nacimiento}</p>
                            <p><b>Lugar de nacimiento:</b> {persona.lugar_nacimiento}</p>
                        </div>
                        {/* -------Mostrar DATOS DE SERVICIO ----- */}
                       <div  className="mt-5">
                            <h1 className="text-xl font-bold"> DATOS DE SERVICIO:</h1>
                            {/* Mapear los datos de servicio que son un Array */}
                            {persona.servicios ? (
                                <div className="mb-3 border-b border-gray-200 pb-2">
                                    <p><b>Fecha de ingreso: </b>{persona.servicios.fecha_ingreso || 'N/A'}</p>
                                    <p><b>Cargo: </b>{persona.servicios.cargo || 'N/A'}</p>
                                    <p><b>Rol: </b>{persona.servicios.rol || 'N/A'}</p>
                                    <p><b>Voluntario: </b>{persona.servicios.voluntario || 'N/A'}</p>
                                    <p><b>Estado: </b>{persona.servicios.estado || 'N/A'}</p>
                                    <p><b>Zona de adscripción: </b>{persona.servicios.zona_adscripcion || 'N/A'}</p>
                                    <p><b>Observaciones: </b>{persona.servicios.observaciones || 'N/A'}</p>

                                </div>
                            ) : (
                                <p>No hay datos registrados</p>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );   
}