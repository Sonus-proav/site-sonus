const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const regexButtons = /<motion\.div[^>]*className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"[^>]*>[\s\S]*?<\/motion\.div>/;

const newButtons = `<motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mt-10 w-full"
                >
                  <Link to="/projetos" className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-white text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs lg:text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1">
                    Nossos Projetos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="https://wa.me/5546920013151" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-xs lg:text-sm transition-all duration-300 hover:-translate-y-1">
                    Falar com a Engenharia
                  </a>
                  <Link to="/solucoes" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-zinc-400 hover:text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-white/5">
                    Nossas Soluções
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>
                </motion.div>`;

c = c.replace(regexButtons, newButtons);

fs.writeFileSync('src/pages/Home.tsx', c);
console.log("Updated Hero buttons");
