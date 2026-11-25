import { memo, useState } from "react"
import { ArrowRight, Building2, Church, GraduationCap, Lock, Mic2, Sparkles, TrendingUp } from "lucide-react"
import { trackCustomizeProduct } from "@/lib/metaPixel"

export type PodcastProfileId = "corporativo" | "igrejas" | "criadores" | "educacao"

interface VerticalProfile {
  id: PodcastProfileId
  num: string
  tabLabel: string
  formValue: string
  badge: string
  isPrimary?: boolean
  icon: typeof Building2
  accentText: string
  accentBorder: string
  headline: string
  narrative: string
  painSolved: string
  deliverables: string[]
  metrics: { value: string; label: string }[]
}

const VERTICALS: VerticalProfile[] = [
  {
    id: "corporativo",
    num: "01",
    tabLabel: "Corporativo & Executivos",
    formValue: "Corporativo & Executivo",
    badge: "Destaque Principal • B2B & C-Level",
    isPrimary: true,
    icon: Building2,
    accentText: "text-amber-300",
    accentBorder: "border-amber-400/50",
    headline: "Autoridade no LinkedIn e comunicação executiva sem depender de agência ou equipe na sala.",
    narrative:
      "Diretores e CEOs têm minutos contados e pautas confidenciais. Na sala autônoma da Sonus, a liderança entra para uma conversa de 40 minutos com clientes ou conselheiros sem câmera-man nem operador ouvindo a reunião — e o time de branding recebe o episódio e 15+ cortes prontos.",
    painSolved: "Elimina meses de espera com produtora e reduz drasticamente o custo fixo por episódio gravado.",
    deliverables: [
      "Videocasts B2B com clientes estratégicos e parceiros para relacionamento e prospecção",
      "Comunicados da presidência, Town Halls e treinamentos internos com gravação confidencial",
      "Pacotes mensais de autoridade para LinkedIn e YouTube com identidade visual corporativa",
    ],
    metrics: [
      { value: "45 min", label: "Agenda do Executivo" },
      { value: "0", label: "Operadores na Sala" },
      { value: "15+", label: "Cortes B2B por Gravação" },
    ],
  },
  {
    id: "igrejas",
    num: "02",
    tabLabel: "Igrejas & Ministérios",
    formValue: "Igreja & Ministério",
    badge: "Alcance Pastoral 7 Dias/Semana",
    icon: Church,
    accentText: "text-cyan-300",
    accentBorder: "border-cyan-400/50",
    headline: "Devocionais e mesas pastorais desdobradas em cortes diários sem sobrecarregar voluntários.",
    narrative:
      "A igreja já investe esforço enorme no domingo, mas muitas vezes não tem voluntários disponíveis na terça-feira para captar, editar e legendar conteúdos de mid-week. Um único botão permite gravar conversas pastorais e gerar cortes diários 9:16 automaticamente.",
    painSolved: "Fim da dependência de voluntários experientes em vídeo para manter devocionais e séries no ar.",
    deliverables: [
      "Mesas de discipulado, estudos bíblicos e podcasts de juventude prontos em um toque",
      "Geração automática de cortes verticais 9:16 com legendas legíveis no padrão da igreja",
      "Captação acústica isolada mesmo em prédios anexos ao templo principal",
    ],
    metrics: [
      { value: "7 dias", label: "Presença na Comunidade" },
      { value: "1 toque", label: "Para Gravar Sozinho" },
      { value: "9:16", label: "Cortes Diários Prontos" },
    ],
  },
  {
    id: "criadores",
    num: "03",
    tabLabel: "Estúdios & Criadores",
    formValue: "Estúdio / Criador / Marca",
    badge: "Operação Comercial & Escalabilidade",
    icon: Mic2,
    accentText: "text-sky-300",
    accentBorder: "border-sky-400/50",
    headline: "Giro comercial mais rápido: entregue o episódio e os cortes no mesmo turno.",
    narrative:
      "Para produtoras, hubs de inovação e criadores com múltiplos programas na semana, o gargalo não é ligar a luz — é editar horas de material bruto. Com perfis salvos no Q-SYS e geração automática de cortes com vinhetas distintas por programa, cada gravação escala sem aumentar a folha.",
    painSolved: "Permite gravar 4 episódios no mesmo dia e liberar os arquivos brutos + cortes em sequência.",
    deliverables: [
      "Presets instantâneos de luz e identidade de marca para trocar de programa em segundos",
      "Corte multi-câmera limpo já gravado ao vivo, evitando horas de sincronização em ilha",
      "Pacotes padronizados de episódio 16:9 + clipes 9:16 com remoção automática de pausas",
    ],
    metrics: [
      { value: "4x", label: "Mais Giro Diário de Sala" },
      { value: "-80%", label: "Horas de Ilha de Edição" },
      { value: "Presets", label: "Troca de Marca Instantânea" },
    ],
  },
  {
    id: "educacao",
    num: "04",
    tabLabel: "Instituições de Ensino",
    formValue: "Educação / Universidade",
    badge: "EAD, Pesquisa & Captação",
    icon: GraduationCap,
    accentText: "text-emerald-300",
    accentBorder: "border-emerald-400/50",
    headline: "Videocasts acadêmicos e pílulas de conhecimento operados pelo próprio professor.",
    narrative:
      "Universidades, MBA e escolas técnicas transformam uma sala de apoio subutilizada em um hub de produção para entrevistas com pesquisadores, aulas em formato de mesa redonda e pílulas de captação de novos alunos — com controle total pela equipe de TI via Q-SYS Reflect.",
    painSolved: "Professores gravam sem esperar janela da equipe audiovisual do campus.",
    deliverables: [
      "Entrevistas entre docentes, egressos e mercado em qualidade broadcast",
      "Pílulas curtas 9:16 legendadas automaticamente para campanhas de vestibular e pós",
      "Monitoramento remoto pela TI do campus com suporte simplificado",
    ],
    metrics: [
      { value: "Zero", label: "Técnico na Sala" },
      { value: "100%", label: "Monitorado via Q-SYS" },
      { value: "Turn-Key", label: "Instalação Nas Férias" },
    ],
  },
]

interface PodcastVerticalsProps {
  onSelectProfile: (formValue: string) => void
}

export const PodcastVerticals = memo(function PodcastVerticals({ onSelectProfile }: PodcastVerticalsProps) {
  const [selectedId, setSelectedId] = useState<PodcastProfileId>("corporativo")

  const handleSelect = (id: PodcastProfileId) => {
    setSelectedId(id)
    trackCustomizeProduct("Podcast_Verticals", id)
  }

  return (
    <section
      aria-labelledby="verticals-heading"
      className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10 pod-timecode-line bg-[#090811]"
    >
      <div className="max-w-[1380px] mx-auto">
        <div className="max-w-3xl mb-8 sm:mb-14 md:mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] sm:tracking-[0.28em] text-amber-400 mb-3 sm:mb-4">
            <span className="w-5 sm:w-6 h-px bg-amber-400/60" />
            Aplicações por Perfil de Operação
          </span>
          <h2
            id="verticals-heading"
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.08]"
          >
            Projetado para a rotina corporativa.{" "}
            <span className="text-zinc-400 font-semibold">Adaptável a qualquer operação de conteúdo.</span>
          </h2>
        </div>

        {/* Open Editorial Split Roster — On mobile, 2x2 selector sits directly above the content card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-10 lg:gap-14 items-start">
          {/* Left Navigation List (4 Cols on Desktop, Compact 2x2 Grid on Mobile) */}
          <div className="lg:col-span-4 space-y-2.5 sm:space-y-3">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-200 mb-0.5 sm:mb-1">
              <span className="pod-hint-dot shrink-0" />
              <span>
                Escolha o seu perfil — o conteúdo{" "}
                <span className="lg:hidden">abaixo</span>
                <span className="hidden lg:inline">ao lado</span> muda
              </span>
            </span>

            <div
              role="tablist"
              aria-label="Perfis de operação para estúdios de podcast"
              className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3"
            >
              {VERTICALS.map((item) => {
                const Icon = item.icon
                const isSelected = item.id === selectedId
                return (
                  <button
                    key={item.id}
                    id={`pod-vert-tab-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`pod-vert-panel-${item.id}`}
                    onClick={() => handleSelect(item.id)}
                    data-active={isSelected}
                    className="pod-btn w-full text-left py-3 px-3 sm:py-4 sm:px-4 rounded-2xl flex items-center justify-between gap-2 sm:gap-3"
                  >
                    <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
                      <span
                        className={`hidden sm:inline text-xs font-mono font-bold ${
                          isSelected ? item.accentText : "text-zinc-500"
                        }`}
                      >
                        {item.num}
                      </span>
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? item.accentText : "text-zinc-400"
                        }`}
                      />
                      <div className="min-w-0">
                        <span
                          className={`block text-xs sm:text-base font-bold leading-snug lg:truncate ${
                            isSelected ? "text-white" : "text-zinc-200"
                          }`}
                        >
                          {item.tabLabel}
                        </span>
                        {item.isPrimary && (
                          <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-amber-400/90 mt-0.5">
                            Foco Executivo B2B
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight
                      className={`hidden sm:block w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? `${item.accentText} translate-x-0.5` : "text-zinc-600"
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            {/* Confidentiality & ROI Callout — Desktop position */}
            <div className="hidden lg:block mt-6 p-5 rounded-2xl bg-amber-500/[0.05] border border-amber-400/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Lock className="w-3.5 h-3.5" />
                Confidencialidade de Sala C-Level
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Para gravações estratégicas de conselho ou fusões internas, o estúdio opera em circuito fechado sem
                operadores terceirizados dentro da sala.
              </p>
            </div>
          </div>

          {/* Right Open Editorial Canvas (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {VERTICALS.map((vert) => {
              const VertIcon = vert.icon
              const isSelected = vert.id === selectedId
              return (
                <div
                  key={vert.id}
                  id={`pod-vert-panel-${vert.id}`}
                  role="tabpanel"
                  aria-labelledby={`pod-vert-tab-${vert.id}`}
                  hidden={!isSelected}
                  className={
                    isSelected
                      ? `rounded-3xl border bg-gradient-to-br from-[#171422] via-[#0b0a12] to-[#060509] p-5 sm:p-10 md:p-12 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.08)] ${vert.accentBorder}`
                      : "hidden"
                  }
                >
                  <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 mb-4 sm:mb-6">
                    <span
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider bg-white/[0.05] border border-white/10 ${vert.accentText}`}
                    >
                      <VertIcon className="w-3.5 h-3.5 shrink-0" />
                      {vert.badge}
                    </span>

                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      Arquitetura Turn-Key Q-SYS
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.16] mb-4 sm:mb-5">
                    {vert.headline}
                  </h3>

                  <p className="text-zinc-200 sm:text-zinc-300 text-sm sm:text-base font-normal sm:font-light leading-relaxed mb-5 sm:mb-6">
                    {vert.narrative}
                  </p>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border-l-2 border-amber-400 mb-6 sm:mb-8">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-1">
                      Impacto Direto na Operação
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-100 sm:text-zinc-200 font-medium leading-relaxed">{vert.painSolved}</p>
                  </div>

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-4 py-4 sm:py-6 border-y border-white/10 mb-6 sm:mb-8 divide-x divide-white/10 sm:divide-x-0">
                    {vert.metrics.map((m, i) => (
                      <div key={m.label} className={i > 0 ? "pl-2.5 sm:pl-0 min-w-0" : "min-w-0"}>
                        <span className={`block text-lg sm:text-3xl font-black tracking-tight break-words ${vert.accentText}`}>
                          {m.value}
                        </span>
                        <span className="block text-[11px] sm:text-xs text-zinc-300 sm:text-zinc-400 mt-0.5 sm:mt-1 leading-snug">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables List + Targeted CTA */}
                  <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    {vert.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-zinc-200 sm:text-zinc-300">
                        <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${vert.accentText}`} />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProfile(vert.formValue)}
                    className="pod-btn w-full sm:w-auto justify-center text-center inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full !bg-white !text-slate-950 text-xs sm:text-sm font-bold leading-tight"
                  >
                    <span>Dimensionar Estúdio para {vert.tabLabel}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 pod-nudge" />
                  </button>
                </div>
              )
            })}

            {/* Confidentiality Callout on Mobile — placed AFTER the active card so it never blocks the tabs */}
            <div className="lg:hidden p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-400/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                Confidencialidade de Sala C-Level
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Para gravações estratégicas de conselho ou fusões internas, o estúdio opera em circuito fechado sem
                operadores terceirizados dentro da sala.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
