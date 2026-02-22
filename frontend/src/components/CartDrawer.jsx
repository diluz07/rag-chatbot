import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQty, onRemove }) => {
    const total = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/,/g, ''));
        return acc + (price * item.qty);
    }, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-black/95 dark:backdrop-blur-2xl z-[70] shadow-2xl flex flex-col border-l border-gray-200 dark:border-white/10"
                    >
                        <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-black/50">
                            <h2 className="text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-white tracking-wide">
                                <ShoppingBag size={20} className="text-blue-600 dark:text-blue-400" /> Your Cart ({cartItems.length})
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                    <ShoppingBag size={64} className="opacity-20" />
                                    <p>Your cart is empty.</p>
                                    <button onClick={onClose} className="text-blue-600 font-bold hover:underline">Start Shopping</button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                                        {item.image.startsWith('http') ? (
                                            <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 shadow-sm dark:shadow-inner" />
                                        ) : (
                                            <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.image} flex-shrink-0 shadow-sm dark:shadow-inner`} />
                                        )}
                                        <div className="flex-1 flex flex-col">
                                            <h3 className="font-bold text-gray-900 dark:text-white/90 line-clamp-1 mb-1">{item.title}</h3>
                                            <p className="text-blue-600 dark:text-blue-400 font-bold mb-3 tracking-wide">₹{item.price}</p>
                                            <div className="flex items-center gap-3 mt-auto">
                                                <button onClick={() => onUpdateQty(item.id, -1)} className="p-1.5 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"><Minus size={14} /></button>
                                                <span className="text-sm font-bold w-4 text-center text-gray-900 dark:text-white">{item.qty}</span>
                                                <button onClick={() => onUpdateQty(item.id, 1)} className="p-1.5 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"><Plus size={14} /></button>
                                                <div className="flex-1"></div>
                                                <button onClick={() => onRemove(item.id)} className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/20 dark:hover:text-red-300 rounded-xl transition-colors"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-8 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/80">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Subtotal</span>
                                    <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">₹{total.toLocaleString()}</span>
                                </div>
                                <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg dark:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95 transform duration-100 uppercase tracking-widest text-sm">
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
