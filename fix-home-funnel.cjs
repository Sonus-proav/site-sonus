const fs = require('fs');
let s = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// We need to carefully replace the return statement of Home
// The return block starts at: return (\n    <div className="min-h-screen bg-[#020202] selection:bg-cyan-500/30">

const startReturn = s.indexOf('return (');
const head = s.substring(0, startReturn);

const newReturn = `return (
    <div className="min-h-screen bg-[#020202] selection:bg-cyan-500/30">
      <SEO 
        title="Sonus | Integração Audiovisual Corporativa de Alto Padrão" 
        description="Especialistas em projetos de Áudio, Vídeo e Automação para Ambientes Corporativos. Projetamos plenários, auditórios e salas de reunião com tecnologia premium."
      />
      <Helmet>
        <script type="application/ld+json">
          {\`\${JSON.stringify(schema)}\`}
        </script>
      </Helmet>

      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#020202] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_50%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.15),transparent_50%)] z-0" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-8 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Engenharia Audiovisual</span>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1] text-white drop-shadow-2xl"
              >
                Integração <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">Invisível.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
                className="mt-6 text-lg md:text-xl text-zinc-300 font-light max-w-xl leading-relaxed"
              >
                Projetos acústicos e eletrônicos de alta performance para <span className="font-semibold text-white">Salas Corporativas, Plenários e Auditórios</span>. Quando a conexão é crítica, a tecnologia deve desaparecer.
              </motion.p>

              <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mt-10 w-full"
                >
                  <Link to="/projetos" onClick={() => { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "navigate_projetos_hero" }); }} className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-white text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs lg:text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1">
                    Nossos Projetos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="https://wa.me/5546920013151" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-xs lg:text-sm transition-all duration-300 hover:-translate-y-1">
                    Falar com Especialistas
                  </a>
                  <Link to="/solucoes" onClick={() => { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "navigate_solucoes_hero" }); }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-white/5">
                    Nossas Soluções
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>
                </motion.div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
               <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF LOGOS (Brands + Clients) */}
      <Suspense fallback={null}>
        <ClientMarquee />
      </Suspense>

      {/* 3. SOLUTIONS / APPLE-STYLE BESPOKE BENTO GRID */}
      <BentoEspecialidades />

      {/* 4. METRICS / AUTHORITY NUMBERS */}
      <section className="py-20 bg-zinc-950 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]" />
        <div className="relative z-10">
          <Suspense fallback={null}>
            <SocialProofBar />
          </Suspense>
        </div>
      </section>

      {/* 5. ABOUT (NOSSA HISTÓRIA / POR QUE NÓS) */}
      <AboutExperience />

      {/* 6. TESTIMONIALS (O QUE DIZEM) */}
      <Suspense fallback={null}>
        <TestimonialSection />
      </Suspense>

      {/* 7. CONTACT FORM (LEAD CAPTURE) */}
      <section className="py-32 px-4 bg-[#050505] border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_50%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 bg-zinc-900 border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">Pronto para blindar seu espaço?</h2>
            <p className="text-lg text-zinc-400 font-light">Fale com nossos especialistas e agende uma consultoria técnica.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Nome Completo</label>
                <Input required placeholder="Ex: João Silva" className="bg-black/50 border-white/10 h-14 text-white focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Telefone / WhatsApp</label>
                <Input required type="tel" placeholder="(00) 00000-0000" className="bg-black/50 border-white/10 h-14 text-white focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">E-mail Profissional</label>
              <Input required type="email" placeholder="joao@empresa.com.br" className="bg-black/50 border-white/10 h-14 text-white focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Detalhes do Projeto</label>
              <Textarea required placeholder="Descreva brevemente o que você precisa..." className="bg-black/50 border-white/10 min-h-[120px] text-white focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>

            <div className="pt-2">
              <Turnstile siteKey="0x4AAAAAAAi9yYc7R3V1N1YF" onSuccess={setTurnstileToken} options={{ theme: 'dark' }} />
            </div>

            {submitError && <div className="text-red-400 text-sm font-medium p-4 bg-red-400/10 border border-red-400/20 rounded-xl">{submitError}</div>}

            <Button type="submit" disabled={isSubmitting} className="w-full h-16 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              {isSubmitting ? "Enviando..." : "Solicitar Consultoria Técnica"}
            </Button>
          </form>
        </div>
      </section>

      {/* 8. FOOTER WIDGETS */}
      <Suspense fallback={null}>
        <WhatsAppButton message="Olá! Gostaria de falar sobre os projetos da Sonus." />
        <WarrantyBanner />
      </Suspense>
    </div>
  )
}
`;

fs.writeFileSync('src/pages/Home.tsx', head + newReturn);
console.log("Home funnel order fixed and duplicates removed!");
