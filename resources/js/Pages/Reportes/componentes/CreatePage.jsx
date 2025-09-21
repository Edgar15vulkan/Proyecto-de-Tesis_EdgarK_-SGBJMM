import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importa el layout autenticado
import { Head, usePage, Link, router } from '@inertiajs/react'; // Importa funciones de Inertia.js
import Create from './FormNuevoReporte.jsx'; // Importa el componente para crear nuevo personal

export default function CreatePage(props){
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Nuevo Personal</h2>}
        >
            <Head title="Registrar Personal" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-3">Registrar un nuevo reporte de incidente</h2>
                        <p className="mb-4">Complete el formulario para registrar un nuevo reporte de incidente.</p>
                        <Create {...props} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}