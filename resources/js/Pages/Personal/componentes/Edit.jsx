/*Importaciones */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import React from 'react';

const Edit = ({ persona }) => {
    //
    const { data, setData, put, processing, errors } = useForm ({

        //datos personales
        nombre: persona.nombre || "",
        apellido_paterno: persona.apellido_paterno || "",
        apellido_materno: persona.apellido_materno || "",
        CURP: persona.CURP || "",
        sexo: persona.sexo || "",
        fecha_nacimiento: persona.fecha_nacimiento || "",
        lugar_nacimiento: persona.lugar_nacimiento || "", 

        //datos de servicio
        servicios: {
            fecha_ingreso: persona.servicios?.fecha_ingreso || "",
            cargo: persona.servicios?.cargo || "",
            rol: persona.servicios?.rol || "",
            estado: persona.servicios?.estado || "",
            voluntario: persona.servicios?.voluntario || "",
            zona_adscripcion: persona.servicios?.zona_adscripcion || "",
            observaciones: persona.servicios?.observaciones || "",

        }
    });

    //mensaje 
    const handleSubmit = (e) => {
        e.preventDefault();


        put(route('personal.update', persona.personal_id), {
            data,
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
                <div className="mx-auto max-w-7xl sm:px6 lg:px-8 mb-4">
                    <div className="overflow-hidden bg-white shadow-md rounded-2xl p-4 mb-4">
                        
                        <h1 className="text-lg font-bold mb-4">Editar Personal</h1>
                        <form onSubmit={handleSubmit}>
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

                            <div className="mb-4">
                                <label className="block font-semibold">Apellido paterno</label>
                                <input
                                    type="text"
                                    value={data.apellido_paterno}
                                    onChange={(e) => setData("apellido_paterno", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block font-semibold">Apellido Materno</label>
                                <input
                                    type="text"
                                    value={data.apellido_materno}
                                    onChange={(e) => setData("apellido_materno", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

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

                            <div className="mb-4">
                                <label className="block font-semibold">CURP</label>
                                <input
                                    type="text"
                                    value={data.CURP}
                                    onChange={(e) => setData("CURP", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/*---------------------- Datos de servicio ------------------*/}
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

                            {/* Cargo */}
                            <div className="mb-4">
                                <label className="block font-semibold">Cargo</label>
                                <input
                                    type="text"
                                    value={data.servicios.cargo}
                                    onChange={(e) => 
                                        setData("servicios",{
                                            ...data.servicios,
                                            cargo: e.target.value,
                                        })
                                    }
                                    className="border p-2 w-full rounded"
                                />
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
                            
                            {/* Voluntario checkbox */}
                            <div className="mb-4 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={!!data.servicios.voluntario}
                                    onChange={(e) =>
                                        setData("servicios", {
                                            ...data.servicios,
                                            voluntario: e.target.checked ? 1 : 0,
                                        })
                                    }
                                />
                                <label className="font-semibold">Voluntario</label>
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
   