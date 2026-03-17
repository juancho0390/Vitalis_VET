import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X, MapPin, Sparkles } from 'lucide-react';
import { facilityData } from '../data/homeData';

export default function Facilities() {
    const [selectedFacility, setSelectedFacility] = useState<keyof typeof facilityData>('recepcion');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const activeFacility = facilityData[selectedFacility];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % activeFacility.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + activeFacility.images.length) % activeFacility.images.length);
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-stone-900">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=2000" 
                        alt="Vitalis Facilities" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Nuestras <span className="text-brand-400 italic">Instalaciones</span>
                        </h1>
                        <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
                            Espacios diseñados para la tranquilidad y el cuidado de vanguardia.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Gallery Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar Navigation */}
                        <div className="lg:w-1/3">
                            <motion.div 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="sticky top-32"
                            >
                                <div className="flex items-center gap-2 mb-4 text-brand-600 font-semibold uppercase tracking-widest text-sm">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Explora Vitalis</span>
                                </div>
                                <h2 className="text-4xl font-bold text-stone-800 mb-8 leading-tight">Diseño pensado en el bienestar</h2>
                                
                                <div className="space-y-3">
                                    {Object.entries(facilityData).map(([key, facility]) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setSelectedFacility(key as keyof typeof facilityData);
                                                setCurrentImageIndex(0);
                                            }}
                                            className={`w-full text-left px-8 py-5 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                                                selectedFacility === key 
                                                ? 'bg-brand-600 text-white shadow-xl shadow-brand-600/20 translate-x-2' 
                                                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-100'
                                            }`}
                                        >
                                            <span className="font-bold text-lg">{facility.title}</span>
                                            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${selectedFacility === key ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-12 p-8 bg-stone-50 rounded-3xl border border-stone-100">
                                    <div className="flex items-center gap-3 mb-4 text-stone-800 font-bold">
                                        <MapPin className="w-5 h-5 text-brand-600" />
                                        <span>Ubicación Estratégica</span>
                                    </div>
                                    <p className="text-stone-500 leading-relaxed">
                                        Nuestras instalaciones están ubicadas en una zona de fácil acceso, con amplias zonas verdes para el paseo de las mascotas.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:w-2/3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedFacility}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-12"
                                >
                                    {/* Main Image Display */}
                                    <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl group">
                                        <img 
                                            src={activeFacility.images[currentImageIndex]} 
                                            alt={activeFacility.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        
                                        {/* Navigation Controls */}
                                        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                                className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-800 hover:bg-brand-600 hover:text-white transition-all shadow-lg"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                                className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-800 hover:bg-brand-600 hover:text-white transition-all shadow-lg"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </div>

                                        {/* Lightbox Trigger */}
                                        <button 
                                            onClick={() => setIsLightboxOpen(true)}
                                            className="absolute top-6 right-6 w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-brand-600 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Maximize2 className="w-5 h-5" />
                                        </button>

                                        {/* Image Counter */}
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/30 backdrop-blur-md rounded-full text-white text-sm font-medium">
                                            {currentImageIndex + 1} / {activeFacility.images.length}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-sm">
                                        <h3 className="text-3xl font-bold text-stone-800 mb-6">{activeFacility.title}</h3>
                                        <div 
                                            className="text-stone-600 leading-relaxed text-lg prose prose-stone lg:prose-xl max-w-none"
                                            dangerouslySetInnerHTML={{ __html: activeFacility.description }}
                                        />
                                    </div>

                                    {/* Thumbnails */}
                                    <div className="grid grid-cols-3 gap-6">
                                        {activeFacility.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`relative aspect-video rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                                                    currentImageIndex === idx ? 'border-brand-500 scale-105 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                            >
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-stone-900 flex items-center justify-center p-6 md:p-12"
                    >
                        <button 
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
                        >
                            <X className="w-10 h-10" />
                        </button>
                        
                        <div className="relative w-full max-w-6xl aspect-[16/10]">
                            <img 
                                src={activeFacility.images[currentImageIndex]} 
                                alt="" 
                                className="w-full h-full object-contain"
                            />
                            
                            <div className="absolute inset-y-0 -left-16 flex items-center">
                                <button onClick={prevImage} className="text-white/40 hover:text-white transition-colors">
                                    <ChevronLeft className="w-16 h-16" />
                                </button>
                            </div>
                            <div className="absolute inset-y-0 -right-16 flex items-center">
                                <button onClick={nextImage} className="text-white/40 hover:text-white transition-colors">
                                    <ChevronRight className="w-16 h-16" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
