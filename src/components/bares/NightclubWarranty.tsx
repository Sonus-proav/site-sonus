import { memo } from "react"
import { ShieldAlert, Zap, VolumeX } from "lucide-react"

import True3DShield from "./True3DShield"

export const NightclubWarranty = memo(function NightclubWarranty() {
  return (
    <section className="w-full py-16 px-4 relative bg-[#020202] border-t border-b border-red-900/30 overflow-hidden flex justify-center">
      
      {/* 
        Efeito de Laser/Luzes de Balada no fundo do banner 
        Mixamos vermelho (alerta/multa) sendo bloqueado por azul (proteção/DSP)
      */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.8)] -translate-y-1/2" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(239,68,68,0.05)_50%,transparent_100%)]" />
      
      {/* O Escudo de Proteção cortando o laser */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-[100%] blur-[80px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-12 bg-black/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
         
         {/* True WebGL 3D Badge */}
         <div className="flex-shrink-0 relative w-64 h-64 md:w-80 md:h-80 -ml-4">
            <True3DShield />
         </div>

         {/* Texto da Garantia */}
         <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] md:text-xs font-mono text-red-400 tracking-widest uppercase font-bold">Garantia Sonus Exclusiva</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-tight mb-4 text-white">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">3 Anos de Garantia</span><br/>
               na Infraestrutura.
            </h2>
            
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
               Nós assumimos o risco da sua operação. Todo o projeto de sonorização entregue pela Sonus conta com <strong>3 anos de garantia absoluta</strong> sobre qualquer problema de execução ou instalação. Se der problema na engenharia, a responsabilidade é nossa.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20"><VolumeX className="w-4 h-4 text-blue-400" /></div>
                  <span className="text-sm font-medium text-zinc-300">Sem Fios Expostos</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20"><Zap className="w-4 h-4 text-indigo-400" /></div>
                  <span className="text-sm font-medium text-zinc-300">Sem Ruídos de Terra</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20"><ShieldAlert className="w-4 h-4 text-green-400" /></div>
                  <span className="text-sm font-medium text-zinc-300">Infraestrutura Blindada</span>
               </div>
            </div>
         </div>
      </div>
    </section>
  )
})
