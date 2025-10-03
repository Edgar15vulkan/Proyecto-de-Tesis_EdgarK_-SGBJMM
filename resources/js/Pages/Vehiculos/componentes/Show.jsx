/*Importaciones */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { formatearFecha } from '@/Utils/fechas';
import React from 'react';

export default function Show({vehiculo}) { // Recibe los servicios como props

     //mensajes de consola
        console.log("Vehiculos:", vehiculo); // muestra los servicios en la consola
        
    
     const { vehiculos } = usePage().props; // Obtener al personal desde las props de la página

    const listaVehiculos = vehiculos?.data || []; //Array real de vehiculos
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ver a detalle un vehiculo registrado
                </h2>
            }
        >
            <Head title="Vehiculo" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        {/* -------Mostrar DATOS PERSONALES ----- */}
                        <div className="bg-white shadow-md rounded-2xl p-4 mb-4">
                            <h1 className="text-lg font-bold text-red-600 mb-2"> DATOS DE VEHICULO:</h1>
                            <div className="grid grid-cols-2 gap-4 text-lg">
                        
                                <p><b>ID: </b> {vehiculo.id}</p>
                                <p><b>Número economico: </b> {vehiculo?.numero_economico || 'No asignado'}</p>
                                <p><b>Tipo de vehiculo: </b> {vehiculo?.tipo_vehiculo || 'No asignado'}</p>
                                <p><b>Marca: </b> {vehiculo.marca || 'No asignado'}</p>
                                <p><b>Modelo: </b> {vehiculo.modelo || 'No asignado'}</p>
                                <p><b>Placas: </b> {vehiculo.placas || 'No asignado'}</p>
                                <p><b>Estado del vehiculo: </b> {vehiculo.estado_vehiculo || 'No asignado'}</p>
                                <p><b>Año: </b> {vehiculo.anio || 'No asignado'}</p>
                                <p><b>Fecha de adquisicion: </b>{formatearFecha(vehiculo.fecha_adquisicion || 'No asignado')}</p>
                                <p><b>KM inicial :</b> {vehiculo.km_inicial  || 'No asignado'}</p>
                            </div>
                        </div>

                    
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );   
}