import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Esencia Boutique",
    short_name: "Esencia",
    description:
      "Joyería minimalista que resalta tu esencia. Piezas atemporales elaboradas con materiales premium.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#1A1A1A",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
