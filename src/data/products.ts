import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'vestido-midi-lino-beige',
    name: 'Vestido Midi Lino Beige',
    price: 149.95,
    category: 'Vestidos',
    description: 'Confeccionado en lino natural transpirable de alta calidad. Este vestido atemporal cuenta con un corte fluido y detalles sutiles que realzan la silueta.',
    erikaAdvice: 'Combinálo con sandalias de cuero y un bolso de rafia para un look de verano sofisticado y fresco.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige Lino', hex: '#E2D5C3' },
      { name: 'Verde Olivo', hex: '#6B705C' },
      { name: 'Blanco Suave', hex: '#FFFFFF' }
    ],
    isNew: true,
    isBestseller: true,
    completeTheLookIds: ['sandalias-cuero-artesanal', 'bolso-rafia'],
    details: [
      '100% Lino orgánico certificado europeo',
      'Escote sutilmente cuadrado con tirantes ajustables',
      'Cierre con cremallera invisible posterior',
      'Diseñado y confeccionado éticamente'
    ],
    careGuide: 'Lavar a máquina en ciclo delicado a máximo 30°C. No usar secadora. Planchar a temperatura media mientras la prenda aún esté ligeramente húmeda.'
  },
  {
    id: 'luna-maxi-dress',
    name: 'Luna Maxi Dress',
    price: 120.00,
    category: 'Vestidos',
    description: 'Elegante vestido largo en gasa plisada color noche con movimiento etéreo y escote en V pronunciado. Una pieza celestial perfecta para veladas mágicas en la costa.',
    erikaAdvice: 'Añade el collar Selenite Moon y sandalias de tacón fino para deslumbrar en eventos nocturnos.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Negro Azabache', hex: '#111111' },
      { name: 'Azul Noche', hex: '#1D2A44' }
    ],
    isBestseller: true,
    completeTheLookIds: ['selenite-moon-necklace', 'pendientes-sol'],
    details: [
      'Tejido plisado ultraligero con caída impecable',
      'Forro suave tono sobre tono',
      'Espalda descubierta con lazada delicada'
    ],
    careGuide: 'Lado a mano en agua fría. Secar en superficie Plana. No retorcer.'
  },
  {
    id: 'selenite-moon-necklace',
    name: 'Selenite Moon Necklace',
    price: 45.00,
    category: 'Joyería',
    description: 'Colgante artesanal con cuarzo de selenita tallado a mano en forma de prisma lunar con engaste en plata esterlina bañada en oro rosa.',
    erikaAdvice: 'La selenita simboliza la luz y la claridad. Llévalo cerca del corazón para potenciar tu energía.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475165-8b89d4d5a9b7?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Única'],
    colors: [
      { name: 'Cobre / Plata', hex: '#C37B58' }
    ],
    isNew: true,
    completeTheLookIds: ['pendientes-sol'],
    details: [
      'Piedra natural de Selenite curada',
      'Cadena de 45cm con extensión de 5cm',
      'Resistente al agua y libre de níquel'
    ],
    careGuide: 'Limpiar suavemente con un paño microfibra seco. Evitar el contacto directo con perfumes.'
  },
  {
    id: 'bolsa-clasica-cuero',
    name: 'Bolsa Clásica de Cuero',
    price: 120.00,
    category: 'Accesorios',
    description: 'Bolso estructurado de piel de vacuno con herrajes satinados en tono oro cobrizo. Incluye bandolera ajustable y compartimentos organizadores internos.',
    erikaAdvice: 'Su diseño estructurado trasciende temporadas. Ideal tanto para outfits de oficina chic como para paseos por el puerto de Cambrils.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Única'],
    colors: [
      { name: 'Negro Obsidiana', hex: '#1C1B1B' },
      { name: 'Marrón Cuero', hex: '#8B4513' }
    ],
    isNew: true,
    completeTheLookIds: ['foulard-seda-estampado'],
    details: [
      'Piel genuina de curtido vegetal italiano',
      'Interior forrado en microfibra aterciopelada',
      'Dimensiones: 28cm x 20cm x 12cm'
    ],
    careGuide: 'Tratar periódicamente con bálsamo nutritivo para pieles.'
  },
  {
    id: 'pendientes-sol',
    name: 'Pendientes Sol',
    price: 45.00,
    category: 'Joyería',
    description: 'Pendientes de aro esculpidos con relieve radiante inspirados en los destellos del sol mediterráneo.',
    erikaAdvice: 'Aportan una calidez radiante al rostro y coordinan maravillosamente con blusas de lino o tonos neutros.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Única'],
    colors: [
      { name: 'Oro Bronce', hex: '#D4AF37' }
    ],
    isNew: true,
    completeTheLookIds: ['selenite-moon-necklace'],
    details: [
      'Latón bañado en oro de 18k de 3 micras',
      'Cierre de seguridad catalán',
      'Peso ligero para confort diario'
    ],
    careGuide: 'Guardar individualmente en su estuche de tela.'
  },
  {
    id: 'foulard-seda-estampado',
    name: 'Foulard Seda Estampado',
    price: 60.00,
    category: 'Accesorios',
    description: 'Pañuelo 100% seda natural con diseño geométrica celestial exclusivo de 3 Lunas.',
    erikaAdvice: 'Úsalo al cuello, en la muñeca o atado al asa de tu bolsa clásica de cuero para un toque sofisticado.',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['70x70 cm'],
    colors: [
      { name: 'Estampado Bronce & Terracota', hex: '#A65835' }
    ],
    isNew: true,
    completeTheLookIds: ['bolsa-clasica-cuero'],
    details: [
      '100% Seda de morera con orillo enrollado a mano',
      'Tacto sedoso ultra suave'
    ],
    careGuide: 'Lavar en seco o a mano con jabón neutro.'
  },
  {
    id: 'vestido-luna-creciente',
    name: 'Vestido Luna Creciente',
    price: 89.99,
    category: 'Vestidos',
    description: 'Vestido fluido con finos tirantes cruzados en la espalda y falda evasé que acaricia los tobillos.',
    erikaAdvice: 'Un imprescindible para las tardes de paseo por el passeig marítim.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Rosa Empolvado', hex: '#DDB7AB' },
      { name: 'Azul Ceniza', hex: '#637A8B' }
    ],
    details: [
      'Tejido satinado de bambú sostenible',
      'Caída fluida con movimiento natural'
    ],
    careGuide: 'Lavar a máquina en agua fría.'
  },
  {
    id: 'vestido-fibrame-tops',
    name: 'Top Wrap Fibrame',
    price: 89.99,
    category: 'Tops & Blusas',
    description: 'Blusa cruzada entallada a la cintura con cuello escote kimono y mangas amplias.',
    erikaAdvice: 'Sienta espectacular con pantalones de tiro alto o faldas midi de satén.',
    images: [
      'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Negro Satinado', hex: '#1A1A1A' },
      { name: 'Marfil', hex: '#F9F6F0' }
    ],
    details: ['Viscosa natural eco-friendly', 'Lazada ajustable lateral'],
    careGuide: 'Planchar al revés a baja temperatura.'
  },
  {
    id: 'sandalias-cuero-artesanal',
    name: 'Sandalias de Cuero Artesanal',
    price: 89.95,
    category: 'Accesorios',
    description: 'Sandalias planas destalonadas elaboradas artesanalmente con tiras de cuero suave entrelazadas.',
    erikaAdvice: 'La comodidad definitiva para caminar por Cambrils sin perder ni un ápice de elegancia.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [{ name: 'Cuero Avellana', hex: '#8C5230' }],
    details: ['Planta acolchada confort', 'Suela de cuero natural antideslizante'],
    careGuide: 'Mantener alejadas de la humedad directa.'
  },
  {
    id: 'bolso-rafia',
    name: 'Bolso de Rafia Meditarráneo',
    price: 59.95,
    category: 'Accesorios',
    description: 'Cesta de rafia natural tejida a mano con asas de piel vacuna y broche magnético.',
    erikaAdvice: 'El complemento estival por excelencia.',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Única'],
    colors: [{ name: 'Rafia Natural', hex: '#E0C097' }],
    details: ['Fibra vegetal de rafia 100% natural', 'Hecho a mano en España'],
    careGuide: 'Limpiar con un cepillo de cerdas suaves.'
  },
  {
    id: 'vestido-maritnito',
    name: 'Vestido Maritnito Noche',
    price: 89.99,
    category: 'Vestidos',
    description: 'Vestido entallado en satén con espalda descubierta y caída en cascada.',
    erikaAdvice: 'Llévalo con pelo recogido para dar todo el protagonismo al escote posterior.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Negro Azabache', hex: '#111111' }],
    details: ['Seda sintética reciclada premium', 'Corte al bies'],
    careGuide: 'Lavar a mano en agua tibia.'
  }
];
