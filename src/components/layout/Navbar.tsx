import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { trackNavCTA } from "@/lib/metaPixel"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileSolucoesOpen, setMobileSolucoesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Sobre Nós", path: "/#sobre" },
    { name: "Portfólio", path: "/projetos" },
  ]

  const solucoesLinks = [
    { name: "Visão Geral (Especialidades)", path: "/solucoes" },
    { name: "Salas de Reunião", path: "/salas-reuniao" },
    { name: "Auditórios e Teatros", path: "/auditorios-e-teatros" },
    { name: "Plenários e Câmaras", path: "/plenarios-e-camaras" },
    { name: "Igrejas e Templos", path: "/igrejas-e-templos" },
    { name: "Bares e Casas Noturnas", path: "/bares-e-casas-noturnas" },
    { name: "Automação Q-SYS", path: "/qsys" },
  ]

  const handleLinkClick = (e: React.MouseEvent, linkName: string, linkPath: string) => {
    ;(window as any).dataLayer = (window as any).dataLayer || [];
    ;(window as any).dataLayer.push({ 
      event: 'nav_click', 
      destination: linkName,
      source_path: window.location.pathname
    });
    if (linkPath.includes("#")) {
      const targetHash = linkPath.split("#")[1];
      const currentPath = window.location.pathname;
      if (currentPath === "/" && linkPath.startsWith("/#")) {
        e.preventDefault();
        document.getElementById(targetHash)?.scrollIntoView({ behavior: "smooth" });
        window.history.pushState({}, "", linkPath);
      }
    }
  }

  const handleMobileLinkClick = (e: React.MouseEvent, linkName: string, linkPath: string) => {
    handleLinkClick(e, linkName, linkPath)
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-transparent",
        isScrolled
          ? "bg-white/80 dark:bg-[#05060A]/70 backdrop-blur-xl border-black/5 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,200,255,0.03)] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="/logo.png" 
            alt="Sonus Logo" 
            width={120}
            height={32}
            className="h-5 md:h-6 w-auto opacity-90 group-hover:opacity-100 transition-opacity dark:brightness-100 brightness-0" 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
              onClick={(e) => handleLinkClick(e, link.name, link.path)}
            >
              {link.name}
            </Link>
          ))}

          {/* Soluções Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors py-2">
              Soluções <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 w-[240px]">
              <div className="bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
                {solucoesLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={(e) => handleLinkClick(e, link.name, link.path)}
                    className="relative z-10 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors flex items-center justify-between group/link"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/#contato"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
            onClick={(e) => handleLinkClick(e, "Contato", "/#contato")}
          >
            Contato
          </Link>

          <Link
            to="/#contato"
            onClick={(e) => {
              trackNavCTA('Menu_Desktop');
              const currentPath = window.location.pathname;
              if (currentPath === "/") {
                e.preventDefault();
                document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState({}, "", "/#contato");
              }
            }}
            className="text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(41,128,185,0.4)] hover:shadow-[0_0_25px_rgba(41,128,185,0.6)]"
          >
            Orçamento
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            aria-label="Abrir menu"
            className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 h-[100dvh] bg-white/95 dark:bg-[#05060A]/95 backdrop-blur-3xl z-[-1] pt-[100px] px-6 pb-6 overflow-y-auto flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-lg font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors px-2 py-3 border-b border-black/5 dark:border-white/5"
              onClick={(e) => handleMobileLinkClick(e, link.name, link.path)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex flex-col border-b border-black/5 dark:border-white/5">
            <button 
              onClick={() => setMobileSolucoesOpen(!mobileSolucoesOpen)}
              className="flex items-center justify-between text-lg font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors px-2 py-3 w-full text-left"
            >
              Soluções
              <ChevronDown className={cn("w-5 h-5 transition-transform", mobileSolucoesOpen && "rotate-180")} />
            </button>
            
            <div className={cn("flex flex-col gap-1 overflow-hidden transition-all duration-300 pl-4", mobileSolucoesOpen ? "max-h-[500px] pb-3" : "max-h-0")}>
              {solucoesLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="text-base font-normal text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white py-2.5 px-2"
                  onClick={(e) => handleMobileLinkClick(e, link.name, link.path)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/#contato"
            className="text-lg font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors px-2 py-3 border-b border-black/5 dark:border-white/5"
            onClick={(e) => handleMobileLinkClick(e, "Contato", "/#contato")}
          >
            Contato
          </Link>

          <div className="mt-6 flex-1 flex flex-col justify-end">
            <Link
              to="/#contato"
              onClick={(e) => {
                trackNavCTA('Menu_Mobile');
                setIsMobileMenuOpen(false);
                const currentPath = window.location.pathname;
                if (currentPath === "/") {
                  e.preventDefault();
                  setTimeout(() => {
                    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                  window.history.pushState({}, "", "/#contato");
                }
              }}
              className="flex justify-center text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(41,128,185,0.4)]"
            >
              Falar com um Especialista
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
