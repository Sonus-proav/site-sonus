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
      className="relative pt-28 pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-10 overflow-hidden bg-[#030407]"
    >
      {/* Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="edu-aurora absolute -top-32 right-[-8%] w-[820px] h-[620px] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.13)_0%,rgba(37,99,235,0.07)_42%,transparent_72%)]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[640px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
        {/* LEFT COLUMN — Clear Executive Copy */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <FadeIn>
            <div className="edu-eyebrow mb-6">
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
              className="text-4xl sm:text-5xl xl:text-[3.7rem] font-extrabold tracking-[-0.022em] leading-[1.07] text-white mb-6 text-balance"
            >
              A aula começa no horário.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300">
                Em todas as salas do campus.
              </span>
            </h1>
          </Reveal>

          <FadeIn delay={0.12}>
            <p className="edu-lead text-base sm:text-lg max-w-xl mb-9">
              Chega de perder 15 minutos de aula com cabos com mau contato, microfones sem bateria e controles
              diferentes em cada prédio. Padronize salas híbridas e auditórios na plataforma{" "}
              <strong className="text-white font-medium whitespace-nowrap">Q-SYS</strong> — simples em um toque para o
              professor e monitorada à distância pela sua TI.
            </p>
          </FadeIn>

          {/* 3 Clear Executive Metrics */}
          <FadeIn delay={0.18} className="w-full mb-9">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white block">
                  1 Toque
                </span>
                <span className="text-xs text-zinc-400 mt-1 block leading-snug">
                  Para ligar toda a sala
                </span>
              </div>

              <div className="sm:border-l border-white/10 sm:pl-6">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white block">
                  Sem Lapela
                </span>
                <span className="text-xs text-zinc-400 mt-1 block leading-snug">
                  Professor livre pela sala
                </span>
              </div>

              <div className="sm:border-l border-white/10 sm:pl-6">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white block">
                  100% Remoto
                </span>
                <span className="text-xs text-zinc-400 mt-1 block leading-snug">
                  Suporte da TI sem deslocamento
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
          <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a0f1a]/90 to-[#05070c]/90 p-5 sm:p-7 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]">
            {/* Top Status & Pill Dock */}
            <div className="relative z-10 flex flex-col gap-4 mb-3">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`edu-beacon w-2 h-2 rounded-full ${
                      isStandby ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  />
                  <span className="text-xs font-medium text-zinc-300">
                    Simulador 3D da Sala — <span className="text-zinc-500">Toque nos modos abaixo</span>
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={active.badge}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                    className="text-[11px] font-mono tracking-wider uppercase text-cyan-300"
                  >
                    {active.badge}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Spring-Animated Scenario Selector */}
              <div
                role="tablist"
                aria-label="Modos de uso da sala de aula"
                className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-black/40 border border-white/10"
              >
                {SCENARIO_TABS.map((tab) => {
                  const Icon = tab.icon
                  const isSelected = scenario === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => handleSelectScenario(tab.id)}
                      className={`relative min-h-[44px] px-3.5 py-2.5 rounded-xl sm:rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected ? "text-white" : "text-zinc-400 hover:text-zinc-200"
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
                <div className="w-full h-[300px] sm:h-[360px] md:h-[395px] flex items-center justify-center">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400/70">
                    Carregando Maquete 3D...
                  </span>
                </div>
              }
            >
              <ClassroomStage3D scenario={scenario} />
            </Suspense>

            {/* Human-Readable Scenario Summary */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active.summary}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                className="text-sm text-zinc-300 text-center max-w-xl mx-auto mt-1 mb-5 font-light"
              >
                {active.summary}
              </motion.p>
            </AnimatePresence>

            {/* Bottom 4 Clear Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 pt-5 border-t border-white/10 sm:divide-x sm:divide-white/10">
              {[
                { icon: Camera, color: "text-cyan-400", label: "Câmera Inteligente", val: active.camera },
                { icon: Mic, color: "text-emerald-400", label: "Áudio no Teto", val: active.audio },
                { icon: Tv, color: "text-blue-400", label: "Telas e Chamada", val: active.screens },
                { icon: Lightbulb, color: "text-amber-400", label: "Ambiente", val: active.lighting },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className={idx > 0 ? "sm:pl-4 pr-2" : "pr-2"}>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 mb-1">
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={item.val}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                        className="text-xs font-semibold text-white block leading-snug"
                      >
                        {item.val}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
