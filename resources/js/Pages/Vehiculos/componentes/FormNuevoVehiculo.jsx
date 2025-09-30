import { useForm , Link, router} from '@inertiajs/react';
import React from 'react';

export default function Create({ onVehiculoSubido, personalId, personal, vehiculos }) {

    const { data, setData, post, processing, reset, errors } = useForm({
        personal_id: personalId ?? "",
        numero_economico: '',
        tipo_vehiculo: '',
        marca: '',
        modelo: '',
        placas: '',
        estado_vehiculo: '',
        anio: '',
        fecha_adquisicion:'',
        km_inicial: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('vehiculos.store'), {
            forceFormData: true, // necesario para enviar archivos
            onSuccess: () => {
                reset();
                if (onVehiculoSubido) onVehiculoSubido(); // actualiza la tabla de reportes 
                router.visit(route('vehiculos.index'))
            },
        });
    };

    return (
        <div className='container mx-auto p-4'>
            <form onSubmit={handleSubmit} className="bg-white p-1 rounded shadow-md">

                {/* -----------  ----------- */}
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

                {/* ----------Numero economico --------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Número econímico:</label>
                    <input
                        type="text"
                        value={data.numero_economico || ""}
                        onChange={(e) => setData('numero_economico', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Ej. M-01"
                    />
                    {errors.numero_economico && <span className="text-red-500">{errors.numero_economico}</span>}
                </div>

                {/* ---------- TIPO VEHICULO --------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1"> Tipo de vehiculo:</label>
                    <select
                        type="text"
                        value={data.tipo_vehiculo}
                        onChange={(e) => setData('tipo_vehiculo', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        
                    >
                        <option value="">Seleccione</option>
                        <option value="Camión cisterna">Camión cisterna</option>
                        <option value="Carro bomba">Carro bomba</option>
                        <option value="Ambulancia de urgencias básicas">Ambulancia de urgencias básicas</option>
                        <option value="Ambulancia de urgencias avanzadas">Ambulancia de urgencias avanzadas</option>
                        <option value="Ambulancia de traslado">Ambulancia de traslado</option>


                    </select>
                    {errors.tipo_vehiculo && <span className="text-red-500">{errors.tipo_vehiculo}</span>}
                </div>

                {/* ---------- MARCA --------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Marca:</label>
                    <input
                        type="text"
                        value={data.marca || ""}
                        onChange={(e) => setData('marca', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Internacional"
                    />
                    {errors.marca && <span className="text-red-500">{errors.marca}</span>}
                </div>

                {/* ---------- MODELO --------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Modelo:</label>
                    <input
                        type="text"
                        value={data.modelo || ""}
                        onChange={(e) => setData('modelo', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="ABC"
                    />
                    {errors.modelo && <span className="text-red-500">{errors.modelo}</span>}
                </div>

                {/* ---------- PLACAS --------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Placas:</label>
                    <input
                        type="text"
                        value={data.placas || ""}
                        onChange={(e) => setData('placas', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="UXY-23I"
                    />
                    {errors.placas && <span className="text-red-500">{errors.placas}</span>}
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
                
                {/* ---------- AÑO --------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Año:</label>
                    <input
                        type="text"
                        value={data.anio || ""}
                        onChange={(e) => setData('anio', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="2015"
                    />
                    {errors.anio && <span className="text-red-500">{errors.anio}</span>}
                </div>

                {/*----------- FECHA DE ADQUISICION ---------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Fecha de adquisición:</label>
                    <input
                        type="date"
                        value={data.fecha_adquisicion}
                        onChange={(e) => setData('fecha_adquisicion', e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    {errors.fecha_adquisicion && <span className="text-red-500">{errors.fecha_adquisicion}</span>}
                </div>

                {/* ---------- KM INICIAL --------*/}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Kilometraje inicial:</label>
                    <input
                        type="text"
                        value={data.km_inicial || ""}
                        onChange={(e) => setData('km_inicial', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="50,000"
                    />
                    {errors.km_inicial && <span className="text-red-500">{errors.km_inicial}</span>}
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
               <Link href={route('vehiculos.index')} className="ml-4">
                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                   type="button">Cancelar registro</button>
               </Link>

            </form>
        </div>
    );
}