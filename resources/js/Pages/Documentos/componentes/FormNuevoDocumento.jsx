//importaciones 
import { useForm, Link } from '@inertiajs/react';
import React, {useState} from 'react';

const FormNuevoDocumento = ({ onDocumentoSubido, personalId, personal}) => {



    const {data, setData, post, processing, reset, errors} = useForm({
        //campos del formulario
        personal_id: personal.id,
        tipo_documento: '',
        nombre_documento: '',
        archivo: null,
        entregado: false,
        fecha_entrega: '',
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
        /* ---------Contenedor del formulario-------  */
        <div className='container mx-auto p-4'>
               {/*Titulo del formulario */}
            <h2 className="text-2xl font-bold mb-4">Cargar un nuevo documento al sistema</h2>
               {/*--------Cuerpo del Formulario para cargar un nuevo documento------ */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                {/*---Inputs del formulario ----- */}

                    {/* ----------Tipo de documento ----------- */} 
                    <div className="mb-4" >
                        <label className="block font-bold">Tipo de documento</label>
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
                        {errors.tipo_documento && <span className="text-red-500">{errors.tipo_documento}</span>}
                    </div>

                    {/* ----------Nombre del documento----------- */}
                    <div className="mb-4">
                        <label className="block font-bold"> Nombre del documento:</label>
                        <input 
                            type="text"
                            value={data.nombre_documento || ""}
                            onChange={(e) => setData('nombre_documento', e.target.value)}
                            className="border rounded px-4 py-2 w-full"
                            placeholder="TIPO_nombre de la persona"  
                        />
                        {errors.nombre_documento && <span className="text-red-500">{errors.nombre_documento}</span>}
                    </div>

                    {/* --------Adjuntar archivo -------------- */}
                    <div className="mb-4" >
                        <label className="block font-bold">Adjuntar archivo (PDF, DOCX)</label>
                        <input
                            type="file"
                            onChange={(e) => setData('archivo', e.target.files[0])}
                            className="border p-2 rounded w-full"
                        />
                         {errors.archivo && <span className="text-red-500">{errors.archivo}</span>}
                    </div>
                    {/* ----- entregado fisicamente ------ */}
                    <div className="mb-4" >
                        <label className="block font-bold"> Entrega de copia fisica: </label>
                        <input
                            type="checkbox"
                            checked={data.entregado}
                            onChange={(e) => setData('entregado', e.target.checked)}
                            className="mr-2"
                        />
                        {errors.entregado && <span className="text-red-500">{errors.entregado}</span>}
                    </div>
                    {/*-----Fecha de entrega ----- */}
                    <div className="mb-4">
                        <label className="block font-bold"> Fecha de entrega (copia fisica):</label>
                        <input
                            type="date"
                            value={data.fecha_entrega}
                            onChange={(e) => setData('fecha_entrega', e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                        {errors.fecha_entrega && <span className="text-red-500">{errors.fecha_entrega}</span>}
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
        </div>
    );
};

export default FormNuevoDocumento;

