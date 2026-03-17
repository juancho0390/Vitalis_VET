import React from 'react';
import { HeartPulse, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-300">
            <div className="container mx-auto px-6 py-16 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center space-x-3 mb-6 group w-fit">
                            <div className="bg-brand-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <HeartPulse className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-white tracking-tight">Vitalis</span>
                        </Link>
                        <p className="text-stone-400 mb-2">Vitalis Salud Animal S.A.S.</p>
                        <p className="text-stone-400 mb-8">NIT: 901.XXX.XXX-X</p>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-stone-800 p-3 rounded-full text-stone-400 hover:text-white hover:bg-brand-600 hover:-translate-y-1 transition-all duration-300"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="bg-stone-800 p-3 rounded-full text-stone-400 hover:text-white hover:bg-brand-600 hover:-translate-y-1 transition-all duration-300"><Facebook className="w-5 h-5" /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg mb-6">Navegación</h4>
                        <ul className="space-y-3">
                            <li><Link to="/nosotros" className="text-stone-400 hover:text-brand-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 opacity-0 -ml-3 transition-all"></span>Nosotros</Link></li>
                            <li><Link to="/servicios" className="text-stone-400 hover:text-brand-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 opacity-0 -ml-3 transition-all"></span>Servicios</Link></li>
                            <li><Link to="/tienda" className="text-stone-400 hover:text-brand-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 opacity-0 -ml-3 transition-all"></span>Tienda</Link></li>
                            <li><Link to="/instalaciones" className="text-stone-400 hover:text-brand-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 opacity-0 -ml-3 transition-all"></span>Instalaciones</Link></li>
                            <li><Link to="/testimonios" className="text-stone-400 hover:text-brand-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 opacity-0 -ml-3 transition-all"></span>Testimonios</Link></li>
                            <li><Link to="/contacto" className="text-stone-400 hover:text-brand-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 opacity-0 -ml-3 transition-all"></span>Contacto</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg mb-6">Contacto Rápido</h4>
                        <ul className="space-y-4 text-stone-400">
                            <li>
                                <span className="block text-sm text-stone-500 mb-1">Urgencias 24/7</span>
                                <a href="tel:+573173709451" className="text-rose-400 font-bold hover:text-rose-300 transition-colors text-lg">(+57) 317 370 9451</a>
                            </li>
                            <li>
                                <span className="block text-sm text-stone-500 mb-1">Citas y Consultas</span>
                                <a href="tel:+576044441299" className="hover:text-white transition-colors">(+57) 604 444 1299</a>
                            </li>
                            <li>
                                <span className="block text-sm text-stone-500 mb-1">Correo Electrónico</span>
                                <a href="mailto:info@vitalis.vet" className="hover:text-white transition-colors">info@vitalis.vet</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-stone-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Clínica Veterinaria Vitalis. Todos los derechos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacidad" className="hover:text-stone-300 transition-colors">Política de Privacidad</Link>
                        <Link to="/terminos" className="hover:text-stone-300 transition-colors">Términos de Servicio</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
