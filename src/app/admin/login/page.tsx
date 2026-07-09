"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Button from "@/components/common/Button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Credenciales inválidas. Verifica tu email y contraseña."
          : error.message
      );
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-3">
            Acceso privado
          </p>
          <h1 className="font-serif text-3xl text-[#1A1A1A] tracking-wide mb-2">
            Panel de Administración
          </h1>
          <div className="h-px w-10 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-transparent border border-[#1A1A1A]/10 p-8 md:p-10 space-y-6"
        >
          {error && (
            <div className="border border-red-900/20 bg-red-900/5 text-red-800 px-4 py-3 rounded-sm text-sm tracking-wide">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#1A1A1A]/15 rounded-sm bg-transparent text-[#1A1A1A] tracking-wide focus:outline-none focus:ring-0 focus:border-[#D4AF37] transition-colors duration-300"
              placeholder="admin@esenciaboutique.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#1A1A1A]/15 rounded-sm bg-transparent text-[#1A1A1A] tracking-wide focus:outline-none focus:ring-0 focus:border-[#D4AF37] transition-colors duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          <Button variant="primary" className="w-full tracking-widest uppercase text-sm" type="submit">
            {loading ? (
              <>
                <Loader2 className="animate-spin inline mr-2" size={16} />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>

        <p className="text-center text-xs tracking-widest text-gray-400 mt-8 uppercase">
          Esencia Boutique © 2026
        </p>
      </div>
    </div>
  );
}
