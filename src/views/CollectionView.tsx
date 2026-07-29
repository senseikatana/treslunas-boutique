import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { useAllProducts } from '../hooks/useProductsQuery';
import { ProductCard } from '../components/ProductCard';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '../i18n/translations';

interface CollectionViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  isDarkMode: boolean;
  language?: LanguageCode;
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

  const { t } = useTranslation();

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const categories = [
    { label: t('allCategories', 'Todos'), id: 'Todos' },
    { label: t('dresses', 'Vestidos'), id: 'Vestidos' },
    { label: t('topsBlouses', 'Tops & Blusas'), id: 'Tops & Blusas' },
    { label: t('accessories', 'Accesorios'), id: 'Accesorios' },
    { label: t('jewelry', 'Joyería'), id: 'Joyería' },
  ];
  const sizes = ['Todas', 'XS', 'S', 'M', 'L', 'XL', '36', '38', '40'];
  const colors = ['Todos', 'Negro', 'Blanco', 'Burdeos', 'Oro', 'Rosa', 'Verde', 'Azul'];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    if (setSelectedCategory) setSelectedCategory(catId);
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
    <section className="bg-slate-50 dark:bg-zinc-950 transition-colors min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        
        {/* Header Section */}
        <header className="border-b border-slate-200 dark:border-zinc-800 pb-6">
          <h2 className="text-xl font-bold font-serif text-slate-900 sm:text-3xl dark:text-zinc-100">
            {t('collection', 'Colección')} {activeCategory !== 'Todos' ? `— ${activeCategory}` : ''}
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-zinc-400">
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
            className="flex cursor-pointer items-center gap-2 border-b border-slate-400 dark:border-zinc-600 pb-1 text-slate-900 dark:text-zinc-100 transition hover:border-[#92003a]"
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
              <label htmlFor="SortBy" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                Ordenar Por
              </label>

              <select
                id="SortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-2 text-sm text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#92003a]"
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
                <p className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
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
                  className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-zinc-900 shadow-sm"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-slate-900 dark:text-zinc-100 transition hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider"> Categorías </span>

                    <span className="transition duration-300 group-open:-rotate-180 text-slate-500">
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

                  <div className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3">
                    <ul className="space-y-1">
                      {categories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            type="button"
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors font-medium ${
                              activeCategory === cat.id
                                ? 'bg-[#92003a] text-white font-bold'
                                : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
                            }`}
                          >
                            {cat.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>

                {/* Price Accordion */}
                <details
                  className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-zinc-900 shadow-sm"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-slate-900 dark:text-zinc-100 transition hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider"> Precio (€) </span>

                    <span className="transition duration-300 group-open:-rotate-180 text-slate-500">
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

                  <div className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-3">
                    <header className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400">
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
                        <span className="text-slate-500">Desde €</span>
                        <input
                          type="number"
                          id="FilterPriceFrom"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          placeholder="0"
                          className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 p-1 text-xs text-center"
                        />
                      </label>

                      <label htmlFor="FilterPriceTo" className="flex items-center gap-1 text-xs">
                        <span className="text-slate-500">Hasta €</span>
                        <input
                          type="number"
                          id="FilterPriceTo"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          placeholder="300"
                          className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 p-1 text-xs text-center"
                        />
                      </label>
                    </div>
                  </div>
                </details>

                {/* Sizes Accordion */}
                <details
                  className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-zinc-900 shadow-sm"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-slate-900 dark:text-zinc-100 transition hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider"> Tallas </span>

                    <span className="transition duration-300 group-open:-rotate-180 text-slate-500">
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

                  <div className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3">
                    <div className="flex flex-wrap gap-1.5">
                      {sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                            selectedSize === sz
                              ? 'bg-[#c37b58] text-white border-[#c37b58]'
                              : 'border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:border-slate-500'
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
                  className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-zinc-900 shadow-sm"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-slate-900 dark:text-zinc-100 transition hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider"> Colores </span>

                    <span className="transition duration-300 group-open:-rotate-180 text-slate-500">
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

                  <div className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3">
                    <ul className="space-y-1">
                      {colors.map((col) => (
                        <li key={col}>
                          <button
                            type="button"
                            onClick={() => setSelectedColor(col)}
                            className={`w-full text-left px-3 py-1 rounded-lg text-xs transition-colors flex items-center justify-between ${
                              selectedColor === col
                                ? 'font-bold text-[#92003a] dark:text-[#c37b58]'
                                : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
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
              <div className="py-20 text-center space-y-3 border border-dashed border-slate-300 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/50">
                <p className="font-serif text-base text-slate-600 dark:text-zinc-400">
                  No encontramos piezas con los filtros seleccionados.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#92003a] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#72002d] transition-colors"
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


