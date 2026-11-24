import { FadeIn } from "@/components/ui/FadeIn"

export function CampusBentoGrid() {
  return (
    <section
      aria-labelledby="campus-bento-title"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-10 relative z-10 edu-hairline-top bg-[#030407]"
    >
      <div className="max-w-[1380px] mx-auto">
        <FadeIn className="max-w-3xl mb-14 md:mb-18">
          <span className="edu-eyebrow mb-4">Soluções para Cada Espaço</span>
          <h2 id="campus-bento-title" className="edu-title text-3xl sm:text-4xl xl:text-[3.1rem] mb-4">
            Uma mesma experiência simples.{" "}
            <span className="text-zinc-400 font-semibold">
              Da sala de 30 alunos ao grande auditório.
            </span>
          </h2>
          <p className="edu-lead text-base md:text-lg max-w-2xl">
            O professor que aprende a iniciar a aula em uma sala já sabe usar qualquer auditório ou laboratório da
            instituição — sem precisar de treinamento novo nem de técnico ao lado.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 01 • WIDE STAGE (7 COLS): Salas de Aula Híbridas */}
          <FadeIn className="lg:col-span-7">
            <article className="group relative h-full min-h-[360px] rounded-[2rem] border border-white/[0.09] hover:border-cyan-400/35 bg-gradient-to-br from-[#0b101d] via-[#070910] to-[#040508] p-8 sm:p-10 overflow-hidden flex flex-col justify-between transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1">
              <div
                className="pointer-events-none absolute right-[-6%] top-0 bottom-0 w-[66%] sm:w-[56%] opacity-85 group-hover:opacity-100 transition-opacity duration-500 [mask-image:radial-gradient(ellipse_85%_80%_at_65%_50%,#000_45%,transparent_100%)]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 340 320" className="w-full h-full">
                  <defs>
                    <radialGradient id="bento-beam" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(34,211,238,0.32)" />
                      <stop offset="60%" stopColor="rgba(59,130,246,0.08)" />
                      <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                    </radialGradient>
                    <linearGradient id="bento-cone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(103,232,249,0.38)" />
                      <stop offset="100%" stopColor="rgba(103,232,249,0)" />
                    </linearGradient>
                  </defs>

                  <g transform="translate(195, 34)">
                    <g className="edu-radar-sweep" style={{ transformOrigin: "0px 0px" }}>
                      <polygon points="0,0 -95,230 95,230" fill="url(#bento-cone)" />
                    </g>
                    <circle cx="0" cy="0" r="6" fill="#082f49" stroke="#67e8f9" strokeWidth="1.5" />
                  </g>

                  <g transform="translate(195, 175)">
                    <circle cx="0" cy="0" r="96" fill="url(#bento-beam)" className="edu-lobe-breathe" />
                    <circle
                      cx="0"
                      cy="0"
                      r="76"
                      fill="none"
                      stroke="rgba(34,211,238,0.45)"
                      strokeWidth="1"
                      className="edu-ripple"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="76"
                      fill="none"
                      stroke="rgba(52,211,153,0.35)"
                      strokeWidth="1"
                      className="edu-ripple"
                      style={{ animationDelay: "1.8s" }}
                    />
                    <circle cx="0" cy="0" r="10" fill="#06131f" stroke="#22d3ee" strokeWidth="1.4" />
                    <circle cx="0" cy="0" r="3" fill="#67e8f9" />
                  </g>

                  <path
                    d="M 195 165 C 195 110, 240 80, 310 58"
                    fill="none"
                    stroke="rgba(56,189,248,0.2)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 195 165 C 195 110, 240 80, 310 58"
                    fill="none"
                    stroke="#67e8f9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="edu-packet"
                  />
                </svg>
              </div>

              <div className="relative z-10 max-w-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block mb-3">
                  01 • Ensino Presencial + Online
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  Salas de Aula Híbridas
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                  O professor caminha livremente pela sala sem microfone preso na roupa e sem fios na mesa. Microfones
                  discretos no teto captam até perguntas dos alunos do fundo, enquanto câmeras{" "}
                  <strong className="text-white font-medium">VisionSuite</strong> acompanham quem fala sozinhas.
                </p>
              </div>

              <div className="relative z-10 pt-7 mt-7 border-t border-white/[0.08] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-400">
                <span className="text-cyan-300 font-medium">Sem microfone de lapela</span>
                <span>•</span>
                <span>Câmera automática</span>
                <span>•</span>
                <span>Teams, Zoom e Meet</span>
              </div>
            </article>
          </FadeIn>

          {/* 02 • SCULPTURAL STAGE (5 COLS): Salas Divisíveis */}
          <FadeIn delay={0.08} className="lg:col-span-5">
            <article className="group relative h-full min-h-[360px] rounded-[2rem] border border-white/[0.09] hover:border-emerald-400/35 bg-gradient-to-b from-[#081312] via-[#06090d] to-[#040508] p-8 sm:p-10 overflow-hidden flex flex-col justify-between transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1">
              <div className="relative w-full h-32 mb-4" aria-hidden="true">
                <svg viewBox="0 0 360 125" className="w-full h-full overflow-visible">
                  <circle
                    cx="98"
                    cy="62"
                    r="44"
                    fill="rgba(16,185,129,0.09)"
                    stroke="rgba(52,211,153,0.35)"
                    strokeWidth="1"
                    className="edu-lobe-breathe"
                  />
                  <circle
                    cx="262"
                    cy="62"
                    r="44"
                    fill="rgba(34,211,238,0.09)"
                    stroke="rgba(34,211,238,0.35)"
                    strokeWidth="1"
                    className="edu-lobe-breathe"
                    style={{ animationDelay: "-2.2s" }}
                  />

                  <path
                    d="M 98 62 C 145 26, 215 26, 262 62"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    className="edu-packet"
                  />
                  <path
                    d="M 262 62 C 215 98, 145 98, 98 62"
                    fill="none"
                    stroke="#67e8f9"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="edu-packet-rev"
                  />

                  <g className="transition-[transform,opacity] duration-700 ease-out group-hover:-translate-y-7 group-hover:opacity-20">
                    <line
                      x1="180"
                      y1="10"
                      x2="180"
                      y2="115"
                      stroke="#fbbf24"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                    />
                  </g>

                  <circle cx="98" cy="62" r="5" fill="#34d399" />
                  <circle cx="262" cy="62" r="5" fill="#22d3ee" />
                  <text x="98" y="92" textAnchor="middle" fill="#a7f3d0" fontSize="8.5" fontFamily="monospace">
                    TURMA A
                  </text>
                  <text x="262" y="92" textAnchor="middle" fill="#a5f3fc" fontSize="8.5" fontFamily="monospace">
                    TURMA B
                  </text>
                </svg>
              </div>

              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block mb-3">
                  02 • Espaços Flexíveis
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                  Salas Divisíveis Inteligentes
                </h3>
                <p className="text-zinc-300/90 text-sm sm:text-base font-light leading-relaxed">
                  Vai juntar duas salas de pós-graduação ou MBA? Basta abrir a divisória: um sensor discreto avisa o
                  sistema, que une o som e as telas automaticamente na mesma hora.
                </p>

                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center gap-4 text-xs text-zinc-400">
                  <span className="text-emerald-300 font-medium">União automática</span>
                  <span>•</span>
                  <span>Sem chamar suporte</span>
                </div>
              </div>
            </article>
          </FadeIn>

          {/* 03 • AMPHITHEATER STAGE (5 COLS): Auditórios */}
          <FadeIn delay={0.12} className="lg:col-span-5">
            <article className="group relative h-full min-h-[350px] rounded-[2rem] border border-white/[0.09] hover:border-blue-400/35 bg-gradient-to-b from-[#090d18] via-[#06080f] to-[#040508] p-8 sm:p-10 overflow-hidden flex flex-col justify-between transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1">
              <div className="relative w-full h-32 mb-4" aria-hidden="true">
                <svg viewBox="0 0 360 120" className="w-full h-full overflow-visible">
                  <rect x="18" y="34" width="10" height="52" rx="4" fill="#38bdf8" />
                  {[
                    { d: "M 48 34 Q 76 60 48 86", delay: "0s", color: "#67e8f9" },
                    { d: "M 86 22 Q 126 60 86 98", delay: "0.45s", color: "#38bdf8" },
                    { d: "M 130 12 Q 182 60 130 108", delay: "0.9s", color: "#60a5fa" },
                    { d: "M 178 4 Q 242 60 178 116", delay: "1.35s", color: "#818cf8" },
                  ].map((arc, idx) => (
                    <path
                      key={idx}
                      d={arc.d}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="edu-wave-arc"
                      style={{ animationDelay: arc.delay }}
                    />
                  ))}
                  <text x="342" y="54" textAnchor="end" fill="#e0f2fe" fontSize="14" fontWeight="800" fontFamily="sans-serif">
                    Som Nítido
                  </text>
                  <text x="342" y="72" textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    DA 1ª À ÚLTIMA FILEIRA
                  </text>
                </svg>
              </div>

              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-3">
                  03 • Eventos e Formaturas
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                  Auditórios e Salões Nobres
                </h3>
                <p className="text-zinc-300/90 text-sm sm:text-base font-light leading-relaxed">
                  Voz cristalina e sem eco em cada poltrona para aulas magnas, simpósios e colações de grau — com
                  operação simples em iPad para eventos do dia a dia sem operador dedicado.
                </p>

                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center gap-4 text-xs text-zinc-400">
                  <span className="text-blue-300 font-medium">Acústica sob medida</span>
                  <span>•</span>
                  <span>Transmissão ao vivo</span>
                </div>
              </div>
            </article>
          </FadeIn>

          {/* 04 • PANORAMIC CONSTELLATION (7 COLS): Campus Paging */}
          <FadeIn delay={0.16} className="lg:col-span-7">
            <article className="group relative h-full min-h-[350px] rounded-[2rem] border border-white/[0.09] hover:border-indigo-400/35 bg-gradient-to-br from-[#0c0e1e] via-[#070811] to-[#040508] p-8 sm:p-10 overflow-hidden flex flex-col justify-between transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1">
              <div
                className="pointer-events-none md:absolute md:right-2 md:top-0 md:bottom-0 md:w-[55%] mb-6 md:mb-0 flex items-center opacity-90 [mask-image:linear-gradient(to_right,transparent_0%,#000_18%,#000_100%)]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 340 240" className="w-full h-auto">
                  <circle cx="54" cy="120" r="26" fill="#111633" stroke="#818cf8" strokeWidth="1.5" />
                  <circle cx="54" cy="120" r="36" fill="none" stroke="rgba(129,140,248,0.35)" className="edu-ripple" />
                  <text x="54" y="123" textAnchor="middle" fill="#e0e7ff" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                    CENTRAL
                  </text>

                  {[
                    { y: 36, label: "BLOCOS DE AULA", delay: "0s" },
                    { y: 92, label: "BIBLIOTECA", delay: "-0.7s" },
                    { y: 148, label: "PÁTIOS E CANTINA", delay: "-1.4s" },
                    { y: 204, label: "GINÁSIO E QUADRAS", delay: "-2.1s" },
                  ].map((node) => (
                    <g key={node.label}>
                      <path
                        d={`M 80 120 C 135 120, 145 ${node.y}, 202 ${node.y}`}
                        fill="none"
                        stroke="rgba(129,140,248,0.2)"
                        strokeWidth="1.4"
                      />
                      <path
                        d={`M 80 120 C 135 120, 145 ${node.y}, 202 ${node.y}`}
                        fill="none"
                        stroke="#a5b4fc"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="edu-packet"
                        style={{ animationDelay: node.delay }}
                      />
                      <circle cx="206" cy={node.y} r="4" fill="#34d399" className="edu-beacon" />
                      <text x="218" y={node.y + 3} fill="#e4e4e7" fontSize="8.5" fontFamily="monospace">
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="relative z-10 md:max-w-[48%]">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block mb-3">
                  04 • Comunicação no Campus
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  Avisos e Som em Todo o Campus
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                  Sinais musicais suaves na troca de horários, recados apenas para um prédio específico ou alertas
                  gerais de segurança usando os próprios cabos de rede que a instituição já possui.
                </p>
              </div>

              <div className="relative z-10 pt-7 mt-7 border-t border-white/[0.08] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-400">
                <span className="text-indigo-300 font-medium">Sinais automáticos</span>
                <span>•</span>
                <span>Avisos por prédio</span>
                <span>•</span>
                <span>Alertas de segurança</span>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
