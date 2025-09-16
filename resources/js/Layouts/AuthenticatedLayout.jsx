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
        <div className="min-h-screen flex bg-gray-400"> {/* Color de fondo */}
            {/* SIDEBAR */}
            <aside className="  fixed h-screen w-64 bg-gray-700 text-white shadow-lg ">  {/* Color de barra menu lateral */}
                <div className='p-4 text-lg font-bold border-b border-gray-400'>
                    🚒 Sistema Bomberos José Maria Morelos
                </div>

                {/* ------ Enlaces del menu lateral --------- */}
                <nav className="flex-1 p-4 space-y-2">

                    {/*---------- Boton del menu lateral a Dashboard -------------*/}
                    <NavLink 
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className={({ isActive }) =>
                            `w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md transition text-white  hover:bg-red-500 
                            ${isActive ? "bg-red-600 text-white" : "hover:bg-red-500"}`
                        }
                    >
                        <Home className='w-5 h-5'/> Dashboard
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

                            {/*------- Personal Index tabla ----- */}
                            <Link href={route('personal.index')} className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-red-500 transition">
                                <List className='w-6 h-6'/> Lista de personal
                            </Link>

                            {/*-------- Formulario Nuevo personal------ */}
                            <Link href={route('personal.create')} className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-red-500 transition">
                                <Plus className="w-6 h-6 "/> Nuevo personal
                            </Link>

                            {/*------ Documentos ------ */}
                            <Link href={route('documentos-personal.index')} className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-red-500 transition">
                                <Folder className="w-6 h-6"/>  Documentos de personal
                            </Link>
                        </div>
                    

                    {/* ------- Reportes de incidentes ------------*/}
                    <button
                        onClick={() => toggleMenu("reportes")}
                        className={'w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-red-500 transition'}
                    >
                        <span className="flex items-center gap-2">
                            <FileText className="w-5 h-5" /> Reportes de Incidentes
                        </span>
                        {/* ------------- menu Desplegable -------------- */}
                        <ChevronDown 
                            className={`w-4 h-4 transform transition-transform ${open === "personal" ? "rotate-180" : ""}`}
                        />
                    </button>
                        <div 
                            className={`ml-8 flex flex-col text-sm overflow-hidden transition-all duration-300 ${
                            open === "reportes" ? "max-h-40" : "max-h-0"
                                }`}
                            >

                            {/*------- Reportes Index tabla ----- */}
                            <Link href={route('reportes.index')} className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-red-500 transition">
                                <List className='w-6 h-6'/> Lista de reportes
                            </Link>

                            {/*-------- Formulario Nuevo reporte------ */}
                            <Link href={route('reportes.create')} className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-red-500 transition">
                                <Plus className="w-6 h-6 "/> Nuevo reporte
                            </Link>
                        </div>


                    {/*------------------- Vehiculos ------------*/}
                    <button
                        onClick={() => toggleMenu("vehiculos")}
                        className={'w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-red-500 transition '}
                    >
                        <span className="flex items-center gap-2 ">
                            <Users className="w-5 h-5"/> Vehiculos
                        </span>
                        
                    </button>

                    {/* --------------Linea divisora de sección del menu-------------------- */}
                    <div className="text-lg font-bold border-b border-gray-400 p-10">
                        <p></p>
                    </div>
                    {/*--------------- Configuración ------------- */}
                     {/*---------- Boton del menu lateral a Dashboard -------------*/}
                  
                    <NavLink 
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className={({ isActive }) =>
                            `w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md transition text-white  hover:bg-red-500 
                            ${isActive ? "bg-red-600 text-white" : "hover:bg-red-500"}`
                        }
                    >
                        <Settings className='w-5 h-5'/> Configuración
                    </NavLink>
                    

                </nav>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-1 ml-60 flex flex-col">
                {/* NAVBAR SUPERIOR */}
                <nav className="border-b border-gray-300 bg-red-700 fixed top-0 right-0 left-64 z-50"> {/* Color del menu superior */}
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
                                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium z-50 text-white hover:text-gray-300">  {/* Color de texto del usuario */}
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
                    <header className="bg-red-400 shadow fixed top-16 right-0 left-64 z-20 h-14 flex-items-center"> {/* Color del encabezado de la pagina */}
                        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                {/* CONTENIDO */}
                <main className="flex-1 overflow-y-auto p-6 mt-32">{children}</main>
            </div>
        </div>
    );
}
