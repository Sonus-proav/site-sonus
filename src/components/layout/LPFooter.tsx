import { AudioLines, Mail, MapPin, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import { PreferredSourceBadge } from "@/components/PreferredSourceBadge"

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/solucoes", label: "Soluções" },
  { to: "/projetos", label: "Portfólio" },
  { to: "/educacao", label: "Educação" },
  { to: "/podcasts", label: "Podcasts" },
  { to: "/salas-reuniao", label: "Salas de Reunião" },
  { to: "/auditorios-e-teatros", label: "Auditórios" },
  { to: "/plenarios-e-camaras", label: "Plenários" },
  { to: "/igrejas-e-templos", label: "Igrejas" },
  { to: "/bares-e-casas-noturnas", label: "Bares & Clubes" },
  { to: "/qsys", label: "Q-SYS" },
]

export function LPFooter() {
  return (
    <footer className="relative z-10 overflow-hidden bg-gradient-to-b from-[#0a0b10] via-[#050608] to-black pt-20 pb-10">
      {/* Glowing hairline separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-2xl h-20 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 flex flex-col items-center relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
            <AudioLines className="h-5 w-5 text-emerald-400" />
          </div>
          <img
            src="/logo.png"
            alt="Sonus Logo"
            width={120}
            height={32}
            className="h-6 w-auto brightness-0 invert opacity-95"
          />
        </div>
        <p className="text-zinc-300 text-base mb-8 text-center max-w-md font-light leading-relaxed">
          Soluções integradas em áudio e vídeo de alta performance.{" "}
          <span className="text-white font-medium">28 anos</span> de tradição transformando ambientes.
        </p>

        <nav
          aria-label="Verticais Sonus"
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
        >
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 rounded-full text-xs font-medium text-zinc-300 bg-white/[0.03] border border-white/10 hover:text-white hover:border-cyan-400/40 hover:bg-white/[0.08] hover:-translate-y-0.5 transition-[transform,border-color,background-color,color] duration-300"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* SEO Coverage Text */}
        <div className="max-w-3xl text-center mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
          <p className="text-zinc-500 text-xs leading-[1.8]">
            <strong className="text-zinc-300 font-semibold">Atendimento especializado em todo o Brasil e LATAM:</strong>{" "}
            Projetos, venda e instalação de sonorização, acústica e salas de videoconferência para empresas, universidades e instituições de ensino, auditórios e igrejas.
            <br className="hidden sm:block" />
            Nosso modelo de Inteligência Audiovisual permite que você contrate o{" "}
            <strong className="text-zinc-300 font-semibold">Projeto e Consultoria</strong> independente de onde estiver (Brasil e LATAM). Após a entrega técnica, a{" "}
            <strong className="text-zinc-300 font-semibold">execução e instalação</strong> podem ser contratadas conosco ou com parceiros locais indicados.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <span className="text-xs text-zinc-400">
            Acompanhe nossos conteúdos técnicos na Pesquisa Google:
          </span>
          <PreferredSourceBadge variant="compact" placement="lp_footer" />
        </div>

        {/* Dados NAP & Canais Oficiais (E-E-A-T) */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-zinc-400 text-center">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
            R. Curitiba, 2187 — Francisco Beltrão - PR
          </span>
          <a
            href="tel:+5546920013151"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
            (46) 92001-3151
          </a>
          <a
            href="mailto:sonusproaudio@gmail.com"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
            sonusproaudio@gmail.com
          </a>
          <a
            href="https://instagram.com/sonus.av"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram @sonus.av
          </a>
          <a
            href="https://br.linkedin.com/company/sonus-pro-av"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-8" />
        <p className="text-zinc-500 text-xs text-center tracking-wide">
          © {new Date().getFullYear()} Sonus Pro Audio e Video. Todos os direitos reservados.{" "}
          <span className="block sm:inline text-zinc-600">CNPJ: 02.484.642/0001-39</span>
        </p>
      </div>
    </footer>
  )
}
