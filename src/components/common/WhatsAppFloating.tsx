import { BRAND_INFO } from "@/constants/data";

export default function WhatsAppFloating() {
  return (
    <a
      href={BRAND_INFO.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FAF7F2] p-3 rounded-full shadow-lg border border-[#FAF7F2]/10 transition-all duration-300 hover:bg-[#FAF7F2] hover:text-[#1A1A1A] hover:scale-105"
      aria-label="Contactar por WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
        <path d="M12.004 2c-5.517 0-9.996 4.478-9.996 9.995 0 1.763.457 3.49 1.326 5.013l-1.41 5.15 5.275-1.383a9.924 9.924 0 0 0 4.805 1.223h.004c5.517 0 10-4.479 10-9.995C22.008 6.478 17.521 2 12.004 2zm3.303 13.047c-.21.587-1.213 1.063-1.683 1.127-.453.062-.906.094-2.893-.715-2.557-1.033-4.19-3.591-4.317-3.763-.127-.172-1.069-1.398-1.069-2.668 0-1.27.663-1.89.938-2.16.21-.22.567-.318.84-.318.096 0 .19 0 .273.012.243.012.355.03.518.413.21.493.713 1.715.777 1.844.064.128.096.286-.017.493-.113.207-.243.334-.372.493-.13.143-.274.302-.113.572.308.493.68 1.054 1.117 1.413.567.485 1.18.793 1.763 1.08.273.127.436.11.597-.064.162-.175.713-.81.906-1.1.144-.207.307-.175.518-.095.21.08 1.343.62 1.57.73.227.112.372.176.42.27.048.096.048.557-.163 1.144z"/>
      </svg>
    </a>
  );
}
