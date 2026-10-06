const fs = require('fs');
let content = fs.readFileSync('src/components/ui/SocialProofBar.tsx', 'utf8');

const replacement = `          ))}
        </div>

        {/* Global Coverage Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          className="mt-20 max-w-5xl mx-auto rounded-3xl bg-[#0a0a0a] border border-white/10 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="shrink-0 relative">
            <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full group-hover:bg-cyan-500/40 transition-colors duration-700" />
          </div>

          <div className="flex-1 text-center md:text-left relative z-10">
            <h4 className="text-white font-black text-xl md:text-2xl mb-3 tracking-tight">
              Atendimento em todo o Brasil e América Latina.
            </h4>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
              Nosso modelo é focado na <strong>Inteligência Audiovisual</strong>. Nós vendemos a consultoria e o projeto acústico independente primeiro. Após a aprovação, caso o cliente deseje, <strong>fornecemos todos os equipamentos e executamos a instalação e calibração fina</strong> do sistema em qualquer lugar do território nacional e América Latina (como nosso projeto recente no Mato Grosso).
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}`;

content = content.replace(/          \)\)}\s+<\/div>\s+<\/div>\s+<\/section>\s+\)\s+}/, replacement);
fs.writeFileSync('src/components/ui/SocialProofBar.tsx', content, 'utf8');
