import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Star, TrendingUp, Shield, Truck, Clock, X, Plus, Minus, Trash2, ShoppingBag, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
};

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
    if (!product || !isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[80] backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-4 md:inset-auto md:w-full md:max-w-4xl max-h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl md:rounded-2xl z-[90] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-200 dark:border-white/10 m-auto top-0 bottom-0 left-0 right-0"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100/50 dark:bg-black/40 backdrop-blur rounded-full hover:bg-gray-200/50 dark:hover:bg-black/60 transition-colors z-10 shadow-lg text-gray-500 dark:text-white/80 hover:text-black dark:hover:text-white border border-transparent dark:border-white/10">
                            <X size={24} />
                        </button>

                        <div className="md:w-1/2 h-64 md:h-auto bg-gray-50 dark:bg-black flex-shrink-0 relative">
                            {product.image.startsWith('http') ? (
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${product.image}`} />
                            )}
                        </div>

                        <div className="p-8 md:w-1/2 flex flex-col overflow-y-auto bg-white dark:bg-transparent">
                            <div className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-3 uppercase tracking-widest">{product.category}</div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{product.title}</h2>

                            {product.rating && (
                                <div className="flex items-center gap-1 mb-6 text-yellow-400">
                                    <Star size={16} className="fill-current" />
                                    <span className="text-gray-500 dark:text-gray-300 font-medium text-sm ml-1">{product.rating} Rating</span>
                                </div>
                            )}

                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-end gap-3">
                                <span>₹{product.price}</span>
                                <span className="text-xl text-gray-400 dark:text-gray-500 font-normal line-through">₹{(parseFloat(product.price.replace(/,/g, '')) * 1.2).toLocaleString()}</span>
                            </div>

                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-900 dark:text-white/90 mb-3 text-lg">Description</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Experience the next generation of {product.category.toLowerCase()} with the {product.title}. Featuring advanced technology, sleek design, and premium build quality, it's designed to elevate your everyday lifestyle. In stock and ready to ship.
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10">
                                <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span> In Stock and ready to ship
                                </div>
                                <button
                                    onClick={() => {
                                        onAddToCart(product);
                                        onClose();
                                    }}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 transform duration-100 flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={20} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const ProductCard = ({ title, price, image, category, rating, onView }) => (
    <motion.div
        variants={fadeInUp}
        onClick={() => onView({ title, price, image, category, rating })}
        className="bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/20 group relative flex flex-col h-full"
    >
        <div className="h-72 bg-gray-50 dark:bg-black relative overflow-hidden flex-shrink-0">
            {/* Image/Gradient */}
            {image.startsWith('http') ? (
                <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
            ) : (
                <div className={`w-full h-full bg-gradient-to-br ${image} group-hover:scale-110 transition-transform duration-700`}></div>
            )}

            <button
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-8 py-3 rounded-full font-bold shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
                View Details
            </button>
            {rating && (
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/50 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm text-gray-900 dark:text-white/90 border border-gray-100 dark:border-white/10">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" /> {rating}
                </div>
            )}
        </div>
        <div className="p-6 flex flex-col flex-1">
            <div className="text-xs text-blue-600 dark:text-blue-400/80 mb-2 uppercase font-semibold tracking-widest">{category}</div>
            <h3 className="font-bold text-gray-900 dark:text-white/90 mb-3 text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">{title}</h3>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-white/5">
                <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">₹{price}</span>
            </div>
        </div>
    </motion.div>
);

const SectionHeader = ({ title, subtitle }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
    >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
);

const Feature = ({ icon: Icon, title, desc }) => (
    <motion.div variants={fadeInUp} className="flex flex-col items-center text-center p-8 bg-gray-50 dark:bg-[#0a0a0a] rounded-3xl hover:bg-blue-50 dark:hover:bg-[#111] transition-colors border border-transparent dark:border-white/5 hover:border-blue-100 dark:hover:border-white/10 group">
        <div className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl shadow-sm dark:shadow-inner flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon size={28} />
        </div>
        <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white/90 tracking-wide">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
);

const StorePage = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.title === product.title);
            if (existing) {
                return prev.map(item => item.title === product.title ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1, id: Date.now() }];
        });
        setIsCartOpen(true);
    };

    const updateQty = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.qty + delta;
                return newQty > 0 ? { ...item, qty: newQty } : item;
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        // Fixed: h-screen and overflow-y-auto to allow scrolling within the fixed body
        <div className="h-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-white overflow-y-auto w-full selection:bg-blue-100 dark:selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-200 scroll-smooth">

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={addToCart}
            />

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQty={updateQty}
                onRemove={removeFromCart}
            />

            {/* Navbar */}
            <nav className="sticky top-0 z-40 bg-white/90 dark:bg-black/60 backdrop-blur-xl border-b border-gray-100 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-4 md:gap-8 justify-between">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-black text-xl shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]">A</div>
                        <span className="font-black text-2xl tracking-tighter hidden md:block text-gray-900 dark:text-white">AMAZONIA</span>
                    </div>

                    <div className="flex-1 max-w-xl mx-auto hidden md:block relative group">
                        <input
                            type="text"
                            placeholder="Search the future..."
                            className="w-full bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full py-3.5 pl-6 pr-12 focus:bg-white dark:focus:bg-white/10 focus:border-blue-500 dark:focus:border-white/20 outline-none transition-all shadow-sm text-gray-900 dark:text-white placeholder-gray-500"
                        />
                        <button className="absolute right-2 top-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors shadow-lg">
                            <Search size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer text-gray-700 dark:text-white">
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full font-medium transition-colors text-gray-900 dark:text-white/90">
                            <User size={20} /> Sign In
                        </button>
                        <div onClick={() => setIsCartOpen(true)} className="relative p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer group text-gray-900 dark:text-white">
                            <ShoppingCart size={24} className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            {cartItems.length > 0 && <span className="absolute top-2 right-2 w-5 h-5 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-gray-950">{cartItems.length}</span>}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[700px] overflow-hidden">
                <div className="absolute inset-0 bg-gray-100 dark:bg-black transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100/80 dark:from-black dark:via-black/80 to-transparent z-10 transition-colors duration-500"></div>
                    <img
                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                        className={`w-full h-full object-cover transition-all duration-500 ${isDarkMode ? 'opacity-60 mix-blend-luminosity' : 'opacity-80 mix-blend-multiply'}`}
                        alt="Hero"
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <span className="inline-block px-4 py-1.5 bg-gray-900/10 dark:bg-white/20 backdrop-blur-md border border-gray-900/20 dark:border-white/30 text-gray-900 dark:text-white text-xs font-bold rounded-full mb-6 tracking-widest shadow-sm">NEW ARRIVALS</span>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-gray-900 dark:text-white drop-shadow-lg">Future Tech <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300">Collection</span></h1>
                        <p className="text-gray-700 dark:text-gray-200 text-xl md:text-2xl mb-12 max-w-lg leading-relaxed font-light drop-shadow">Discover the latest gadgets and accessories designed for the modern era.</p>
                        <div className="flex gap-4">
                            <button onClick={() => scrollToSection('trending')} className="bg-gray-900 text-white dark:bg-white dark:text-black px-10 py-5 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-1 transform duration-300">Explore Collection</button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-20 pb-40">

                {/* Features Grid */}
                <motion.div
                    id="features"
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-32 pt-20"
                >
                    <Feature icon={Truck} title="Free Shipping" desc="On all orders over $100" />
                    <Feature icon={Shield} title="Secure Payment" desc="100% secure payment" />
                    <Feature icon={TrendingUp} title="30 Day Returns" desc="Money back guarantee" />
                    <Feature icon={Clock} title="24/7 Support" desc="Expert help anytime" />
                </motion.div>

                {/* Categories Scroller - Reverted to Clean Gradients */}
                <div id="categories" className="pt-20">
                    <SectionHeader title="Shop by Category" subtitle="Explore our wide range of premium collections designed for you." />
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-6 overflow-x-auto pb-8 mb-24 no-scrollbar cursor-grab active:cursor-grabbing px-2"
                >
                    {[
                        { name: 'Electronics', color: 'from-blue-500 to-indigo-600' },
                        { name: 'Fashion', color: 'from-pink-500 to-rose-600' },
                        { name: 'Home', color: 'from-emerald-400 to-teal-600' },
                        { name: 'Beauty', color: 'from-purple-500 to-violet-600' },
                        { name: 'Sports', color: 'from-orange-400 to-red-500' },
                        { name: 'Gaming', color: 'from-cyan-500 to-blue-600' },
                        { name: 'Books', color: 'from-amber-400 to-orange-500' }
                    ].map((cat, i) => (
                        <div key={cat.name} className="min-w-[200px] h-[260px] rounded-3xl bg-gray-100 dark:bg-[#0a0a0a] relative overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-2xl transition-all border border-transparent dark:border-white/5 dark:hover:border-white/20">
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-80 dark:opacity-40 group-hover:opacity-100 dark:group-hover:opacity-80 transition-opacity duration-500 dark:mix-blend-screen`}></div>
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <span className="text-white font-bold text-2xl text-center tracking-tight drop-shadow-md">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Trending Grid */}
                <div id="trending" className="pt-20">
                    <SectionHeader title="Trending This Week" subtitle="Our most popular products based on sales." />
                </div>
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
                >
                    <ProductCard
                        title="Sony WH-1000XM5"
                        price="29,990"
                        category="Audio"
                        rating="4.8"
                        image="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400"
                        onView={setSelectedProduct}
                    />
                    <ProductCard
                        title="Fujifilm X100V"
                        price="1,39,999"
                        category="Photography"
                        rating="4.9"
                        image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400"
                        onView={setSelectedProduct}
                    />
                    <ProductCard
                        title="Apple Watch Ultra"
                        price="89,900"
                        category="Wearables"
                        rating="4.7"
                        image="https://images.unsplash.com/photo-1673307583652-3200746fd812?auto=format&fit=crop&q=80&w=400"
                        onView={setSelectedProduct}
                    />
                    <ProductCard
                        title="Nike Air Max 97"
                        price="16,995"
                        category="Fashion"
                        rating="4.5"
                        image="https://images.unsplash.com/photo-1514989940723-e8875ea6ab7d?auto=format&fit=crop&q=80&w=400"
                        onView={setSelectedProduct}
                    />
                    <ProductCard
                        title="MacBook Air M2"
                        price="1,14,900"
                        category="Laptops"
                        rating="4.9"
                        image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400"
                        onView={setSelectedProduct}
                    />
                    <ProductCard
                        title="PlayStation 5"
                        price="54,990"
                        category="Gaming"
                        rating="4.8"
                        image="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=400"
                        onView={setSelectedProduct}
                    />
                    <ProductCard
                        title="Kindle Paperwhite"
                        price="14,999"
                        category="Readers"
                        rating="4.6"
                        image="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400"
                        onView={setSelectedProduct}
                    />
                    <ProductCard
                        title="Dyson Airwrap"
                        price="45,900"
                        category="Beauty"
                        rating="4.7"
                        image="https://images.unsplash.com/photo-1522338242992-e1a54906a8ae?auto=format&fit=crop&q=80&w=400"
                        onView={setSelectedProduct}
                    />
                </motion.div>

                {/* Newsletter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-[2.5rem] bg-black text-white p-12 md:p-24 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[128px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the Community</h2>
                        <p className="text-gray-400 mb-10 text-lg">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white placeholder-gray-400 focus:bg-white/20 outline-none transition-colors backdrop-blur-sm"
                            />
                            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors">Subscribe</button>
                        </div>
                    </div>
                </motion.div>

            </main>

            {/* Footer */}
            <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-white/10 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-black text-xl">A</div>
                            <span className="font-black tracking-tighter text-2xl text-gray-900 dark:text-white">AMAZONIA</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            The world's most innovative destination for tech and lifestyle. Built for the modern consumer.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-gray-900 dark:text-white tracking-widest text-sm uppercase">Shop</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors" onClick={() => scrollToSection('categories')}>Shop by Category</li>
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors" onClick={() => scrollToSection('trending')}>Trending</li>
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Gift Cards</li>
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Sale</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-gray-900 dark:text-white tracking-widest text-sm uppercase">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Help Center</li>
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Order Status</li>
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Returns</li>
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-gray-900 dark:text-white tracking-widest text-sm uppercase">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                            <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 dark:text-gray-600">
                    <p>© 2026 Amazonia Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Twitter</span>
                        <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StorePage;
