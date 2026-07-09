import { Product, Review } from "@/types";

export const BRAND_INFO = {
  name: "Esencia Boutique",
  slogan: "Joyería minimalista que resalta tu esencia",
  whatsappLink: "https://wa.me/573206771346?text=Hola%2C%20me%20interesa%20una%20pieza%20de%20Esencia%20Boutique",
  mission:
    "Crear piezas de joyería minimalista que empoderen la esencia de cada persona, combinando diseños atemporales con materiales de la más alta calidad.",
  vision:
    "Ser la marca de joyería minimalista referente en Colombia, reconocida por transformar la elegancia en simplicidad y cada pieza en una extensión de quien la lleva.",
} as const;

export const BRAND_VALUES = [
  {
    title: "Calidad",
    description:
      "Cada pieza es cuidadosamente elaborada con materiales premium que garantizan durabilidad y un acabado impecable.",
  },
  {
    title: "Elegancia",
    description:
      "Diseños minimalistas que hablan por sí solos, donde menos es más y cada detalle tiene un propósito.",
  },
  {
    title: "Autenticidad",
    description:
      "Creamos joyas únicas para personas únicas, celebrando la individualidad y el estilo personal de cada cliente.",
  },
  {
    title: "Innovación",
    description:
      "Exploramos nuevas técnicas y tendencias para ofrecer colecciones frescas que se adaptan al mundo contemporáneo.",
  },
] as const;

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Pulso Emerald Gold",
    price: 180000,
    image: "/images/pulso-emerald.png",
    whatsappMessage: "Hola! Estoy interesado en el Pulso Emerald Gold.",
  },
  {
    id: "prod-002",
    name: "Cadena Urban Steel",
    price: 220000,
    image: "/images/cadena-urban.png",
    whatsappMessage: "Hola! Estoy interesado en la Cadena Urban Steel.",
  },
  {
    id: "prod-003",
    name: "Legacy Black",
    price: 260000,
    image: "/images/legacy-black.png",
    whatsappMessage: "Hola! Estoy interesado en el set Legacy Black.",
  },
];

export const CUSTOMER_REVIEWS: Review[] = [];
