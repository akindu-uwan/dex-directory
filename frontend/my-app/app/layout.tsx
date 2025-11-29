// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lizard DEX Directory",
  description: "Directory of DEXes powered by Lizard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f4f7fb] text-slate-900 antialiased">
        <div className="fixed inset-0 -z-10">
          {/* soft lizard-like gradients */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-300/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-[-10%] h-80 w-80 rounded-full bg-sky-200/60 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-[-10%] h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
        </div>

        <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6">
          {/* simple top bar */}
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 via-sky-400 to-purple-500 text-xs font-black text-white shadow-md">
                LZ
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight">
                  Lizard.exchange
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  DEX Directory
                </div>
              </div>
            </div>

            <button className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
              Login
            </button>
          </header>

          {children}
        </main>
      </body>
    </html>
  );
}
