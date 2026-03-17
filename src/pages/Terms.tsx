import React from 'react';
import { motion } from 'motion/react';
import { FileText, Gavel, AlertCircle, CreditCard, HelpCircle } from 'lucide-react';

export default function Terms() {
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
                            <span className="text-xs font-bold tracking-[0.3em] text-brand-400 uppercase">Normativa & Ética</span>
                            <div className="h-px w-8 bg-brand-500"></div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                            Términos de <span className="text-brand-400 italic font-serif font-light">Servicio</span>
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
                            <Gavel className="w-8 h-8 text-brand-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-stone-800">Acuerdo de Usuario</h2>
                            <p className="text-stone-500 text-sm">Última actualización: 15 de Marzo, 2026</p>
                        </div>
                    </div>

                    <div className="prose prose-stone lg:prose-lg max-w-none">
                        <p className="lead text-xl text-stone-600 mb-12">
                            Al acceder y utilizar este sitio web y los servicios de Vitalis Clínica Veterinaria, usted acepta cumplir con los siguientes términos y condiciones.
                        </p>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6 text-stone-800">
                                <AlertCircle className="w-6 h-6 text-brand-500" />
                                <h2 className="text-2xl font-bold m-0">1. Uso del Sitio Web</h2>
                            </div>
                            <p>
                                Este sitio web tiene como objetivo proporcionar información sobre nuestros servicios veterinarios, permitir la reserva de citas y la compra de productos. Usted se compromete a utilizar el sitio de manera responsable y legal.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6 text-stone-800">
                                <FileText className="w-6 h-6 text-brand-500" />
                                <h2 className="text-2xl font-bold m-0">2. Citas y Cancelaciones</h2>
                            </div>
                            <p>
                                Las citas agendadas a través del sitio web están sujetas a disponibilidad. Solicitamos que cualquier cancelación o reprogramación se realice con al menos 24 horas de antelación. Vitalis se reserva el derecho de cobrar una tarifa por inasistencia sin previo aviso.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6 text-stone-800">
                                <CreditCard className="w-6 h-6 text-brand-500" />
                                <h2 className="text-2xl font-bold m-0">3. Compras en la Tienda</h2>
                            </div>
                            <p>
                                Todos los precios mostrados en nuestra tienda en línea incluyen los impuestos correspondientes. Nos esforzamos por mantener la precisión en la descripción de los productos, pero no garantizamos que sean exactas, completas o libres de errores.
                            </p>
                            <ul>
                                <li>Los pagos se procesan a través de pasarelas seguras.</li>
                                <li>Los tiempos de entrega son estimativos.</li>
                                <li>Consulte nuestra política de devoluciones para más detalles.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6 text-stone-800">
                                <Gavel className="w-6 h-6 text-brand-500" />
                                <h2 className="text-2xl font-bold m-0">4. Responsabilidad Médica</h2>
                            </div>
                            <p>
                                La información proporcionada en este sitio web es de carácter informativo y no sustituye la consulta profesional presencial. En caso de emergencia, siempre debe acudir físicamente a nuestra clínica o al centro de urgencias más cercano.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6 text-stone-800">
                                <HelpCircle className="w-6 h-6 text-brand-500" />
                                <h2 className="text-2xl font-bold m-0">5. Modificaciones</h2>
                            </div>
                            <p>
                                Vitalis se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
                            </p>
                        </section>

                        <div className="mt-20 p-8 bg-brand-50 rounded-3xl border border-brand-100 text-center">
                            <p className="text-sm text-brand-800 font-medium m-0">
                                El uso continuado de nuestros servicios constituye la aceptación de estos términos.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
