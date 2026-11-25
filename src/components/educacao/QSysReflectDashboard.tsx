import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/FadeIn"
import { trackCustomizeProduct } from "@/lib/metaPixel"

type AlertId = "mic204" | "dspReitoria"

interface RoomNode {
  id: string
  name: string
  block: string
  peripherals: string
  statusText: string
  linkedAlert?: AlertId
}

const CAMPUS_ROOMS: RoomNode[] = [
  {
    id: "204",
    name: "Sala 204 • Direito",
    block: "Bloco B",
    peripherals: "Microfone de teto + Câmera automática",
    statusText: "Aula às 19h",
    linkedAlert: "mic204",
  },
  {
    id: "reitoria",
    name: "Auditório Principal",
    block: "Prédio Central",
    peripherals: "Som do auditório + 3 Câmeras",
    statusText: "Evento às 20h",
    linkedAlert: "dspReitoria",
  },
  {
    id: "108",
    name: "Sala Híbrida 108",
    block: "Engenharia",
    peripherals: "Pronta para aula • Teams / Zoom",
    statusText: "Em aula",
  },
  {
    id: "mba",
    name: "Salas Duplas de MBA",
    block: "Pós-Graduação",
    peripherals: "Divisória fechada • 2 turmas ativas",
    statusText: "Em aula",
  },
  {
    id: "saude",
    name: "Bloco da Saúde (18 Salas)",
    block: "Campus Sul",
    peripherals: "Todas as telas e microfones ativos",
    statusText: "100% online",
  },
  {
    id: "paging",
    name: "Avisos e Sinais do Campus",
    block: "Pátios e Corredores",
    peripherals: "Horários programados funcionando",
    statusText: "Automático",
  },
]

const ALERT_DETAILS: Record<
  AlertId,
  { title: string; subtitle: string; actionLabel: string; logs: string[] }
> = {
  mic204: {
    title: "Sala 204 (Direito) • Microfone do teto desconectado",
    subtitle: "O sistema avisou sozinho 20 minutos antes da aula noturna começar.",
    actionLabel: "Reconectar Microfone à Distância",
    logs: [
      "Conectando remotamente à Sala 204 pelo painel da TI...",
      "Reiniciando a energia do microfone de teto pela rede...",
      "✓ Pronto! Microfone ativo em 2 segundos — professor nem notou.",
    ],
  },
  dspReitoria: {
    title: "Auditório Principal • Áudio precisando de ajuste",
    subtitle: "Pequena falha detectada preventivamente antes da abertura da palestra.",
    actionLabel: "Restaurar Padrão do Auditório",
    logs: [
      "Acessando o Auditório Principal sem sair da sala de suporte...",
      "Recarregando a calibração oficial de som e câmeras...",
      "✓ Auditório 100% pronto para o evento • Zero deslocamento da TI.",
    ],
  },
}

export function QSysReflectDashboard() {
  const [resolvedAlerts, setResolvedAlerts] = useState<Record<AlertId, boolean>>({
    mic204: false,
    dspReitoria: false,
  })
  const [runningAlert, setRunningAlert] = useState<AlertId | null>(null)
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Monitorando 48 salas e auditórios do campus em tempo real.",
    "Toque em um aviso para ver como sua TI resolve tudo da própria mesa.",
  ])

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const handleResolveAlert = (id: AlertId) => {
    if (runningAlert || resolvedAlerts[id]) return
    clearTimers()
    setRunningAlert(id)
    trackCustomizeProduct("educacao_reflect_action", id)

    const logs = ALERT_DETAILS[id].logs
    setTerminalLogs([logs[0]])

    const t1 = setTimeout(() => {
      setTerminalLogs([logs[0], logs[1]])
    }, 520)

    const t2 = setTimeout(() => {
      setTerminalLogs([logs[0], logs[1], logs[2]])
      setResolvedAlerts((prev) => ({ ...prev, [id]: true }))
      setRunningAlert(null)
    }, 1180)

    timersRef.current.push(t1, t2)
  }

  const handleReset = () => {
    clearTimers()
    setRunningAlert(null)
    setResolvedAlerts({ mic204: false, dspReitoria: false })
    setTerminalLogs([
      "Simulação reiniciada com 2 avisos preventivos.",
      "Clique no botão branco acima para resolver à distância.",
    ])
  }

  const resolvedCount = Number(resolvedAlerts.mic204) + Number(resolvedAlerts.dspReitoria)
  const onlineRooms = 46 + resolvedCount

  return (
    <section
      aria-labelledby="reflect-section-title"
      className="py-14 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10 relative z-10 edu-hairline-top bg-gradient-to-b from-[#040509] via-[#080d19] to-[#040508]"
    >
      <div className="max-w-[1380px] mx-auto">
        {/* Clear Executive Header */}
        <FadeIn className="mb-9 sm:mb-14 md:mb-18">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-14 items-end">
            <div className="lg:col-span-7">
              <span className="edu-eyebrow mb-3 sm:mb-4">Rotina Acadêmica &amp; Paz para a TI</span>
              <h2
                id="reflect-section-title"
                className="edu-title text-2xl sm:text-4xl xl:text-[3.1rem]"
              >
                Sua equipe de TI não precisa atravessar o campus{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                  para resolver um microfone mudo.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="pl-4 border-l-2 border-red-500/55">
                <span className="text-xs font-semibold text-red-400 block mb-1">
                  Como é nas salas comuns
                </span>
                <p className="text-sm text-zinc-300 sm:text-zinc-400 font-normal sm:font-light leading-relaxed">
                  A aula atrasa, o professor fica constrangido diante da turma e o técnico precisa correr de prédio em
                  prédio para reconectar um cabo.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-emerald-400/80">
                <span className="text-xs font-semibold text-emerald-300 block mb-1">
                  Como fica com <span className="whitespace-nowrap">Q-SYS Reflect</span>
                </span>
                <p className="text-sm text-zinc-100 sm:text-zinc-200 font-normal sm:font-light leading-relaxed">
                  O sistema avisa a TI caso algo saia do lugar e permite resolver pela internet em segundos — antes
                  mesmo do professor entrar na sala.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Interactive Campus Management Panel */}
        <FadeIn delay={0.1}>
          <div className="relative rounded-[1.75rem] sm:rounded-[2rem] border border-white/12 bg-[#070a13]/95 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Top Bar */}
            <div className="relative px-4 sm:px-8 py-4 sm:py-5 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <span
                  className={`edu-beacon w-2.5 h-2.5 rounded-full shrink-0 ${
                    onlineRooms === 48 ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                <div>
                  <span className="text-sm font-bold text-white block">
                    Visão Geral do Campus — <span className="whitespace-nowrap">Q-SYS Reflect</span>
                  </span>
                  <span className="text-xs text-zinc-300 sm:text-zinc-400">
                    <span className="lg:hidden">Toque nos alertas amarelos abaixo para resolver</span>
                    <span className="hidden lg:inline">Todas as salas e auditórios acompanhados em uma única tela</span>
                  </span>
                </div>
              </div>

              {/* Live Heartbeat Wave */}
              <div className="hidden xl:block w-52 h-7 opacity-80" aria-hidden="true">
                <svg viewBox="0 0 220 28" className="w-full h-full overflow-visible">
                  <path
                    d="M 0 14 Q 28 14, 42 14 L 54 4 L 64 24 L 74 9 L 84 18 L 96 14 Q 150 14, 220 14"
                    fill="none"
                    stroke="rgba(34,211,238,0.18)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 0 14 Q 28 14, 42 14 L 54 4 L 64 24 L 74 9 L 84 18 L 96 14 Q 150 14, 220 14"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="edu-packet-fast"
                  />
                </svg>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-white tabular-nums">
                    {onlineRooms}
                    <span className="text-zinc-500 font-normal">/48</span>
                  </span>
                  <span className="text-xs text-zinc-300 sm:text-zinc-400">Salas Prontas</span>
                </div>

                {resolvedCount > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 py-2.5 -my-2 text-xs font-medium text-cyan-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Testar novamente
                  </button>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: Room List (with inline tap-to-fix on mobile so user sees immediate feedback!) */}
              <div className="lg:col-span-7 divide-y divide-white/[0.06]">
                {CAMPUS_ROOMS.map((room) => {
                  const alertId = room.linkedAlert
                  const alertInfo = alertId ? ALERT_DETAILS[alertId] : null
                  const isAlert = Boolean(alertId && !resolvedAlerts[alertId])
                  const isResolving = Boolean(alertId && runningAlert === alertId)
                  const isFixed = Boolean(alertId && resolvedAlerts[alertId])

                  return (
                    <div
                      key={room.id}
                      className={`relative px-4 sm:px-8 py-3.5 sm:py-4 transition-colors duration-500 ${
                        isResolving
                          ? "bg-cyan-500/[0.09]"
                          : isAlert
                          ? "bg-amber-500/[0.07]"
                          : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-full transition-colors duration-500 ${
                          isResolving
                            ? "bg-cyan-400"
                            : isAlert
                            ? "bg-amber-400"
                            : isFixed
                            ? "bg-emerald-400"
                            : "bg-transparent"
                        }`}
                      />

                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex items-center gap-3">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isResolving
                                ? "bg-cyan-400 edu-beacon"
                                : isAlert
                                ? "bg-amber-400 edu-beacon"
                                : "bg-emerald-400"
                            }`}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white truncate">{room.name}</span>
                              <span className="hidden sm:inline text-xs text-zinc-500">• {room.block}</span>
                            </div>
                            <span className="text-xs text-zinc-300 sm:text-zinc-400 block truncate mt-0.5">
                              {isAlert && alertInfo ? (
                                <>
                                  <span className="lg:hidden text-amber-200/95">{alertInfo.title.split("•")[1]?.trim()}</span>
                                  <span className="hidden lg:inline">{room.peripherals}</span>
                                </>
                              ) : (
                                room.peripherals
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                          <span className="hidden sm:inline text-xs text-zinc-500">{room.statusText}</span>
                          <span
                            className={`text-xs font-semibold text-right ${
                              isAlert ? "hidden lg:inline-block lg:min-w-[84px]" : "min-w-[72px] sm:min-w-[84px]"
                            } ${
                              isResolving
                                ? "text-cyan-300"
                                : isAlert
                                ? "text-amber-300"
                                : "text-emerald-400"
                            }`}
                          >
                            {isResolving ? "Ajustando..." : isAlert ? "Verificar" : isFixed ? "✓ Resolvido" : "Pronta"}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Inline Action right inside the alert row so feedback happens in-view */}
                      {alertId && alertInfo && isAlert && (
                        <div className="mt-3 pl-5 lg:hidden">
                          <Button
                            type="button"
                            disabled={Boolean(runningAlert)}
                            onClick={() => handleResolveAlert(alertId)}
                            className="w-full h-10 rounded-full text-xs font-bold bg-white text-slate-950 hover:bg-cyan-50 shadow-[0_8px_24px_-6px_rgba(34,211,238,0.35)]"
                          >
                            {alertInfo.actionLabel}
                            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Right: Simulated Remote Fix (Full console on lg+, compact live terminal on mobile) */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/[0.08] p-4 sm:p-8 flex flex-col justify-between gap-6 bg-black/30">
                <div className="hidden lg:block">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                      Teste o Suporte à Distância
                    </span>
                    <span className="text-xs text-zinc-500">Sem ir até a sala</span>
                  </div>

                  <div className="divide-y divide-white/[0.08]">
                    {(["mic204", "dspReitoria"] as AlertId[]).map((alertKey, idx) => {
                      const item = ALERT_DETAILS[alertKey]
                      const isFixed = resolvedAlerts[alertKey]
                      const isRunning = runningAlert === alertKey

                      return (
                        <div key={alertKey} className={idx === 0 ? "pb-5" : "pt-5"}>
                          <div className="flex items-start gap-3 mb-3.5">
                            {isFixed ? (
                              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <h3 className="text-sm font-semibold text-white leading-snug">{item.title}</h3>
                              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.subtitle}</p>
                            </div>
                          </div>

                          <Button
                            type="button"
                            disabled={isFixed || Boolean(runningAlert)}
                            onClick={() => handleResolveAlert(alertKey)}
                            className={`w-full h-10 rounded-full text-xs font-semibold transition-transform duration-200 ${
                              isFixed
                                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/25"
                                : "bg-white text-slate-950 hover:bg-cyan-50 hover:scale-[1.01]"
                            }`}
                          >
                            {isFixed ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                                Resolvido em segundos pela internet
                              </>
                            ) : isRunning ? (
                              "Aplicando ajuste remoto..."
                            ) : (
                              <>
                                {item.actionLabel}
                                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                              </>
                            )}
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Readable Status Feed */}
                <div className="lg:pt-5 lg:border-t lg:border-white/[0.08] text-xs space-y-1.5 sm:space-y-2 min-h-[76px] sm:min-h-[100px]">
                  <div className="flex items-center gap-2 text-zinc-400 sm:text-zinc-500 mb-1.5 sm:mb-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-mono uppercase tracking-wider text-[10px]">Histórico em Tempo Real</span>
                  </div>
                  {terminalLogs.map((line, i) => (
                    <motion.p
                      key={`${line}-${i}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={line.startsWith("✓") ? "text-emerald-400 font-medium" : "text-zinc-200 sm:text-zinc-300"}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
