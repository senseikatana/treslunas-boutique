import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { useAllProducts } from '../hooks/useProductsQuery';
import { ProductCard } from '../components/ProductCard';

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
  const { data: products = [] } = useAllProducts();
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'Todos');
  const [selectedSize, setSelectedSize] = useState<string>('Todas');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [selectedColor, setSelectedColor] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const categories = ['Todos', 'Vestidos', 'Tops & Blusas', 'Accesorios', 'Joyería'];
  const sizes = ['Todas', 'XS', 'S', 'M', 'L', 'XL', '36', '38', '40'];
  const colors = ['Todos', 'Negro', 'Blanco', 'Burdeos', 'Oro', 'Rosa', 'Verde', 'Azul'];

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
      if (p.price < minPrice || p.price > maxPrice) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'Todos') {
        const hasColor = p.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured
    });
  }, [products, activeCategory, selectedSize, minPrice, maxPrice, selectedColor, sortBy]);

  const resetFilters = () => {
    setActiveCategory('Todos');
    setSelectedSize('Todas');
    setMinPrice(0);
    setMaxPrice(300);
    setSelectedColor('Todos');
    setSortBy('featured');
    if (setSelectedCategory) setSelectedCategory('Todos');
  };

  return (
    <section className="bg-white dark:bg-[#0f0f10] transition-colors min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        
        {/* Header Section */}
        <header className="border-b border-gray-200 dark:border-gray-800 pb-6">
          <h2 className="text-xl font-bold font-serif text-gray-900 sm:text-3xl dark:text-white">
            Colección {activeCategory !== 'Todos' ? `— ${activeCategory}` : 'de Alta Costura'}
          </h2>

          <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
            Piezas exclusivas confeccionadas con tejidos nobles, elegancia mediterránea y acabados artesanales disponibles en nuestra boutique de Cambrils.
          </p>
          <p className="text-xs text-[#c37b58] font-bold mt-1">
            Mostrando {filteredProducts.length} de {products.length} diseños
          </p>
        </header>

        {/* Mobile Filter Toggle Button */}
        <div className="mt-6 block lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex cursor-pointer items-center gap-2 border-b border-gray-400 dark:border-gray-600 pb-1 text-gray-900 dark:text-white transition hover:border-[#92003a]"
          >
            <span className="text-sm font-medium">
              {mobileFiltersOpen ? 'Ocultar Filtros & Ordenación' : 'Filtros & Ordenación'}
            </span>

            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`size-4 transition-transform duration-300 ${mobileFiltersOpen ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          
          {/* Sidebar Filter Accordions (Desktop + Mobile Toggle) */}
          <div className={`space-y-4 ${mobileFiltersOpen ? 'block mb-8' : 'hidden lg:block'}`}>
            
            {/* Sort By Selector */}
            <div>
              <label htmlFor="SortBy" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Ordenar Por
              </label>

              <select
                id="SortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="mt-1 w-full rounded-sm border border-gray-300 bg-white p-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#92003a]"
              >
                <option value="featured">Destacados de Erika</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="name">Nombre: A-Z</option>
              </select>
            </div>

            {/* Filters Section */}
            <div>
              <div className="flex items-center justify-between">
                <p className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Filtros
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-[#92003a] dark:text-[#c37b58] underline underline-offset-4 font-bold"
                >
                  Limpiar Todo
                </button>
              </div>

              <div className="mt-2 space-y-2">
                
                {/* Category Accordion */}
                <details
                  open
                  className="group overflow-hidden rounded-sm border border-gray-300 dark:border-gray-800 [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-zinc-900"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 dark:text-white transition hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider"> Categorías </span>

                    <span className="transition duration-300 group-open:-rotate-180 text-gray-500">
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-3">
                    <ul className="space-y-1">
                      {categories.map((cat) => (
                        <li key={cat}>
                          <button
                            type="button"
                            onClick={() => handleCategoryChange(cat)}
                            className={`w-full text-left px-3 py-1.5 rounded-sm text-xs transition-colors font-medium ${
                              activeCategory === cat
                                ? 'bg-[#92003a] text-white font-bold'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                            }`}
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>

                {/* Price Accordion */}
                <details
                  className="group overflow-hidden rounded-sm border border-gray-300 dark:border-gray-800 [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-zinc-900"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 dark:text-white transition hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider"> Precio (€) </span>

                    <span className="transition duration-300 group-open:-rotate-180 text-gray-500">
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-4 space-y-3">
                    <header className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Rango de €0 a €{maxPrice}</span>
                      <button
                        type="button"
                        onClick={() => { setMinPrice(0); setMaxPrice(300); }}
                        className="text-[#92003a] dark:text-[#c37b58] underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>

                    <div className="flex justify-between gap-2">
                      <label htmlFor="FilterPriceFrom" className="flex items-center gap-1 text-xs">
                        <span className="text-gray-500">Desde €</span>
                        <input
                          type="number"
                          id="FilterPriceFrom"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          placeholder="0"
                          className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white p-1 text-xs text-center"
                        />
                      </label>

                      <label htmlFor="FilterPriceTo" className="flex items-center gap-1 text-xs">
                        <span className="text-gray-500">Hasta €</span>
                        <input
                          type="number"
                          id="FilterPriceTo"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          placeholder="300"
                          className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white p-1 text-xs text-center"
                        />
                      </label>
                    </div>
                  </div>
                </details>

                {/* Sizes Accordion */}
                <details
                  className="group overflow-hidden rounded-sm border border-gray-300 dark:border-gray-800 [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-zinc-900"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 dark:text-white transition hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider"> Tallas </span>

                    <span className="transition duration-300 group-open:-rotate-180 text-gray-500">
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-3">
                    <div className="flex flex-wrap gap-1.5">
                      {sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                            selectedSize === sz
                              ? 'bg-[#c37b58] text-white border-[#c37b58]'
                              : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </details>

                {/* Colors Accordion */}
                <details
                  className="group overflow-hidden rounded-sm border border-gray-300 dark:border-gray-800 [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-zinc-900"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 dark:text-white transition hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider"> Colores </span>

                    <span className="transition duration-300 group-open:-rotate-180 text-gray-500">
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-3">
                    <ul className="space-y-1">
                      {colors.map((col) => (
                        <li key={col}>
                          <button
                            type="button"
                            onClick={() => setSelectedColor(col)}
                            className={`w-full text-left px-3 py-1 rounded text-xs transition-colors flex items-center justify-between ${
                              selectedColor === col
                                ? 'font-bold text-[#92003a] dark:text-[#c37b58]'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                            }`}
                          >
                            <span>{col}</span>
                            {selectedColor === col && <span className="text-xs">✓</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>

              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
                <p className="font-serif text-base text-gray-600 dark:text-gray-400">
                  No encontramos piezas con los filtros seleccionados.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-sm bg-[#92003a] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#72002d] transition-colors"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCard
                      product={product}
                      onSelect={onSelectProduct}
                      onQuickAdd={onQuickAdd}
                      isDarkMode={isDarkMode}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

