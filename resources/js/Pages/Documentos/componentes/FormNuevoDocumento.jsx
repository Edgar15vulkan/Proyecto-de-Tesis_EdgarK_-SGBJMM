import { useForm , Link} from '@inertiajs/react';
import React from 'react';

export default function Create({ onDocumentoSubido, personalId, personales }) {

    const { data, setData, post, processing, reset, errors } = useForm({
        personal_id: personalId ?? "",
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
        post(route('documentos-personal.store'), {
            forceFormData: true, // necesario para enviar archivos
            onSuccess: () => {
                reset();
                if (onDocumentoSubido) onDocumentoSubido(); // actualiza la tabla de documentos
            },
        });
    };

    return (
        <div className='container mx-auto p-4'>
            <h2 className="text-2xl font-bold mb-4">Cargar un nuevo documento</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">

                {/* Selector de personal solo si no hay personalId */}
                {!personalId && (
                    <div className="mb-4">
                        <label className="block font-bold mb-1">Selecciona un personal:</label>
                        <select
                            value={data.personal_id}
                            onChange={(e) => setData('personal_id', e.target.value)}
                            required
                            className="border rounded px-2 py-1 w-full"
                        >
                            <option value="">-- Selecciona un personal --</option>
                            {personales.map(p => (
                                <option key={p.personal_id} value={p.personal_id}>
                                    {p.nombre} {p.apellido_paterno} {p.apellido_materno}
                                </option>
                            ))}
                        </select>
                        {errors.personal_id && <span className="text-red-500">{errors.personal_id}</span>}
                    </div>
                )}

                {/* Tipo de documento */}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Tipo de documento:</label>
                    <select
                        value={data.tipo_documento}
                        onChange={(e) => setData('tipo_documento', e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">Seleccione tipo de documento...</option>
                        {opcionesTipoDocumento.map((tipo, i) => (
                            <option key={i} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                    {errors.tipo_documento && <span className="text-red-500">{errors.tipo_documento}</span>}
                </div>

                {/* Nombre del documento */}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Nombre del documento:</label>
                    <input
                        type="text"
                        value={data.nombre_documento || ""}
                        onChange={(e) => setData('nombre_documento', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Nombre del documento"
                    />
                    {errors.nombre_documento && <span className="text-red-500">{errors.nombre_documento}</span>}
                </div>

                {/* Archivo */}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Adjuntar archivo (PDF, DOCX, JPG, PNG):</label>
                    <input
                        type="file"
                        onChange={(e) => setData('archivo', e.target.files[0])}
                        className="border p-2 rounded w-full"
                    />
                    {errors.archivo && <span className="text-red-500">{errors.archivo}</span>}
                </div>

                {/* Entregado físicamente */}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Entrega de copia física:</label>
                    <input
                        type="checkbox"
                        checked={data.entregado}
                        onChange={(e) => setData('entregado', e.target.checked)}
                        className="mr-2"
                    />
                    {errors.entregado && <span className="text-red-500">{errors.entregado}</span>}
                </div>

                {/* Fecha de entrega */}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Fecha de entrega (copia física):</label>
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

                 {/* Enlace para volver a Personal Vista */}
               <Link href={route('documentos-personal.index')} className="ml-4">
                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                   type="button">Cancelar nuevo documento</button>
               </Link>

            </form>
        </div>
    );
}
