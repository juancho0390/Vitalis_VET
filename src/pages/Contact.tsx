import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-stone-900">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
                        alt="Contact Vitalis" 
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Estamos <span className="text-brand-400 italic">Contigo</span>
                        </h1>
                        <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
                            Resuelve tus dudas o agenda una cita. Tu mascota merece la mejor atención.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Info */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <h2 className="text-4xl font-bold text-stone-800 mb-8">Información de Contacto</h2>
                            <p className="text-lg text-stone-600 mb-12 leading-relaxed">
                                Estamos ubicados en el corazón de la ciudad, con instalaciones modernas y un equipo listo para recibirte.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100 hover:border-brand-200 transition-colors group">
                                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors">
                                        <Phone className="w-6 h-6 text-brand-600 group-hover:text-white" />
                                    </div>
                                    <h4 className="font-bold text-stone-800 mb-2">Llámanos</h4>
                                    <p className="text-stone-600">+57 (300) 123-4567</p>
                                    <p className="text-stone-600">(601) 765-4321</p>
                                </div>

                                <div className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100 hover:border-brand-200 transition-colors group">
                                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors">
                                        <Clock className="w-6 h-6 text-brand-600 group-hover:text-white" />
                                    </div>
                                    <h4 className="font-bold text-stone-800 mb-2">Horarios</h4>
                                    <p className="text-stone-600">Lun - Vie: 8am - 8pm</p>
                                    <p className="text-stone-600 font-bold text-brand-600">Urgencias: 24 Horas</p>
                                </div>

                                <div className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100 hover:border-brand-200 transition-colors group">
                                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors">
                                        <Mail className="w-6 h-6 text-brand-600 group-hover:text-white" />
                                    </div>
                                    <h4 className="font-bold text-stone-800 mb-2">Escríbenos</h4>
                                    <p className="text-stone-600">hola@vitalisvet.com</p>
                                    <p className="text-stone-600">citas@vitalisvet.com</p>
                                </div>

                                <div className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100 hover:border-brand-200 transition-colors group">
                                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors">
                                        <MapPin className="w-6 h-6 text-brand-600 group-hover:text-white" />
                                    </div>
                                    <h4 className="font-bold text-stone-800 mb-2">Visítanos</h4>
                                    <p className="text-stone-600">Calle 127 # 15 - 45</p>
                                    <p className="text-stone-600">Bogotá, Colombia</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="text-stone-400 font-medium uppercase tracking-widest text-sm">Síguenos</span>
                                <div className="flex gap-4">
                                    <a href="#" className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-brand-600 hover:text-white transition-all">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-brand-600 hover:text-white transition-all">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-brand-600 hover:text-white transition-all">
                                        <MessageCircle className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-stone-50 p-12 rounded-[3rem] border border-stone-100 shadow-xl shadow-stone-200/50"
                        >
                            <h3 className="text-3xl font-bold text-stone-800 mb-8">Envíanos un mensaje</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-stone-700 ml-2">Nombre Completo</label>
                                        <input 
                                            type="text" 
                                            placeholder="Ej. Juan Pérez"
                                            className="w-full px-6 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-stone-700 ml-2">Correo Electrónico</label>
                                        <input 
                                            type="email" 
                                            placeholder="ejemplo@correo.com"
                                            className="w-full px-6 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-700 ml-2">Asunto</label>
                                    <select className="w-full px-6 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none">
                                        <option>Agendar Cita</option>
                                        <option>Consulta General</option>
                                        <option>Urgencias</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-700 ml-2">Mensaje</label>
                                    <textarea 
                                        rows={4} 
                                        placeholder="¿En qué podemos ayudarte?"
                                        className="w-full px-6 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                                    ></textarea>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-5 bg-brand-600 text-white font-bold rounded-2xl shadow-lg hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
                                >
                                    Enviar Mensaje <Send className="w-5 h-5" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[500px] w-full bg-stone-100 relative">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.410427958998!2d-74.0536!3d4.7031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDInMTEuMiJOIDc0wrAwMycxMi45Ilc!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                </div>
            </section>
        </div>
    );
}
