import { Link } from 'react-router-dom'
import { CheckCircle2, MessageSquare, ArrowLeft } from 'lucide-react'
import { FadeIn } from '../components/ui/FadeIn'
import { SEO } from '../components/SEO'

export function ThankYou() {
  const whatsappNumber = "554635237192"
  const whatsappText = encodeURIComponent("Olá, acabei de preencher o formulário no site e meu projeto tem urgência.")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-24 pb-12 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      <SEO 
        title="Obrigado pelo Contato | Sonus" 
        description="Sua mensagem foi recebida com sucesso." 
        noindex={true}
      />
      {/* Background Decorativo igual ao formulário */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: "url('/cresol.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-slate-50 dark:from-black via-slate-50/90 dark:via-black/90 to-slate-50 dark:to-black transition-colors duration-300" />

      <div className="container px-4 relative z-10 max-w-2xl mx-auto">
        <FadeIn>
          <div className="bg-white/60 dark:bg-zinc-950/60 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl transition-colors duration-300 text-center">
            
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Mensagem Recebida!
            </h1>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-10 leading-relaxed">
              Recebemos as informações do seu projeto. Nossa equipe de especialistas analisará sua demanda e entrará em contato em breve.
            </p>

            <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#25D366]" />
                Precisa de um retorno mais rápido?
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                Seu projeto possui caráter de urgência? Fale diretamente com nosso profissional agora pelo WhatsApp.
              </p>
              
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto h-14 items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg font-semibold rounded-xl px-8 shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all transform hover:scale-105"
              >
                Falar no WhatsApp
              </a>
            </div>

            <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" />
              Voltar para a página inicial
            </Link>

          </div>
        </FadeIn>
      </div>
    </div>
  )
}
