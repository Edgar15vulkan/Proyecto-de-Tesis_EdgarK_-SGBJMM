//importaciones 
import { useForm } from '@inertiajs/react';
import React, {useState} from 'react';

const FormNuevoDocumento = ({ onDocumentoSubido, personalId, personal}) => {



    const {data, setData, post, processing, reset, errors} = useForm({
        //campos del formulario
        documentos: {
        personal_id: personal.id,
        tipo_documento: '',
        nombre_documento: '',
        archivo: null,
        entregado: false,
        fecha_entrega: '',
    
        } //viene cargado desde la vista Detalle.jsx
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
        post(route('documentos-personal.store', data), {
            forceFormData: true,
            onSuccess: () => {
                onDocumentoSubido(); //recargar documentos desde el padre   
                reset();
                if (onDocumentoSubido) onDocumentoSubido(); //se recarga la tabla de documentos
            },
        });
    };
    
    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/*-----------Seleccionar tipo de documento ------------*/}
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
                {/* ----------Nombre del documento----------- */}
                <input 
                    type="text"
                    placeholder="Nombre del documento"
                    value={data.nombre_documento}
                    onChange={(e) => setData('nombre_documento', e.target.value)}
                    className="border p-2 rounded w-full"
                />
                {/* --------Adjuntar archivo -------------- */}
                <div >
                    <input
                        type="file"
                        onChange={(e) => setData('archivo', e.target.files[0])}
                        className="border p-2 rounded w-full"
                    />
                </div>
                {/* ----- entregado fisicamente ------ */}
                <div >
                    <label>Entregado físicamente  </label>
                    <input
                        type="checkbox"
                        checked={data.entregado}
                        onChange={(e) => setData('entregado', e.target.checked)}
                        className="mr-2"
                    />
                </div>
                {/*-----Fecha de entrega ----- */}
                <div>
                    <label>Fecha de entrega (copia fisica)</label>
                    <input
                        type="date"
                        value={data.fecha_entrega}
                        onChange={(e) => setData('fecha_entrega', e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>

            </div>
            <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={processing}
            >
                Subir Documento
            </button>
            {processing && <span className="ml-2">Procesando...</span>}
            {errors.general && <span className="text-red-500">{errors.general}</span>}
        </form>
    );
};

export default FormNuevoDocumento;

