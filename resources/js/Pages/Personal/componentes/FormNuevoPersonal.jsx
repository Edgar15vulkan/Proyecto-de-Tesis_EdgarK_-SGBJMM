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
        correo_electronico: '',
        telefono: '',
        ciudad: '',
        colonia: '',
        calle: '',
        nombre_contacto_emergencia: '',
        parentesco_contacto_emergencia: '',
        celular_contacto_emergencia: '',
        // Datos de licencia de conducir
        licencia_conducir:'',
        tipo:'',
        licencia_numero:'',
        fecha_expedicion:'',
        fecha_vencimiento:'',
      
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
               <h3 className="text-xl font-semibold mt-6 mb-2">Datos Personales</h3>
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
                    <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={data.voluntario}
                        onChange={(e) => setData('voluntario', e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                        placeholder="Voluntario"
                    />
                    <span className="ml-2">Voluntario</span>
                    </label>
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
                <h3 className="text-xl font-semibold mt-6 mb-2">Datos de Contacto</h3>
                {/* Correo Electrónico */}  
                <div className='mb-4'>
                    <label className="block">Correo Electrónico:</label>
                    <input
                        type="email"
                        value={data.correo_electronico}
                        onChange={(e) => setData('correo_electronico', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Correo Electrónico"
                    />
                    {errors.correo_electronico && <span className="text-red-500">{errors.correo_electronico}</span>}
                </div>

                {/* Teléfono */}
                <div className='mb-4'>
                    <label className="block">Teléfono:</label>
                    <input
                        type="text"
                        value={data.telefono}
                        onChange={(e) => setData('telefono', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Teléfono"
                    />
                    {errors.telefono && <span className="text-red-500">{errors.telefono}</span>}
                </div>

                {/* Ciudad */}
                <div className='mb-4'>
                    <label className="block">Ciudad:</label>
                    <input
                        type="text"
                        value={data.ciudad}
                        onChange={(e) => setData('ciudad', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Ciudad"
                    />
                    {errors.ciudad && <span className="text-red-500">{errors.ciudad}</span>}
                </div>

                {/* Colonia */}
                <div className='mb-4'>
                    <label className="block">Colonia:</label>
                    <input
                        type="text"
                        value={data.colonia}
                        onChange={(e) => setData('colonia', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Colonia"
                    />
                    {errors.colonia && <span className="text-red-500">{errors.colonia}</span>}
                </div>

                {/* Calle */}
                <div className='mb-4'>
                    <label className="block">Calle:</label>
                    <input
                        type="text"
                        value={data.calle}
                        onChange={(e) => setData('calle', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Calle"
                    />
                    {errors.calle && <span className="text-red-500">{errors.calle}</span>}
                </div>

                {/* Nombre de Contacto de Emergencia */}
                <div className='mb-4'>
                    <label className="block">Nombre de Contacto de Emergencia:</label>
                    <input
                        type="text"
                        value={data.nombre_contacto_emergencia}
                        onChange={(e) => setData('nombre_contacto_emergencia', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Nombre de Contacto de Emergencia"
                    />
                    {errors.nombre_contacto_emergencia && <span className="text-red-500">{errors.nombre_contacto_emergencia}</span>}
                </div>

                {/* Parentesco de Contacto de Emergencia */}
                <div className='mb-4'>
                    <label className="block">Parentesco de Contacto de Emergencia:</label>
                    <input
                        type="text"
                        value={data.parentesco_contacto_emergencia}
                        onChange={(e) => setData('parentesco_contacto_emergencia', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Parentesco de Contacto de Emergencia"
                    />
                    {errors.parentesco_contacto_emergencia && <span className="text-red-500">{errors.parentesco_contacto_emergencia}</span>}
                </div>

                {/* Celular de Contacto de Emergencia */}
                <div className='mb-4'>
                    <label className="block">Celular de Contacto de Emergencia:</label>
                    <input
                        type="text"
                        value={data.celular_contacto_emergencia}
                        onChange={(e) => setData('celular_contacto_emergencia', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Celular de Contacto de Emergencia"
                    />
                    {errors.celular_contacto_emergencia && <span className="text-red-500">{errors.celular_contacto_emergencia}</span>}
                </div>

                {/* -------- DATOS DE LICENCIA DE CONDUCRI (UNO A UNO) ---------- */}
                <h3 className="text-xl font-semibold mt-6 mb-2">Datos de Licencia de Conducir</h3>
                {/*¿tiene Licencia de Conducir? */}
                <div className='mb-4'>
                    <label className="block">¿Tiene licencia de conducir? (si no tiene deje los siguientes campos vacíos ):</label>
                    <select
                        value={data.licencia_conducir}
                        onChange={(e) => setData('licencia_conducir', e.target.value === 'true')}
                        className = "border rounded px-4 py-2 w-full"
                    >
                        <option value="">Seleccione</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </select>
                    {errors.licencia_conducir && <span className="text-red-500">{errors.licencia_conducir}</span>}
                </div>       
                    
                {/* Tipo de Licencia */}
                <div className='mb-4'>
                    <label className="block">Tipo de Licencia:</label>
                    <select
                        value={data.tipo}
                        onChange={(e) => setData('tipo', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                    >
                        <option value="">Seleccione</option>
                        <option value="Tipo A">Tipo A</option>
                        <option value="Tipo B">Tipo B</option>
                        <option value="Tipo C">Tipo C</option>
                        <option value="Tipo D">Tipo D</option>
                        <option value="Tipo E">Tipo E</option>
                    </select>
                    {errors.tipo && <span className="text-red-500">{errors.tipo}</span>}
                </div>

                {/* Número de Licencia */}
                <div className='mb-4'>
                    <label className="block">Número de Licencia:</label>
                    <input
                        type="text"
                        value={data.licencia_numero}
                        onChange={(e) => setData('licencia_numero', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Número de Licencia"
                    />
                    {errors.licencia_numero && <span className="text-red-500">{errors.licencia_numero}</span>}
                </div>

                {/* Fecha de Expedición */}
                <div className='mb-4'>
                    <label className="block">Fecha de Expedición:</label>
                    <input
                        type="date"
                        value={data.fecha_expedicion}
                        onChange={(e) => setData('fecha_expedicion', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Fecha de Expedición"
                    />
                    {errors.fecha_expedicion && <span className="text-red-500">{errors  .fecha_expedicion}</span>}
                </div>

                {/* Fecha de Vencimiento */}
                <div className='mb-4'>
                    <label className="block">Fecha de Vencimiento:</label>
                    <input
                        type="date"
                        value={data.fecha_vencimiento}
                        onChange={(e) => setData('fecha_vencimiento', e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Fecha de Vencimiento"
                    />
                    {errors.fecha_vencimiento && <span className="text-red-500">{errors.fecha_vencimiento}</span>}
                </div> 




                {/* -------- BOTONES DE ACCIÓN ---------- */}
               {/* Boton de enviar */}
               <button
                   type="submit"
                   className={`bg-blue-500 text-white px-4 py-2 rounded ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                   disabled={processing}
               > Registrar Personal  {/*Texto de botón*/}
               </button>
               {processing && <span className="ml-2">Procesando...</span>}  {/*Texto de carga*/}
               {errors.general && <span className="text-red-500">{errors.general}</span>}  {/*Texto de error*/}

               {/* Enlace para volver a Personal Vista */}
               <Link href={route('personal.index')} className="ml-4">
                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                   type="button">Cancelar registro de Personal</button>
               </Link>
           </form>
       </div>
   );

}