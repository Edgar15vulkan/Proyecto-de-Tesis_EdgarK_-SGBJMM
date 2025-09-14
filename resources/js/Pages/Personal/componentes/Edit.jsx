/*Importaciones */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import React from 'react';

const Edit = ({ persona }) => {
    //
    const { data, setData, put, processing, errors } = useForm ({

        //datos personales
        nombre: persona.nombre ?? "",
        apellido_paterno: persona.apellido_paterno ?? "",
        apellido_materno: persona.apellido_materno ?? "",
        CURP: persona.CURP ?? "",
        sexo: persona.sexo ?? "",
        fecha_nacimiento: persona.fecha_nacimiento ?? "",
        lugar_nacimiento: persona.lugar_nacimiento ?? "", 

        //datos de servicio
        servicios: {
            fecha_ingreso: persona.servicios?.fecha_ingreso ?? "",
            cargo: persona.servicios?.cargo ?? "",
            rol: persona.servicios?.rol ?? "",
            estado: persona.servicios?.estado ?? "",
            zona_adscripcion: persona.servicios?.zona_adscripcion ?? "",
            observaciones: persona.servicios?.observaciones ?? "",
        },
        //datos de contacto
        contactos: {
            correo_electronico: persona.contactos?.correo_electronico ?? "",
            telefono: persona.contactos?.telefono ?? "",
            ciudad: persona.contactos?.ciudad ?? "",
            colonia: persona.contactos?.colonia ?? "",
            calle: persona.contactos?.calle ?? "",
            nombre_contacto_emergencia: persona.contactos?.nombre_contacto_emergencia ?? "",
            parentesco_contacto_emergencia: persona.contactos?.parentesco_contacto_emergencia ?? "",
            celular_contacto_emergencia: persona.contactos?.celular_contacto_emergencia ?? "",
        },

        licencias: {
            tipo: persona.licencias?.tipo ?? "",
            licencia_numero: persona.licencias?.licencia_numero ?? "",
            fecha_expedicion: persona.licencias?.fecha_expedicion ?? "",
            fecha_vencimiento: persona.licencias?.fecha_vencimiento ?? "",
        },
    });

    //mensaje 
    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('personal.update', persona.personal_id), {

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
            <Head title="Editar personal" />
            {/* Contenedor principal */}
            <div className="py-12">
                {/* Cuerpo del formulario */}
                <div className="mx-auto max-w-4xl sm:px6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Titulo y texto encabezado del formulario */}
                        <h2 className="text-2xl font-semibold mb-3">Editar Personal</h2>
                        <p className="mb-4">Complete el formulario para registrar un nuevo personal de la estación.</p>
                        <form onSubmit={handleSubmit} className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-6'>
                            
                            <h3 className="text-xl font-semibold mt-6 mb-2">Datos Personales</h3>
                            {/* NOMBRES */}
                            <div className="mb-4">
                                <label className="block font-semibold">Nombre</label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={(e) => setData("nombre", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.nombre && <div className="text-red-500">{errors.nombre}</div>}
                            </div>

                            {/* APELLIDO PATERNO */}
                            <div className="mb-4">
                                <label className="block font-semibold">Apellido paterno</label>
                                <input
                                    type="text"
                                    value={data.apellido_paterno}
                                    onChange={(e) => setData("apellido_paterno", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* APELLIDO MATERNO */}
                            <div className="mb-4">
                                <label className="block font-semibold">Apellido Materno</label>
                                <input
                                    type="text"
                                    value={data.apellido_materno}
                                    onChange={(e) => setData("apellido_materno", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* SEXO */}
                            <div className="mb-4">
                                <label className="block font-semibold">Sexo</label>
                                <select
                                
                                    value={data.sexo}
                                    onChange={(e) => setData("sexo", e.target.value)}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                 {errors.sexo && <div className="text-red-500">{errors.sexo}</div>}

                            </div>

                            {/* CURP */}
                            <div className="mb-4">
                                <label className="block font-semibold">CURP</label>
                                <input
                                    type="text"
                                    value={data.CURP}
                                    onChange={(e) => setData("CURP", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* Fecha de Nacimiento */}
                            <div className='mb-4'>    
                                <label className="block font-semibold">Fecha de Nacimiento:</label> 
                                <input   
                                    type="date"  
                                    value={data.fecha_nacimiento}
                                    onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Lugar de Nacimiento */}
                            <div className='mb-4'>    
                                <label className="block font-semibold">Lugar de Nacimiento:</label> 
                                <input   
                                    type="text"  
                                    value={data.lugar_nacimiento}
                                    onChange={(e) => setData('lugar_nacimiento', e.target.value)}
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/*---------------------- Datos de servicio ------------------*/}
                            <h3 className="text-xl font-semibold mt-6 mb-2">Datos de servicio</h3>
                            {/* Fecha de ingreso */}
                            <div className="mb-4">
                                <label className="block font-semibold">Fecha de ingreso</label>
                                <input
                                    type="date"
                                    value={data.servicios.fecha_ingreso}
                                    onChange={(e) =>
                                        setData("servicios", {
                                            ...data.servicios,
                                            fecha_ingreso: e.target.value,
                                        })
                                    }
                                    className="border p-2 w-full rounded"
                                />
                            </div>

                            {/* Cargos */}
                            <div className='mb-4'>    
                                <label className="block font-semibold">Cargo:</label> 
                                <select       
                                    value={data.servicios.cargo}
                                    onChange={(e) => 
                                        setData('servicios', {
                                            ...data.servicios,
                                            cargo: e.target.value
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"     
                                >
                                    <option value="Sin asignar">Sin asignar</option>
                                    <option value="Director">Director</option>
                                    <option value="Responsable de grupo">Responsable de grupo</option>
                                    <option value="Bombero operativo">Bombero operativo</option>
                                    <option value="Bombero paramédico">Bombero paramédico</option>
                                    <option value="Voluntario">Voluntario</option>
                                </select>
                            </div>
                            
                            {/* Rol */}
                            <div className="mb-4">
                                <label className="block font-semibold">Rol</label>
                                <input
                                    type="text"
                                    value={data.servicios.rol}
                                    onChange={(e) =>
                                        setData("servicios", {
                                            ...data.servicios,
                                            rol: e.target.value,
                                        })
                                    }
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            
                            {/* Estado */}
                            <div className="mb-4">
                                <label className="block font-semibold">Estado</label>
                                <select
                                    value={data.servicios.estado}
                                    onChange={(e) =>
                                        setData("servicios", {
                                            ...data.servicios,
                                            estado: e.target.value,
                                        })
                                    }
                                    className="border p-2 w-full rounded"
                                >
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="Retirado">Retirado</option>
                                    <option value="Suspendido">Suspendido</option>
                                    <option value="Fallecido">Fallecido</option>
                                    <option value="Comision">Comisión</option>
                                </select>
                            </div>
                            
                            {/* Zona de adscripción */}
                            <div className="mb-4">
                                <label className="block font-semibold">Zona de adscripción</label>
                                <input
                                    type="text"
                                    value={data.servicios.zona_adscripcion}
                                    onChange={(e) =>
                                        setData("servicios", {
                                            ...data.servicios,
                                            zona_adscripcion: e.target.value,
                                        })
                                    }
                                    className="border p-2 w-full rounded"
                                />
                            </div>

                            {/* Observaciones */}
                            <div className="mb-4">
                                <label className="block font-semibold">Observaciones</label>
                                <textarea
                                    value={data.servicios.observaciones}
                                    onChange={(e) =>
                                        setData("servicios", {
                                            ...data.servicios,
                                            observaciones: e.target.value,
                                        })
                                    }
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mt-6 mb-2">Datos de Contacto</h3>
                            {/*--------------- Datos de contacto -----------*/}
                            {/* --------Correo electronico---- */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Correo Electrónico:</label>
                                <input
                                    type="email"
                                    value={data.contactos.correo_electronico}
                                    onChange={(e) => 
                                        setData('contactos', {
                                            ...data.contactos,
                                            correo_electronico: e.target.value, 
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/*------- Teléfono------ */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Teléfono:</label>
                                <input
                                    type="text"
                                    value={data.contactos.telefono}
                                    onChange={(e) =>
                                        setData('contactos', {
                                            ...data.contactos,
                                            telefono: e.target.value,
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/*---- Ciudad ----- */} 
                            <div className='mb-4'>
                                <label className="block font-semibold">Ciudad:</label>
                                <input
                                    type="text"
                                    value={data.contactos.ciudad}
                                    onChange={(e) => 
                                        setData('contactos', {
                                            ...data.contactos,
                                            ciudad: e.target.value,
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Colonia */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Colonia:</label>
                                <input
                                    type="text"
                                    value={data.contactos.colonia}
                                    onChange={(e) =>
                                        setData('contactos', {
                                            ...data.contactos,
                                            colonia: e.target.value,
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Calle */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Calle:</label>
                                <input
                                    type="text"
                                    value={data.contactos.calle}
                                    onChange={(e) => 
                                        setData('contactos', {
                                            ...data.contactos,
                                            calle: e.target.value,
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Nombre de Contacto de Emergencia */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Nombre de Contacto de Emergencia:</label>
                                <input
                                    type="text"
                                    value={data.contactos.nombre_contacto_emergencia}
                                    onChange={(e) => 
                                        setData('contactos', {
                                            ...data.contactos,
                                            nombre_contacto_emergencia: e.target.value
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Parentesco de Contacto de Emergencia */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Parentesco de Contacto de Emergencia:</label>
                                <select
                                    type="text"
                                    value={data.contactos.parentesco_contacto_emergencia}
                                    onChange={(e) => 
                                        setData('contactos', {
                                            ...data.contactos,
                                            parentesco_contacto_emergencia: e.target.value
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Padre">Padre</option>
                                    <option value="Madre">Madre</option>
                                    <option value="Tutor legal">Tutor legal</option>
                                    <option value="Hermano/a">Hermano/a</option>
                                    <option value="Abuelo/a">Abuelo/a</option>
                                    <option value="Tío/a">Tío/a</option>
                                    <option value="Primo/a">Primo/a</option>
                                    <option value="Amigo/a cercano/a">Amigo/a cercano/a</option>
                                </select>
                            </div>

                            {/* Celular de Contacto de Emergencia */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Celular de Contacto de Emergencia:</label>
                                <input
                                    type="text"
                                    value={data.contactos.celular_contacto_emergencia}
                                    onChange={(e) => setData('contactos', {
                                    ...data.contactos, 
                                    celular_contacto_emergencia: e.target.value
                                    })
                                }
                                    className="border rounded px-4 py-2 w-full"

                                />
                            </div>

                            {/* -------- DATOS DE LICENCIA DE CONDUCRI (UNO A UNO) ---------- */}
                            <h3 className="text-xl font-semibold mt-6 mb-2">Datos de Licencia de Conducir</h3>
                                   
                            {/* Tipo de Licencia */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Tipo de Licencia:</label>
                                <select
                                    value={data.licencias.tipo}
                                    onChange={(e) => 
                                        setData('licencias', {
                                        ...data.licencias,
                                        tipo: e.target.value})
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Tipo A">Tipo A</option>
                                    <option value="Tipo B">Tipo B</option>
                                    <option value="Tipo C">Tipo C</option>
                                    <option value="Tipo D">Tipo D</option>
                                    <option value="Tipo E">Tipo E</option>
                                </select>
                            </div>

                            {/* Número de Licencia */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Número de Licencia:</label>
                                <input
                                    type="text"
                                    value={data.licencias.licencia_numero}
                                    onChange={(e) => 
                                        setData('licencias', {
                                        ...data.licencias,
                                        licencia_numero: e.target.value 
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Fecha de Expedición */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Fecha de Expedición:</label>
                                <input
                                    type="date"
                                    value={data.licencias.fecha_expedicion}
                                    onChange={(e) => 
                                        setData('licencias', {
                                        ...data.licencias,
                                        fecha_expedicion: e.target.value
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Fecha de Vencimiento */}
                            <div className='mb-4'>
                                <label className="block font-semibold">Fecha de Vencimiento:</label>
                                <input
                                    type="date"
                                    value={data.licencias.fecha_vencimiento}
                                    onChange={(e) => 
                                        setData('licencias', {
                                        ...data.licencias,
                                        fecha_vencimiento: e.target.value
                                        })
                                    }
                                    className="border rounded px-4 py-2 w-full"
                                />
                            </div> 

                            {/* -------- DATOS DE DOCUMENTOS PERSONALES ---------- */}
                           


                            {/* Botonoes de enviar y cancelar el formulario */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Guardar cambios
                            </button>

                            <Link href={route("personal.show", persona.personal_id)} className="ml-4 text-gray-600">
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
   