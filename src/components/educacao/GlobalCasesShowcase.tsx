import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/FadeIn"
import { trackCustomizeProduct } from "@/lib/metaPixel"

export interface GlobalCasesShowcaseProps {
  onCtaClick: (source: string) => void
}

interface UniversityCase {
  id: string
  index: string
  institution: string
  country: string
  focus: string
  nodes: [string, string, string]
  tags: string[]
  challenge: string
  architecture: string
  outcomes: string
  stats: { label: string; value: string }[]
}

const UNIVERSITY_CASES: UniversityCase[] = [
  {
    id: "indiana",
    index: "01",
    institution: "Indiana University",
    country: "Estados Unidos",
    focus: "Campus inteiro falando a mesma língua",
    nodes: ["SALAS DE AULA", "CENTRAL Q-SYS", "AVISOS NO CAMPUS"],
    tags: ["Salas de Aula", "Auditórios", "Salas Divisíveis", "Som pelo Campus"],
    challenge:
      "Centenas de salas e auditórios espalhados por vários prédios tinham equipamentos de marcas diferentes, confundindo professores e sobrecarregando o suporte.",
    architecture:
      "Toda a universidade passou a usar o padrão Q-SYS pela rede, unindo salas comuns, grandes auditórios, salas divisíveis e o sistema de avisos gerais do campus.",
    outcomes:
      "Qualquer professor entra em qualquer prédio e encontra exatamente a mesma tela simples, enquanto a universidade amplia novas salas sem refazer obras.",
    stats: [
      { label: "Abrangência", value: "Todo o Campus" },
      { label: "Para o Professor", value: "Mesma Tela Sempre" },
      { label: "Comunicação", value: "Avisos Integrados" },
    ],
  },
  {
    id: "imd",
    index: "02",
    institution: "IMD Business School",
    country: "Suíça • Lausanne",
    focus: "Gestão remota de nível executivo",
    nodes: ["SALAS DE MBA", "CAMPUS LAUSANNE", "SUPORTE REMOTO"],
    tags: ["Escola de Negócios", "Q-SYS Reflect", "Zero Atrasos"],
    challenge:
      "Em uma das escolas de negócios mais exigentes da Europa, um simples atraso de 5 minutos em aulas com executivos do mundo todo era inaceitável.",
    architecture:
      "Áudio, câmeras e iluminação integrados em Q-SYS com monitoramento contínuo em nuvem pelo Q-SYS Reflect para toda a equipe técnica de Lausanne.",
    outcomes:
      "A equipe de TI enxerga a saúde de todas as salas em tempo real e antecipa qualquer ajuste à distância, garantindo aulas impecáveis todos os dias.",
    stats: [
      { label: "Unidade", value: "Lausanne, Suíça" },
      { label: "Gestão da TI", value: "100% à Distância" },
      { label: "Padrão", value: "Educação Executiva" },
    ],
  },
  {
    id: "bentley",
    index: "03",
    institution: "Bentley University",
    country: "Estados Unidos",
    focus: "Menos caixas no rack, mais simplicidade",
    nodes: ["NOTEBOOK DO DOCENTE", "SISTEMA Q-SYS", "PAINEL ÚNICO"],
    tags: ["Menos Equipamentos", "Manutenção Simples", "1 Toque"],
    challenge:
      "Armários cheios de aparelhos antigos encareciam a manutenção, davam mau contato constante e deixavam cada sala funcionando de um jeito diferente.",
    architecture:
      "Substituição de múltiplos aparelhos isolados pela plataforma inteligente Q-SYS, padronizando o controle de todas as salas pela própria rede da instituição.",
    outcomes:
      "Queda drástica nos custos com troca de peças, salas muito mais limpas e zero curva de aprendizado para o corpo docente.",
    stats: [
      { label: "Infraestrutura", value: "Enxuta e Limpa" },
      { label: "Manutenção", value: "Custo Reduzido" },
      { label: "Docentes", value: "Uso Imediato" },
    ],
  },
  {
    id: "federation",
    index: "04",
    institution: "Federation University",
    country: "Austrália",
    focus: "Vários campi conectados como uma só turma",
    nodes: ["TURMA PRESENCIAL", "CONEXÃO Q-SYS", "ALUNOS REMOTOS"],
    tags: ["Salas Conectadas", "Ensino Híbrido", "Autonomia para a TI"],
    challenge:
      "Unir alunos presenciais e alunos em cidades distantes sem que quem assiste de casa se sentisse excluído, e sem depender de técnicos externos o ano inteiro.",
    architecture:
      "Salas conectadas sobre Q-SYS com microfones de teto e câmeras automáticas, entregando ferramentas abertas para a própria equipe da universidade cuidar de tudo.",
    outcomes:
      "Aulas dinâmicas com participação real entre polos e autonomia total para a equipe interna de TI ajustar e expandir suas próprias salas.",
    stats: [
      { label: "Formato", value: "Multi-Campus Híbrido" },
      { label: "Equipe Interna", value: "Autonomia Total" },
      { label: "Engajamento", value: "Presencial + Online" },
    ],
  },
]

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

export function GlobalCasesShowcase({ onCtaClick }: GlobalCasesShowcaseProps) {
  const [activeId, setActiveId] = useState<string>(UNIVERSITY_CASES[0].id)
  const activeCase = UNIVERSITY_CASES.find((c) => c.id === activeId) ?? UNIVERSITY_CASES[0]

  const handleSelect = (id: string) => {
    setActiveId(id)
    trackCustomizeProduct("educacao_global_case", id)
  }

  return (
    <section
      aria-labelledby="global-cases-title"
      className="py-14 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10 relative z-10 edu-hairline-top bg-gradient-to-b from-[#060914] via-[#040509] to-[#030407]"
    >
      <div className="max-w-[1380px] mx-auto">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-8 mb-8 sm:mb-14 md:mb-18">
          <div className="max-w-2xl">
            <span className="edu-eyebrow mb-3 sm:mb-4">Referências Mundiais no Ensino</span>
            <h2
              id="global-cases-title"
              className="edu-title text-2xl sm:text-4xl xl:text-[3.1rem]"
            >
              Como grandes universidades resolveram{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                o desafio das salas de aula.
              </span>
            </h2>
          </div>
          <p className="edu-lead text-sm sm:text-base max-w-md">
            Toque em uma universidade <span className="lg:hidden">abaixo</span>
            <span className="hidden lg:inline">ao lado</span> para ver na prática o que mudou na rotina dos professores,
            dos alunos e da equipe de TI.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start pt-4 border-t border-white/10">
          {/* Left University Selector — Compact 2x2 grid on mobile so case stays in view, vertical rail on lg */}
          <div
            role="tablist"
            aria-label="Cases mundiais de universidades com Q-SYS"
            className="lg:col-span-4 grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-0 lg:divide-y lg:divide-white/[0.07]"
          >
            {UNIVERSITY_CASES.map((item) => {
              const isSelected = item.id === activeCase.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item.id)}
                  className={`group relative rounded-2xl lg:rounded-none p-3.5 lg:py-5 lg:pl-6 lg:pr-3 text-left cursor-pointer transition-all border lg:border-0 ${
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-400/50 shadow-[0_10px_28px_-12px_rgba(34,211,238,0.4)] lg:bg-transparent lg:shadow-none"
                      : "bg-white/[0.03] border-white/10 hover:border-white/25 lg:bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="edu-case-active-rail"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="hidden lg:block absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-cyan-300 to-blue-500 shadow-[0_0_16px_rgba(34,211,238,0.8)]"
                    />
                  )}

                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span
                      className={`text-[10px] sm:text-xs font-medium truncate transition-colors ${
                        isSelected ? "text-cyan-300" : "text-zinc-400 lg:text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    >
                      {item.country}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-[transform,opacity] duration-300 ${
                        isSelected
                          ? "text-cyan-300 translate-x-0 opacity-100"
                          : "text-zinc-500 -translate-x-1 opacity-0 group-hover:opacity-60 group-hover:translate-x-0 [@media(hover:none)]:opacity-70 [@media(hover:none)]:translate-x-0"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-sm sm:text-2xl font-bold tracking-tight block leading-snug transition-colors ${
                      isSelected ? "text-white" : "text-zinc-200 lg:text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  >
                    {item.institution}
                  </span>
                  <span className="hidden lg:block text-xs text-zinc-500 mt-1">{item.focus}</span>
                </button>
              )
            })}
          </div>

          {/* Right Open Case Study */}
          <div className="lg:col-span-8 rounded-3xl lg:rounded-none border border-white/10 lg:border-0 lg:border-l lg:border-white/10 bg-[#070a13]/85 lg:bg-transparent p-5 sm:p-7 lg:p-0 lg:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 sm:gap-4 pb-5 sm:pb-7 border-b border-white/10">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block mb-1.5 sm:mb-2">
                      {activeCase.country} • {activeCase.focus}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {activeCase.institution}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {activeCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] sm:text-xs text-zinc-200 sm:text-zinc-300 bg-white/[0.05] border border-white/10 px-2.5 sm:px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signal Flow Signature: Legible HTML pills on mobile, wide SVG wave on sm+ */}
                <div className="py-4 sm:py-6 border-b border-white/[0.07]" aria-hidden="true">
                  <div className="grid grid-cols-3 items-center gap-1.5 sm:hidden">
                    {activeCase.nodes.map((nodeLabel, idx) => {
                      const isCenter = idx === 1
                      return (
                        <div
                          key={nodeLabel}
                          className={`rounded-xl px-2 py-2 text-center border ${
                            isCenter
                              ? "bg-cyan-500/15 border-cyan-400/45 text-cyan-200 font-bold"
                              : "bg-white/[0.03] border-white/10 text-zinc-300 font-medium"
                          }`}
                        >
                          <span className="block text-[9.5px] font-mono leading-tight tracking-tight">{nodeLabel}</span>
                        </div>
                      )
                    })}
                  </div>

                  <svg viewBox="0 0 680 54" className="hidden sm:block w-full h-auto overflow-visible">
                    <path
                      d="M 95 24 C 185 4, 250 44, 340 24 C 430 4, 495 44, 585 24"
                      fill="none"
                      stroke="rgba(56,189,248,0.16)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 95 24 C 185 4, 250 44, 340 24 C 430 4, 495 44, 585 24"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      className="edu-packet"
                    />

                    {[
                      { x: 95, label: activeCase.nodes[0], active: false },
                      { x: 340, label: activeCase.nodes[1], active: true },
                      { x: 585, label: activeCase.nodes[2], active: false },
                    ].map((n) => (
                      <g key={n.label} transform={`translate(${n.x}, 24)`}>
                        <circle
                          cx="0"
                          cy="0"
                          r={n.active ? 6 : 4.5}
                          fill={n.active ? "#22d3ee" : "#0b1324"}
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          className={n.active ? "edu-beacon" : ""}
                        />
                        <text
                          y="21"
                          textAnchor="middle"
                          fill={n.active ? "#a5f3fc" : "#a1a1aa"}
                          fontSize="9.5"
                          fontFamily="monospace"
                        >
                          {n.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* 3 Clear Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 py-6 sm:py-9 md:divide-x md:divide-white/10">
                  <div className="md:pr-7">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5 sm:mb-2.5">
                      O Problema Antes
                    </span>
                    <p className="text-sm sm:text-[15px] text-zinc-200 sm:text-zinc-300 font-normal sm:font-light leading-relaxed">
                      {activeCase.challenge}
                    </p>
                  </div>

                  <div className="md:px-7">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block mb-1.5 sm:mb-2.5">
                      O Que Foi Feito
                    </span>
                    <p className="text-sm sm:text-[15px] text-zinc-100 sm:text-zinc-200 font-normal sm:font-light leading-relaxed">
                      {activeCase.architecture}
                    </p>
                  </div>

                  <div className="md:pl-7">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block mb-1.5 sm:mb-2.5">
                      Resultado no Dia a Dia
                    </span>
                    <p className="text-sm sm:text-[15px] text-zinc-100 sm:text-zinc-200 font-normal sm:font-light leading-relaxed">
                      {activeCase.outcomes}
                    </p>
                  </div>
                </div>

                {/* Bottom Metrics + CTA */}
                <div className="pt-5 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
                  <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-start sm:items-center gap-3 sm:gap-10">
                    {activeCase.stats.map((st) => (
                      <div key={st.label} className="min-w-0">
                        <span className="text-[11px] sm:text-xs text-zinc-400 sm:text-zinc-500 block mb-0.5 truncate">{st.label}</span>
                        <span className="text-xs sm:text-lg font-extrabold text-white tracking-tight block leading-snug">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    onClick={() => onCtaClick(`case_${activeCase.id}`)}
                    className="w-full sm:w-auto whitespace-normal text-center leading-tight rounded-full bg-white text-slate-950 hover:bg-cyan-50 font-bold text-sm px-6 sm:px-7 h-auto min-h-12 py-2.5 sm:shrink-0 transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Trazer Esse Padrão ao Meu Campus
                    <ArrowUpRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
