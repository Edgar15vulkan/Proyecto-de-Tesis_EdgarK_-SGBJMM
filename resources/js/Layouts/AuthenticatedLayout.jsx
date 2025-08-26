import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, List, Folder ,ChevronDown, Users, FileText, Settings, Home } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;  
    const [open, setOpen] = useState(null);
    const toggleMenu = (menu) => {
        setOpen(open === menu ? null : menu);
    };
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-300"> {/* Color de fondo */}
            {/* SIDEBAR */}
            <aside className="hidden md:flex md:flex-col w-64 bg-gray-700 text-white shadow-lg ">  {/* Color de barra menu lateral */}
                <div className='p-4 text-lg font-bold border-b border-gray-600'>
                    🚒 Sistema Bomberos José Maria Morelos
                </div>

                {/* ------ Enlaces del menu lateral --------- */}
                <nav className="flex-1 p-4 space-y-2">
                    {/*---------- Boton del menu lateral a Dashboard -------------*/}
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <div className="flex items-center gap-2">
                            <Home className='w-5 h-5'/> Dashboard
                        </div>
                    </NavLink>

                    {/*------- Menu personal con submenú ------------ */}
                    <button
                        onClick={() => toggleMenu("personal")}
                        className={'w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-red-500 transition'}
                    >
                        <span className="flex items-center gap-2">
                            <Users className="w-5 h-5"/> Personal
                        </span>
                        {/* ------------- menu Desplegable -------------- */}
                        <ChevronDown 
                            className={`w-4 h-4 transform transition-transform ${open === "personal" ? "rotate-180" : ""}`}
                        />
                    </button>

                    
                        <div 
                            className={`ml-8 flex flex-col text-sm overflow-hidden transition-all duration-300 ${
                            open === "personal" ? "max-h-40" : "max-h-0"
                                }`}
                            >

                            {/*-------- Formulario Nuevo personal------ */}
                            <Link href={route('personal.create')} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 rounded">
                                <Plus className="w-6 h-6 "/> Nuevo personal
                            </Link>

                            {/*------- Personal Index tabla ----- */}
                            <Link href={route('personal.index')} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 rounded">
                                <List className='w-6 h-6'/> Lista de personal
                            </Link>

                             {/*------ Documentos ------ */}
                            <Link href={route('documentos-personal.index')} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 rounded">
                                <Folder className="w-4 h-4"/> Documentos de personal
                            </Link>
                        </div>
                    

                    {/* ------- Reportes de incidentes ------------*/}
                    <NavLink href="#" active={route().current('documentos')}>
                        <div className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-red-500 hover:text">
                            <FileText className="w-5 h-5" /> Documentos
                        </div>
                    </NavLink>

                    {/* Configuración */}
                    <NavLink href="#" active={route().current('configuracion')}>
                        <div className="flex items-center gap-2  hover:bg-red-500 hover:text">
                            <span className="flex items-center gap-2">
                                <Settings className="w-5 h-5" /> Configuración
                            </span>
                        </div>
                    </NavLink>

                    {/* puedes añadir más secciones */}

                    <button
                        onClick={() => toggleMenu("vehiculos")}
                        className={'w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-red-500 transition'}
                    >
                        <span className="flex items-center gap-2">
                            <Users className="w-5 h-5"/> Vehiculos
                        </span>
                        
                    </button>

                </nav>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-1 flex flex-col">
                {/* NAVBAR SUPERIOR */}
                <nav className="border-b border-gray-100 bg-red-700"> {/* Color del menu superior */}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            {/* Links visibles solo en móvil */}
                            <div className="flex md:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                    className="p-2 rounded-md text-white  hover:bg-red-600"
                                >
                                    ☰
                                </button>
                            </div>

                            {/* ------ Logo -------- */}
                            <div className="h-16 flex items-center justify-center">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-white" /> {/* Color del logo de laravel */}
                            </div>

                            {/* Usuario */}
                            <div className="flex items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-gray-300">  {/* Color de texto del usuario */}
                                            {user.name}
                                            <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.352a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Cerrar sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* HEADER (título de página) */}
                {header && (
                    <header className="bg-red-400 shadow"> {/* Color del encabezado de la pagina */}
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                {/* CONTENIDO */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
