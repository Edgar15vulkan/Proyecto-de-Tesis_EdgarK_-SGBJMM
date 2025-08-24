import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;  
    const [open, setOpen] = useState(null);
    const toggleMenu = (menu) => {
        setOpen(open === menu ? null : menu);
    };
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-400">
            {/* SIDEBAR */}
            <aside className="hidden md:flex md:flex-col w-64 bg-white border-r">
                
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </NavLink>
                    <NavLink href={route('personal.index')} active={route().current('personal.index')}>
                        Personal
                    </NavLink>
                    {/* puedes añadir más secciones */}
                </nav>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-1 flex flex-col">
                {/* NAVBAR SUPERIOR */}
                <nav className="border-b border-gray-100 bg-gray-200">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            {/* Links visibles solo en móvil */}
                            <div className="flex md:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                    className="p-2 rounded-md text-gray-90   00 hover:bg-gray-100"
                                >
                                    ☰
                                </button>
                            </div>

                            <div className="h-16 flex items-center justify-center border-b">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </div>

                            {/* Usuario */}
                            <div className="flex items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">
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
                    <header className="bg-white shadow">
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
