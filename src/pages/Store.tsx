import React, { useState, useEffect } from 'react';
import { Search, X, Trash2, Trash, Loader2, ShoppingCart, MessageCircle, ArrowRight, Star, Heart, Filter, ChevronRight, Sparkles, PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

import Papa from 'papaparse';

interface StoreProduct {
    IDProducto: string;
    nombre: string;
    Precio: number;
    descripcion: string;
    imagen1: string;
    imagen2?: string;
    imagen3?: string;
    imagen4?: string;
    Categoria?: string;
}

export default function Store() {
    const { cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, toggleCart, toast } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [products, setProducts] = useState<StoreProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(10);
    const loadMoreRef = React.useRef<HTMLDivElement>(null);

    const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    const filteredProducts = products.filter(p => {
        const matchesSearch = (p.nombre || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        // Split by comma as requested
        const productCategories = (p.Categoria || '')
            .split(',')
            .map(c => c.trim())
            .filter(Boolean);

        const matchesCategory = selectedCategories.length === 0 || 
            selectedCategories.some(cat => {
                const normalizedCat = normalize(cat);
                return productCategories.some(pCat => normalize(pCat) === normalizedCat);
            });
            
        return matchesSearch && matchesCategory;
    });

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    const loadMore = () => {
        setVisibleCount(prev => prev + 10);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < filteredProducts.length) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [visibleCount, filteredProducts.length]);

    useEffect(() => {
        setVisibleCount(10);
    }, [searchTerm, selectedCategories]);

    useEffect(() => {
        const spreadsheetId = '1pW4eJT7dKFdi0Xyu8CrBc9_saoAav58dau0xd0F4NNw';
        
        const fetchSheetData = async (sheetName: string) => {
            const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch sheet: ${sheetName}`);
            const csvText = await response.text();
            
            return new Promise<any[]>((resolve, reject) => {
                Papa.parse(csvText, {
                    header: false,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const cleanedData = results.data.map((row: any) => {
                            if (Array.isArray(row)) {
                                return row.map(cell => typeof cell === 'string' ? cell.replace(/^"+|"+$/g, '').trim() : cell);
                            }
                            return row;
                        });
                        resolve(cleanedData);
                    },
                    error: (error) => reject(error)
                });
            });
        };

        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                const [pRows, cRows] = await Promise.all([
                    fetchSheetData('BDD Ppal'),
                    fetchSheetData('Criterios')
                ]);

                // Process Categories (Criterios)
                if (cRows && cRows.length > 0) {
                    const cats = cRows
                        .map((row: any) => row[0])
                        .filter((c: any) => {
                            if (!c) return false;
                            const normalized = c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            // Ignore common header names
                            return !['categoria', 'categorias', 'criterio', 'criterios', 'lista', 'nombre'].includes(normalized);
                        });
                    const uniqueCats = Array.from(new Set(cats)).sort((a: any, b: any) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                    setAvailableCategories(uniqueCats as string[]);
                }

                // Process Products
                if (pRows && pRows.length >= 2) {
                    // Identify headers from the first row
                    const rawHeaders = pRows[0].map((h: any) => h || '');
                    const headers = rawHeaders.map((h: any) => h.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                    
                    const findIdx = (names: string[]) => {
                        return headers.findIndex((h: any) => names.some(name => h === name || h.includes(name)));
                    };
                    
                    const idIdx = findIdx(['idproducto', 'id', 'codigo']);
                    const nameIdx = findIdx(['nombre', 'producto', 'item']);
                    const priceIdx = findIdx(['precio', 'valor', 'costo']);
                    const descIdx = findIdx(['descripcion', 'detalle']);
                    const img1Idx = findIdx(['imagen1', 'foto1']);
                    const img2Idx = findIdx(['imagen2', 'foto2']);
                    const img3Idx = findIdx(['imagen3', 'foto3']);
                    const img4Idx = findIdx(['imagen4', 'foto4']);
                    
                    // Advanced Category Detection:
                    // 1. Try to find by header name
                    let catIdx = findIdx(['categoria', 'categorias', 'clase', 'tipo']);
                    
                    // 2. If not found or if we want to be sure, check Column I (index 8)
                    if (catIdx === -1 || catIdx !== 8) {
                        const sampleRows = pRows.slice(1, 6);
                        const hasDataInColI = sampleRows.some((r: any) => r[8] && r[8].trim().length > 0);
                        if (hasDataInColI) {
                            catIdx = 8;
                        }
                    }

                    const formattedData = pRows.slice(1).map((row: any) => {
                        const cleanRow = row.map((cell: any) => cell || '');
                        
                        let rawCategory = '';
                        if (catIdx !== -1 && catIdx < cleanRow.length) {
                            rawCategory = cleanRow[catIdx];
                        } else if (cleanRow.length > 8) {
                            // Absolute fallback to Column I
                            rawCategory = cleanRow[8];
                        }
                        
                        return {
                            IDProducto: idIdx !== -1 ? cleanRow[idIdx] : (cleanRow[0] || ''),
                            nombre: nameIdx !== -1 ? cleanRow[nameIdx] : (cleanRow[1] || ''),
                            Precio: parseFloat(priceIdx !== -1 ? cleanRow[priceIdx] : cleanRow[2]) || 0,
                            descripcion: descIdx !== -1 ? cleanRow[descIdx] : (cleanRow[3] || ''),
                            imagen1: img1Idx !== -1 ? cleanRow[img1Idx] : (cleanRow[4] || ''),
                            imagen2: img2Idx !== -1 ? cleanRow[img2Idx] : (cleanRow[5] || ''),
                            imagen3: img3Idx !== -1 ? cleanRow[img3Idx] : (cleanRow[6] || ''),
                            imagen4: img4Idx !== -1 ? cleanRow[img4Idx] : (cleanRow[7] || ''),
                            Categoria: rawCategory || 'Sin Categoría'
                        };
                    });

                    setProducts(formattedData);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setError('Error al cargar el catálogo. Por favor intenta más tarde.');
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSearchTerm('');
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency', currency: 'COP', minimumFractionDigits: 0
        }).format(amount);
    };

    const handleAddToCart = (product: StoreProduct) => {
        addToCart({
            id: product.IDProducto,
            name: product.nombre,
            price: product.Precio,
            image: product.imagen1,
            description: product.descripcion
        });
    };

    const handleWhatsAppOrder = () => {
        const phoneNumber = '+573022735445';
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        let message = `*NUEVO PEDIDO - TIENDA VITALIS*\n`;
        message += `_Fecha: ${new Date().toLocaleDateString()}_\n`;
        message += `------------------------------------------\n`;
        message += `Hola, me gustaría realizar el siguiente pedido:\n\n`;
        
        message += `\`\`\`\n`;
        message += `PRODUCTO            CANT    SUBTOTAL\n`;
        message += `------------------------------------------\n`;
        
        cart.forEach((item) => {
            const name = item.name.substring(0, 18).padEnd(18);
            const qty = item.quantity.toString().padEnd(6);
            const subtotal = formatCurrency(item.price * item.quantity).padStart(12);
            message += `${name}  ${qty}  ${subtotal}\n`;
        });
        
        message += `------------------------------------------\n`;
        message += `TOTAL: ${formatCurrency(total).padStart(29)}\n`;
        message += `\`\`\`\n\n`;
        
        message += `*Instrucciones:* Quedo atento a sus indicaciones para el pago y la coordinación del envío.\n\n`;
        message += `_Pedido generado desde Vitalis Web_`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    const openProductModal = (product: StoreProduct) => {
        setSelectedProduct(product);
        setActiveImageIndex(0);
    };

    return (
        <div className="bg-[#FAFAFA] min-h-screen selection:bg-brand-100 selection:text-brand-900">
            {/* Shop Hero Section */}
            <section className="relative min-h-[70vh] flex items-center bg-[#FDFCFB] py-24 overflow-hidden border-b border-stone-100">
                {/* Immersive Background */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&q=80&w=2000" 
                        alt="Pet Family" 
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCFB] via-[#FDFCFB]/90 to-transparent"></div>
                </div>

                {/* Floating Decorative Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <motion.div 
                        animate={{ 
                            y: [0, -30, 0],
                            x: [0, 20, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-200 rounded-full blur-[140px]"
                    />
                    <motion.div 
                        animate={{ 
                            y: [0, 40, 0],
                            x: [0, -30, 0],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent-200 rounded-full blur-[120px]"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-px w-12 bg-brand-500"></div>
                                <span className="text-sm font-bold tracking-[0.4em] text-brand-600 uppercase">
                                    Cuidado con Amor
                                </span>
                                <Sparkles className="w-4 h-4 text-accent-500" />
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-stone-900 mb-8 tracking-tighter leading-[0.9]">
                                Todo para tu <br />
                                <span className="text-brand-600 italic font-serif font-light">Mejor Amigo</span>
                            </h1>
                            <p className="text-xl text-stone-600 max-w-xl mb-12 leading-relaxed font-light">
                                En Vitalis entendemos que tu mascota es parte de la familia. Por eso seleccionamos solo productos que brindan bienestar, salud y mucha felicidad.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-xl relative"
                        >
                            <div className="relative bg-white border border-stone-200 p-2 rounded-[2.5rem] flex items-center shadow-xl shadow-stone-200/50 group focus-within:border-brand-500/50 transition-all duration-500">
                                <div className="pl-6 pr-2 text-stone-400 group-focus-within:text-brand-500 transition-colors">
                                    <Search className="w-6 h-6" />
                                </div>
                                <input 
                                    type="search" 
                                    placeholder="¿Qué necesita tu compañero hoy?" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full py-5 px-2 bg-transparent text-stone-900 placeholder-stone-400 focus:outline-none text-lg font-light"
                                />
                                {searchTerm && (
                                    <button 
                                        onClick={() => setSearchTerm('')}
                                        className="p-3 text-stone-300 hover:text-stone-600 transition-colors mr-2"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-24 lg:py-32">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-72 flex-shrink-0">
                            <div className="sticky top-24 space-y-8">
                                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-100">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
                                            <PawPrint className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-stone-900 tracking-tight">Filtros</h3>
                                            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Categorías</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <button
                                                onClick={() => setSelectedCategories([])}
                                                className={`flex-grow text-left px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-between group ${
                                                    selectedCategories.length === 0
                                                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                                                        : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                                                }`}
                                            >
                                                <span className="flex items-center gap-3">
                                                    {selectedCategories.length === 0 && <Sparkles className="w-3 h-3 animate-pulse" />}
                                                    Todas las categorías
                                                </span>
                                                {selectedCategories.length === 0 && <ChevronRight className="w-4 h-4" />}
                                            </button>
                                            
                                            {selectedCategories.length > 0 && (
                                                <button 
                                                    onClick={clearFilters}
                                                    className="ml-2 p-3 text-stone-400 hover:text-rose-500 transition-colors"
                                                    title="Limpiar filtros"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="h-px bg-stone-100 my-4"></div>

                                        <div className="max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar space-y-1">
                                            {availableCategories.map((category) => (
                                                <label
                                                    key={category}
                                                    className="flex items-center gap-4 px-3 py-2.5 cursor-pointer group rounded-xl hover:bg-stone-50 transition-colors"
                                                >
                                                    <div className="relative flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCategories.includes(category)}
                                                            onChange={() => toggleCategory(category)}
                                                            className="peer appearance-none w-5 h-5 rounded-lg border-2 border-stone-200 checked:bg-brand-600 checked:border-brand-600 transition-all duration-300 cursor-pointer"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span className={`text-sm font-bold transition-colors duration-300 flex-grow ${
                                                        selectedCategories.includes(category) ? 'text-stone-900' : 'text-stone-500 group-hover:text-stone-700'
                                                    }`}>
                                                        {category}
                                                    </span>
                                                    {selectedCategories.includes(category) && (
                                                        <PawPrint className="w-3 h-3 text-brand-400 opacity-50" />
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2.5rem] border border-amber-100 relative overflow-hidden group shadow-sm">
                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 mb-6 shadow-sm">
                                            <Star className="w-6 h-6 fill-amber-500" />
                                        </div>
                                        <h4 className="font-bold text-amber-900 mb-2 leading-tight text-lg">¿Buscas algo especial?</h4>
                                        <p className="text-amber-700/70 text-sm leading-relaxed mb-6">Nuestro equipo puede ayudarte a encontrar el producto ideal para tu mascota.</p>
                                        <button className="bg-white text-amber-900 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 group/btn">
                                            Consultar <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-grow">
                            {/* Filter Bar */}
                            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100">
                                <div>
                                    <h2 className="text-3xl font-bold text-stone-900 tracking-tight flex items-center gap-3">
                                        Catálogo <span className="text-brand-600 italic font-serif font-light">Vitalis</span>
                                    </h2>
                                    <p className="text-stone-400 font-medium text-sm mt-1">
                                        Mostrando {filteredProducts.length} productos {selectedCategories.length > 0 ? `en ${selectedCategories.length} categorías` : 'en todo el catálogo'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-8 w-px bg-stone-200 hidden md:block"></div>
                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                                        <Filter className="w-3 h-3" /> Ordenar por: <span className="text-stone-900">Relevancia</span>
                                    </span>
                                </div>
                            </div>

                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-32 space-y-6">
                                    <div className="relative">
                                        <Loader2 className="w-16 h-16 text-brand-500 animate-spin" />
                                        <div className="absolute inset-0 blur-xl bg-brand-500/20 animate-pulse"></div>
                                    </div>
                                    <p className="text-stone-400 text-xl font-light tracking-widest uppercase">Sincronizando Inventario...</p>
                                </div>
                            ) : error ? (
                                <div className="bg-rose-50 border border-rose-100 text-rose-600 p-12 rounded-[3rem] text-center max-w-2xl mx-auto shadow-sm">
                                    <p className="text-xl font-light leading-relaxed">{error}</p>
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <div className="space-y-12">
                                    <motion.div 
                                        layout
                                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                                    >
                                        <AnimatePresence mode="popLayout">
                                            {visibleProducts.map((product, index) => (
                                                <motion.div 
                                                    key={product.IDProducto || index} 
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    transition={{ 
                                                        duration: 0.4,
                                                        layout: { duration: 0.4 }
                                                    }}
                                                    className="group relative bg-white rounded-[2.5rem] border border-stone-100 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-700"
                                                >
                                                    {/* Product Image Wrapper */}
                                                    <div className="relative h-64 bg-stone-50 overflow-hidden p-8 flex items-center justify-center">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-stone-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                                        
                                                        {/* Quick Action Overlay */}
                                                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-stone-400 hover:text-rose-500 transition-colors">
                                                                <Heart className="w-5 h-5" />
                                                            </button>
                                                            <button onClick={() => openProductModal(product)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-stone-400 hover:text-brand-600 transition-colors">
                                                                <Search className="w-5 h-5" />
                                                            </button>
                                                        </div>

                                                        <img 
                                                            src={product.imagen1 || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400'} 
                                                            alt={product.nombre} 
                                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-[0.22,1,0.36,1] relative z-10" 
                                                        />
                                                        
                                                        <div className="absolute bottom-4 left-6 z-20 flex flex-wrap gap-2 pr-4">
                                                            {(product.Categoria || '').split(',').filter(Boolean).map((cat, i) => (
                                                                <span key={i} className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-stone-100 flex items-center gap-1.5 shadow-sm">
                                                                    <PawPrint className="w-2.5 h-2.5" />
                                                                    {cat.trim()}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Product Info */}
                                                    <div className="p-8 flex flex-col flex-grow bg-white">
                                                        <div className="flex items-center gap-1 mb-3">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                            ))}
                                                        </div>
                                                        <h3 className="text-lg font-bold text-stone-900 group-hover:text-brand-600 transition-colors duration-300 line-clamp-2 leading-tight mb-4">{product.nombre}</h3>
                                                        
                                                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-stone-50">
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Precio</span>
                                                                <span className="text-xl font-black text-stone-900 tracking-tighter">{formatCurrency(product.Precio)}</span>
                                                            </div>
                                                            <motion.button 
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => handleAddToCart(product)} 
                                                                className="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-brand-600/20 hover:bg-brand-700 transition-all"
                                                            >
                                                                <ShoppingCart className="w-5 h-5" />
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>

                                    {visibleCount < filteredProducts.length && (
                                        <div ref={loadMoreRef} className="flex justify-center pt-12 pb-8">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-col items-center gap-4"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-5 h-5 text-brand-600 animate-spin" />
                                                    <span className="text-stone-400 font-medium tracking-wide text-sm uppercase">Cargando más productos...</span>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={loadMore}
                                                    className="group flex items-center gap-3 bg-white px-10 py-5 rounded-full border border-stone-200 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
                                                >
                                                    <span className="text-stone-600 font-bold tracking-tight">Cargar más</span>
                                                    <div className="w-8 h-8 bg-stone-50 rounded-full flex items-center justify-center group-hover:bg-brand-50 transition-colors">
                                                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-brand-600 transition-colors" />
                                                    </div>
                                                </motion.button>
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-32 bg-white rounded-[4rem] border border-stone-100 shadow-sm"
                                >
                                    <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <Search className="w-10 h-10 text-stone-300" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-stone-900 mb-4 tracking-tight">Sin coincidencias</h3>
                                    <p className="text-stone-500 text-lg font-light max-w-md mx-auto">No encontramos resultados para tu búsqueda en esta categoría.</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Shopping Cart Sidebar */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleCart}
                            className="fixed inset-0 bg-stone-950/60 backdrop-blur-md z-[100]"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-[110] flex flex-col sm:rounded-l-[3.5rem] overflow-hidden"
                        >
                            {/* Cart Header */}
                            <div className="p-10 flex justify-between items-center border-b border-stone-50 bg-stone-50/50">
                                <div>
                                    <h2 className="text-3xl font-black text-stone-900 tracking-tighter">Tu Selección</h2>
                                    <p className="text-stone-500 text-sm font-light">{cart.length} artículos listos para enviar</p>
                                </div>
                                <button onClick={toggleCart} className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-stone-100 text-stone-400 hover:text-stone-900 transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-grow overflow-y-auto p-10 space-y-8 custom-scrollbar">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-stone-300 space-y-6">
                                        <div className="w-32 h-32 bg-stone-50 rounded-full flex items-center justify-center">
                                            <ShoppingCart className="w-16 h-16 opacity-20" />
                                        </div>
                                        <p className="text-center text-xl font-light tracking-tight">Tu carrito está esperando ser llenado.</p>
                                        <button onClick={toggleCart} className="text-brand-600 font-bold uppercase tracking-widest text-xs hover:underline">Explorar Tienda</button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {cart.map(item => (
                                            <motion.div 
                                                layout
                                                key={item.id} 
                                                className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100"
                                            >
                                                <div className="w-24 h-24 bg-white rounded-2xl p-3 flex-shrink-0 shadow-sm border border-stone-100">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="w-full h-full object-contain mix-blend-multiply" 
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-stone-900 line-clamp-1 leading-tight mb-1">{item.name}</h4>
                                                    <p className="text-brand-600 font-black text-lg mb-3">{formatCurrency(item.price)}</p>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                                                            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:bg-stone-50 transition-colors">-</button>
                                                            <span className="font-bold text-stone-900 px-3 min-w-[2.5rem] text-center text-sm">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:bg-stone-50 transition-colors">+</button>
                                                        </div>
                                                        <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-rose-500 transition-colors">
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cart Footer */}
                            {cart.length > 0 && (
                                <div className="p-10 bg-stone-50 border-t border-stone-100">
                                    <div className="flex justify-between items-end mb-8">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-1">Total Estimado</span>
                                            <span className="text-4xl font-black text-stone-900 tracking-tighter">
                                                {formatCurrency(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                                            </span>
                                        </div>
                                        <button onClick={clearCart} className="text-rose-500 text-xs font-bold uppercase tracking-widest hover:underline">Vaciar</button>
                                    </div>
                                    
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleWhatsAppOrder}
                                        className="w-full bg-brand-600 text-white font-black py-6 px-8 rounded-[2rem] shadow-2xl shadow-brand-600/30 hover:bg-brand-700 transition-all flex items-center justify-center gap-4 text-lg uppercase tracking-widest"
                                    >
                                        <MessageCircle className="w-6 h-6" />
                                        Realizar Pedido por WhatsApp
                                    </motion.button>
                                    <p className="text-center text-[10px] text-stone-400 mt-6 uppercase tracking-[0.2em] font-bold">
                                        Envío seguro a todo el país • Atención personalizada
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-stone-950/80 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-white rounded-[4rem] shadow-2xl w-full max-w-6xl relative z-10 overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
                        >
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-stone-50 rounded-2xl text-stone-400 hover:text-stone-900 z-50 transition-all">
                                <X className="w-6 h-6" />
                            </button>

                            {/* Modal Left: Images */}
                            <div className="w-full lg:w-1/2 bg-stone-50 p-10 flex flex-col">
                                <div className="flex-grow flex items-center justify-center mb-10 relative bg-white rounded-[3rem] p-12 shadow-inner border border-stone-100">
                                    <AnimatePresence mode="wait">
                                        <motion.img 
                                            key={activeImageIndex}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            src={[selectedProduct.imagen1, selectedProduct.imagen2, selectedProduct.imagen3, selectedProduct.imagen4].filter(Boolean)[activeImageIndex]} 
                                            alt={selectedProduct.nombre} 
                                            className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl" 
                                        />
                                    </AnimatePresence>
                                </div>
                                <div className="flex justify-center gap-4">
                                    {[selectedProduct.imagen1, selectedProduct.imagen2, selectedProduct.imagen3, selectedProduct.imagen4].filter(Boolean).map((img, index) => (
                                        <button 
                                            key={index} 
                                            onClick={() => setActiveImageIndex(index)}
                                            className={`w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 transition-all p-2 ${activeImageIndex === index ? 'border-brand-500 shadow-lg scale-110' : 'border-stone-100 hover:border-brand-200'}`}
                                        >
                                            <img src={img} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Modal Right: Info */}
                            <div className="w-full lg:w-1/2 p-12 md:p-20 flex flex-col overflow-y-auto bg-white custom-scrollbar">
                                <div className="mb-8 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 text-[10px] font-black rounded-full tracking-[0.2em] uppercase border border-brand-100">
                                        <Sparkles className="w-3 h-3" /> Producto Premium
                                    </span>
                                    {(selectedProduct.Categoria || '').split(',').filter(Boolean).map((cat, i) => (
                                        <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-600 text-[10px] font-black rounded-full tracking-[0.2em] uppercase border border-stone-200">
                                            <PawPrint className="w-3 h-3" /> {cat.trim()}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight mb-6 tracking-tighter">{selectedProduct.nombre}</h2>
                                <div className="flex items-baseline gap-4 mb-12">
                                    <span className="text-5xl font-black text-brand-600 tracking-tighter">{formatCurrency(selectedProduct.Precio)}</span>
                                    <span className="text-stone-400 text-sm font-light uppercase tracking-widest">IVA Incluido</span>
                                </div>
                                
                                <div className="space-y-8 mb-16">
                                    <div>
                                        <h3 className="text-xs font-black text-stone-900 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                            <div className="w-8 h-px bg-brand-500"></div> Descripción
                                        </h3>
                                        <p className="text-stone-500 leading-relaxed text-lg font-light">{selectedProduct.descripcion}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
                                            <h4 className="font-bold text-stone-900 text-sm mb-2">Envío Express</h4>
                                            <p className="text-stone-400 text-xs font-light">Entrega en 24-48 horas hábiles.</p>
                                        </div>
                                        <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
                                            <h4 className="font-bold text-stone-900 text-sm mb-2">Garantía Vitalis</h4>
                                            <p className="text-stone-400 text-xs font-light">Calidad certificada por expertos.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-auto flex gap-4">
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }} 
                                        className="flex-grow bg-brand-600 text-white font-black py-6 px-10 rounded-[2rem] shadow-2xl shadow-brand-600/30 hover:bg-brand-700 transition-all flex items-center justify-center gap-4 text-lg uppercase tracking-widest"
                                    >
                                        <ShoppingCart className="w-6 h-6" /> Añadir al Carrito
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast.status && (
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className={`fixed top-24 right-8 text-white py-5 px-8 rounded-3xl shadow-2xl z-[200] font-bold flex items-center gap-4 backdrop-blur-xl border border-white/10 ${toast.status === 'success' ? 'bg-stone-900/90' : 'bg-rose-600/90'}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toast.status === 'success' ? 'bg-brand-500' : 'bg-rose-500'}`}>
                            {toast.status === 'success' ? <ShoppingCart className="w-5 h-5" /> : <Trash className="w-5 h-5" />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-widest opacity-60">{toast.status === 'success' ? 'Completado' : 'Aviso'}</span>
                            <span className="text-sm">{toast.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

