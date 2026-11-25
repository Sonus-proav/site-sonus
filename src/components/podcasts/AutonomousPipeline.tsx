import { memo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Camera,
  CheckCircle2,
  Clapperboard,
  FileText,
  Film,
  Layers,
  Mic,
  Power,
  Scissors,
  Share2,
  Sliders,
  Smartphone,
  Sparkles,
  Square,
  Tv,
  VolumeX,
} from "lucide-react"
import { trackCustomizeProduct } from "@/lib/metaPixel"

type StageId = "onetouch" | "autocut" | "postengine" | "distribution"

interface PipelineStage {
  id: StageId
  step: string
  shortTitle: string
  title: string
  kicker: string
  summary: string
  highlights: string[]
  metricLabel: string
  metricValue: string
}

const STAGES: PipelineStage[] = [
  {
    id: "onetouch",
    step: "01",
    shortTitle: "One-Touch Q-SYS",
    title: "Toque único para ligar o estúdio inteiro.",
    kicker: "Orquestração Q-SYS na Sala",
    summary:
      "O convidado e o executivo entram na sala sem técnicos. Ao tocar em 'Iniciar Gravação' no painel Q-SYS, luzes cênicas, microfones com tratamento broadcast, acústica e gravadores multipista entram no ar em segundos.",
    highlights: [
      "Zero ajuste manual de ganho, iluminação ou câmera antes da fala",
      "Perfis memorizados por convidado ou formato de programa",
      "Gravação local redundante com envio imediato para a nuvem",
    ],
    metricLabel: "Preparo da Sala",
    metricValue: "1 toque • 2s",
  },
  {
    id: "autocut",
    step: "02",
    shortTitle: "Corte Multi-Câmera",
    title: "Câmeras PTZ 4K que dirigem a conversa por voz.",
    kicker: "Direção de Vídeo Inteligente",
    summary:
      "O processador Q-SYS identifica em milissegundos quem assumiu a palavra, ignora ruídos incidentais como café na xícara ou pigarro, e alterna suavemente entre os planos fechados e o plano geral da mesa.",
    highlights: [
      "Troca orgânica entre câmeras PTZ 4K conforme a cadência do diálogo",
      "Retorno automático ao plano aberto quando há debate simultâneo",
      "Zero operador de corte ou técnico dentro do estúdio",
    ],
    metricLabel: "Detecção de Fala",
    metricValue: "Tempo real",
  },
  {
    id: "postengine",
    step: "03",
    shortTitle: "Cortes & Legendas",
    title: "Pós-produção integrada que edita, enquadra e legenda sozinha.",
    kicker: "Motor Inteligente Integrado Sonus",
    summary:
      "Assim que o botão de encerrar é pressionado, a camada inteligente integrada ao estúdio transcreve toda a conversa, remove silêncios e vícios pela análise de texto, localiza os momentos mais fortes e aplica as fontes, vinhetas e cores oficiais da sua marca.",
    highlights: [
      "Transcrição automática e edição limpa por texto sem depender de ilha de edição",
      "Identificação inteligente dos melhores ganchos para redes sociais",
      "Reenquadramento facial automático com legendas dinâmicas no padrão visual da empresa",
    ],
    metricLabel: "Edição Manual",
    metricValue: "Zero",
  },
  {
    id: "distribution",
    step: "04",
    shortTitle: "Multi-Formato",
    title: "Episódio completo e cortes prontos em 9:16, 1:1 e 16:9.",
    kicker: "Entrega Pronta para Publicar",
    summary:
      "Em vez de esperar semanas por revisões de vídeo, sua equipe recebe pastas organizadas com o episódio master para YouTube/LinkedIn e dezenas de cortes verticais e quadrados prontos para publicação no mesmo dia.",
    highlights: [
      "Reels, TikTok e YouTube Shorts em 9:16 com rosto centralizado e legenda",
      "Versões 1:1 prontas para feed institucional do LinkedIn e comunicação interna",
      "Episódio completo em 16:9 pronto para YouTube, Spotify Video e intranet",
    ],
    metricLabel: "Rendimentos / Sessão",
    metricValue: "1 ep. + 15 cortes",
  },
]

const BRAND_THEMES = [
  {
    id: "corp",
    label: "Corporativo",
    tag: "Executivo B2B",
    badgeBg: "bg-amber-400/20 text-amber-300 border-amber-400/40",
    captionBg: "bg-slate-950/90 text-white border-amber-400/50",
    highlightClass: "text-amber-300",
  },
  {
    id: "minimal",
    label: "Editorial",
    tag: "Clean Monochrome",
    badgeBg: "bg-white/15 text-white border-white/30",
    captionBg: "bg-white text-slate-950 border-white",
    highlightClass: "text-sky-600 font-black",
  },
  {
    id: "energy",
    label: "Criador / Social",
    tag: "Alto Contraste",
    badgeBg: "bg-cyan-400/20 text-cyan-300 border-cyan-400/40",
    captionBg: "bg-zinc-950/95 text-white border-cyan-400/60",
    highlightClass: "text-cyan-300",
  },
] as const

const EXPORT_ITEMS = [
  {
    id: "ep169",
    ratio: "16:9",
    title: "Episódio Completo Masterizado",
    channels: "YouTube • Spotify Video • LinkedIn",
    duration: "42 min 18s",
    detail: "Corte multicâmera finalizado + vinheta + áudio nivelado",
    icon: Tv,
    accent: "text-cyan-300 border-cyan-400/35 bg-cyan-500/10",
  },
  {
    id: "reels916",
    ratio: "9:16",
    title: "15x Cortes Verticais com Gancho",
    channels: "Reels • TikTok • YouTube Shorts",
    duration: "35s – 58s",
    detail: "Reenquadramento facial + legendas animadas no padrão da marca",
    icon: Smartphone,
    accent: "text-amber-300 border-amber-400/35 bg-amber-500/10",
  },
  {
    id: "feed11",
    ratio: "1:1",
    title: "Pílulas Quadradas B2B & Treinamento",
    channels: "LinkedIn Feed • Portal Interno • WhatsApp",
    duration: "45s – 90s",
    detail: "Títulos superiores + barra de progresso + identidade visual",
    icon: Square,
    accent: "text-emerald-300 border-emerald-400/35 bg-emerald-500/10",
  },
] as const

export const AutonomousPipeline = memo(function AutonomousPipeline() {
  const [activeStage, setActiveStage] = useState<StageId>("onetouch")
  const [roomArmed, setRoomArmed] = useState(true)
  const [activeVoiceChannel, setActiveVoiceChannel] = useState<"host" | "conv1" | "noise">("host")
  const [trimSilences, setTrimSilences] = useState(true)
  const [brandThemeIdx, setBrandThemeIdx] = useState(0)
  const [exportFilter, setExportFilter] = useState<"all" | "16:9" | "9:16" | "1:1">("all")

  const current = STAGES.find((s) => s.id === activeStage) ?? STAGES[0]
  const activeBrand = BRAND_THEMES[brandThemeIdx]

  const selectStage = (id: StageId) => {
    setActiveStage(id)
    trackCustomizeProduct("Podcast_Pipeline", id)
  }

  return (
    <section
      aria-labelledby="pipeline-heading"
      className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10 pod-timecode-line bg-[#060509] overflow-hidden"
    >
      {/* Atmospheric Amber + Cyan Diffusion */}
      <div className="pointer-events-none absolute top-16 left-1/4 w-[480px] h-[340px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)]" />

      <div className="max-w-[1380px] mx-auto relative z-10">
        {/* Editorial Heading Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-end mb-8 sm:mb-14 md:mb-16">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] sm:tracking-[0.28em] text-amber-400 mb-3 sm:mb-4">
              <span className="w-5 sm:w-6 h-px bg-amber-400/60" />
              Fluxo 100% Autônomo • Do Rec à Publicação
            </span>
            <h2
              id="pipeline-heading"
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.08]"
            >
              Aperte um botão ao entrar.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                Saia com o conteúdo pronto.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-zinc-200 sm:text-zinc-400 font-normal sm:font-light leading-relaxed lg:border-l lg:border-white/10 lg:pl-6">
              Unificamos sala acústica, automação Q-SYS, direção de câmeras por voz e pós-produção integrada em uma
              única esteira contínua — eliminando gargalos operacionais entre gravar e publicar.
            </p>
          </div>
        </div>

        {/* Dica de uso + atalho de navegação */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 sm:mb-4">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-200">
            <span className="pod-hint-dot shrink-0" />
            Toque nas etapas abaixo e teste ao vivo
          </span>
          <span className="text-[11px] font-mono text-zinc-400 sm:text-zinc-500">Etapa {current.step} de 04</span>
        </div>

        {/* Interactive Signal Bus Selector (4 Stages) */}
        <div className="relative mb-6 sm:mb-10">
          {/* Connecting live bus rail on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-px bg-white/10 -translate-y-1/2 overflow-hidden pointer-events-none">
            <div className="h-full w-36 bg-gradient-to-r from-transparent via-amber-400 to-transparent pod-signal-runner" />
          </div>

          <div
            role="tablist"
            aria-label="Etapas do fluxo autônomo do estúdio"
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 relative z-10"
          >
            {STAGES.map((stage) => {
              const selected = stage.id === activeStage
              return (
                <button
                  key={stage.id}
                  id={`pod-stage-tab-${stage.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`pod-stage-panel-${stage.id}`}
                  onClick={() => selectStage(stage.id)}
                  data-active={selected}
                  className="pod-btn group text-left p-3 sm:p-5 rounded-2xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-2.5">
                    <span
                      className={`text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        selected
                          ? "bg-amber-400 text-slate-950"
                          : "bg-white/[0.06] text-zinc-400 group-hover:text-white"
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] font-mono text-zinc-400 sm:text-zinc-500 uppercase tracking-wider truncate">
                      {stage.metricValue}
                    </span>
                  </div>
                  <div className={`text-xs sm:text-base font-bold tracking-tight truncate ${selected ? "text-white" : "text-zinc-200"}`}>
                    {stage.shortTitle}
                  </div>
                  <div className={`hidden sm:block mt-1 text-[11px] leading-snug ${selected ? "text-amber-200" : "text-zinc-400"}`}>
                    {stage.kicker}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile Compact Stage Title right above the Interactive Console so user sees immediate stage change */}
        <div className="lg:hidden mb-3.5 px-1">
          <span className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-cyan-300 block">
            Etapa {current.step} • {current.kicker}
          </span>
          <h3 className="text-lg font-extrabold text-white mt-1 leading-snug">{current.title}</h3>
        </div>

        {/* Asymmetric Workbench: Mobile puts Live Console FIRST (order-1) right below tabs, Narrative second (order-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Left Column on Desktop (5 Cols) / Bottom Details on Mobile */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between py-1 sm:py-2">
            {STAGES.map((st) => {
              const isSelected = st.id === activeStage
              return (
                <div
                  key={st.id}
                  id={`pod-stage-panel-${st.id}`}
                  role="tabpanel"
                  aria-labelledby={`pod-stage-tab-${st.id}`}
                  hidden={!isSelected}
                  className={isSelected ? "space-y-4 sm:space-y-6" : "hidden"}
                >
                  <div>
                    <span className="hidden lg:inline-block text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-300">
                      Etapa {st.step} • {st.kicker}
                    </span>
                    <h3 className="hidden lg:block text-2xl sm:text-3xl font-extrabold text-white mt-2.5 leading-tight tracking-tight">
                      {st.title}
                    </h3>
                    <p className="text-zinc-200 sm:text-zinc-300/90 text-sm sm:text-base font-normal sm:font-light leading-relaxed lg:mt-4">
                      {st.summary}
                    </p>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3 pt-3 border-t border-white/10">
                    {st.highlights.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-zinc-200 sm:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* Stage Telemetry Footer */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 sm:text-zinc-500">
                  {current.metricLabel}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-white">{current.metricValue}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const idx = STAGES.findIndex((s) => s.id === activeStage)
                  selectStage(STAGES[(idx + 1) % STAGES.length].id)
                }}
                className="pod-btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-amber-100"
              >
                Próxima etapa
                <span className="pod-nudge">→</span>
              </button>
            </div>
          </div>

          {/* Right Column on Desktop (7 Cols) / Top Console on Mobile (order-1) */}
          <div className="order-1 lg:order-2 lg:col-span-7 rounded-3xl border border-white/15 bg-gradient-to-br from-[#151221] via-[#0b0a12] to-[#06050a] p-4 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(245,158,11,0.08),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12)_0%,transparent_70%)]" />

            <AnimatePresence mode="wait">
              {activeStage === "onetouch" && (
                <motion.div
                  key="stage-onetouch"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                  className="space-y-6 relative z-10 h-full flex flex-col justify-between"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                        Painel Q-SYS de Sala
                      </span>
                      <span className="text-sm font-bold text-white">Simulador One-Touch</span>
                    </div>
                    <button
                      type="button"
                      data-active={roomArmed}
                      onClick={() => setRoomArmed((v) => !v)}
                      className={`pod-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold ${
                        roomArmed ? "text-amber-100" : "text-white"
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      {roomArmed ? "Estúdio Ativo (Desligar)" : "Tocar em 'Iniciar Gravação'"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      {
                        label: "Iluminação Cênica (DMX/DALI)",
                        statusOn: "Keylight 4500K + Fundo Âmbar",
                        statusOff: "Standby 10%",
                      },
                      {
                        label: "Cadeia de Áudio Q-SYS",
                        statusOn: "4 Microfones + AEC Broadcast",
                        statusOff: "Mudo Seguro",
                      },
                      {
                        label: "Climatização Silenciosa",
                        statusOn: "22°C • Modo Baixo Ruído",
                        statusOff: "Modo Econômico",
                      },
                      {
                        label: "Captura Redundante 4K",
                        statusOn: "PGM + ISO Local + Nuvem",
                        statusOff: "Aguardando Comando",
                      },
                    ].map((sub) => (
                      <div
                        key={sub.label}
                        className={`p-4 rounded-2xl border transition-colors duration-300 ${
                          roomArmed
                            ? "bg-white/[0.04] border-amber-400/30"
                            : "bg-black/35 border-white/5"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-zinc-200">{sub.label}</span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              roomArmed ? "bg-emerald-400" : "bg-zinc-600"
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-mono ${roomArmed ? "text-amber-300" : "text-zinc-500"}`}>
                          {roomArmed ? sub.statusOn : sub.statusOff}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-zinc-400 font-mono flex items-center justify-between pt-2 border-t border-white/5">
                    <span>Clique no botão acima para testar o acionamento</span>
                    <span className="text-emerald-400">{roomArmed ? "SALA PRONTA EM 1.8s" : "ESPERA"}</span>
                  </div>
                </motion.div>
              )}

              {activeStage === "autocut" && (
                <motion.div
                  key="stage-autocut"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                  className="space-y-6 relative z-10 h-full flex flex-col justify-between"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 block">
                        Matriz de Decisão por Voz
                      </span>
                      <span className="text-sm font-bold text-white">Teste a Inteligência Anti-Falso Corte</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "host", label: "Fala Host" },
                        { id: "conv1", label: "Fala Convidado" },
                        { id: "noise", label: "Ruído / Tosse" },
                      ].map((btn) => (
                        <button
                          key={btn.id}
                          type="button"
                          data-active={activeVoiceChannel === btn.id}
                          onClick={() => setActiveVoiceChannel(btn.id as "host" | "conv1" | "noise")}
                          className={`pod-btn px-3.5 py-2 rounded-lg text-[11px] font-bold ${
                            activeVoiceChannel === btn.id ? "text-amber-100" : "text-zinc-200"
                          }`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
                    <div
                      className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all min-w-0 ${
                        activeVoiceChannel === "host"
                          ? "bg-amber-500/10 border-amber-400/50"
                          : "bg-black/35 border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                        <span className="text-[9.5px] sm:text-[10px] font-mono text-zinc-400">CAM 01</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">Host (CEO)</div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-amber-300 mt-1 leading-tight">
                        {activeVoiceChannel === "host" ? "● NO AR" : "Espera"}
                      </div>
                    </div>

                    <div
                      className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all min-w-0 ${
                        activeVoiceChannel === "conv1"
                          ? "bg-cyan-500/10 border-cyan-400/50"
                          : "bg-black/35 border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 shrink-0" />
                        <span className="text-[9.5px] sm:text-[10px] font-mono text-zinc-400">CAM 02</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">Convidado</div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-cyan-300 mt-1 leading-tight">
                        {activeVoiceChannel === "conv1" ? "● NO AR" : "Espera"}
                      </div>
                    </div>

                    <div
                      className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all min-w-0 ${
                        activeVoiceChannel === "noise"
                          ? "bg-emerald-500/10 border-emerald-400/50"
                          : "bg-black/35 border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                        <span className="text-[9.5px] sm:text-[10px] font-mono text-zinc-400">FILTRO</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">Anti-Ruído</div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-emerald-300 mt-1 leading-tight">
                        {activeVoiceChannel === "noise" ? "✓ Bloqueado" : "Ativo"}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-xs font-mono text-zinc-300 flex items-center justify-between">
                    <span>
                      {activeVoiceChannel === "noise"
                        ? "Q-SYS: Pico curto de ruído detectado (0.18s) → corte de câmera bloqueado para manter fluidez."
                        : `Q-SYS Automix: Fala sustentada detectada → PTZ comutada com transição suave (0.12s).`}
                    </span>
                  </div>
                </motion.div>
              )}

              {activeStage === "postengine" && (
                <motion.div
                  key="stage-postengine"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                  className="space-y-5 relative z-10 h-full flex flex-col justify-between"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                        Edição por Texto & Branding Integrado
                      </span>
                      <span className="text-sm font-bold text-white">Prévia Automática de Corte</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setTrimSilences((v) => !v)}
                      data-active={trimSilences}
                      className={`pod-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-bold ${
                        trimSilences ? "text-amber-100" : "text-zinc-200"
                      }`}
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      {trimSilences ? "Silêncios Removidos ✓" : "Ver Silêncios Originais"}
                    </button>
                  </div>

                  {/* Interactive Transcript + Auto-Highlight Preview */}
                  <div className="rounded-2xl bg-black/55 border border-white/10 p-4 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="inline-flex items-center gap-1.5 text-amber-300">
                        <FileText className="w-3.5 h-3.5" />
                        TRANSCRIÇÃO AUTOMÁTICA
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/35">
                        Melhor Momento • Gancho 94%
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-200">
                      “Quando o executivo entra para gravar e{" "}
                      {!trimSilences && (
                        <span className="mx-1 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[11px] line-through">
                          [silêncio 1.4s]
                        </span>
                      )}
                      aperta apenas um botão, a empresa ganha constância no{" "}
                      <span className="text-amber-300 font-semibold underline decoration-amber-400/60">
                        LinkedIn e no YouTube
                      </span>{" "}
                      {!trimSilences && (
                        <span className="mx-1 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[11px] line-through">
                          [hã... 0.8s]
                        </span>
                      )}
                      sem tirar nenhuma liderança da operação.”
                    </p>
                  </div>

                  {/* Brand Template Switcher + Dynamic Caption Simulation */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-xs text-zinc-400">Identidade visual da legenda:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {BRAND_THEMES.map((theme, idx) => (
                        <button
                          key={theme.id}
                          type="button"
                          data-active={brandThemeIdx === idx}
                          onClick={() => setBrandThemeIdx(idx)}
                          className={`pod-btn px-3 py-1.5 rounded-lg text-[11px] font-bold ${
                            brandThemeIdx === idx ? "text-amber-100" : "text-zinc-200"
                          }`}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`rounded-xl border px-4 py-3 flex items-center justify-between ${activeBrand.captionBg}`}>
                    <div className="flex items-center gap-2 text-xs font-extrabold tracking-tight">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        CONSTÂNCIA NO <span className={activeBrand.highlightClass}>LINKEDIN</span> SEM EQUIPE EXTRA
                      </span>
                    </div>
                    <span className="text-[10px] font-mono opacity-75 shrink-0 ml-2">{activeBrand.tag}</span>
                  </div>
                </motion.div>
              )}

              {activeStage === "distribution" && (
                <motion.div
                  key="stage-distribution"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                  className="space-y-5 relative z-10 h-full flex flex-col justify-between"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 block">
                        Pacote Gerado Automaticamente
                      </span>
                      <span className="text-sm font-bold text-white">Pronto para YouTube, Reels, Shorts e LinkedIn</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(["all", "9:16", "1:1", "16:9"] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          data-active={exportFilter === fmt}
                          onClick={() => setExportFilter(fmt)}
                          className={`pod-btn px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold ${
                            exportFilter === fmt ? "text-amber-100" : "text-zinc-200"
                          }`}
                        >
                          {fmt === "all" ? "Todos" : fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {EXPORT_ITEMS.filter((item) => exportFilter === "all" || item.ratio === exportFilter).map(
                      (item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.id}
                            className="p-4 rounded-2xl bg-black/45 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2.5 rounded-xl border shrink-0 ${item.accent}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white">
                                    {item.ratio}
                                  </span>
                                  <span className="text-sm font-bold text-white">{item.title}</span>
                                </div>
                                <p className="text-xs text-zinc-400 mt-1">{item.detail}</p>
                              </div>
                            </div>
                            <div className="text-left sm:text-right shrink-0">
                              <span className="block text-[11px] font-mono text-emerald-400">{item.duration}</span>
                              <span className="block text-[10px] text-zinc-500">{item.channels}</span>
                            </div>
                          </div>
                        )
                      }
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-amber-400" />
                      Pastas sincronizadas com o Marketing
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Film className="w-3.5 h-3.5" />
                      <Clapperboard className="w-3.5 h-3.5" />
                      <Layers className="w-3.5 h-3.5" />
                      Pronto em minutos
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
})
