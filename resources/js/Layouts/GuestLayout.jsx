import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
// ---importar logo de bomberos---   import logo from '@assets/images/logo-bomberos.png';

export default function GuestLayout({ children }) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-red-900 p-6'>
            {/* --------Logo y titulo -----*/}
            <div className='mb-6 text-center'>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
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
