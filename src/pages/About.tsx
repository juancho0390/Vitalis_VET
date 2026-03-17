import React from 'react';
import { ShieldCheck, HeartHandshake, FlaskConical, Stethoscope, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-stone-800 tracking-tight mb-6">Sobre <span className="text-brand-600">Nosotros</span></h1>
                    <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
                        Somos más que una clínica; somos el segundo hogar de tu mascota. En Vitalis, combinamos tecnología de punta con un amor incondicional por los animales.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-brand-500/10 rounded-[3rem] transform -rotate-3 scale-105"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800" 
                            alt="Equipo Veterinario Vitalis" 
                            className="rounded-[3rem] shadow-2xl relative z-10 object-cover h-[600px] w-full"
                        />
                        <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl z-20 border border-stone-100">
                            <div className="flex items-center space-x-4">
                                <div className="bg-brand-100 p-3 rounded-2xl">
                                    <HeartHandshake className="w-8 h-8 text-brand-600" />
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-stone-800">15+</p>
                                    <p className="text-stone-500 font-medium">Años de experiencia</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-10"
                    >
                        <div>
                            <h3 className="text-3xl font-bold text-stone-800 mb-4">Nuestra Misión</h3>
                            <p className="text-lg text-stone-600 leading-relaxed">
                                Brindar atención médica veterinaria excepcional, priorizando el bienestar animal y la tranquilidad de las familias, a través de un equipo altamente capacitado y tecnología de vanguardia.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 hover:border-brand-200 hover:shadow-lg transition-all">
                                <ShieldCheck className="w-10 h-10 text-brand-500 mb-4" />
                                <h4 className="text-xl font-bold text-stone-800 mb-2">Compromiso</h4>
                                <p className="text-stone-600">Atención ética y transparente en cada diagnóstico y tratamiento.</p>
                            </div>
                            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 hover:border-brand-200 hover:shadow-lg transition-all">
                                <FlaskConical className="w-10 h-10 text-brand-500 mb-4" />
                                <h4 className="text-xl font-bold text-stone-800 mb-2">Innovación</h4>
                                <p className="text-stone-600">Equipos médicos de última generación para diagnósticos precisos.</p>
                            </div>
                            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 hover:border-brand-200 hover:shadow-lg transition-all">
                                <Stethoscope className="w-10 h-10 text-brand-500 mb-4" />
                                <h4 className="text-xl font-bold text-stone-800 mb-2">Especialización</h4>
                                <p className="text-stone-600">Personal en constante formación y actualización médica.</p>
                            </div>
                            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 hover:border-brand-200 hover:shadow-lg transition-all">
                                <HeartHandshake className="w-10 h-10 text-brand-500 mb-4" />
                                <h4 className="text-xl font-bold text-stone-800 mb-2">Empatía</h4>
                                <p className="text-stone-600">Tratamos a cada paciente como si fuera nuestra propia mascota.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Team Section */}
                <div className="mt-32">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight">Nuestro Equipo de Expertos</h3>
                        <p className="text-lg text-stone-500 mt-4 max-w-2xl mx-auto">Profesionales apasionados dedicados a la salud y felicidad de tus compañeros.</p>
                    </motion.div>

                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                    >
                        {[
                            {
                                name: "Dr. Alejandro Ruiz",
                                role: "Director Médico",
                                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
                                desc: "Líder visionario con más de 15 años de experiencia en medicina veterinaria de alta complejidad.",
                                studies: "Universidad Nacional de Colombia, Maestría en Cirugía de Pequeños Animales.",
                                specialties: ["Cirugía General", "Ortopedia", "Gestión Clínica"],
                                curiosity: "Tiene 4 perros rescatados y es un apasionado del senderismo de montaña."
                            },
                            {
                                name: "Dra. Mariana Castro",
                                role: "Especialista en Medicina Interna",
                                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
                                desc: "Dedicada a desentrañar los casos médicos más complejos con un enfoque empático y detallista.",
                                studies: "Universidad de Antioquia, Especialización en Medicina Felina.",
                                specialties: ["Medicina Interna", "Endocrinología", "Medicina Felina"],
                                curiosity: "Es experta en comportamiento felino y colecciona libros antiguos de medicina."
                            },
                            {
                                name: "Dr. Sebastián Gómez",
                                role: "Especialista en Diagnóstico",
                                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
                                desc: "Experto en ver lo que otros no ven, utilizando la tecnología más avanzada para diagnósticos precisos.",
                                studies: "Universidad de Buenos Aires, Diplomado en Ecografía Avanzada.",
                                specialties: ["Radiología Digital", "Ecografía Doppler", "Tomografía"],
                                curiosity: "Toca el saxofón en una banda de jazz local todos los fines de semana."
                            }
                        ].map((member, i) => (
                            <motion.div 
                                key={i}
                                variants={fadeInUp}
                                className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                            >
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                        <p className="text-white text-sm italic">"{member.desc}"</p>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="mb-6">
                                        <h4 className="text-2xl font-bold text-stone-800 mb-1">{member.name}</h4>
                                        <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">{member.role}</span>
                                    </div>
                                    
                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <h5 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Estudios</h5>
                                            <p className="text-stone-600 text-sm leading-relaxed">{member.studies}</p>
                                        </div>
                                        <div>
                                            <h5 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Especialidades</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {member.specialties.map((spec, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-stone-100">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <Sparkles className="w-4 h-4 text-brand-500" />
                                            </div>
                                            <div>
                                                <h5 className="text-xs font-bold text-stone-800 uppercase tracking-widest mb-1">Curiosidad</h5>
                                                <p className="text-stone-500 text-xs italic leading-relaxed">{member.curiosity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
