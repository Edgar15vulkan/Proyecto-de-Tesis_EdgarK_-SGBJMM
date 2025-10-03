/*Importaciones */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import React from 'react';

const Edit = ({ vehiculo }) => {
    //
    const { data, setData, put, processing, errors } = useForm ({

        //datos de vehiculo
       
        numero_economico: vehiculo.numero_economico ?? "",
        tipo_vehiculo: vehiculo.tipo_vehiculo ?? "",
        marca: vehiculo.marca ?? "",
        modelo: vehiculo.modelo ?? "", 
        placas: vehiculo.placas ?? "",
        estado_vehiculo: vehiculo.estado_vehiculo ?? "",
        anio: vehiculo.anio ?? "",
        fecha_adquisicion: vehiculo.fecha_adquisicion ?? "",
        km_inicial: vehiculo.km_inicial ?? "",
    });

    //mensaje 
    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('vehiculos.update', vehiculo.id), {

            onSuccess: () => alert('Datos actualizados con éxito'),
            onError: () => alert('Error al actualizar los datos')
        });
    };

    //
    return (
        //layout 
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ver a detalle una persona del personal
                </h2>
            }
        >
            <Head title="Editar vehiculo" />
            {/* Contenedor principal */}
            <div className="py-12">
                {/* Cuerpo del formulario */}
                <div className="mx-auto max-w-4xl sm:px6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Titulo y texto encabezado del formulario */}
                        <h2 className="text-2xl font-semibold mb-3">Editar vehiculo</h2>
                        <p className="mb-4">Complete el formulario para modificar la información del vehiculo de emergencia.</p>
                        <form onSubmit={handleSubmit} className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-6'>
                            
                            <h3 className="text-xl font-semibold mt-6 mb-2">Datos generales del vehiculo</h3>
                            {/* Numero economico */}
                            <div className="mb-4">
                                <label className="block font-semibold">Número económico</label>
                                <input
                                    type="text"
                                    value={data.numero_economico}
                                    onChange={(e) => setData("numero_economico", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.numero_economico && <div className="text-red-500">{errors.numero_economico}</div>}
                            </div>

                            {/* TIPO DE VEHICULO */}
                            <div className="mb-4">
                                <label className="block font-semibold">Tipo de vehiculo</label>
                                <select
                                    value={data.tipo_vehiculo}
                                    onChange={(e) => setData("tipo_vehiculo", e.target.value)}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="Camión cisterna">Camión cisterna</option>
                                    <option value="Carro bomba">Carro bomba</option>
                                    <option value="Ambulancia de urgencias básicas">Ambulancia de urgencias básicas</option>
                                    <option value="Ambulancia de urgencias avanzadas">Ambulancia de urgencias avanzadas</option>
                                    <option value="Ambulancia de traslado">Ambulancia de traslado</option>
                                </select>
                                {errors.tipo_vehiculo && <div className="text-red-500">{errors.tipo_vehiculo}</div>}
                            </div>
                          

                            {/* MARCA */}
                            <div className="mb-4">
                                <label className="block font-semibold">Marca del vehiculo</label>
                                <input
                                    type="text"
                                    value={data.marca}
                                    onChange={(e) => setData("marca", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.marca && <div className='text-red-500'>{errors.marca}</div>}
                            </div>

                            {/* MODELO */}
                            <div className="mb-4">
                                <label className="block font-semibold">Modelo del vehiculo</label>
                                <input
                                    type="text"
                                    value={data.modelo}
                                    onChange={(e) => setData("modelo", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.modelo && <div className='text-red-500'>{errors.modelo}</div>}
                            </div>

                             {/* PLACAS */}
                            <div className="mb-4">
                                <label className="block font-semibold">Placas del vehiculo</label>
                                <input
                                    type="text"
                                    value={data.placas}
                                    onChange={(e) => setData("placas", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.placas && <div className='text-red-500'>{errors.placas}</div>}
                            </div>

                            {/* ---------- ESTADO VEHICULO --------*/}
                            <div className="mb-4">
                                <label className="block font-bold mb-1"> Estado de vehiculo:</label>
                                <select
                                    type="text"
                                    value={data.estado_vehiculo}
                                    onChange={(e) => setData('estado_vehiculo', e.target.value)}
                                    className="border rounded px-4 py-2 w-full"
                                    
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Buenas condiciones">Buenas condiciones</option>
                                    <option value="Regulares condiciones">Regulares condiciones</option>
                                    <option value="Malas condiciones">Malas condiciones</option>
                                </select>
                                {errors.estado_vehiculo && <span className="text-red-500">{errors.estado_vehiculo}</span>}
                            </div>

                            

                            {/* AÑO */}
                            <div className="mb-4">
                                <label className="block font-semibold">AÑO de fabricación</label>
                                <input
                                    type="text"
                                    value={data.anio}
                                    onChange={(e) => setData("anio", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.anio && <span className="text-red-500">{errors.anio}</span>}
                            
                            </div>

                            {/* Fecha de Adquisicion */}
                            <div className='mb-4'>    
                                <label className="block font-semibold">Fecha de adquisición:</label> 
                                <input   
                                    type="date"  
                                    value={data.fecha_adquisicion}
                                    onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                                    className="border rounded px-4 py-2 w-full"
                                />
                                {errors.fecha_adquisicion && <span className="text-red-500">{errors.fecha_adquisicion}</span>}
                            </div>

                            {/* KM INICIAL */}
                            <div className="mb-4">
                            <label className="block font-bold mb-1">Kilometraje inicial:</label>
                            <input
                                type="text"
                                value={data.km_inicial}
                                onChange={(e) => setData('km_inicial', e.target.value)}
                                className="border rounded px-4 py-2 w-full"
                                placeholder="50,000"
                            />
                            {errors.km_inicial && <span className="text-red-500">{errors.km_inicial}</span>}
                        </div>

                            
                            {/* Botonoes de enviar y cancelar el formulario */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Guardar cambios
                            </button>

                            <Link href={route("vehiculos.show", vehiculo.id)} className="ml-4 text-gray-600">
                                Cancelar
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default Edit;
                               