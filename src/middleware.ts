import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // Si no es una ruta de administración, continuar normalmente
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // NORMALIZACIÓN: Elimina cualquier barra diagonal al final para evitar bucles infinitos
  const currentPath = request.nextUrl.pathname.replace(/\/$/, "");

  // Si no hay usuario y no está intentando entrar al login, redirigir
  if (!user && currentPath !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Opcional por UX: Si el usuario YA está autenticado e intenta ir al login, mandarlo al panel directo
  if (user && currentPath === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
