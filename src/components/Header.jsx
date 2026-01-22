import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Goalkeepers", href: "/goalkeepers" },
    { name: "Clubs", href: "/clubs" },
    { name: "Awards", href: "/awards" },
    { name: "Rankings", href: "/rankings" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950 border-b border-orange-500/20 backdrop-blur-xl">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-orange-600/10 via-red-600/10 to-orange-600/10 animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand with glow effect */}
          <a href="/" className="flex items-center gap-3 group relative">
            <div className="relative">
              {/* Glow ring */}
              {/* <div className="absolute -inset-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300"></div> */}
              <img
                src="/logo.png"
                alt="Goalkeepers Alliance Logo"
                className="relative h-20 w-20 object-contain rounded-full   group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="">
              <span className="block text-white font-black tracking-tight text-xl bg-linear-to-r from-orange-400 to-red-400 bg-clip-text">
                Goalkeepers Alliance
              </span>
              <span className="block text-orange-500/60 text-xs font-semibold tracking-widest uppercase">
                Elite Performance
              </span>
            </div>
          </a>

          {/* Desktop Navigation with hover effects */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-bold text-gray-300 hover:text-white px-4 py-2.5 rounded-xl transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">{link.name}</span>
                <div className="absolute inset-0 bg-linear-to-r from-orange-500/0 via-orange-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-orange-500 to-red-500 group-hover:w-3/4 transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {/* CTA with gradient and icon */}
          <div className="hidden md:flex">
            <a
              href="/goalkeepers"
              className="relative group bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl text-sm font-black hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Explore Goalkeepers</span>
              <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* Mobile Menu Button with animation */}
          <button
            className="md:hidden relative text-white p-2.5 rounded-xl hover:bg-orange-500/10 border border-orange-500/20 transition-all duration-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className={`transition-transform duration-300 ${open ? 'rotate-90' : ''}`}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation with slide-in effect */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-200' : 'max-h-0'}`}>
        <div className="bg-slate-900/95 border-t border-orange-500/20 backdrop-blur-xl">
          <nav className="px-4 py-6 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-bold hover:bg-linear-to-r hover:from-orange-500/10 hover:to-red-500/10 px-4 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-orange-500/20"
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/goalkeepers"
              className="mt-4 bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-3.5 rounded-xl text-sm font-black text-center hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => setOpen(false)}
            >
              Explore Goalkeepers
              <ChevronRight size={16} />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}