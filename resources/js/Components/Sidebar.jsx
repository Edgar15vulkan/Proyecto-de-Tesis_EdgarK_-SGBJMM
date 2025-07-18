import React, {useState} from 'react';
import { Link } from '@inertiajs/react';
import {ChevronDown, ChevronRight, Menu} from 'lucide-react';

export default function Sidebar() {
    const [openMenus, setOpenMenus] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState (true);

    const toggleMenu = (key) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const MenuGroup = ({ title, icon: Icon, children, menuKey }) => (
        <div className='mb-4'>
            <button
                onClick = {() => toggleMenu(menuKey)}
                className='flex items-center justify-between w-full text-left text-white hover:text-yellow-400'
            >
                <span className='flex items-center gap-2'>
                    {Icon && <Icon size={18} />}
                    {title}
                </span>
                {openMenus[menuKey] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openMenus[menuKey] && (
                <div className='mt-2 ml-4 flex flex-col gap-2'>
                    {children}
                </div>
            )}                                                              
        </div>
    );
    
    return (
        <>
            {/*  Sidebar Toggle para móviles */}
            <button
                onClick =  {toggleSidebar}
                className= 'md:hidden p-2 text-white bg-gray-800 fixed top-2 left-2 z-50 rounded'
            >
                <Menu size = {20} />
            </button>

            {/* Sidebar*/ }
            <aside className={`fixed md:static top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <h2  className='text-2xl font-bold mb-6 text-yellow-400'>Sistema de Gestión Web </h2>

                    <nav className="flex flex-col">
                    <MenuGroup title="Gestión" menuKey="gestion">
                        <Link href="/usuarios" className="hover:text-yellow-400">Usuarios</Link>                                                                                            
                        <Link href="/incidentes" className="hover:text-yellow-400">Incidentes</Link>
                    </MenuGroup>

                    <MenuGroup title="Configuración" menuKey="configuracion">
                        <Link href="/perfil" className="hover:text-yellow-400">Perfil</Link>
                        <Link href="/permisos" className="hover:text-yellow-400">Permisos</Link>
                    </MenuGroup>

                    <MenuGroup title="Inventarios" menuKey="inventarios">
                        <Link href="/equipos" className="hover:text-yellow-400">Equipos</Link>
                        <Link href="/vehiculos" className="hover:text-yellow-400">Vehículos</Link>
                    </MenuGroup>

                    <Link href="/salir" className="hover:text-red-400 mt-6">Salir</Link>
                </nav>
            </aside>
        </>
    );
}