import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageView, Product, CartItem, Order } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { AnnouncementBanner } from './components/AnnouncementBanner';

// Views
import { HomeView } from './views/HomeView';
import { CollectionView } from './views/CollectionView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { AboutView } from './views/AboutView';
import { BrandingGuideView } from './views/BrandingGuideView';
import { ContactView } from './views/ContactView';
import { NotFoundView } from './views/NotFoundView';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Vestido Midi Lino Beige
      selectedSize: 'M',
      selectedColor: PRODUCTS[0].colors[0],
      quantity: 1
    },
    {
      product: PRODUCTS[2], // Selenite Moon Necklace
      selectedSize: 'Única',
      selectedColor: PRODUCTS[2].colors[0],
      quantity: 1
    }
  ]);

  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Modals
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  // Cart Handlers
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        i => i.product.id === newItem.product.id && 
             i.selectedSize === newItem.selectedSize &&
             i.selectedColor.name === newItem.selectedColor.name
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
    setCartDrawerOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart({
      product,
      selectedSize: product.sizes[0] || 'Única',
      selectedColor: product.colors[0] || { name: 'Estándar', hex: '#000' },
      quantity: 1
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setCartItems(prev => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleCompleteOrder = (order: Order) => {
    setLastOrder(order);
    setCartItems([]);
    setCurrentView('order-success');
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-300 ${
      isDarkMode ? 'bg-[#050505] text-[#F5F5F5]' : 'bg-[#faf8f6] text-[#1c1b1b]'
    }`}>
      {/* Sophisticated Dark Ambient Lighting Blurs */}
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-[40%] right-[15%] w-[30%] h-[30%] bg-amber-900/5 rounded-full blur-[140px]"></div>
        </div>
      )}
      
      {/* Top Announcement Banner */}
      <AnnouncementBanner
        setCurrentView={setCurrentView}
        onSelectCategory={setSelectedCategory}
      />

      {/* Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={totalCartCount}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('collection');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentView === 'home' && (
              <HomeView
                onSelectProduct={handleSelectProduct}
                onQuickAdd={handleQuickAdd}
                setCurrentView={setCurrentView}
                isDarkMode={isDarkMode}
              />
            )}

            {currentView === 'collection' && (
              <CollectionView
                onSelectProduct={handleSelectProduct}
                onQuickAdd={handleQuickAdd}
                isDarkMode={isDarkMode}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {currentView === 'product-detail' && (
              <ProductDetailView
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                onSelectProduct={handleSelectProduct}
                setCurrentView={setCurrentView}
                isDarkMode={isDarkMode}
              />
            )}

            {currentView === 'cart' && (
              <CartView
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                setCurrentView={setCurrentView}
                isDarkMode={isDarkMode}
              />
            )}

            {currentView === 'checkout' && (
              <CheckoutView
                cartItems={cartItems}
                onCompleteOrder={handleCompleteOrder}
                setCurrentView={setCurrentView}
                isDarkMode={isDarkMode}
              />
            )}

            {currentView === 'order-success' && (
              <OrderSuccessView
                order={lastOrder}
                setCurrentView={setCurrentView}
                isDarkMode={isDarkMode}
              />
            )}

            {currentView === 'about' && (
              <AboutView isDarkMode={isDarkMode} />
            )}

            {currentView === 'branding' && (
              <BrandingGuideView isDarkMode={isDarkMode} />
            )}

            {currentView === 'contact' && (
              <ContactView isDarkMode={isDarkMode} />
            )}

            {currentView === 'not-found' && (
              <NotFoundView
                setCurrentView={setCurrentView}
                isDarkMode={isDarkMode}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
        isDarkMode={isDarkMode}
      />

      {/* Overlays / Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        setCurrentView={setCurrentView}
        isDarkMode={isDarkMode}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        setCurrentView={setCurrentView}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
