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
      setError(error.message === "Invalid login credentials" 
        ? "Credenciales inválidas. Verifica tu email y contraseña." 
        : error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[#1A1A1A] tracking-wide mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600 text-sm">
            Inicia sesión para gestionar el catálogo
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
              placeholder="admin@esenciaboutique.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
              placeholder="••••••••"
              required
            />
          </div>

          <Button variant="primary" className="w-full" type="submit">
            {loading ? (
              <>
                <Loader2 className="animate-spin inline mr-2" size={18} />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Esencia Boutique © 2026
        </p>
      </div>
    </div>
  );
}
