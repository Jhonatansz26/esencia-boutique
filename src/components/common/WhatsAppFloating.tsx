import { MessageCircle } from "lucide-react";
import { BRAND_INFO } from "@/constants/data";

export default function WhatsAppFloating() {
  return (
    <a
      href={BRAND_INFO.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
