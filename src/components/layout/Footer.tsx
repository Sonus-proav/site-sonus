import { AudioLines, Mail, MapPin, Phone } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <AudioLines className="h-6 w-6 text-primary" />
              <img 
                src="/logo.png" 
                alt="Sonus Logo" 
                className="h-6 w-auto opacity-90 hover:opacity-100 transition-opacity ml-1" 
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              Soluções integradas em áudio e vídeo de alta performance.
              28 anos de tradição transformando ambientes em experiências inesquecíveis.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/sonus.av" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors group"
              >
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">@sonus.av</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Links Rápidos</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-zinc-400 hover:text-white text-sm transition-colors">Início</Link></li>
              <li><Link to="/projetos" className="text-zinc-400 hover:text-white text-sm transition-colors">Portfólio de Projetos</Link></li>
              <li><a href="/#sobre" className="text-zinc-400 hover:text-white text-sm transition-colors">Sobre a Empresa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contato</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-zinc-400">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>R. Curitiba, 2187<br />Francisco Beltrão - PR</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-400">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                   <div className="flex flex-col gap-1">
                  <span>+55 (46) 3523-7192</span>
                 <span>+55 (46) 99975-0445</span>
                 <span>+55 (46) 92001-3151</span>
               </div>
            </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>sonusproaudio@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} Sonus Pro Audio e Video. Todos os direitos reservados. CNPJ: 02.484.642/0001-39
          </p>
        </div>
      </div>
    </footer>
  )
}
