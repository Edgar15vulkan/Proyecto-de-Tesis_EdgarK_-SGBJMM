//importaciones 
import { useForm, Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const FormNuevoDocumento = ({ onDocumentoSubido, personalId, personas }) => {
    const {data, setData, post, processing, reset, errors} = useForm({
        tipo_documento: "",
        nombre_documento: "",
        archivo: null,
        personal_id: personalId,
    });

    const opcionesTipoDocumento = [
        'Acta de Nacimiento',
        'INE',
        'CURP',
        'RFC',
        'Comprobante de domicilio',
        'Certificado de estudios',
        'Carta de antecedentes no penales',
        'Licencia de conducir',
        'Pasaporte',
        'Certificado médico',
        'Otros',
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('documentos-personal.store'), {
            forceFormData: true,
            onSuccess: () => {
                onDocumentoSubido(); //recargar documentos desde el padre
                reset();
            },
        });
    };

    const {personas} = usePage().props;
    

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/*Seleccionar persona a la que pertenece el documento */}
                <select 
                    value={data.personal_id}
                    onChange={(e) => setData('personal_id', e.target.value)}
                >
                    {personas.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nombre}
                        </option>
                    ))}
                </select>
                


                {/*Seleccionar tipo de documento */}
                <select
                    value={data.tipo_documento}
                    onChange={(e) => setData('tipo_documento', e.target.value)}
                    className= "border rounded px-2 py-1 w-full"
                >
                    <option value="">Seleccione tipo de documento...</option>
                    {opcionesTipoDocumento.map((tipo, i) => (
                        <option key={i} value={tipo}>
                            {tipo}
                        </option>
                    ))}
                </select>

                <input 
                    type="text"
                    placeholder="Nombre del documento"
                    value={data.nombre_documento}
                    onChange={(e) => setData('nombre_documento', e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="file"
                    onChange={(e) => setData('archivo', e.target.files[0])}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button
                type="submit"
                disabled={processing}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"

            >
                Subir
            </button>
        </form>
        
    );
};

export default FormNuevoDocumento;

