import React, { useState, useEffect } from 'react';
import { Users, ScanEye, HeartHandshake, ShieldCheck, FlaskConical, Stethoscope, Syringe, Siren, PawPrint, GraduationCap, BookMarked, Heart, PhoneCall, CalendarPlus, MapPin, Clock, X, MessageCircle, Landmark, ParkingCircle, Bus, Bone, Activity, Cat, Dog, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { serviceData, facilityData } from '../data/homeData';

export default function Home() {
    const [activeService, setActiveService] = useState<keyof typeof serviceData | null>(null);
    const [activeFacility, setActiveFacility] = useState<keyof typeof facilityData | null>(null);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [currentFacilityImageIndex, setCurrentFacilityImageIndex] = useState(0);

    const heroImages = [
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1920',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1920',
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1920',
        'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1920'
    ];

    const [currentHeroImage, setCurrentHeroImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (activeFacility) {
            const interval = setInterval(() => {
                setCurrentFacilityImageIndex((prev) => (prev + 1) % facilityData[activeFacility].images.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [activeFacility]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <div className="bg-stone-100/50">
            {/* Hero Section */}
            <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentHeroImage}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${heroImages[currentHeroImage]}')` }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/80"></div>
                
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20"
                >
                    <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-100 text-sm font-semibold tracking-wide mb-6 backdrop-blur-md">
                        Clínica Veterinaria 24/7
                    </motion.span>
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                        Cuidamos de tu <br/><span className="text-brand-400 italic font-serif font-light">familia.</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg md:text-2xl mb-10 text-stone-200 max-w-2xl mx-auto font-light">
                        Medicina veterinaria de excelencia, compasiva e integral para caninos y felinos en un entorno diseñado para su bienestar.
                    </motion.p>
                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button onClick={() => setIsContactModalOpen(true)} className="w-full sm:w-auto bg-brand-600 text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-brand-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                            Agenda tu Cita <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <Link to="/servicios" className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                            Explorar Servicios
                        </Link>
                    </motion.div>
                </motion.div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 10, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }} 
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
                >
                    <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2">
                        <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                    </div>
                </motion.div>
            </section>

            {/* Nosotros Section */}
            <section id="nosotros" className="py-24 bg-amber-50/50 relative overflow-hidden">
                {/* Decorative Paw Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute top-10 left-10 rotate-12"><PawPrint className="w-24 h-24" /></div>
                    <div className="absolute bottom-20 right-20 -rotate-12"><PawPrint className="w-32 h-32" /></div>
                </div>
                
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight">¿Por qué confiar en Vitalis?</h2>
                        <p className="text-xl text-stone-500 mt-4 max-w-2xl mx-auto">Nuestra propuesta de valor se sustenta en tres pilares estratégicos diseñados para la excelencia.</p>
                    </motion.div>
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: Users, title: "Equipo Humano Especializado", desc: "Especialistas altamente cualificados para un abordaje multidisciplinario, garantizando la mejor atención." },
                            { icon: ScanEye, title: "Tecnología de Vanguardia", desc: "Inversión constante en tecnología para diagnósticos y tratamientos precisos, seguros y mínimamente invasivos." },
                            { icon: HeartHandshake, title: "Experiencia Insuperable", desc: "Comunicación transparente y un entorno diseñado para el bienestar de tu mascota y tu tranquilidad." }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                variants={fadeInUp}
                                className="group p-10 bg-stone-50 rounded-3xl border border-stone-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="inline-flex p-4 bg-brand-100 text-brand-700 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-stone-800 mb-3">{item.title}</h3>
                                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

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
            </section>

            {/* Servicios Section */}
            <section id="servicios" className="py-24 bg-emerald-50/40 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                    >
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight mb-4">Soluciones completas para cada etapa</h2>
                            <p className="text-xl text-stone-500">Desde la prevención hasta los tratamientos más complejos, lo tenemos todo cubierto.</p>
                        </div>
                    </motion.div>
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            { id: 'preventiva', icon: ShieldCheck, title: "Medicina Preventiva", desc: "Planes de vacunación, control parasitario y odontología.", color: "text-brand-600", bg: "bg-brand-50" },
                            { id: 'diagnostico', icon: FlaskConical, title: "Diagnóstico Avanzado", desc: "Laboratorio interno, imagenología digital y ecografía.", color: "text-brand-600", bg: "bg-brand-50" },
                            { id: 'especialidades', icon: Stethoscope, title: "Especialidades Médicas", desc: "Cardiología, dermatología, neurología y oncología.", color: "text-brand-600", bg: "bg-brand-50" },
                            { id: 'quirurgicos', icon: Syringe, title: "Servicios Quirúrgicos", desc: "Quirófanos de vanguardia para cirugías complejas.", color: "text-brand-600", bg: "bg-brand-50" },
                            { id: 'urgencias', icon: Siren, title: "Urgencias 24/7", desc: "Atención ininterrumpida y cuidados intensivos.", color: "text-rose-600", bg: "bg-rose-50" },
                            { id: 'complementarios', icon: PawPrint, title: "Servicios Complementarios", desc: "Farmacia, fisioterapia, rehabilitación y spa.", color: "text-brand-600", bg: "bg-brand-50" }
                        ].map((service) => (
                            <motion.div 
                                key={service.id}
                                variants={fadeInUp}
                                onClick={() => setActiveService(service.id as keyof typeof serviceData)}
                                className="group bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className={`w-7 h-7 ${service.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-stone-800 mb-3">{service.title}</h3>
                                <p className="text-stone-500 mb-6 flex-grow">{service.desc}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                                        Ver detalles <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <Link 
                                        to="/servicios" 
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-xs text-stone-400 hover:text-brand-600 underline underline-offset-4"
                                    >
                                        Ir a servicios
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Tienda Teaser Section */}
            <section id="tienda" className="py-24 bg-stone-50 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-brand-900 rounded-[2.5rem] shadow-2xl p-10 md:p-16 grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-800 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-brand-700 rounded-full blur-3xl opacity-50"></div>

                        <div className="relative z-10 text-center lg:text-left">
                            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-100 text-sm font-semibold tracking-wide mb-4">
                                Nueva Tienda Online
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Todo para su bienestar en un solo lugar.</h2>
                            <p className="text-lg text-brand-100 mb-8 max-w-xl mx-auto lg:mx-0">
                                Encuentra alimentos medicados, suplementos, productos de higiene y accesorios de la más alta calidad, recomendados por nuestros especialistas.
                            </p>
                            <Link to="/tienda" className="inline-flex items-center bg-white text-brand-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-brand-50 hover:scale-105 transition-all duration-300 shadow-lg">
                                Explorar Productos <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                        
                        <div className="relative z-10 h-80 lg:h-full min-h-[300px] flex items-center justify-center">
                            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-10 left-10 w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center rotate-12">
                                <Bone className="w-10 h-10 text-brand-200" />
                            </motion.div>
                            <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center -rotate-6">
                                <Activity className="w-14 h-14 text-accent-400" />
                            </motion.div>
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/20 backdrop-blur-xl rounded-[2rem] border border-white/30 shadow-2xl flex items-center justify-center">
                                <Heart className="w-16 h-16 text-white fill-white/20" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Instalaciones Section */}
            <section id="instalaciones" className="py-24 bg-orange-50/50 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight">Un Entorno Diseñado para la Calma</h2>
                        <p className="text-xl text-stone-500 mt-4 max-w-2xl mx-auto">Nuestras instalaciones son una manifestación tangible de nuestro compromiso con el bienestar.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { id: 'recepcion', title: "Recepción cálida", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600" },
                            { id: 'consultorios', title: "Consultorios amplios", img: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600" },
                            { id: 'quirofanos', title: "Quirófanos modernos", img: "./public/images/Servicios/quirofano_moderno.png" },
                            { id: 'hospitalizacion', title: "Hospitalización separada", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600" }
                        ].map((facility, i) => (
                            <motion.div 
                                key={facility.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.1 } } }}
                                onClick={() => {
                                    setActiveFacility(facility.id as keyof typeof facilityData);
                                    setCurrentFacilityImageIndex(0);
                                }}
                                className="group relative overflow-hidden rounded-3xl cursor-pointer h-80 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <img src={facility.img} alt={facility.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent flex items-end p-6">
                                    <p className="text-white font-bold text-xl">{facility.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonios Section */}
            <section id="testimonios" className="py-24 bg-stone-100/30 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight">Familias Felices</h2>
                        <p className="text-xl text-stone-500 mt-4 max-w-2xl mx-auto">La confianza de nuestros clientes es nuestro mayor orgullo.</p>
                    </motion.div>
                </div>
                <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l after:from-white after:to-transparent">
                    <motion.div 
                        animate={{ x: [0, -1920] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        className="flex w-max py-8"
                    >
                        {[1, 2].map((set) => (
                            <div key={set} className="flex">
                                {[
                                    { name: "Max", author: "Familia Gómez", text: "El profesionalismo y el cariño con que trataron a Max durante su cirugía fue excepcional. ¡Totalmente recomendados!", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=150" },
                                    { name: "Luna", author: "Ana Restrepo", text: "Por fin un lugar con todo lo que mi gata Luna necesita. El servicio de urgencias 24/7 nos salvó de un gran susto.", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150" },
                                    { name: "Rocky", author: "Carlos Vélez", text: "Las instalaciones son impecables y la tecnología de diagnóstico es impresionante. Encontraron el problema de Rocky de inmediato.", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=150" },
                                    { name: "Kira", author: "Sofía Jaramillo", text: "La calidez humana de todo el equipo es lo que nos hace volver. Kira adora venir a sus controles. ¡Gracias Vitalis!", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=150" },
                                    { name: "Toby", author: "David Rendón", text: "Desde las vacunas de cachorro hasta la fisioterapia, Toby ha recibido la mejor atención en cada etapa. Son nuestra clínica de confianza.", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=150" }
                                ].map((t, i) => (
                                    <div key={i} className="w-[350px] bg-stone-50 rounded-[2rem] border border-stone-100 p-8 mx-4 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center space-x-4 mb-6">
                                                <img src={t.img} alt={`Mascota ${t.name}`} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                                                <div>
                                                    <h4 className="font-bold text-stone-800">{t.name}</h4>
                                                    <p className="text-sm text-stone-500">{t.author}</p>
                                                </div>
                                            </div>
                                            <p className="text-stone-600 leading-relaxed">"{t.text}"</p>
                                        </div>
                                        <div className="flex text-accent-500 mt-6">
                                            {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contacto Section */}
            <section id="contacto" className="py-24 bg-amber-50/40">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight">Estamos aquí para ayudarte. 24/7.</h2>
                        <p className="text-xl text-stone-500 mt-4 max-w-2xl mx-auto">Contáctanos para agendar una cita o para cualquier emergencia. Tu tranquilidad es nuestra prioridad.</p>
                    </motion.div>
                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <div className="bg-white border border-rose-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-rose-100 p-3 rounded-2xl">
                                        <PhoneCall className="w-6 h-6 text-rose-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-stone-800">Urgencias 24/7</h3>
                                        <p className="text-stone-500 mb-2">Atención inmediata a cualquier hora.</p>
                                        <a href="tel:+573173709451" className="text-2xl font-bold text-rose-600 hover:text-rose-700 transition-colors">(+57) 317 370 9451</a>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-brand-50 p-3 rounded-2xl">
                                        <CalendarPlus className="w-6 h-6 text-brand-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-stone-800">Citas y Consultas</h3>
                                        <p className="text-stone-600 mt-2">Tel: <a href="tel:+576044441299" className="font-semibold text-brand-600 hover:underline">(+57) 604 444 1299</a></p>
                                        <p className="text-stone-600">WA: <a href="https://wa.me/573186727815" target="_blank" rel="noreferrer" className="font-semibold text-brand-600 hover:underline">(+57) 318 672 7815</a></p>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => setIsMapModalOpen(true)} className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-stone-100 p-3 rounded-2xl group-hover:bg-brand-50 transition-colors">
                                        <MapPin className="w-6 h-6 text-stone-600 group-hover:text-brand-600 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-stone-800">Dirección</h3>
                                        <p className="text-stone-500">Calle 10A #22-04, El Poblado, Medellín</p>
                                        <p className="text-sm text-brand-600 font-semibold mt-2 flex items-center">Ver en el mapa <ArrowRight className="w-4 h-4 ml-1" /></p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
                            className="lg:col-span-3 bg-white border border-stone-100 p-10 rounded-[2.5rem] shadow-lg"
                        >
                            <h3 className="text-3xl font-bold text-stone-800 mb-4">Envíanos un mensaje</h3>
                            <p className="text-stone-500 mb-8">Para consultas no urgentes, déjanos tu mensaje y te responderemos a la brevedad.</p>
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input type="text" placeholder="Tu Nombre Completo" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-brand-500 transition-shadow" />
                                    <input type="tel" placeholder="Tu Teléfono" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-brand-500 transition-shadow" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Tu Correo Electrónico" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-brand-500 transition-shadow" />
                                </div>
                                <div>
                                    <textarea rows={4} placeholder="Escribe tu mensaje aquí..." className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-brand-500 transition-shadow resize-none"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-brand-600 text-white font-bold py-4 px-6 rounded-2xl hover:bg-brand-700 hover:shadow-lg transition-all duration-300">
                                    Enviar Mensaje
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Modals */}
            <AnimatePresence>
                {isContactModalOpen && (
                    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-lg w-full relative"
                        >
                            <button onClick={() => setIsContactModalOpen(false)} className="absolute top-6 right-6 text-stone-400 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 p-2 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="text-center">
                                <div className="inline-flex p-5 bg-brand-50 text-brand-600 rounded-3xl mb-6">
                                    <Phone className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-bold text-stone-800 mb-3">Agenda tu Cita</h2>
                                <p className="text-stone-500 mb-8">Estamos listos para atenderte. Elige la opción que mejor se adapte a tu necesidad.</p>
                                <div className="space-y-4">
                                    <a href="tel:+573173709451" className="flex items-center justify-center w-full bg-rose-50 text-rose-700 font-bold py-4 px-6 rounded-2xl hover:bg-rose-600 hover:text-white transition-colors">
                                        <PhoneCall className="mr-3 w-5 h-5" /> Llamar a Urgencias 24/7
                                    </a>
                                    <a href="https://wa.me/573186727815" target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-[#25D366]/10 text-[#25D366] font-bold py-4 px-6 rounded-2xl hover:bg-[#25D366] hover:text-white transition-colors">
                                        <MessageCircle className="mr-3 w-5 h-5" /> Agendar por WhatsApp
                                    </a>
                                    <a href="tel:+576044441299" className="flex items-center justify-center w-full bg-brand-50 text-brand-700 font-bold py-4 px-6 rounded-2xl hover:bg-brand-600 hover:text-white transition-colors">
                                        <CalendarPlus className="mr-3 w-5 h-5" /> Llamar para Citas
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {activeService && (
                    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button onClick={() => setActiveService(null)} className="absolute top-4 right-4 text-stone-600 hover:text-stone-900 bg-white/80 backdrop-blur-md rounded-full p-2 z-20 shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                                <img src={serviceData[activeService].image} alt={serviceData[activeService].title} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                                <h2 className="text-3xl font-bold text-stone-800 mb-6">{serviceData[activeService].title}</h2>
                                <div className="text-stone-600 space-y-4 prose prose-stone" dangerouslySetInnerHTML={{ __html: serviceData[activeService].description }}></div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {isMapModalOpen && (
                    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl relative overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
                        >
                            <button onClick={() => setIsMapModalOpen(false)} className="absolute top-4 right-4 text-stone-600 hover:text-stone-900 bg-white/80 backdrop-blur-md rounded-full p-2 z-20 shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                                <h2 className="text-3xl font-bold text-stone-800 mb-4">Cómo Llegar a Vitalis</h2>
                                <p className="text-stone-500 mb-8">Nos encontramos en una ubicación privilegiada en El Poblado, de fácil acceso desde las principales vías de la ciudad.</p>
                                <div className="space-y-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-brand-50 p-3 rounded-2xl">
                                            <Landmark className="w-6 h-6 text-brand-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-stone-800 mb-1">Puntos de Referencia</h3>
                                            <ul className="text-stone-500 space-y-1 text-sm">
                                                <li>A dos cuadras del Parque Lleras.</li>
                                                <li>Cerca del centro comercial El Tesoro.</li>
                                                <li>Fácil acceso desde la Avenida El Poblado.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-brand-50 p-3 rounded-2xl">
                                            <ParkingCircle className="w-6 h-6 text-brand-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-stone-800 mb-1">Parqueadero</h3>
                                            <p className="text-stone-500 text-sm">Contamos con parqueaderos vigilados para clientes en el sótano del edificio.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-brand-50 p-3 rounded-2xl">
                                            <Bus className="w-6 h-6 text-brand-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-stone-800 mb-1">Transporte Público</h3>
                                            <p className="text-stone-500 text-sm">Rutas de buses de El Poblado y estación de metro "Poblado" a pocos minutos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.339288129598!2d-75.57187188568958!3d6.219035128362677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428214820842b%3A0x633a698a5367a683!2sCl.%2010a%20%2322-4%2C%20Medell%C3%ADn%2C%20El%20Poblado%2C%20Medell%C3%ADn%2C%20Antioquia%2C%20Colombia!5e0!3m2!1sen!2sus!4v1693367888698!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </motion.div>
                    </div>
                )}

                {activeFacility && (
                    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl relative overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
                        >
                            <button onClick={() => setActiveFacility(null)} className="absolute top-4 right-4 text-stone-600 hover:text-stone-900 bg-white/80 backdrop-blur-md rounded-full p-2 z-20 shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                                <h2 className="text-3xl font-bold text-stone-800 mb-6">{facilityData[activeFacility].title}</h2>
                                <div className="text-stone-600 space-y-4 prose prose-stone" dangerouslySetInnerHTML={{ __html: facilityData[activeFacility].description }}></div>
                            </div>
                            <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-stone-100">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentFacilityImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url('${facilityData[activeFacility].images[currentFacilityImageIndex]}')` }}
                                    />
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
