import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, ChevronRight, Award } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Goalkeepers", href: "/goalkeepers" },
    { name: "Clubs", href: "/clubs" },
    { name: "Awards", href: "/awards" },
  ];

  const resources = [
    { name: "Rankings", href: "/rankings" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-orange-500/20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-600/5 via-red-600/5 to-slate-950 animate-pulse"></div>
      
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                {/* <div className="absolute -inset-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full opacity-75 group-hover:opacity-100 blur transition-all duration-300"></div> */}
                <img
                  src="/logo.png"
                  alt="Goalkeepers Alliance Logo"
                  className="relative h-20 w-20 object-contain rounded-full  shadow-orange-500/30"
                />
              </div>
              <div>
                <span className="block text-white font-black text-lg bg-linear-to-r from-orange-400 to-red-400 bg-clip-text">
                  Goalkeepers Alliance
                </span>
                <span className="block text-orange-500/60 text-xs font-semibold tracking-wider uppercase">
                  Elite Performance
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Celebrating the world's greatest goalkeepers. Where legends are made and excellence is standard.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative p-2.5 bg-slate-900 rounded-lg border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={18} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                  <div className="absolute inset-0 bg-linear-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 rounded-lg transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="h-1 w-6 bg-linear-to-r from-orange-500 to-red-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group text-gray-400 hover:text-orange-500 text-sm transition-colors duration-300 flex items-center gap-2"
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="h-1 w-6 bg-linear-to-r from-orange-500 to-red-500 rounded-full"></div>
              Resources
            </h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group text-gray-400 hover:text-orange-500 text-sm transition-colors duration-300 flex items-center gap-2"
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="h-1 w-6 bg-linear-to-r from-orange-500 to-red-500 rounded-full"></div>
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm group">
                <Mail size={16} className="text-orange-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:info@goalkeepers-alliance.com" className="hover:text-orange-500 transition-colors">
                  info@goalkeepersalliance.org
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm group">
                <Phone size={16} className="text-orange-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span>+254 756 254 693</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm group">
                <MapPin size={16} className="text-orange-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Global Headquarters<br />Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-orange-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Award size={16} className="text-orange-500" />
              <span>© {currentYear} Goalkeepers Alliance. All rights reserved.</span>
            </div>
            
            {/* Powered By */}
            <div className="flex items-center gap-2 group">
              <span className="text-gray-500 text-sm">Powered by</span>
              <a
                href="https://zafrika.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-4 py-2 bg-slate-900 rounded-lg border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10 text-white font-bold text-sm bg-linear-to-r from-orange-400 to-red-400 bg-clip-text group-hover:text-transparent transition-all">
                  Zafrika Tech Lab
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
    </footer>
  );
}