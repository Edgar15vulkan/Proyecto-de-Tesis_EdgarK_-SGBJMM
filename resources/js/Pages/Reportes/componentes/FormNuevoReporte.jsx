import { useForm , Link, router} from '@inertiajs/react';
import React from 'react';

export default function Create({ onReporteSubido, personalId, personal, reportes }) {

    const { data, setData, post, processing, reset, errors } = useForm({
        personal_id: personalId ?? "",
        titulo: '',
        fecha: '',
        grupo: '',
        descripcion: '',
        archivo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reportes.store'), {
            forceFormData: true, // necesario para enviar archivos
            onSuccess: () => {
                reset();
                if (onReporteSubido) onReporteSubido(); // actualiza la tabla de reportes 
                router.visit(route('reportes.index'))
            },
        });
    };

    return (
        <div className='container mx-auto p-4'>
            <form onSubmit={handleSubmit} className="bg-white p-1 rounded shadow-md">

                {/* ----------- Autor ----------- */}
                {!personalId &&(
                    <div className="mb-4">
                        <label className="block font-bold mb-1">Autor del reporte:</label>
                        <select
                            value={data.personal_id}
                            onChange={(e) => setData('personal_id', e.target.value)}
                            className="border rounded px-4 py-2 w-full"
                        >
                            <option value="">Selecciona un autor</option>
                            {personal?.map((p) => (
                                <option key={p.personal_id} value={p.personal_id}>
                                    {p.nombre} {p.apellido_paterno} {p.apellido_materno}
                                </option>
                            ))}
                        </select>
                        {errors.personal_id && <span className="text-red-500">{errors.personal_id}</span>}
                    </div>      
                )}

                {/* ----------Titulo del documento --------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Titulo del documento:</label>
                    <input
                        type="text"
                        value={data.titulo || ""}
                        onChange={(e) => setData('titulo', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Titulo del documento"
                    />
                    {errors.titulo && <span className="text-red-500">{errors.titulo}</span>}
                </div>

                  {/* ---------- descripcion --------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1"> Descripcion del reporte:</label>
                    <input
                        type="text"
                        value={data.descripcion || ""}
                        onChange={(e) => setData('descripcion', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Descripción del documento"
                    />
                    {errors.descripcion && <span className="text-red-500">{errors.descripcion}</span>}
                </div>

                {/*----------- Fecha de entrega ---------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Fecha del reporte:</label>
                    <input
                        type="date"
                        value={data.fecha}
                        onChange={(e) => setData('fecha', e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    {errors.fecha && <span className="text-red-500">{errors.fecha}</span>}
                </div>

                {/*-------- Archivo------------ */}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Adjuntar archivo (PDF, DOCX, JPG, PNG):</label>
                    <input
                        type="file"
                        onChange={(e) => setData('archivo', e.target.files[0])}
                        className="border p-2 rounded w-full"
                    />
                    {errors.archivo && <span className="text-red-500">{errors.archivo}</span>}
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
               <Link href={route('reportes.index')} className="ml-4">
                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                   type="button">Cancelar registro</button>
               </Link>

            </form>
        </div>
    );
}