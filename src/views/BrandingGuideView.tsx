import React, { useState } from 'react';
import { TripleMoonLogo } from '../components/TripleMoonLogo';
import { Copy, Check, Download, Layers, Palette, Code, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface BrandingGuideViewProps {
  isDarkMode: boolean;
}

export const BrandingGuideView: React.FC<BrandingGuideViewProps> = ({ isDarkMode }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedSvgCode, setCopiedSvgCode] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'svg' | 'png' | 'webp'>('svg');

  const colorSwatches = [
    { name: 'Primary Berry', hex: '#92003A', bg: 'bg-[#92003a]', text: 'text-white', desc: 'Acciones principales y branding' },
    { name: 'Secondary Pink', hex: '#F62477', bg: 'bg-[#F62477]', text: 'text-white', desc: 'Acentos vibrantes y hovers' },
    { name: 'Soft Pink', hex: '#FFADEE', bg: 'bg-[#FFADEE]', text: 'text-zinc-900', desc: 'Fondos suaves y contenedores' },
    { name: 'Yellow Pop', hex: '#FFE185', bg: 'bg-[#FFE185]', text: 'text-zinc-900', desc: 'Badges de envío y novedades' },
    { name: 'Metallic Copper', hex: '#C37B58', bg: 'bg-[#C37B58]', text: 'text-white', desc: 'Gradients metálicos premium' },
    { name: 'Off-White', hex: '#F9F7F2', bg: 'bg-[#F9F7F2]', text: 'text-zinc-900', desc: 'Canvas claro editorial' },
    { name: 'Dark Obsidian', hex: '#1C1B1B', bg: 'bg-[#1C1B1B]', text: 'text-white', desc: 'Fondo modo oscuro celestial' },
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2500);
  };

  const svgCodeSnippet = `<svg viewBox="0 0 160 60" fill="url(#copperGradient)">
  <defs>
    <linearGradient id="copperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C37B58" />
      <stop offset="50%" stop-color="#EAB393" />
      <stop offset="100%" stop-color="#9E5232" />
    </linearGradient>
  </defs>
  <path d="M 42 10 A 20 20 0 0 0 42 50 A 24 24 0 0 1 42 10 Z" />
  <circle cx="80" cy="30" r="19" />
  <path d="M 118 10 A 24 24 0 0 1 118 50 A 20 20 0 0 0 118 10 Z" />
</svg>`;

  const handleCopySvgCode = () => {
    navigator.clipboard.writeText(svgCodeSnippet);
    setCopiedSvgCode(true);
    setTimeout(() => setCopiedSvgCode(false), 2500);
  };

  const handleDownloadAll = () => {
    const element = document.createElement("a");
    const file = new Blob([svgCodeSnippet], { type: 'image/svg+xml' });
    element.href = URL.createObjectURL(file);
    element.download = `3Lunas_Logo_Asset.${selectedFormat}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header matching screenshot #3 & #4 */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#c37b58]">DESIGN SYSTEM</span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight">
          3 Lunas DESIGN.md Branding Guide V2
        </h1>
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl">
          New vibrant brand identity system for 3 Lunas Boutique in Cambrils. Specifying typography, color palette, button components, and SVG vector canvas exports.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-[#c37b58] via-[#F62477] to-[#92003a]" />
      </div>

      {/* COLOR PALETTE SECTION matching screenshot #3 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Palette className="w-5 h-5 text-[#c37b58]" />
          <h2 className="font-heading font-black text-lg uppercase tracking-wider">COLOR PALETTE</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {colorSwatches.map((swatch, idx) => (
            <div
              key={idx}
              onClick={() => handleCopyColor(swatch.hex)}
              className={`p-4 rounded-xl border cursor-pointer hover:scale-102 transition-transform shadow-md ${
                isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              <div className={`h-24 rounded-lg ${swatch.bg} flex items-end p-3 shadow-inner relative overflow-hidden`}>
                <span className={`font-mono text-xs font-black ${swatch.text}`}>{swatch.hex}</span>
                {copiedHex === swatch.hex && (
                  <span className="absolute top-2 right-2 text-[10px] bg-black/80 text-emerald-400 px-2 py-0.5 rounded font-bold">
                    ¡Copiado!
                  </span>
                )}
              </div>
              <div className="mt-3 space-y-0.5">
                <h4 className="font-bold text-xs">{swatch.name}</h4>
                <p className="text-[10px] text-zinc-400">{swatch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TYPOGRAPHY SECTION matching screenshot #3 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Layers className="w-5 h-5 text-[#c37b58]" />
          <h2 className="font-heading font-black text-lg uppercase tracking-wider">TYPOGRAPHY HIERARCHY</h2>
        </div>

        <div className={`p-6 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#c37b58] uppercase">Headings — Montserrat Black (700 / 900)</span>
              <div className="space-y-1 border-l-2 border-[#92003a] pl-4">
                <h1 className="font-heading font-black text-3xl">HEADING 1</h1>
                <h2 className="font-heading font-bold text-2xl">Heading 2</h2>
                <h3 className="font-heading font-bold text-xl">Heading 3</h3>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#c37b58] uppercase">Body & Serif — Open Sans & Cormorant Garamond</span>
              <div className="space-y-2 border-l-2 border-[#c37b58] pl-4 text-xs text-zinc-300">
                <p className="font-serif text-lg leading-relaxed">
                  "This is a serif editorial paragraph for long-form descriptions and Erika’s style advice."
                </p>
                <p className="text-xs">
                  This is clean secondary body text in Open Sans Regular (400), clean and easy to read across mobile devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO ASSETS & VARIATIONS matching screenshot #3 & #4 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Layers className="w-5 h-5 text-[#c37b58]" />
          <h2 className="font-heading font-black text-lg uppercase tracking-wider">3 LUNAS LOGO ASSETS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metallic Copper on Black */}
          <div className="p-6 rounded-xl bg-[#0A0A0A] border border-zinc-800 text-center space-y-4 shadow-lg">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Metallic Copper on Black (Dark Mode)</span>
            <div className="py-6 flex justify-center">
              <TripleMoonLogo variant="copper" textSize="lg" />
            </div>
          </div>

          {/* Black on Off-White */}
          <div className="p-6 rounded-xl bg-[#F9F7F2] border border-zinc-300 text-center space-y-4 shadow-lg text-zinc-900">
            <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Black on Off-White (Light Mode)</span>
            <div className="py-6 flex justify-center">
              <TripleMoonLogo variant="dark" textSize="lg" />
            </div>
          </div>

          {/* White Outline */}
          <div className="p-6 rounded-xl bg-[#2A2A2E] border border-zinc-700 text-center space-y-4 shadow-lg">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">White Outline</span>
            <div className="py-6 flex justify-center">
              <TripleMoonLogo variant="outline" textSize="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* BUTTON COMPONENTS SECTION matching screenshot #3 & #4 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Layers className="w-5 h-5 text-[#c37b58]" />
          <h2 className="font-heading font-black text-lg uppercase tracking-wider">BUTTON COMPONENTS</h2>
        </div>

        <div className={`p-6 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#c37b58] uppercase">Primary Button States</h4>
              <div className="space-y-3">
                <button className="w-full py-3 bg-[#92003a] text-white font-black text-xs uppercase tracking-widest rounded shadow">
                  SHOP NOW →
                </button>
                <button className="w-full py-3 bg-[#b21b50] text-white font-black text-xs uppercase tracking-widest rounded shadow-lg scale-102">
                  SHOP NOW (HOVER STATE) →
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#c37b58] uppercase">Secondary Button States</h4>
              <div className="space-y-3">
                <button className="w-full py-3 border-2 border-[#92003a] text-[#92003a] font-black text-xs uppercase tracking-widest rounded">
                  LEARN MORE
                </button>
                <button className="w-full py-3 bg-[#92003a] text-white font-black text-xs uppercase tracking-widest rounded">
                  LEARN MORE (HOVER STATE)
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DEVELOPER EXPORT CANVAS PANEL matching screenshot #5 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Code className="w-5 h-5 text-[#c37b58]" />
          <h2 className="font-heading font-black text-lg uppercase tracking-wider">3 LUNAS LOGO INDIVIDUAL ASSET CANVASES</h2>
        </div>

        <div className={`p-6 md:p-8 rounded-2xl border space-y-8 ${
          isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Favicon Canvas (16x16) */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-[#111113] text-center space-y-3">
              <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold">
                <span>Favicon Canvas (16x16)</span>
                <Download className="w-3.5 h-3.5" />
              </div>
              <div className="h-28 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:12px_12px] rounded-lg flex items-center justify-center">
                <TripleMoonLogo variant="copper" showText={false} className="scale-75" />
              </div>
            </div>

            {/* Mobile Icon Canvas (128x128) */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-[#111113] text-center space-y-3">
              <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold">
                <span>Mobile Icon Canvas (128x128)</span>
                <Download className="w-3.5 h-3.5" />
              </div>
              <div className="h-28 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:12px_12px] rounded-lg flex items-center justify-center">
                <TripleMoonLogo variant="copper" showText={false} className="scale-110" />
              </div>
            </div>

            {/* Square Brand Mark (512x512) */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-[#111113] text-center space-y-3">
              <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold">
                <span>Square Brand Mark Canvas (512x512)</span>
                <Download className="w-3.5 h-3.5" />
              </div>
              <div className="h-28 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:12px_12px] rounded-lg flex items-center justify-center">
                <TripleMoonLogo variant="copper" showText={false} className="scale-125" />
              </div>
            </div>

          </div>

          {/* Export Controls Bar matching screenshot #5 */}
          <div className="p-6 rounded-xl bg-[#0f0f10] border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-4 text-xs">
              <span className="font-bold text-zinc-400 uppercase tracking-wider">Format Selection:</span>
              <div className="flex gap-3">
                {(['svg', 'png', 'webp'] as const).map((fmt) => (
                  <label key={fmt} className="flex items-center gap-1.5 cursor-pointer font-bold uppercase text-zinc-300">
                    <input
                      type="radio"
                      name="exportFormat"
                      checked={selectedFormat === fmt}
                      onChange={() => setSelectedFormat(fmt)}
                      className="accent-[#92003a]"
                    />
                    <span>{fmt.toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleCopySvgCode}
                className="flex-1 md:flex-none px-4 py-3 rounded border border-[#c37b58] text-[#c37b58] font-bold text-xs uppercase tracking-wider hover:bg-[#c37b58]/10 transition-colors flex items-center justify-center gap-2"
              >
                {copiedSvgCode ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSvgCode ? '¡Código Copiado!' : 'Copy SVG Code'}</span>
              </button>

              <button
                onClick={handleDownloadAll}
                className="flex-1 md:flex-none px-6 py-3 rounded bg-copper-metallic text-zinc-900 font-black text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span>Download All Assets</span>
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
