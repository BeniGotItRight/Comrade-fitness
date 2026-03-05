import "./styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ComradeFit AI | Smart Fitness Tracker",
  description: "AI-powered fitness coaching for students and young professionals",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ComradeFit AI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-zinc-50 dark:bg-black`}
      >
        <main className="max-w-md mx-auto md:max-w-4xl p-4 pb-24 md:pb-4">
          {children}
        </main>
        {/* Mobile Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 md:hidden flex justify-around p-4 z-50">
          <a href="/" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-blue-600 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-tighter">Dash</span>
          </a>
          <a href="/meals" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-blue-600 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-tighter">Meals</span>
          </a>
          <a href="/activities" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-blue-600 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-tighter">Move</span>
          </a>
          <a href="/stats" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-blue-600 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-tighter">Stats</span>
          </a>
          <a href="/settings" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-blue-600 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-tighter">Sett</span>
          </a>
        </nav>
      </body>
    </html>
  );
}
