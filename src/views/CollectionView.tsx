import React, { useState, useMemo, useEffect } from 'react';
import { Product, Category } from '../types';
import { useAllProducts } from '../hooks/useProductsQuery';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, X, Loader2 } from 'lucide-react';

interface CollectionViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  isDarkMode: boolean;
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  onSelectProduct,
  onQuickAdd,
  isDarkMode,
  selectedCategory,
  setSelectedCategory
}) => {
  const { data: products = [], isLoading } = useAllProducts();
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'Todos');
  const [selectedSize, setSelectedSize] = useState<string>('Todas');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const categories = ['Todos', 'Vestidos', 'Tops & Blusas', 'Accesorios', 'Joyería'];
  const sizes = ['Todas', 'XS', 'S', 'M', 'L', 'XL', '36', '38', '40'];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (setSelectedCategory) setSelectedCategory(cat);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory !== 'Todos' && p.category !== activeCategory) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'Todas' && !p.sizes.includes(selectedSize) && !p.sizes.includes('Única')) {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured
    });
  }, [products, activeCategory, selectedSize, maxPrice, sortBy]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title & Sort Control */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/20 pb-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-wide">
            Colección {activeCategory !== 'Todos' ? `— ${activeCategory}` : ''}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Mostrando {filteredProducts.length} de {products.length} piezas exclusivas
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden px-4 py-2 rounded border border-zinc-700 text-xs font-bold flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`px-3 py-2 rounded border focus:outline-none text-xs font-medium ${
                isDarkMode 
                  ? 'bg-zinc-900 border-zinc-700 text-white' 
                  : 'bg-white border-zinc-300 text-zinc-900'
              }`}
            >
              <option value="featured">Destacados</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="name">Nombre: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filters (Desktop + Mobile Drawer) */}
        <aside className={`lg:col-span-3 space-y-6 ${
          mobileFiltersOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className={`p-5 rounded-xl border space-y-6 ${
            isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/20">
              <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-[#c37b58] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filtros de Búsqueda</span>
              </h3>
              {mobileFiltersOpen && (
                <button onClick={() => setMobileFiltersOpen(false)} className="lg:hidden p-1">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Categoría</label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`block w-full text-left px-3 py-1.5 rounded text-xs transition-colors ${
                      activeCategory === cat
                        ? 'bg-[#92003a] text-white font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Talla</label>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                      selectedSize === sz
                        ? 'bg-[#c37b58] text-white border-[#c37b58]'
                        : 'border-zinc-700/60 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-zinc-400">
                <span>Precio máximo</span>
                <span className="text-[#c37b58]">€{maxPrice}</span>
              </div>
              <input
                type="range"
                min="30"
                max="200"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#92003a]"
              />
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setActiveCategory('Todos');
                setSelectedSize('Todas');
                setMaxPrice(200);
              }}
              className="w-full py-2 text-xs font-bold text-zinc-500 hover:text-rose-400 underline text-center"
            >
              Restablecer Filtros
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3 border border-dashed border-zinc-800 rounded-xl">
              <p className="font-serif text-lg text-zinc-400">No encontramos piezas con los filtros seleccionados.</p>
              <button
                onClick={() => {
                  setActiveCategory('Todos');
                  setSelectedSize('Todas');
                  setMaxPrice(200);
                }}
                className="px-4 py-2 rounded bg-[#92003a] text-white text-xs font-bold uppercase tracking-wider"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onQuickAdd={onQuickAdd}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
