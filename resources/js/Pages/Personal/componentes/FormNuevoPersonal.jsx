/*Importaciones */
import {useForm, Link} from '@inertiajs/react';

/*Uso de use form */
export default function Create() {
    const { data, setData, post, processing, errors} = useForm({  /* datos, mod de datos, envio, procesamiento y errores */
        /* variables que maneja del formulario */

        //Datos personales
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        sexo: '',
        CURP: '',
        fecha_nacimiento: '',
        lugar_nacimiento: '',
        // Datos de servicio
        fecha_ingreso: '',
        cargo: '',
        rol: '',
        estado: '',
        voluntario: false,
        zona_adscripcion: '',
        observaciones: '',
        // Datos de contacto
      
        //nuevo: '',   nueva variable
    });
    /* funcion para manejar el cambio de los inputs */
    const handleSubmit = (e) => {             /* funcion para enviar el formulario */
        e.preventDefault();                  /* previene el comportamiento por defecto del formulario y evita que la pagina se sobrecargue*/
        post('/personal', data);               /* envia los datos al servidor -backend    -revisar ruta en c de error*/
    };
    return (
        /*contenedor para el formulario*/ 
       <div className='container mx-auto p-4'>
           <h2 className='text-2xl fornt-bold mb-4 '>Registrar Nuevo Elemento del Personal</h2> {/*titulo del formulario*/}
           <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>  {/* define el formulario y usa onsubmit para el envio */}
               {/*inputs del formulario*/} 
               {/* -------- DATOS PERSONALES ---------- */}
               <h3 className="text-xl font-semibold mt-6 mb-2">Datos de Servicio</h3>
               {/* Nombres de la persona */}
               <div className='mb-4'>    
                   <label className="block">Nombre(s):</label>   {/*etiqueta para el campo de texto, block hace que label ocupe toda la linea con el input debajo*/} 
                   <input   
                       type="text"  
                       value={data.nombre}
                       onChange={(e) => setData('nombre', e.target.value)}
                       className="border rounded px-4 py-2 w-full"
                       placeholder="Nombre(s)" 
                   />
                   {errors.nombre && <span className="text-red-500">{errors.nombre}</span>}
               </div>
                {/* Apellido Paterno */}
                <div className='mb-4'>    
                     <label className="block">Apellido Paterno:</label> 
                     <input   
                          type="text"  
                          value={data.apellido_paterno}
                          onChange={(e) => setData('apellido_paterno', e.target.value)}
                          className="border rounded px-4 py-2 w-full"
                          placeholder="Apellido Paterno" 
                     />
                     {errors.apellido_paterno && <span className="text-red-500">{errors.apellido_paterno}</span>}
                </div>
                {/* Apellido Materno */}
                <div className='mb-4'>    
                     <label className="block">Apellido Materno:</label> 
                     <input   
                          type="text"  
                          value={data.apellido_materno}
                          onChange={(e) => setData('apellido_materno', e.target.value)}
                          className="border rounded px-4 py-2 w-full"
                          placeholder="Apellido Materno" 
                     />
                     {errors.apellido_materno && <span className="text-red-500">{errors.apellido_materno}</span>}
                </div>
                {/* Sexo */}
                <div className='mb-4'>    
                    <label className="block">Sexo:</label> 
                    <select
                            value={data.sexo}
                            onChange={(e) => setData('sexo', e.target.value)}
                            className="border rounded px-4 py-2 w-full"
                    >
                        <option value="">Seleccione</option> {/*opcion por defecto*/}
                        <option value="Masculino">Masculino</option> {/*opcion masculino*/}
                        <option value="Femenino">Femenino</option> {/*opcion femenino*/}
                        <option value="Otro">Otro</option> {/*opcion otro*/}
                     </select>
                     {errors.sexo && <span className="text-red-500">{errors.sexo}</span>}
                </div>
                {/* CURP */}
                <div className='mb-4'>    
                    <label className="block">CURP:</label> 
                    <input   
                        type="text"  
                        value={data.CURP}
                        onChange={(e) => setData('CURP', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="CURP" 
                     />
                     {errors.CURP && <span className="text-red-500">{errors.CURP}</span>}
                </div>
                {/* Fecha de Nacimiento */}
                <div className='mb-4'>    
                     <label className="block">Fecha de Nacimiento:</label> 
                     <input   
                          type="date"  
                          value={data.fecha_nacimiento}
                          onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                          className="border rounded px-4 py-2 w-full"
                          placeholder="Fecha de Nacimiento" 
                     />
                     {errors.fecha_nacimiento && <span className="text-red-500">{errors.fecha_nacimiento}</span>}
                </div>
                {/* Lugar de Nacimiento */}
                <div className='mb-4'>    
                     <label className="block">Lugar de Nacimiento:</label> 
                     <input   
                          type="text"  
                          value={data.lugar_nacimiento}
                          onChange={(e) => setData('lugar_nacimiento', e.target.value)}
                          className="border rounded px-4 py-2 w-full"
                          placeholder="Lugar de Nacimiento" 
                     />
                     {errors.lugar_nacimiento && <span className="text-red-500">{errors.lugar_nacimiento}</span>}
                </div>
                {/* -------- DATOS DE SERVICIO ---------- */}
                <h3 className="text-xl font-semibold mt-6 mb-2">Datos de Servicio</h3>

                {/* Fecha de Ingreso */}
                <div className='mb-4'>    
                     <label className="block">Fecha de Ingreso:</label> 
                     <input   
                          type="date"  
                          value={data.fecha_ingreso}
                          onChange={(e) => setData('fecha_ingreso', e.target.value)}
                          className="border rounded px-4 py-2 w-full"
                          placeholder="Fecha de Ingreso" 
                     />
                     {errors.fecha_ingreso && <span className="text-red-500">{errors.fecha_ingreso}</span>}
                </div>
                {/* Cargo */}
                <div className='mb-4'>    
                     <label className="block">Cargo:</label> 
                     <input   
                          type="text"  
                          value={data.cargo}
                          onChange={(e) => setData('cargo', e.target.value)}
                          className="border rounded px-4 py-2 w-full"
                          placeholder="Cargo" 
                     />
                     {errors.cargo && <span className="text-red-500">{errors.cargo}</span>}
                </div>
                {/* Rol */}
                <div className='mb-4'>
                    <label className="block">Rol:</label>
                    <input
                        type="text"
                        value={data.rol}
                        onChange={(e) => setData('rol', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Rol"
                    />
                    {errors.rol && <span className="text-red-500">{errors.rol}</span>}
                </div>
                {/* Estado */}
                <div className='mb-4'>
                    <label className="block">Estado:</label>
                    <select
                        value={data.estado}
                        onChange={(e) => setData('estado', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                    >
                        <option value="">Seleccione</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="Retirado">Retirado</option>
                        <option value="Suspendido">Suspendido</option>
                        <option value="Fallecido">Fallecido</option>
                        <option value="Comision">Comisión</option>
                    </select>
                    {errors.estado && <span className="text-red-500">{errors.estado}</span>}
                </div>
                {/* Voluntario */}
                <div className='mb-4'>
                    <label className="block">Voluntario:</label>
                    <input
                        type="checkbox"
                        checked={data.voluntario}
                        onChange={(e) => setData('voluntario', e.target.checked)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Voluntario"
                    />
                    {errors.voluntario && <span className="text-red-500">{errors.voluntario}</span>}
                </div>
                {/* Zona de Adscripción */}
                <div className='mb-4'>
                    <label className="block">Zona de Adscripción:</label>
                    <input
                        type="text"
                        value={data.zona_adscripcion}
                        onChange={(e) => setData('zona_adscripcion', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Zona de Adscripción"
                    />
                    {errors.zona_adscripcion && <span className="text-red-500">{errors.zona_adscripcion}</span>}    
                </div>
                {/* Observaciones */}
                <div className='mb-4'>
                    <label className="block">Observaciones:</label>
                    <textarea
                        value={data.observaciones}
                        onChange={(e) => setData('observaciones', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Observaciones"
                    />
                    {errors.observaciones && <span className="text-red-500">{errors.observaciones}</span>}
                </div>

                {/* -------- DATOS DE CONTACTO ---------- */}
               
               {/* Boton de enviar */}
               <button
                   type="submit"
                   className={`bg-blue-500 text-white px-4 py-2 rounded ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                   disabled={processing}
               > Registrar Personal  {/*Texto de botón*/}
               </button>
               {processing && <span className="ml-2">Procesando...</span>}  {/*Texto de carga*/}
               {errors.general && <span className="text-red-500">{errors.general}</span>}  {/*Texto de error*/}

               {/* Enlace para volver a la lista de ventas */}
               <Link href={route('personal.index')} className="ml-4">
                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                   type="button">Cancelar registro de Personal</button>
               </Link>
           </form>
       </div>
   );

}