import React from 'react';
import {Head ,useForm} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DocumentosForm from './componentes/DocumentosForm';
import TablaDocumentos from './componentes/TablaDocumentos';

const Index = ({ auth, documentos }) => {
    const { data, setData, post, processing, reset } = useForm ({   
        documentos: [
            {
                tipo_documento:'',
                nombre_documento:'',
                archivo:'',
                entregado:'',
                fecha_entrega:'',
            },
        ]
    });

    const documentosIniciales = [
        {
            tipo_documento: '', 
            nombre_documento: '',
            fecha_entrega: '',
            entregado: 'false',
            archivo: 'null',

        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        data.documentos.forEach((doc, i) => {
            formData.append(`documentos[${i}][tipo_documento]` , doc.tipo_documento);
            formData.append(`documentos[${i}][nombre_documento]`, doc.nombre_documento);
            formData.append(`documentos[${i}][entregado]`, doc.entregado ? 1:0);
            formData.append(`documentos[${i}][fecha_entrega]`, doc.fecha_entrega || '');
            if (doc.archivo) {  
                formData.append(`documentos[${i}][archivo]`, doc.archivo);
            }
        });

        post(route('documentos.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: ()=> {
                reset();
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestionar documentación del personal
                </h2>
            }
        >

        <Head title="Gestión de Documentos"/>

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                    <h1 className='text-xl font-bold mb-4'>Subir nuevo documento</h1>
                    <form onSubmit={handleSubmit}>
                    <DocumentosForm
                        personalId= {personal_id}
                        documentosIniciales = {documentos}
                        onDocumentosChange = {(nuevosDocs ) => setData('documentos', nuevosDocs)}
                    />
                    <button
                        type= 'submit'
                        disabled={processing}
                        className= "mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Guardar Documentos
                    </button>
                    </form>
                    {/* TablaDocumentos*/}
                    <h2 className="text-lg font-semibold mt-6"> Documentos cargados </h2>
                    <TablaDocumentos
                        documentos = {documentos}
                         />
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    );
};

export default Index;