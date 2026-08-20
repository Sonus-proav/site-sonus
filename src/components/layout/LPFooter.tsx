import { AudioLines } from "lucide-react"

export function LPFooter() {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <AudioLines className="h-6 w-6 text-emerald-500" />
          <img 
            src="/logo.png" 
            alt="Sonus Logo" 
            width={120}
            height={32}
            className="h-6 w-auto brightness-0 invert opacity-90" 
          />
        </div>
        <p className="text-zinc-500 text-sm mb-6 text-center max-w-lg">
          Soluções integradas em áudio e vídeo de alta performance. 28 anos de tradição transformando ambientes.
        </p>

        {/* SEO Coverage Text */}
        <div className="max-w-4xl text-center mb-10">
          <p className="text-zinc-600/70 text-xs leading-relaxed">
            <strong>Atendimento especializado em todo o Sul do Brasil:</strong> Projetos, venda e instalação de sonorização, acústica e salas de videoconferência para empresas, auditórios e igrejas. 
            <br className="hidden sm:block" />
            Cobertura ativa no <strong>Paraná</strong> (Curitiba, Maringá, Londrina, Cascavel, Ponta Grossa, Foz do Iguaçu, Pato Branco, Francisco Beltrão), <strong>Santa Catarina</strong> (Florianópolis, Joinville, Blumenau, Balneário Camboriú, Chapecó) e <strong>Rio Grande do Sul</strong> (Porto Alegre, Caxias do Sul, Passo Fundo).
          </p>
        </div>

        <div className="w-full h-px bg-white/5 mb-8" />
        <p className="text-zinc-600 text-xs text-center">
          © {new Date().getFullYear()} Sonus Pro Audio e Video. Todos os direitos reservados. CNPJ: 02.484.642/0001-39
        </p>
      </div>
    </footer>
  )
}
