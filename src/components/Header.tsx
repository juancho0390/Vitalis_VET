import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Cross, HeartPulse } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { cart, toggleCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const isStore = location.pathname === '/tienda';

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Nosotros', href: '/nosotros' },
        { name: 'Servicios', href: '/servicios' },
        { name: 'Tienda', href: '/tienda' },
        { name: 'Instalaciones', href: '/instalaciones' },
        { name: 'Testimonios', href: '/testimonios' },
        { name: 'Contacto', href: '/contacto' },
    ];

    return (
        <header className={`sticky top-0 z-50 bg-white shadow-sm border-b border-stone-100 transition-all duration-300`}>
            <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4`}>
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-brand-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <HeartPulse className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-2xl font-bold tracking-tight text-stone-800`}>
                            Vitalis
                        </span>
                    </Link>
                    
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navLinks.map(link => {
                            const isActive = location.pathname === link.href;
                            return (
                                <Link 
                                    key={link.name} 
                                    to={link.href} 
                                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isActive ? 'text-brand-800 bg-brand-50' : 'text-stone-600 hover:text-brand-700 hover:bg-stone-50'}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center space-x-4">
                        {isStore ? (
                            <button onClick={toggleCart} className={`relative p-2 rounded-full transition-colors text-stone-800 hover:bg-stone-100`}>
                                <ShoppingCart className="w-6 h-6" />
                                <AnimatePresence>
                                    {cartItemCount > 0 && (
                                        <motion.span 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="absolute -top-1 -right-1 bg-accent-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm"
                                        >
                                            {cartItemCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        ) : (
                            <Link to="/contacto" className="hidden sm:flex items-center space-x-2 bg-brand-600 text-white font-semibold py-2.5 px-6 rounded-full hover:bg-brand-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                <span>Agendar Cita</span>
                            </Link>
                        )}
                        
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`lg:hidden p-2 rounded-full transition-colors text-stone-800 hover:bg-stone-100`}>
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-stone-200/50 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-2">
                            {navLinks.map(link => (
                                <Link 
                                    key={link.name} 
                                    to={link.href} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-6 py-4 text-stone-600 hover:text-brand-700 hover:bg-brand-50 font-medium rounded-2xl transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {!isStore && (
                                <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="mx-4 mt-4 bg-brand-600 text-white text-center font-bold py-4 rounded-2xl shadow-md">
                                    Agendar Cita
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
