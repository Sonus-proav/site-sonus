const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `                    </Link>
                  </motion.div>
              </div>`;

const replacement = `                    </Link>
                  </motion.div>

                  {/* Coverage Badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-2xl"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">Atendimento Global: Projetamos primeiro, instalamos onde você estiver.</h4>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        Vendemos o <strong>projeto audiovisual independente</strong>. Caso deseje, fornecemos os equipamentos e executamos a instalação e calibração em todo o <strong>Brasil e América Latina</strong>.
                      </p>
                    </div>
                  </motion.div>

              </div>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/pages/Home.tsx', content, 'utf8');
