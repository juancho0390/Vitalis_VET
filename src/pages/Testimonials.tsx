import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, User, ArrowRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "María García",
        pet: "Luna (Golden Retriever)",
        text: "La atención en Vitalis es excepcional. No solo son grandes profesionales, sino que se nota el amor genuino que tienen por los animales. Luna siempre entra feliz a la clínica.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        pet: "Simba (Gato Persa)",
        text: "Llevé a Simba por una urgencia nocturna y la rapidez y eficacia del equipo fue increíble. Estuvieron pendientes de él en todo momento y me mantuvieron informado. Eternamente agradecido.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 3,
        name: "Ana Martínez",
        pet: "Toby (Beagle)",
        text: "Los planes de medicina preventiva son lo mejor. Toby está más sano que nunca y yo tengo la tranquilidad de que está en las mejores manos. El trato es muy personalizado.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 4,
        name: "Javier López",
        pet: "Max (Pastor Alemán)",
        text: "Instalaciones de primer nivel y un equipo médico que explica todo con claridad. Se nota que están a la vanguardia tecnológica. Muy recomendados.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 5,
        name: "Elena Sánchez",
        pet: "Mimi (Conejo)",
        text: "Es difícil encontrar veterinarios que sepan tratar animales exóticos con tanta delicadeza. Mimi se recuperó perfectamente de su cirugía. Gracias por todo.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 6,
        name: "Roberto Gómez",
        pet: "Bruno (Bulldog Francés)",
        text: "El servicio de peluquería y spa es fantástico. Bruno sale relajado y guapísimo. Se nota que usan productos de alta calidad.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
];

export default function Testimonials() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-brand-600">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Vuestras <span className="italic">Historias</span>
                        </h1>
                        <p className="text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
                            La confianza de nuestros clientes es nuestro mayor orgullo y motivación.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-stone-50 border-b border-stone-100">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-brand-600 mb-2">2k+</div>
                            <div className="text-stone-500 font-medium uppercase tracking-wider text-xs">Pacientes Felices</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-brand-600 mb-2">4.9/5</div>
                            <div className="text-stone-500 font-medium uppercase tracking-wider text-xs">Calificación Media</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-brand-600 mb-2">15+</div>
                            <div className="text-stone-500 font-medium uppercase tracking-wider text-xs">Años de Experiencia</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-brand-600 mb-2">24/7</div>
                            <div className="text-stone-500 font-medium uppercase tracking-wider text-xs">Atención Continua</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {testimonials.map((testimonial) => (
                            <motion.div 
                                key={testimonial.id}
                                variants={fadeInUp}
                                className="group bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 flex flex-col relative overflow-hidden"
                            >
                                <Quote className="absolute top-8 right-8 w-12 h-12 text-brand-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-brand-400 text-brand-400" />
                                    ))}
                                </div>

                                <p className="text-stone-600 text-lg leading-relaxed mb-8 flex-grow italic">
                                    "{testimonial.text}"
                                </p>

                                <div className="flex items-center gap-4 pt-8 border-t border-stone-50">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-100 group-hover:border-brand-500 transition-colors duration-500">
                                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-800 group-hover:text-brand-600 transition-colors">{testimonial.name}</h4>
                                        <p className="text-sm text-stone-500">{testimonial.pet}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Review CTA */}
            <section className="py-24 bg-stone-900">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-600 rounded-full mb-8">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">¿Has visitado Vitalis recientemente?</h2>
                    <p className="text-xl text-stone-400 mb-12">
                        Tu opinión nos ayuda a seguir mejorando y a que otras familias confíen en nosotros. Nos encantaría conocer tu experiencia.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-brand-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center"
                        >
                            Dejar una reseña <ArrowRight className="ml-2 w-5 h-5" />
                        </motion.button>
                        <button className="text-white font-semibold hover:text-brand-400 transition-colors">
                            Ver más en Google Reviews
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
