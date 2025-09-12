import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';


export default function GuestLayout({ children }) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-red-900 p-6'>
            {/* --------Logo y titulo -----*/}
            <div className='mb-6 text-center'>

                {/*----------Logo de bomberos jmm ---------- */}
                <img
                    src="/storage/image/logo_bomberos.jpg"
                    alt="logo bomberos"
                    className="w-40 h-48 mx-auto mb-4  border-4 border-red-600 shadow-lg"
                />

                {/* ---------- TITULOS Y TEXTO ----------- */}
                <h1 className='text-2xl font-bold text-red-500'> Sistema de Gestión Integral del Cuerpo de Bomberos de José Maria Morelos</h1>
                <p className='text-gray-300 italic'> Siempre listos para servir </p>
            </div>

            {/*----------CONTENEDOR DEL CONTENIDO -------- */}
            <div className="w-full max-w-md bg-black/70 p-6 rounded-2xl shadow-lg border border-red-700">
                {children}
            </div>
        </div>
    );
}
