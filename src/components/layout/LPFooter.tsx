import { AudioLines } from "lucide-react"

export function LPFooter() {
  return (
    <footer className="bg-black pt-12 pb-8 border-t border-white/5 relative z-10">
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
        <p className="text-zinc-500 text-sm mb-8 text-center max-w-lg">
          Soluções integradas em áudio e vídeo de alta performance. 28 anos de tradição transformando ambientes.
        </p>
        <div className="w-full h-px bg-white/5 mb-8" />
        <p className="text-zinc-600 text-xs text-center">
          © {new Date().getFullYear()} Sonus Pro Audio e Video. Todos os direitos reservados. CNPJ: 02.484.642/0001-39
        </p>
      </div>
    </footer>
  )
}
