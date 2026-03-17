import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ShieldCheck, FlaskConical, Stethoscope, Syringe, Siren, PawPrint, ArrowRight, CheckCircle2, Heart, Activity, Sparkles, ChevronRight } from 'lucide-react';
import { serviceData } from '../data/homeData';

const serviceIcons: Record<string, React.ElementType> = {
    preventiva: ShieldCheck,
    diagnostico: FlaskConical,
    especialidades: Stethoscope,
    quirurgicos: Syringe,
    urgencias: Siren,
    complementarios: PawPrint
};

export default function Services() {
    const [activeService, setActiveService] = useState(Object.keys(serviceData)[0]);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const currentService = serviceData[activeService as keyof typeof serviceData];
    const Icon = serviceIcons[activeService] || ShieldCheck;

    return (
        <div className="bg-[#FAFAFA] min-h-screen overflow-x-hidden">
            {/* Warm & Welcoming Hero Section */}
            <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden bg-amber-50">
                {/* Background Elements */}
                <motion.div 
                    style={{ y: y1, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2000" 
                        alt="Happy family with dog" 
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-amber-50/80 to-transparent"></div>
                </motion.div>

                {/* Floating Decorative Circles */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <motion.div 
                        animate={{ 
                            y: [0, -20, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-200 rounded-full blur-[120px]"
                    />
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-px w-12 bg-brand-500"></div>
                                <span className="text-sm font-bold tracking-[0.3em] text-brand-600 uppercase">
                                    Cuidado con Corazón
                                </span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-bold text-stone-900 mb-8 tracking-tighter leading-[0.9]">
                                Servicios para <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400 italic">su Familia</span>
                            </h1>
                            <p className="text-xl text-stone-600 max-w-2xl mb-12 leading-relaxed font-light">
                                Brindamos atención médica excepcional con la calidez y el amor que sus compañeros de vida merecen. Porque para nosotros, ellos son parte de la familia.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Dynamic Services Section */}
            <section className="py-24 lg:py-32 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                        {/* Lateral Submenu */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-32 space-y-3">
                                <div className="mb-8">
                                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400 mb-2">Categorías</h2>
                                    <div className="h-1 w-12 bg-brand-600"></div>
                                </div>
                                {Object.entries(serviceData).map(([key, service]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveService(key)}
                                        className={`w-full group flex items-center justify-between p-6 rounded-2xl transition-all duration-500 text-left border ${
                                            activeService === key 
                                            ? 'bg-white border-brand-100 shadow-xl shadow-brand-900/5 text-brand-600' 
                                            : 'bg-transparent border-transparent text-stone-500 hover:bg-stone-100'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                                activeService === key ? 'bg-brand-600 text-white' : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200'
                                            }`}>
                                                {React.createElement(serviceIcons[key] || ShieldCheck, { className: "w-5 h-5" })}
                                            </div>
                                            <span className="font-bold text-lg tracking-tight">{service.title}</span>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 transition-transform duration-500 ${
                                            activeService === key ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                                        }`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:w-2/3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeService}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="bg-white p-8 md:p-16 rounded-[3rem] border border-stone-100 shadow-sm relative overflow-hidden"
                                >
                                    {/* Decorative background element */}
                                    <div className="absolute -right-24 -top-24 w-64 h-64 bg-brand-50 rounded-full opacity-50 blur-[100px]"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-6 mb-12">
                                            <div className="w-20 h-20 bg-brand-50 rounded-[2rem] flex items-center justify-center shadow-inner">
                                                <Icon className="w-10 h-10 text-brand-600" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-2 block">Servicio Seleccionado</span>
                                                <h3 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                                                    {currentService.title}
                                                </h3>
                                            </div>
                                        </div>
                                        
                                        <div className="prose prose-stone prose-xl max-w-none mb-12">
                                            <div 
                                                className="text-stone-500 leading-relaxed font-light space-y-6"
                                                dangerouslySetInnerHTML={{ __html: currentService.description }}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                            <div className="p-8 bg-stone-50 rounded-3xl border border-stone-100">
                                                <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                                                    Beneficios Clave
                                                </h4>
                                                <ul className="space-y-3 text-stone-500 text-sm">
                                                    <li className="flex items-center gap-2">• Tecnología de última generación</li>
                                                    <li className="flex items-center gap-2">• Personal altamente calificado</li>
                                                    <li className="flex items-center gap-2">• Atención personalizada y humana</li>
                                                </ul>
                                            </div>
                                            <div className="p-8 bg-brand-50 rounded-3xl border border-brand-100">
                                                <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-2">
                                                    <Sparkles className="w-5 h-5 text-brand-600" />
                                                    ¿Por qué Vitalis?
                                                </h4>
                                                <p className="text-brand-800/70 text-sm leading-relaxed">
                                                    Nuestro enfoque integral garantiza que cada paciente reciba el tratamiento exacto que necesita en el momento justo.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-6 bg-brand-600 text-white font-black rounded-2xl shadow-xl shadow-brand-600/20 hover:bg-brand-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                                        >
                                            Solicitar Información <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-32 bg-stone-900 text-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-brand-400" />
                            <span className="text-xs font-bold tracking-widest uppercase text-brand-400">Metodología Vitalis</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Cómo cuidamos de <span className="italic text-brand-400">ellos</span></h2>
                        <p className="text-xl text-stone-400 font-light">Un proceso riguroso y humano diseñado para garantizar la tranquilidad de los propietarios y la salud de los pacientes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 hidden md:block z-0"></div>
                        
                        {[
                            { step: '01', title: 'Diagnóstico Preciso', desc: 'Evaluación exhaustiva utilizando tecnología de imagen y laboratorio de última generación.' },
                            { step: '02', title: 'Plan Personalizado', desc: 'Diseñamos un protocolo de tratamiento específico para las necesidades únicas de su mascota.' },
                            { step: '03', title: 'Seguimiento Continuo', desc: 'Monitoreo post-tratamiento y comunicación constante para asegurar una recuperación total.' },
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="relative z-10 bg-stone-800/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 hover:border-brand-500/30 transition-colors group"
                            >
                                <span className="text-6xl font-bold text-white/5 absolute top-6 right-8 group-hover:text-brand-500/10 transition-colors">{item.step}</span>
                                <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center mb-8 shadow-xl shadow-brand-600/20">
                                    <span className="font-bold text-white">{item.step}</span>
                                </div>
                                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                                <p className="text-stone-400 leading-relaxed font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-brand-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(5,150,105,0.4)]"
                    >
                        {/* Decorative background */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
                            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)]"></div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter">¿Listo para darles lo mejor?</h2>
                            <p className="text-xl text-brand-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                Únase a las miles de familias que confían en Vitalis para el cuidado de sus seres más queridos.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-6 bg-white text-brand-600 font-black rounded-full shadow-2xl hover:shadow-white/20 transition-all text-lg uppercase tracking-widest"
                                >
                                    Agendar Cita
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-12 py-6 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg"
                                >
                                    Hablar con un Médico
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
