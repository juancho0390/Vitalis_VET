/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Services from './pages/Services';
import Facilities from './pages/Facilities';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-white font-sans text-gray-700">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Store />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/instalaciones" element={<Facilities />} />
              <Route path="/testimonios" element={<Testimonials />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/privacidad" element={<Privacy />} />
              <Route path="/terminos" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </HashRouter>
  );
}
