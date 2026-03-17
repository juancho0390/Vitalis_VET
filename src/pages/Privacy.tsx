import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, Scale } from 'lucide-react';

export default function Privacy() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="bg-[#FAFAFA] min-h-screen overflow-hidden">
            {/* Professional Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center bg-stone-950 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(5,150,105,0.15),transparent)]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.1),transparent)]"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="h-px w-8 bg-brand-500"></div>
                            <span className="text-xs font-bold tracking-[0.3em] text-brand-400 uppercase">Legal & Privacidad</span>
                            <div className="h-px w-8 bg-brand-500"></div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                            Política de <span className="text-brand-400 italic font-serif font-light">Privacidad</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 max-w-4xl -mt-20 relative z-20 pb-24">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="bg-white p-10 md:p-20 rounded-[3.5rem] shadow-2xl shadow-stone-200/50 border border-stone-100"
                >
                    <div className="flex items-center gap-6 mb-16 pb-8 border-b border-stone-100">
                        <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center">
                            <Shield className="w-8 h-8 text-brand-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-stone-800">Compromiso Vitalis</h2>
                            <p className="text-stone-500 text-sm">Última actualización: 15 de Marzo, 2026</p>
                        </div>
                    </div>

                    <div className="prose prose-stone lg:prose-lg max-w-none">
                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6 text-stone-800">
                                <Eye className="w-6 h-6 text-brand-500" />
                                <h2 className="text-2xl font-bold m-0">1. Introducción</h2>
                            </div>
                            <p>
                                En Vitalis Clínica Veterinaria, valoramos su privacidad y estamos comprometidos a proteger sus datos personales. Esta política explica cómo recopilamos, usamos y protegemos la información que usted nos proporciona a través de nuestro sitio web y servicios.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6 text-stone-800">
                                <FileText className="w-6 h-6 text-brand-500" />
                                <h2 className="text-2xl font-bold m-0">2. Información que Recopilamos</h2>
                            </div>
                            <p>Recopilamos información que usted nos proporciona directamente cuando:</p>
                            <ul>
                                <li>Agenda una cita a través de nuestro sitio web.</li>
                                <li>Se registra para recibir nuestro boletín informativo.</li>
                                <li>Realiza una compra en nuestra tienda en línea.</li>
                                <li>Se comunica con nosotros a través de formularios de contacto.</li>
                            </ul>
                            <p>Esta información puede incluir su nombre, dirección de correo electrónico, número de teléfono, dirección postal e información sobre su mascota.</p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6 text-stone-800">
                                <Lock className="w-6 h-6 text-brand-500" />
                                <h2 className="text-2xl font-bold m-0">3. Uso de la Información</h2>
                            </div>
                            <p>Utilizamos la información recopilada para:</p>
                            <ul>
                                <li>Procesar y confirmar sus citas veterinarias.</li>
                                <li>Gestionar sus pedidos y entregas de la tienda.</li>
                                <li>Enviar recordatorios de vacunación y desparasitación.</li>
                                <li>Mejorar nuestros servicios y la experiencia del usuario en el sitio web.</li>
                                <li>Cumplir con obligaciones legales y regulatorias.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6 text-stone-800">
                                <Scale className="w-6 h-6 text-brand-500" />
                                <h2 className="text-2xl font-bold m-0">4. Seguridad de los Datos</h2>
                            </div>
                            <p>
                                Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado, la pérdida o la alteración. Sus datos se almacenan en servidores seguros y el acceso está limitado a personal autorizado.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-stone-800 mb-6">5. Sus Derechos</h2>
                            <p>
                                Usted tiene derecho a acceder, rectificar o eliminar sus datos personales en cualquier momento. Para ejercer estos derechos, puede ponerse en contacto con nosotros a través de protecciondatos@vitalisvet.com.
                            </p>
                        </section>

                        <div className="mt-20 p-8 bg-stone-50 rounded-3xl border border-stone-100 text-center">
                            <p className="text-sm text-stone-500 m-0">
                                Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
