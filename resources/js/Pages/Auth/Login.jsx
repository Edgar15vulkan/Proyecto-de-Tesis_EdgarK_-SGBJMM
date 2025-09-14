import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inicio de sesión" /> 

                {/*------------------CARD FORMULARIO ------------- */}
                <div className='w-full max-w-md p-6  rounded-2xl  border-red-700'>
                    {/*----STATUS  mensaje de estado----- */}
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
               
                    {/*------------------ FORMULARIO ------------- */}
                    <form onSubmit={submit} className='space-y-4'>
                        {/*-------EMAIL------- */}
                        <div>
                            <InputLabel htmlFor="email" value="Correo electrónico" className='text-red-400' />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-gray-800 text-white border-red-500 focus:ring-red-600"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2 text-yellow-400" />
                        </div>

                        {/*-------PASSWORD------- */}
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Contraseña" className='text-red-400' />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-gray-800 text-white border-red-500 focus:ring-red-600"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2 text-yellow-400" />
                        </div>

                        {/*---------------CHECKBOX DE RECUERDAME -------- */}
                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)}
                                        className='text-red-600 focus:ring-red-500'
                                />
                                <span className="ml-2 text-sm text-gray-300"> Recuérdame </span>
                            </label>
                        </div>
                        
                        {/* --------------------ACCIONES----------------------- */}
                        <div className="mt-4 flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm  text-red-500 hover:text-red-400 underline-offset-2"
                                >
                                    Olvidaste tu contraseña?
                                </Link>
                            )}

                            <PrimaryButton className="bg-red-700 hover:bg-red-400 focus:ring-2 focus:ring-yellow-400 transition transform hover:scale-105" disabled={processing}>
                                Iniciar sesión
                            </PrimaryButton>
                        </div>
                    </form>  {/*-----------FIN FORMULARIO -------- */}
            </div>
        </GuestLayout>
    );
}
