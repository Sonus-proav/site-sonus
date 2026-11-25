import { lazy, Suspense, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Camera,
  ChevronRight,
  Layers,
  Lightbulb,
  Mic,
  MonitorPlay,
  Power,
  Sparkles,
  Tv,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/FadeIn"
import { Reveal } from "@/components/ui/Reveal"
import { Magnetic } from "@/components/ui/Magnetic"
import { trackCustomizeProduct } from "@/lib/metaPixel"
import type { ClassroomScenario } from "./ClassroomStage3D"

const ClassroomStage3D = lazy(() => import("./ClassroomStage3D"))

export interface EducationHeroSimulatorProps {
  onCtaClick: (source: string) => void
  onWhatsAppClick: (origin: string) => void
}

interface ScenarioConfig {
  id: ClassroomScenario
  label: string
  badge: string
  summary: string
  camera: string
  audio: string
  screens: string
  lighting: string
}

const SCENARIOS: Record<ClassroomScenario, ScenarioConfig> = {
  hyflex: {
    id: "hyflex",
    label: "Aula Híbrida",
    badge: "ENSINO HÍBRIDO ATIVO",
    summary: "O professor entra, toca em um botão e caminha livremente: câmera e teto fazem todo o resto.",
    camera: "Segue o professor no quadro sozinha",
    audio: "Alunos de casa ouvem toda a turma",
    screens: "Teams, Zoom ou Meet em 2 telas",
    lighting: "Luz equilibrada para aula e vídeo",
  },
  local: {
    id: "local",
    label: "Aula Presencial",
    badge: "MODO PRESENCIAL",
    summary: "Ideal para aulas expositivas: projeção nítida e reforço natural da voz sem microfone na mão.",
    camera: "Recolhida para total privacidade",
    audio: "Voz clara até o fundo sem cansar",
    screens: "Apresentação 4K sem adaptadores",
    lighting: " Meia-luz ideal para projeção",
  },
  divisivel: {
    id: "divisivel",
    label: "Sala Dupla Aberta",
    badge: "DIVISÓRIA ABERTA • SALÃO UNIFICADO",
    summary: "Ao recolher a parede móvel, as duas salas viram um único auditório automaticamente em 1 segundo.",
    camera: "Enquadra todo o salão de 120 lugares",
    audio: "Teto das duas salas sincronizado",
    screens: "Mesma imagem espelhada nas 2 telas",
    lighting: "Iluminação unificada nos dois lados",
  },
  standby: {
    id: "standby",
    label: "Fim do Turno",
    badge: "ECONOMIA & PRIVACIDADE",
    summary: "Sem aula agendada? O campus economiza energia sozinho e mantém tudo pronto para o próximo turno.",
    camera: "Lente recolhida automaticamente",
    audio: "Microfones silenciados em repouso",
    screens: "Telas desligadas sem desperdício",
    lighting: "Ambiente apagado automaticamente",
  },
}

const SCENARIO_TABS: { id: ClassroomScenario; icon: typeof MonitorPlay; label: string }[] = [
  { id: "hyflex", icon: MonitorPlay, label: "Aula Híbrida" },
  { id: "local", icon: Sparkles, label: "Presencial" },
  { id: "divisivel", icon: Layers, label: "Sala Dupla" },
  { id: "standby", icon: Power, label: "Fim do Turno" },
]

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

export function EducationHeroSimulator({ onCtaClick, onWhatsAppClick }: EducationHeroSimulatorProps) {
  const [scenario, setScenario] = useState<ClassroomScenario>("hyflex")
  const active = SCENARIOS[scenario]
  const isStandby = scenario === "standby"

  const handleSelectScenario = (id: ClassroomScenario) => {
    setScenario(id)
    trackCustomizeProduct("educacao_hero_uci", id)
  }

  return (
    <section
      aria-labelledby="hero-educacao-title"
      className="relative pt-24 pb-14 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-10 overflow-hidden bg-[#030407]"
    >
      {/* Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="edu-aurora absolute -top-32 right-[-8%] w-[820px] h-[620px] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.13)_0%,rgba(37,99,235,0.07)_42%,transparent_72%)]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[640px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-12 items-center">
        {/* LEFT COLUMN — Clear Executive Copy */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <FadeIn>
            <div className="edu-eyebrow mb-4 sm:mb-6">
              <span className="edu-vu" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>Universidades • Escolas • Redes de Ensino</span>
            </div>
          </FadeIn>

          <Reveal>
            <h1
              id="hero-educacao-title"
              className="text-[2rem] sm:text-5xl xl:text-[3.7rem] font-extrabold tracking-[-0.022em] leading-[1.08] text-white mb-4 sm:mb-6 text-balance"
            >
              A aula começa no horário.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300">
                Em todas as salas do campus.
              </span>
            </h1>
          </Reveal>

          <FadeIn delay={0.12}>
            <p className="edu-lead text-sm sm:text-lg max-w-xl mb-6 sm:mb-9">
              Chega de perder 15 minutos de aula com cabos com mau contato, microfones sem bateria e controles
              diferentes em cada prédio. Padronize salas híbridas e auditórios na plataforma{" "}
              <strong className="text-white font-medium whitespace-nowrap">Q-SYS</strong> — simples em um toque para o
              professor e monitorada à distância pela sua TI.
            </p>
          </FadeIn>

          {/* 3 Clear Executive Metrics — Compact 3-col strip on mobile */}
          <FadeIn delay={0.18} className="w-full mb-6 sm:mb-9">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-6 pt-4 sm:pt-6 border-t border-white/10 divide-x divide-white/10">
              <div className="pr-1 sm:pr-0 min-w-0">
                <span className="text-base sm:text-2xl font-extrabold tracking-tight text-cyan-300 sm:text-white block">
                  1 Toque
                </span>
                <span className="text-[11px] sm:text-xs text-zinc-300 sm:text-zinc-400 mt-0.5 sm:mt-1 block leading-snug">
                  Liga toda a sala
                </span>
              </div>

              <div className="pl-2.5 sm:pl-6 pr-1 sm:pr-0 min-w-0">
                <span className="text-base sm:text-2xl font-extrabold tracking-tight text-white block">
                  Sem Lapela
                </span>
                <span className="text-[11px] sm:text-xs text-zinc-300 sm:text-zinc-400 mt-0.5 sm:mt-1 block leading-snug">
                  Professor livre
                </span>
              </div>

              <div className="pl-2.5 sm:pl-6 min-w-0">
                <span className="text-base sm:text-2xl font-extrabold tracking-tight text-emerald-300 sm:text-white block">
                  100% Remoto
                </span>
                <span className="text-[11px] sm:text-xs text-zinc-300 sm:text-zinc-400 mt-0.5 sm:mt-1 block leading-snug">
                  Suporte da TI
                </span>
              </div>
            </div>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.24} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            <Magnetic className="w-full sm:w-auto">
              <Button
                onClick={() => onCtaClick("hero")}
                size="lg"
                className="w-full sm:w-auto h-auto min-h-14 py-3 px-5 sm:px-8 whitespace-normal text-center leading-tight rounded-full bg-white text-slate-950 hover:bg-cyan-50 text-sm sm:text-base font-bold shadow-[0_18px_50px_-12px_rgba(34,211,238,0.45)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Solicitar Diagnóstico do Campus
                <ChevronRight className="ml-1.5 w-5 h-5" />
              </Button>
            </Magnetic>
            <Button
              onClick={() => onWhatsAppClick("whatsapp_hero_educacao")}
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto h-14 px-6 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.05] border border-white/10 text-base font-medium"
            >
              Falar com Especialista
            </Button>
          </FadeIn>
        </div>

        {/* RIGHT COLUMN — Interactive 3D Classroom Stage + Touch Scenarios */}
        <FadeIn delay={0.16} direction="left" className="lg:col-span-7 w-full">
          <div className="relative rounded-[1.75rem] sm:rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0b111e]/95 to-[#05070c]/95 p-4 sm:p-7 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]">
            {/* Top Status & Pill Dock */}
            <div className="relative z-10 flex flex-col gap-3 sm:gap-4 mb-2.5 sm:mb-3">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`edu-beacon w-2 h-2 rounded-full shrink-0 ${
                      isStandby ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  />
                  <span className="text-xs font-semibold text-zinc-200">
                    Simulador 3D — <span className="text-cyan-300/90 font-normal">Toque nos modos</span>
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={active.badge}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                    className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 px-2 py-0.5 rounded-full"
                  >
                    {active.badge}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Spring-Animated Scenario Selector */}
              <div
                role="tablist"
                aria-label="Modos de uso da sala de aula"
                className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-black/50 border border-white/12"
              >
                {SCENARIO_TABS.map((tab) => {
                  const Icon = tab.icon
                  const isSelected = scenario === tab.id
                  return (
                    <button
                      key={tab.id}
                      id={`edu-scenario-tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={`edu-scenario-panel-${tab.id}`}
                      onClick={() => handleSelectScenario(tab.id)}
                      className={`relative min-h-[44px] px-3 py-2 rounded-xl sm:rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected ? "text-white" : "text-zinc-300 hover:text-white bg-white/[0.03] sm:bg-transparent"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="edu-uci-active-pill"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        />
                      )}
                      <Icon className="w-3.5 h-3.5 relative z-10 shrink-0" />
                      <span className="relative z-10 truncate">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Interactive 3D Isometric Classroom */}
            <Suspense
              fallback={
                <div className="w-full h-[235px] sm:h-[360px] md:h-[395px] flex items-center justify-center">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400/70">
                    Carregando Maquete 3D...
                  </span>
                </div>
              }
            >
              <ClassroomStage3D scenario={scenario} />
            </Suspense>

            {/* All Scenarios Rendered in DOM for Crawlers & Screen Readers */}
            {Object.values(SCENARIOS).map((sc) => {
              const isSelected = sc.id === scenario
              return (
                <div
                  key={sc.id}
                  id={`edu-scenario-panel-${sc.id}`}
                  role="tabpanel"
                  aria-labelledby={`edu-scenario-tab-${sc.id}`}
                  hidden={!isSelected}
                  className={isSelected ? "block" : "hidden"}
                >
                  <p className="text-xs sm:text-sm text-zinc-200 sm:text-zinc-300 text-center max-w-xl mx-auto mt-1 mb-4 sm:mb-5 font-normal sm:font-light leading-relaxed px-1">
                    {sc.summary}
                  </p>

                  {/* Bottom 4 Clear Readouts — Mini-cards on mobile, clean hairline divide on sm+ */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-y-4 sm:pt-5 sm:border-t sm:border-white/10 sm:divide-x sm:divide-white/10">
                    {[
                      { icon: Camera, color: "text-cyan-400", label: "Câmera Inteligente", val: sc.camera },
                      { icon: Mic, color: "text-emerald-400", label: "Áudio no Teto", val: sc.audio },
                      { icon: Tv, color: "text-blue-400", label: "Telas e Chamada", val: sc.screens },
                      { icon: Lightbulb, color: "text-amber-400", label: "Ambiente", val: sc.lighting },
                    ].map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={item.label}
                          className={`rounded-xl bg-white/[0.035] border border-white/[0.08] p-2.5 sm:rounded-none sm:bg-transparent sm:border-0 sm:p-0 ${
                            idx > 0 ? "sm:pl-4 sm:pr-2" : "sm:pr-2"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 mb-1">
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${item.color}`} />
                            <span className="truncate">{item.label}</span>
                          </div>
                          <span className="text-xs font-semibold text-white block leading-snug">
                            {item.val}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
