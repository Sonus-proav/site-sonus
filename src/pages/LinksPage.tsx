import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { SEO } from "@/components/SEO"
import { MessageCircle, Building2, Image as ImageIcon, ArrowRight } from "lucide-react"

export function LinksPage() {
  const WHATSAPP_NUMBER = "5546920013151";
  const WHATSAPP_MESSAGE = "Olá! Vim pelo Instagram e gostaria de falar com um Especialista.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <>
      <SEO 
        title="Links Oficiais | Sonus" 
        description="Acesse nossas soluções audiovisuais, portfólio e atendimento direto." 
      />
      
      <div className="min-h-[100dvh] bg-[#0B0F19] flex flex-col items-center py-12 px-5 relative overflow-hidden font-sans">
        
        {/* Subtle Ambient Light (No blur to save GPU) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.15)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
        
        <div className="w-full max-w-md relative z-10 flex flex-col items-center">
          
          {/* Header / Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 flex flex-col items-center"
          >
            <img src="/logo.png" alt="Sonus Logo" className="h-10 mb-6 object-contain invert brightness-0" style={{ filter: "brightness(0) invert(1)" }} />
            <h1 className="text-white text-xl font-bold tracking-tight">Soluções Audiovisuais</h1>
            <p className="text-zinc-400 text-sm mt-1">Engenharia e Tecnologia de Ponta</p>
          </motion.div>

          {/* Links Container */}
          <motion.div 
            className="w-full flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            {/* Primary Button */}
            <motion.a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative w-full flex items-center p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden"
              data-tracking="link-whatsapp"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-white font-semibold text-base">Falar com um Especialista</h2>
                <p className="text-zinc-400 text-xs mt-0.5">Atendimento via WhatsApp</p>
              </div>
            </motion.a>

            {/* Secondary Button 1 */}
            <motion.div variants={itemVariants} className="w-full">
              <Link 
                to="/auditorios-e-teatros"
                className="group relative w-full flex items-center p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300"
                data-tracking="link-corporative"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  <Building2 className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-white font-semibold text-base">O Fim do Improviso</h2>
                  <p className="text-zinc-400 text-xs mt-0.5">Soluções Corporativas</p>
                </div>
              </Link>
            </motion.div>

            {/* Secondary Button 2 */}
            <motion.div variants={itemVariants} className="w-full">
              <Link 
                to="/projetos"
                className="group relative w-full flex items-center p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300"
                data-tracking="link-portfolio"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  <ImageIcon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-white font-semibold text-base">Ver Portfólio</h2>
                  <p className="text-zinc-400 text-xs mt-0.5">Projetos Cresol, Unisep...</p>
                </div>
              </Link>
            </motion.div>

            {/* Ghost Button */}
            <motion.div variants={itemVariants} className="w-full mt-2">
              <Link 
                to="/"
                className="group w-full flex items-center justify-center p-4 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                data-tracking="link-home"
              >
                <span className="font-medium text-sm">Acessar Site Institucional</span>
                <ArrowRight className="w-4 h-4 ml-2 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer Authority */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase mb-1">
              Sonus Pro Audio e Video
            </p>
            <p className="text-[10px] text-zinc-600 tracking-wider uppercase">
              Inteligência Audiovisual
            </p>
            <p className="text-[10px] text-zinc-700 mt-3 font-medium">
              Francisco Beltrão - PR • Atendimento Premium
            </p>
          </motion.div>

        </div>
      </div>
    </>
  )
}
