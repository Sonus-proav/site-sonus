import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Sobre Nós", path: "/#sobre" },
    { name: "Portfólio", path: "/projetos" },
    { name: "Auditórios", path: "/auditorios-e-teatros" },
    { name: "Igrejas", path: "/igrejas-e-templos" },
    { name: "Salas de Reunião", path: "/salas-reuniao" },
    { name: "Q-SYS", path: "/qsys" },
    { name: "Contato", path: "/#contato" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
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
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
              onClick={(e) => {
                if (link.path.includes("#")) {
                  const targetHash = link.path.split("#")[1];
                  const currentPath = window.location.pathname;
                  if (currentPath === "/" && link.path.startsWith("/#")) {
                    e.preventDefault();
                    document.getElementById(targetHash)?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState({}, "", link.path);
                  }
                }
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
              to="/#contato"
              onClick={(e) => {
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
        <div className="flex items-center gap-4 md:hidden">

          <button
            aria-label="Abrir menu"
            className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/80 dark:bg-[#05060A]/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 py-4 px-4 flex flex-col gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors px-2 py-1"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (link.path.includes("#")) {
                  const targetHash = link.path.split("#")[1];
                  const currentPath = window.location.pathname;
                  if (currentPath === "/" && link.path.startsWith("/#")) {
                    e.preventDefault();
                    setTimeout(() => {
                      document.getElementById(targetHash)?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                    window.history.pushState({}, "", link.path);
                  }
                }
              }}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-black/5 dark:border-white/5 pb-2">
            <Link
              to="/#contato"
              onClick={(e) => {
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
              className="flex justify-center text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 rounded-full transition-all shadow-[0_0_15px_rgba(41,128,185,0.4)]"
            >
              Orçamento
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
