import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    images?: string[];
}

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, delta: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
    toast: { message: string; status: 'success' | 'warning' | null };
    hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('vitalisShopCart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; status: 'success' | 'warning' | null }>({ message: '', status: null });

    useEffect(() => {
        localStorage.setItem('vitalisShopCart', JSON.stringify(cart));
    }, [cart]);

    const showToast = (message: string, status: 'success' | 'warning') => {
        setToast({ message, status });
        setTimeout(() => setToast({ message: '', status: null }), 2000);
    };

    const hideToast = () => setToast({ message: '', status: null });

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showToast(`${product.name} añadido al carrito`, 'success');
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + delta;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => {
        setCart([]);
        showToast('Carrito vaciado', 'warning');
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, toggleCart, toast, hideToast }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
