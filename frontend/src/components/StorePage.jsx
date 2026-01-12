import React from 'react';
import { Search, ShoppingCart, User, Star, TrendingUp, Shield, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
};

const ProductCard = ({ title, price, image, category, rating }) => (
    <motion.div
        variants={fadeInUp}
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 group relative"
    >
        <div className="h-64 bg-gray-100 relative overflow-hidden">
            {/* Gradient Placeholder */}
            <div className={`w-full h-full bg-gradient-to-br ${image} group-hover:scale-110 transition-transform duration-700`}></div>
            <button className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full font-medium shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                Quick Add
            </button>
            {rating && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" /> {rating}
                </div>
            )}
        </div>
        <div className="p-5">
            <div className="text-xs text-gray-500 mb-2 uppercase font-medium tracking-wider">{category}</div>
            <h3 className="font-bold text-gray-900 mb-2 truncate text-lg group-hover:text-blue-600 transition-colors">{title}</h3>
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">₹{price}</span>
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
);

const Feature = ({ icon: Icon, title, desc }) => (
    <motion.div variants={fadeInUp} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors">
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-4">
            <Icon size={24} />
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
    </motion.div>
);

const StorePage = () => {
    return (
        // Fixed: h-screen and overflow-y-auto to allow scrolling within the fixed body
        <div className="h-screen bg-white font-sans text-gray-900 overflow-y-auto w-full selection:bg-blue-100 selection:text-blue-900 scroll-smooth">

            {/* Navbar */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-4 md:gap-8 justify-between">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">A</div>
                        <span className="font-bold text-2xl tracking-tight hidden md:block">Amazonia</span>
                    </div>

                    <div className="flex-1 max-w-xl mx-auto hidden md:block relative group">
                        <input
                            type="text"
                            placeholder="Search for anything..."
                            className="w-full bg-gray-100 border-2 border-transparent rounded-full py-3 pl-6 pr-12 focus:bg-white focus:border-blue-500 outline-none transition-all shadow-sm group-hover:shadow-md"
                        />
                        <button className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                            <Search size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-full font-medium transition-colors">
                            <User size={20} /> Sign In
                        </button>
                        <div className="relative p-3 hover:bg-gray-100 rounded-full transition-colors cursor-pointer group">
                            <ShoppingCart size={24} className="group-hover:text-blue-600 transition-colors" />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[600px] overflow-hidden">
                <div className="absolute inset-0 bg-gray-900">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
                    {/* Reverted Image: Cyberpunk/Tech vibe */}
                    <img
                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-70"
                        alt="Hero"
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-white"
                    >
                        <span className="inline-block px-4 py-1.5 bg-yellow-400 text-black text-sm font-bold rounded-full mb-6 tracking-wide">NEW ARRIVALS</span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">Future Tech <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Collection</span></h1>
                        <p className="text-gray-200 text-xl mb-10 max-w-lg leading-relaxed">Discover the latest gadgets and accessories designed for the modern era.</p>
                        <div className="flex gap-4">
                            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200">Shop Now</button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-20 pb-40">

                {/* Features Grid */}
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-32"
                >
                    <Feature icon={Truck} title="Free Shipping" desc="On all orders over $100" />
                    <Feature icon={Shield} title="Secure Payment" desc="100% secure payment" />
                    <Feature icon={TrendingUp} title="30 Day Returns" desc="Money back guarantee" />
                    <Feature icon={Clock} title="24/7 Support" desc="Expert help anytime" />
                </motion.div>

                {/* Categories Scroller - Reverted to Clean Gradients */}
                <SectionHeader title="Shop by Category" subtitle="Explore our wide range of premium collections designed for you." />
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
                        <div key={cat.name} className="min-w-[180px] h-[240px] rounded-2xl bg-gray-100 relative overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-all">
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <span className="text-white font-bold text-xl text-center">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Trending Grid */}
                <SectionHeader title="Trending This Week" subtitle="Our most popular products based on sales." />
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
                        image="from-gray-700 to-gray-900"
                    />
                    <ProductCard
                        title="Fujifilm X100V"
                        price="1,39,999"
                        category="Photography"
                        rating="4.9"
                        image="from-stone-700 to-stone-900"
                    />
                    <ProductCard
                        title="Apple Watch Ultra"
                        price="89,900"
                        category="Wearables"
                        rating="4.7"
                        image="from-orange-500 to-red-600"
                    />
                    <ProductCard
                        title="Nike Air Max 97"
                        price="16,995"
                        category="Fashion"
                        rating="4.5"
                        image="from-blue-400 to-indigo-600"
                    />
                    <ProductCard
                        title="MacBook Air M2"
                        price="1,14,900"
                        category="Laptops"
                        rating="4.9"
                        image="from-slate-200 to-slate-400"
                    />
                    <ProductCard
                        title="PlayStation 5"
                        price="54,990"
                        category="Gaming"
                        rating="4.8"
                        image="from-blue-600 to-blue-800"
                    />
                    <ProductCard
                        title="Kindle Paperwhite"
                        price="14,999"
                        category="Readers"
                        rating="4.6"
                        image="from-emerald-400 to-teal-600"
                    />
                    <ProductCard
                        title="Dyson Airwrap"
                        price="45,900"
                        category="Beauty"
                        rating="4.7"
                        image="from-pink-400 to-rose-600"
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
            <footer className="bg-gray-50 border-t border-gray-200 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">A</div>
                            <span className="font-bold text-xl">Amazonia</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The world's most innovative destination for tech and lifestyle. Built for the modern consumer.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-gray-900">Shop</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="hover:text-black cursor-pointer">New Arrivals</li>
                            <li className="hover:text-black cursor-pointer">Best Sellers</li>
                            <li className="hover:text-black cursor-pointer">Gift Cards</li>
                            <li className="hover:text-black cursor-pointer">Sale</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-gray-900">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="hover:text-black cursor-pointer">Help Center</li>
                            <li className="hover:text-black cursor-pointer">Order Status</li>
                            <li className="hover:text-black cursor-pointer">Returns</li>
                            <li className="hover:text-black cursor-pointer">Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-gray-900">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-black cursor-pointer">Terms of Service</li>
                            <li className="hover:text-black cursor-pointer">Cookie Policy</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>© 2026 Amazonia Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Twitter</span>
                        <span>Instagram</span>
                        <span>LinkedIn</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StorePage;
