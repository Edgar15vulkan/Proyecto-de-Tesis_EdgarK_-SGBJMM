import TablaDocumentos from "./TablaDocumentos";
import React from 'react';
import {Head ,useForm} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function Gestionar({ persona }) {


    return (
           <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestionar documentación de {persona.nombre}
                </h2>
            }
        >

        <Head title="Gestión de Documentos"/>

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                    
                    {/* TablaDocumentos*/}
                    <h2 className="text-lg font-semibold mt-6"> Documentos cargados </h2>
                    <TablaDocumentos
                        persona = {persona}

                    />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}

