/*Importaciones */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { formatearFecha } from '@/Utils/fechas';
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
                        <div className="bg-white shadow-md rounded-2xl p-4 mb-4">
                            <h1 className="text-lg font-bold text-red-600 mb-2"> DATOS PERSONALES:</h1>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <p><b>Personal ID:</b> {persona.personal_id}</p>
                                <p><b>Nombre(s):</b> {persona.nombre}</p>
                                <p><b>Apellidos</b> {persona.apellido_paterno} {persona.apellido_materno}</p>
                                <p><b>Sexo:</b> {persona.sexo}</p>
                                <p><b>CURP:</b> {persona.CURP}</p>
                                <p><b>Fecha de nacimiento:</b>{formatearFecha(persona.fecha_nacimiento)}</p>
                                <p><b>Lugar de nacimiento:</b> {persona.lugar_nacimiento}</p>
                            </div>
                        </div>

                        {/* -------Mostrar DATOS DE SERVICIO ----- */}
                        <div  className="bg-white shadow-md rounded-2xl p-4 mb-4">
                            <h1 className="text-lg font-bold text-red-600 mb-2"> DATOS DE SERVICIO:</h1>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {persona.servicios ? (
                                    <div>
                                        <p><b>Fecha de ingreso: </b>{formatearFecha(persona.servicios.fecha_ingreso)}</p>
                                        <p><b>Cargo: </b>{persona.servicios.cargo || 'N/A'}</p>
                                        <p><b>Rol: </b>{persona.servicios.rol || 'N/A'}</p>
                                        <p><b>Voluntario: </b>{persona.servicios.voluntario ? 'Sí' : 'No'}</p>
                                        <p><b>Estado: </b>{persona.servicios.estado || 'N/A'}</p>
                                        <p><b>Zona de adscripción: </b>{persona.servicios.zona_adscripcion || 'N/A'}</p>
                                        <p className="col-span-2"><b>Observaciones: </b>{persona.servicios.observaciones || 'N/A'}</p>
                                    </div>
                                ) : (
                                    <p>No hay datos registrados</p>
                                )}
                            </div>
                        </div>

                        {/* -------Mostrar DATOS DE CONTACTOS ----- */}
                       <div  className="bg-white shadow-md rounded-2xl p-4 mb-4">
                            <h1 className="text-lg font-bold text-red-600 mb-2"> DATOS DE CONTACTO:</h1>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {/* Mapear los datos de servicio que son un Array */}
                                {persona.contactos ? (
                                    <div className="">
                                        <p><b>Correo electrónico: </b>{persona.contactos.correo_electronico || 'N/A'}</p>
                                        <p><b>Telefono: </b>{persona.contactos.telefono || 'N/A'}</p>
                                        <p><b>Ciudad: </b>{persona.contactos.ciudad || 'N/A'}</p>
                                        <p><b>Colonia: </b>{persona.contactos.colonia || 'N/A'}</p>
                                        <p><b>calle: </b>{persona.contactos.calle || 'N/A'}</p>
                                        <h2 className="text-xl font-bold "> Contacto de emergencia:</h2>
                                        <p><b>Nombre: </b>{persona.contactos.nombre_contacto_emergencia || 'N/A'}</p>
                                        <p><b>Parentesco: </b>{persona.contactos.parentesco_contacto_emergencia || 'N/A'}</p>
                                        <p><b>Telefono: </b>{persona.contactos.celular_contacto_emergencia || 'N/A'}</p>
                                
                                    </div>
                                ) : (
                                    <p>No hay datos registrados</p>
                                )}
                            </div>
                        </div>

                        {/* -------Mostrar DATOS DE LICENCIAS ----- */}
                       <div  className="bg-white shadow-md rounded-2xl p-4 mb-4">
                            <h1 className="text-lg font-bold text-red-600 mb-2"> LICENCIA DE CONDUCIR:</h1>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {persona.licencias ? (
                                    <div className="">
                                        <p><b>¿Tiene licencia de conducir?: </b>{persona.licencias.licencia_conducir || 'N/A'}</p>
                                        <p><b>Tipo de licencia: </b>{persona.licencias.tipo || 'N/A'}</p>
                                        <p><b>Número de licencia: </b>{persona.licencias.licencia_numero || 'N/A'}</p>
                                        <p><b>Fecha de expedición: </b>{formatearFecha(persona.licencias.fecha_expedicion)}</p>
                                        <p><b>Fecha de Vencimiento: </b>{formatearFecha(persona.licencias.fecha_vencimiento)}</p>
                                    
                                    </div>
                                ) : (
                                    <p>No hay datos registrados</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );   
}